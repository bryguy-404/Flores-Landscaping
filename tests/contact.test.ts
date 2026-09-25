import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleContact, type ContactEnv } from '../worker/contact.ts';
import worker from '../worker/index.ts';

const origin = 'https://flores.example';
const data = {
  name: 'Test Gardener', email: 'visitor@example.com', phone: '(574) 555-0100', city: 'South Bend',
  service: 'landscaping', propertyType: 'Residential', message: 'Please help refresh our front garden beds.',
  website: '', token: 'test-token', requestId: '00000000-0000-4000-8000-000000000001',
};
const env: ContactEnv = {
  RESEND_API_KEY: 'test-only-key', CONTACT_FROM_EMAIL: 'website@flores.example', CONTACT_TO_EMAIL: 'team@flores.example',
  TURNSTILE_SITE_KEY: 'test-only-site-key', TURNSTILE_SECRET_KEY: 'test-only-secret',
  CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
};
const request = (body: unknown = data, headers: Record<string, string> = {}) => new Request(`${origin}/api/contact`, {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1', ...headers }, body: JSON.stringify(body),
});
const noNetwork: typeof fetch = async () => { assert.fail('Unexpected external request'); };
function providers(options: { verification?: Record<string, unknown>; emailStatus?: number; emailBody?: unknown } = {}) {
  const calls: { url: string; body: Record<string, unknown>; headers: Headers }[] = [];
  const fetcher: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), body: JSON.parse(String(init?.body)), headers: new Headers(init?.headers) });
    if (String(url).includes('siteverify')) return Response.json(options.verification ?? { success: true, hostname: 'flores.example', action: 'estimate' });
    assert.equal(String(url), 'https://api.resend.com/emails');
    return Response.json(options.emailBody ?? { id: 'mock-email-id' }, { status: options.emailStatus ?? 200 });
  };
  return { calls, fetcher };
}

test('configuration is unavailable without credentials and never reveals secrets', async () => {
  const get = new Request(`${origin}/api/contact`);
  assert.deepEqual(await (await handleContact(get, {}, noNetwork)).json(), {
    available: false, siteKey: null, message: 'Online requests are unavailable right now. Please call, text, or email our team.',
  });
  const response = await handleContact(get, env, noNetwork);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.deepEqual(await response.json(), { available: true, siteKey: env.TURNSTILE_SITE_KEY, message: '' });
  assert.equal((await handleContact(request(), {}, noNetwork)).status, 503);
});

test('unsupported methods, cross-origin requests, and non-JSON input cannot send email', async () => {
  const response = await handleContact(new Request(`${origin}/api/contact`, { method: 'PUT' }), env, noNetwork);
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('Allow'), 'GET, POST');
  assert.equal((await handleContact(request(data, { Origin: 'https://elsewhere.example' }), env, noNetwork)).status, 403);
  assert.equal((await handleContact(request(data, { 'Content-Type': 'text/plain' }), env, noNetwork)).status, 415);
});

test('rate limiting prevents provider calls and advertises when to retry', async () => {
  const response = await handleContact(request(), { ...env, CONTACT_RATE_LIMITER: { limit: async ({ key }) => {
    assert.equal(key, 'flores-contact:192.0.2.1'); return { success: false };
  } } }, noNetwork);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '60');
});

test('malformed and oversized bodies are rejected before contacting providers', async () => {
  const invalid = new Request(`${origin}/api/contact`, { method: 'POST', headers: request().headers, body: '{bad json' });
  assert.equal((await handleContact(invalid, env, noNetwork)).status, 400);
  assert.equal((await handleContact(request(null), env, noNetwork)).status, 400);
  assert.equal((await handleContact(request({ ...data, message: 'x'.repeat(17000) }), env, noNetwork)).status, 413);
});

for (const [field, value] of [
  ['name', ' '], ['name', 'Name\r\nInjected'], ['email', 'not-an-email'], ['email', 'a@example.com\r\nBcc: other@example.com'],
  ['phone', 'not a number'], ['city', ''], ['service', 'unlisted'], ['propertyType', 'other'], ['message', 'short'],
  ['message', 'x'.repeat(3001)], ['website', 'https://spam.example'], ['token', ''], ['requestId', 'not-a-uuid'],
] as const) {
  test(`rejects invalid ${field}: ${value.slice(0, 20)}`, async () => {
    assert.equal((await handleContact(request({ ...data, [field]: value }), env, noNetwork)).status, 422);
  });
}

test('expired, incorrect-host, and incorrect-action challenges never reach Resend', async () => {
  for (const verification of [{ success: false }, { success: true, hostname: 'elsewhere.example', action: 'estimate' }, { success: true, hostname: 'flores.example', action: 'login' }]) {
    const provider = providers({ verification });
    assert.equal((await handleContact(request(), env, provider.fetcher)).status, 422);
    assert.equal(provider.calls.length, 1);
  }
});

test('valid requests use a fixed recipient, verified sender, visitor reply-to, and plain text', async () => {
  const provider = providers();
  const response = await handleContact(request({ ...data, phone: '', message: '<script>test</script> Please refresh the beds.' }), env, provider.fetcher);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).sent, true);
  assert.equal(provider.calls.length, 2);
  assert.equal(provider.calls[0].body.secret, env.TURNSTILE_SECRET_KEY);
  assert.equal(provider.calls[1].body.reply_to, data.email);
  assert.deepEqual(provider.calls[1].body.to, [env.CONTACT_TO_EMAIL]);
  assert.equal(provider.calls[1].body.from, 'Flores Landscaping Website <website@flores.example>');
  assert.equal(provider.calls[1].body.html, undefined);
  assert.match(String(provider.calls[1].body.text), /Phone: Not provided/);
});

test('retries with renewed tokens retain the idempotency key; edited messages change it', async () => {
  const provider = providers();
  await handleContact(request(), env, provider.fetcher);
  await handleContact(request({ ...data, token: 'renewed-token' }), env, provider.fetcher);
  await handleContact(request({ ...data, token: 'third-token', message: 'Please help with our backyard instead.' }), env, provider.fetcher);
  assert.equal(provider.calls[1].headers.get('Idempotency-Key'), provider.calls[3].headers.get('Idempotency-Key'));
  assert.notEqual(provider.calls[1].headers.get('Idempotency-Key'), provider.calls[5].headers.get('Idempotency-Key'));
});

test('provider rejection, missing confirmation, and timeouts cannot report success', async () => {
  for (const options of [{ emailStatus: 500 }, { emailBody: {} }]) {
    const provider = providers(options);
    const response = await handleContact(request(), env, provider.fetcher);
    assert.equal(response.status, 502);
    assert.notEqual((await response.json()).sent, true);
  }
  const response = await handleContact(request(), env, async () => { throw new DOMException('Timeout', 'TimeoutError'); });
  assert.equal(response.status, 502);
});

test('Worker routes only the contact endpoint and preserves static assets', async () => {
  const bindings = { ...env, ASSETS: { fetch: async () => new Response('static page') } };
  assert.equal((await worker.fetch(new Request(`${origin}/api/contact`), bindings)).status, 200);
  assert.equal((await worker.fetch(new Request(`${origin}/api/unknown`), bindings)).status, 404);
  assert.equal(await (await worker.fetch(new Request(`${origin}/about/`), bindings)).text(), 'static page');
});
