import raw from '../content/videos.json';
import {readContent,resolvePhoto} from '../lib/cms';
const content=readContent(raw);
const slots=[
  {
    "id": "7804",
    "duration": "0:07"
  },
  {
    "id": "5880",
    "duration": "0:07"
  },
  {
    "id": "6622",
    "duration": "0:02"
  },
  {
    "id": "6879",
    "duration": "0:11"
  },
  {
    "id": "7712",
    "duration": "0:08"
  },
  {
    "id": "7713",
    "duration": "0:06"
  },
  {
    "id": "5903",
    "duration": "0:04"
  },
  {
    "id": "6618",
    "duration": "0:03"
  }
] as const;
export const workVideos=slots.map(slot=>{const v=content[('video'+slot.id) as keyof typeof content];const image=resolvePhoto(v.poster);return {...slot,...v,src:v.link,poster:image.src,posterAlt:image.alt,position:image.position,mobilePosition:image.mobilePosition};});
