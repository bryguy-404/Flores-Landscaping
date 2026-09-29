import { serviceContent, type ServiceId } from './services';
import { resolvePhoto, type ResolvedPhoto } from '../lib/cms';
export type ClientPhoto = ResolvedPhoto;
export const servicePhotos = Object.fromEntries(Object.entries(serviceContent).map(([id, content]) => [id, Object.fromEntries(Object.entries(content.photos).filter(([slot]) => slot !== 'homeCard').map(([slot, value]) => [slot, resolvePhoto(value)]))])) as Partial<Record<ServiceId, {hero?:ClientPhoto;detail?:ClientPhoto;preview?:ClientPhoto}>>;
