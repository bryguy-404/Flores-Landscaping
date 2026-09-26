import { clientPhotos as photos } from './client-photos';
import { galleryPhotosById } from './gallery-photos';
export { galleryPhotos } from './gallery-photos';

// Matches reviewed against fixed landmarks and capture times. Camera positions
// differ; the full-photo viewer preserves the original framing of both photos.
function pair(id: string, title: string, category: string, before: keyof typeof photos, after: keyof typeof photos) {
  return { id, title, category, before: photos[before].src, after: photos[after].src, beforeAlt: photos[before].alt, afterAlt: photos[after].alt };
}
export const homeComparisons = [
  pair('front-yard', 'A fresh start out front', 'Landscaping & garden beds', 'p7669', 'p7679'),
  pair('fall-cleanup', 'A yard ready to enjoy again', 'Fall cleanup', 'p6619', 'p6621'),
  { ...pair('deck-garden', 'A little room to grow', 'Garden bed refresh', 'p7992', 'p8008'), beforePosition: '50% 45%' },
];
export const comparisons = [
  pair('evergreen-border', 'A softer edge. A fresh finish.', 'Mulch & garden beds', 'p7644', 'p7651'),
  pair('backyard-border', 'Space for the garden to shine.', 'Landscape cleanup & mulch', 'p7696', 'p7701'),
  pair('brick-path', 'A more welcoming way through.', 'Stone beds & planting', 'p8257', 'p8361'),
];
export const galleryCategories = [
  { id: 'all', label: 'All work' },
  { id: 'lawn-care', label: 'Lawn care' },
  { id: 'landscaping', label: 'Landscaping' },
  { id: 'garden-beds', label: 'Garden beds' },
  { id: 'progress', label: 'Before & in progress' },
] as const;

function galleryPair(id: string, title: string, category: string, beforeId: number, afterId: number) {
  const before = galleryPhotosById['img-' + beforeId];
  const after = galleryPhotosById['img-' + afterId];
  return { id, title, category, before: before.src, after: after.src, beforeAlt: before.alt, afterAlt: after.alt };
}

export const moreComparisons = [
  ...homeComparisons,
  galleryPair('spring-garden', 'A fresh season starts here.', 'Spring garden refresh', 5290, 5292),
  { ...galleryPair('front-garden', 'Room for something beautiful.', 'Garden cleanup & planting', 8238, 8248), beforePosition: '50% 35%', afterPosition: '50% 25%' },
  galleryPair('courtyard-mulch', 'The finishing touch.', 'Courtyard mulch refresh', 8285, 8291),
];
