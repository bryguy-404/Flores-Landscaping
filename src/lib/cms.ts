import type { ImageMetadata } from 'astro';
import businessContent from '../content/business.json';

export const business = businessContent;
export const serviceAreas = Object.values(business.communities);
const phoneLink = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return `tel:+${digits.length === 10 ? '1' : ''}${digits}`;
};
export const phoneHref = phoneLink(business.primaryPhone);
export const secondaryPhoneHref = phoneLink(business.secondaryPhone);
export const smsHref = phoneHref.replace('tel:', 'sms:');
export const emailHref = `mailto:${business.email}`;
const tokens: Record<string, string> = {
  businessName: business.name, phone: business.primaryPhone,
  secondaryPhone: business.secondaryPhone, email: business.email,
  experienceYears: business.experienceYears, city: business.city,
  communitiesAmp: serviceAreas.slice(0, -1).join(', ') + ' & ' + serviceAreas.at(-1),
  state: business.state, cityUpper: business.city.toUpperCase(), areaDots: serviceAreas.join(' · '),
  communities: new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' }).format(serviceAreas),
};

/** Plain text only. Astro escapes this output; the CMS never supplies HTML. */
export function readContent<T>(value: T): T {
  if (typeof value === 'string') return value.replace(/\{\{(\w+)\}\}/g, (match, name) => tokens[name] ?? match) as T;
  if (Array.isArray(value)) return value.map(readContent) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, readContent(child)])) as T;
  return value;
}

export function safeLink(value: string): string {
  if (/^(\/(?!\/)|#|https?:\/\/|mailto:|tel:|sms:)/i.test(value) && !/[\s\\<>]/.test(value)) return value;
  throw new Error(`Invalid CMS link: ${value}. Use a site path, anchor, or http(s), mailto, tel or sms URL.`);
}

export interface CmsPhoto { image: string; alt: string; position: string; mobilePosition: string; }
export interface ResolvedPhoto { src: ImageMetadata; alt: string; position: string; mobilePosition: string; }
// Media stays in src/assets so every replacement is optimized by Astro at build time.
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpg,jpeg,png,webp,avif}', { eager: true });
export function cropPosition(value: string): string {
  if (!/^(100|\d{1,2})(\.\d+)?% (100|\d{1,2})(\.\d+)?%$/.test(value) || value.split(' ').some(part => parseFloat(part) > 100)) {
    throw new Error(`Invalid photo crop: ${value}. Use two percentages between 0% and 100%.`);
  }
  return value;
}
export function resolvePhoto(photo: CmsPhoto): ResolvedPhoto {
  const image = images[photo.image];
  if (!image) throw new Error(`CMS photo does not exist: ${photo.image}. Upload/select an image in Pages CMS.`);
  return { src: image.default, alt: photo.alt, position: cropPosition(photo.position), mobilePosition: cropPosition(photo.mobilePosition) };
}
