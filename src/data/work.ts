import raw from '../content/comparisons.json';
import { readContent, resolvePhoto } from '../lib/cms';
export { galleryPhotos } from './gallery-photos';
const content=readContent(raw);
function pair(id:keyof typeof content) {
 const item=content[id], before=resolvePhoto(item.before), after=resolvePhoto(item.after);
 return {id,title:item.title,category:item.category,before:before.src,after:after.src,beforeAlt:before.alt,afterAlt:after.alt,beforePosition:before.position,afterPosition:after.position,beforeMobilePosition:before.mobilePosition,afterMobilePosition:after.mobilePosition};
}
export const homeComparisons = ["front-yard","fall-cleanup","deck-garden"].map(id=>pair(id as keyof typeof content));
export const comparisons = ["evergreen-border","backyard-border","brick-path"].map(id=>pair(id as keyof typeof content));
export const moreComparisons = ["front-yard","fall-cleanup","deck-garden","spring-garden","front-garden","courtyard-mulch"].map(id=>pair(id as keyof typeof content));
export const galleryCategories = [
  {
    "id": "all",
    "label": "All work"
  },
  {
    "id": "lawn-care",
    "label": "Lawn care"
  },
  {
    "id": "landscaping",
    "label": "Landscaping"
  },
  {
    "id": "garden-beds",
    "label": "Garden beds"
  },
  {
    "id": "progress",
    "label": "Before & in progress"
  }
] as const;
