import { clientPhotos as photos } from './client-photos';

// Matches reviewed against fixed landmarks and capture times. Camera positions
// differ; the full-photo viewer preserves the original framing of both photos.
function pair(id: string, title: string, category: string, before: keyof typeof photos, after: keyof typeof photos) {
  return { id, title, category, before: photos[before].src, after: photos[after].src, beforeAlt: photos[before].alt, afterAlt: photos[after].alt };
}
export const homeComparisons = [
  pair('front-yard', 'A fresh start out front', 'Landscaping & garden beds', 'p7669', 'p7679'),
  pair('fall-cleanup', 'A yard ready to enjoy again', 'Fall cleanup', 'p6619', 'p6621'),
  { ...pair('front-garden', 'A little room to grow', 'Garden bed refresh', 'p8238', 'p8248'), beforePosition: '50% 35%', afterPosition: '50% 20%' },
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
] as const;
export const galleryPhotos = [
  { id: 'pondside', category: 'lawn-care', title: 'A greener everyday.', ...photos.p3150 },
  { id: 'front-entry', category: 'landscaping', title: 'A welcome you can see.', ...photos.p5253 },
  { id: 'porch', category: 'garden-beds', title: 'Good things at your doorstep.', ...photos.p8288 },
  { id: 'curving-lawn', category: 'lawn-care', title: 'Care around every curve.', ...photos.p7769 },
  { id: 'spring-garden', category: 'garden-beds', title: 'Room for spring to grow.', ...photos.p7562 },
  { id: 'stone-border', category: 'landscaping', title: 'The details bring it together.', ...photos.p8419 },
  { id: 'tree-border', category: 'garden-beds', title: 'A fresh frame for familiar trees.', ...photos.p5267 },
  { id: 'backyard-lawn', category: 'lawn-care', title: 'Your own stretch of green.', ...photos.p7936 },
  { id: 'foundation-bed', category: 'landscaping', title: 'A clean finish, close to home.', ...photos.p8366 },
] as const;
