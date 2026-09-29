import { readContent, resolvePhoto } from '../lib/cms';
import raw0 from '../content/gallery-01.json';
import raw1 from '../content/gallery-02.json';
import raw2 from '../content/gallery-03.json';
import raw3 from '../content/gallery-04.json';
import raw4 from '../content/gallery-05.json';
import raw5 from '../content/gallery-06.json';
import raw6 from '../content/gallery-07.json';
const content = readContent({...raw0,...raw1,...raw2,...raw3,...raw4,...raw5,...raw6});
const slots = [
  {
    "id": "img-7788",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-7620",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-8291",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-8288",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-3150",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-8009",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-7948",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-8128",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-8008",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-8380",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-8419",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-8026",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-1915",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-3104",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-4354",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-5253",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-5254",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-5267",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-5292",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-6621",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-7562",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-7563",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-7564",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-7604",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-7608",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-7612",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-7651",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-7676",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-7678",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-7679",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-7680",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-7701",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-7769",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-7925",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-7935",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-7936",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-8004",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-8005",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-8006",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-8129",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-8248",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-8249",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-8361",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-8362",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-8364",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-8366",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-8369",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-8289",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-8290",
    "category": "garden-beds",
    "stage": "finished"
  },
  {
    "id": "img-8345",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-8415",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-8416",
    "category": "landscaping",
    "stage": "finished"
  },
  {
    "id": "img-8445",
    "category": "lawn-care",
    "stage": "finished"
  },
  {
    "id": "img-1852",
    "category": "landscaping",
    "stage": "progress"
  },
  {
    "id": "img-5290",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-5988",
    "category": "landscaping",
    "stage": "progress"
  },
  {
    "id": "img-5997",
    "category": "landscaping",
    "stage": "progress"
  },
  {
    "id": "img-6401",
    "category": "landscaping",
    "stage": "progress"
  },
  {
    "id": "img-6619",
    "category": "lawn-care",
    "stage": "before"
  },
  {
    "id": "img-7527",
    "category": "landscaping",
    "stage": "progress"
  },
  {
    "id": "img-7597",
    "category": "landscaping",
    "stage": "progress"
  },
  {
    "id": "img-7599",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-7601",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-7644",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-7667",
    "category": "landscaping",
    "stage": "before"
  },
  {
    "id": "img-7668",
    "category": "landscaping",
    "stage": "before"
  },
  {
    "id": "img-7669",
    "category": "landscaping",
    "stage": "before"
  },
  {
    "id": "img-7671",
    "category": "landscaping",
    "stage": "before"
  },
  {
    "id": "img-7696",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-7990",
    "category": "landscaping",
    "stage": "project"
  },
  {
    "id": "img-7991",
    "category": "landscaping",
    "stage": "before"
  },
  {
    "id": "img-7992",
    "category": "landscaping",
    "stage": "before"
  },
  {
    "id": "img-7993",
    "category": "landscaping",
    "stage": "before"
  },
  {
    "id": "img-8237",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-8238",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-8257",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-8258",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-8259",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-8281",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-8282",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-8284",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-8285",
    "category": "garden-beds",
    "stage": "before"
  },
  {
    "id": "img-8407",
    "category": "landscaping",
    "stage": "progress"
  },
  {
    "id": "img-8409",
    "category": "landscaping",
    "stage": "progress"
  }
] as const;
export const galleryPhotos = slots.map(slot => ({...slot, title: content[slot.id].title, ...resolvePhoto(content[slot.id].photo)}));
export const galleryPhotosById = Object.fromEntries(galleryPhotos.map(photo => [photo.id, photo]));
