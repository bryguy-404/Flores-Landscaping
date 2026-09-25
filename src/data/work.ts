// These are photo slots for client review, not claims about completed projects.
// Replace them with the client's approved photos and matching project details.
export const comparisons = [
  { id: 'landscape-refresh', title: 'A landscape refresh', category: 'Landscaping' },
  { id: 'garden-bed-refresh', title: 'A fresh look for the beds', category: 'Mulch & planting' },
  { id: 'hedge-shaping', title: 'A little shape. A big change.', category: 'Trimming' },
] as const;

export const galleryCategories = [
  { id: 'all', label: 'All work' },
  { id: 'lawn-care', label: 'Lawn care' },
  { id: 'landscaping', label: 'Landscaping' },
  { id: 'garden-beds', label: 'Garden beds' },
  { id: 'trimming', label: 'Trimming' },
] as const;

export const gallerySlots = [
  { id: 'lawn', category: 'lawn-care', title: 'A greener everyday.', photo: 'A freshly cared-for lawn photo here' },
  { id: 'front-yard', category: 'landscaping', title: 'A welcoming first impression.', photo: 'A finished front-yard landscape photo here' },
  { id: 'mulch', category: 'garden-beds', title: 'Beautiful down to the details.', photo: 'A fresh mulch and garden bed photo here' },
  { id: 'planting', category: 'garden-beds', title: 'A little room for color.', photo: 'A flower or planting detail photo here' },
  { id: 'hedges', category: 'trimming', title: 'Good care. Clean lines.', photo: 'A neatly trimmed hedge photo here' },
  { id: 'backyard', category: 'landscaping', title: 'Your own corner of the outdoors.', photo: 'A finished backyard landscape photo here' },
] satisfies { id: string; category: Exclude<(typeof galleryCategories)[number]['id'], 'all'>; title: string; photo: string }[];
