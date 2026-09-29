import { Leaf, TreePine, Flower2, Sprout, Shovel, Scissors, Snowflake } from '@lucide/astro';
import { readContent, resolvePhoto } from '../lib/cms';
import raw0 from '../content/services/lawn-care.json';
import raw1 from '../content/services/landscaping.json';
import raw2 from '../content/services/mulch-planting.json';
import raw3 from '../content/services/sod-installation.json';
import raw4 from '../content/services/seasonal-cleanup.json';
import raw5 from '../content/services/trimming.json';
import raw6 from '../content/services/snow-plowing.json';

// Routes, order and icons belong to the site, outside the editor.
export const serviceContent = {
  'lawn-care': readContent(raw0),
  'landscaping': readContent(raw1),
  'mulch-planting': readContent(raw2),
  'sod-installation': readContent(raw3),
  'seasonal-cleanup': readContent(raw4),
  'trimming': readContent(raw5),
  'snow-plowing': readContent(raw6),
};
export type ServiceId = keyof typeof serviceContent;
const routes = [{id: 'lawn-care', icon: Leaf},
  {id: 'landscaping', icon: TreePine},
  {id: 'mulch-planting', icon: Flower2},
  {id: 'sod-installation', icon: Sprout},
  {id: 'seasonal-cleanup', icon: Shovel},
  {id: 'trimming', icon: Scissors},
  {id: 'snow-plowing', icon: Snowflake}] as const;
export const serviceOfferings = routes.map(({id, icon}) => {
  const content = serviceContent[id];
  return { id, icon, ...content.overview, highlights: Object.values(content.overview.highlights), estimateLink: content.links.estimate, homePhoto: resolvePhoto(content.photos.homeCard) };
});
