import { contactServices, propertyTypes } from '../src/data/contact.ts';

export interface ContactEnv {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_RATE_LIMITER?: { limit: (options: { key: string }) => Promise<{ success: boolean }> };
}

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const unavailable = 'Online requests are unavailable right now. Please call, text, or email our team.';
const reply = (status: number, message: string, extra: Record<string, unknown> = {}) => Response.json(
  { message, ...extra }, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } },
);
const configured = (env: ContactEnv) => Boolean(
  env.RESEND_API_KEY && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY && env.CONTACT_RATE_LIMITER &&
  emailPattern.test(env.CONTACT_FROM_EMAIL ?? '') && emailPattern.test(env.CONTACT_TO_EMAIL ?? ''),
);

async function readLimitedBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16384) {
      await reader.cancel();
      throw new RangeError('Body too large');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(bytes);
}

export async function handleContact(request: Request, env: ContactEnv, fetcher: typeof fetch = fetch): Promise<Response> {
  if (request.method === 'GET') {
    return reply(200, configured(env) ? '' : unavailable, {
      available: configured(env), siteKey: configured(env) ? env.TURNSTILE_SITE_KEY : null,
    });
  }
  if (request.method !== 'POST') {
    const response = reply(405, 'Please use the estimate form to send a request.');
    response.headers.set('Allow', 'GET, POST');
    return response;
  }
  const url = new URL(request.url);
  if (request.headers.get('Origin') !== url.origin) return reply(403, 'Please send your request from our contact page.');
  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') return reply(415, 'Please use the estimate form to send a request.');
  if (!configured(env)) return reply(503, unavailable);

  try {
    const ip = request.headers.get('CF-Connecting-IP');
    if (!ip) return reply(503, unavailable);
    const allowed = await env.CONTACT_RATE_LIMITER!.limit({ key: `flores-contact:${ip}` });
    if (!allowed.success) {
      const response = reply(429, 'Please wait a minute before trying again, or call our team.');
      response.headers.set('Retry-After', '60');
      return response;
    }
    let raw: Record<string, unknown>;
    try {
      raw = JSON.parse(await readLimitedBody(request));
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return reply(400, 'Please check your form and try again.');
    } catch (error) {
      return reply(error instanceof RangeError ? 413 : 400, 'Please check your form and keep your message under 3,000 characters.');
    }
    const field = (key: string) => typeof raw[key] === 'string' ? raw[key].trim() : '';
    const name = field('name');
    const email = field('email');
    const phone = field('phone');
    const city = field('city');
    const service = contactServices.find(item => item.id === field('service'));
    const propertyType = field('propertyType');
    const message = field('message');
    const token = field('token');
    const requestId = field('requestId');
    if (field('website')) return reply(422, 'Please leave the website field empty.');
    if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name)) return reply(422, 'Please enter your name (2–100 characters).');
    if (email.length > 254 || !emailPattern.test(email)) return reply(422, 'Please enter a valid email address.');
    if (phone && (!/^[+()\d\s.x-]{7,30}$/i.test(phone) || phone.replace(/\D/g, '').length < 7)) return reply(422, 'Please check your phone number, or leave it blank.');
    if (city.length < 2 || city.length > 100 || /[\r\n]/.test(city)) return reply(422, 'Please enter your property’s city or town.');
    if (!service || !propertyTypes.some(type => type === propertyType)) return reply(422, 'Please select a service and property type.');
    if (message.length < 10 || message.length > 3000) return reply(422, 'Please describe your project in 10–3,000 characters.');
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) return reply(422, 'Please reload the page and try again.');
    if (!token || token.length > 2048) return reply(422, 'Please complete the security check before sending.');

    const verification = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(8000),
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
    });
    if (!verification.ok) return reply(502, 'The security check is unavailable. Please try again or call us.');
    const result = await verification.json() as { success?: boolean; hostname?: string; action?: string };
    if (result.success !== true || result.hostname !== url.hostname || result.action !== 'estimate') {
      return reply(422, 'The security check expired or could not be verified. Please try again.');
    }

    const payload = {
      from: `Flores Landscaping Website <${env.CONTACT_FROM_EMAIL}>`, to: [env.CONTACT_TO_EMAIL], reply_to: email,
      subject: `Estimate request: ${service.title}`,
      text: [
        'New estimate request from the Flores Landscaping website', '',
        `Name: ${name}`, `Email: ${email}`, `Phone: ${phone || 'Not provided'}`, `City / town: ${city}`,
        `Service: ${service.title}`, `Property: ${propertyType}`, '', 'Project details:', message, '', `Request: ${requestId}`,
      ].join('\n'),
    };
    // Stable across retries with a fresh Turnstile token; edited requests get a new key.
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(payload)));
    const fingerprint = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    const response = await fetcher('https://api.resend.com/emails', {
      method: 'POST', signal: AbortSignal.timeout(12000),
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `estimate/${fingerprint}` },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return reply(502, 'We couldn’t send your request. Your details are still here—please try again or call us.');
    const sent = await response.json() as { id?: string };
    if (!sent.id) return reply(502, 'We couldn’t confirm your request. Please try again or call us.');
    return reply(200, 'Thank you! Your request has been sent to the Flores team. We’ll be in touch to talk about your project.', { sent: true });
  } catch {
    // Do not log request bodies, personal details, provider errors, or secrets.
    return reply(502, 'We couldn’t confirm your request. Your details are still here—please try again or call us.');
  }
}
