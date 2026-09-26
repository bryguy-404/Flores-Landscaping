import photo7669 from '../assets/client/front-yard-before.jpg';
import photo7679 from '../assets/client/front-yard-after.jpg';
import photo6619 from '../assets/client/leaf-cleanup-before.jpg';
import photo6621 from '../assets/client/leaf-cleanup-after.jpg';
import photo7992 from '../assets/client/deck-garden-before.jpg';
import photo8008 from '../assets/backyard.jpg';
import photo7644 from '../assets/client/evergreen-border-before.jpg';
import photo7651 from '../assets/client/evergreen-border-after.jpg';
import photo7696 from '../assets/client/backyard-border-before.jpg';
import photo7701 from '../assets/client/backyard-border-after.jpg';
import photo8257 from '../assets/client/brick-path-before.jpg';
import photo8361 from '../assets/client/brick-path-after.jpg';
import photo3150 from '../assets/client/pondside-lawn.jpg';
import photo5253 from '../assets/client/front-entry-beds.jpg';
import photo5267 from '../assets/client/red-mulch-border.jpg';
import photo7562 from '../assets/client/brick-building-garden.jpg';
import photo7769 from '../assets/client/curving-lawn.jpg';
import photo7936 from '../assets/client/backyard-lawn.jpg';
import photo8288 from '../assets/client/porch-garden.jpg';
import photo8366 from '../assets/client/stone-foundation-bed.jpg';
import photo8419 from '../assets/client/side-yard-stone.jpg';
import photo7788 from '../assets/client/tree-lined-lawn.jpg';
import photo8026 from '../assets/client/crosscut-lawn.jpg';
import photo8415 from '../assets/client/curved-stone-entry.jpg';
import photo8005 from '../assets/client/deck-stone-bed.jpg';
import photo8380 from '../assets/client/yellow-flower-border.jpg';
import photo8009 from '../assets/client/evergreen-mulch-island.jpg';
import photo7948 from '../assets/client/shaped-foundation-shrubs.jpg';
import photo5292 from '../assets/client/spring-bed-refresh.jpg';
import photo7527 from '../assets/client/new-turf-area.jpg';
import photo8291 from '../assets/client/courtyard-after-mulch.jpg';
import photo1915 from '../assets/client/summer-lawn.jpg';
import photo7678 from '../assets/client/brick-house-stone-bed.jpg';
import photo8290 from '../assets/client/fresh-courtyard-mulch.jpg';
import photo7604 from '../assets/client/rounded-border-shrubs.jpg';
import photo8289 from '../assets/client/garden-work-in-progress.jpg';
import photo8281 from '../assets/client/welcoming-front-garden.jpg';
import photo1852 from '../assets/client/ground-preparation.jpg';
import photo8369 from '../assets/client/finished-path-garden.jpg';
import photo7612 from '../assets/client/shaped-shrub-detail.jpg';
import sodPreview from '../assets/sod-installation.jpg';
import type { ImageMetadata } from 'astro';
import type { serviceOfferings } from './services';

export interface ClientPhoto { src: ImageMetadata; alt: string; position?: string; }
// Client source filenames and placements are recorded in docs/photo-review/.
// Existing-site sources are in docs/image-sources.json. Reused previews share assets.
export const clientPhotos = {
  p7669: { src: photo7669, alt: "Overgrown beds along a single-story brick home" },
  p7679: { src: photo7679, alt: "Stone beds and spaced shrubs along the same brick home" },
  p6619: { src: photo6619, alt: "Fallen leaves covering a backyard around a large tree" },
  p6621: { src: photo6621, alt: "The same backyard lawn after fallen leaves have been cleared" },
  p7992: { src: photo7992, alt: "Large overgrown shrubs hiding the railing of a backyard deck" },
  p8008: { src: photo8008, alt: "The same backyard deck with a curved stone bed and small, spaced shrubs" },
  p7644: { src: photo7644, alt: "Thin ground cover beneath an evergreen beside a wooden and white fence" },
  p7651: { src: photo7651, alt: "Fresh mulch and a defined curved border around the same evergreen" },
  p7696: { src: photo7696, alt: "Overgrown planting area along a backyard fence" },
  p7701: { src: photo7701, alt: "The same backyard trees surrounded by a clean, dark mulch bed" },
  p8257: { src: photo8257, alt: "Weeds and overgrown plants beside a curved brick path" },
  p8361: { src: photo8361, alt: "The same brick path beside a refreshed stone bed and small plants" },
  p3150: { src: photo3150, alt: "Fresh mowing stripes on a lawn beside a pond" },
  p5253: { src: photo5253, alt: "Dark garden beds and trimmed shrubs at a light-colored home" },
  p5267: { src: photo5267, alt: "A long red mulch bed with stone edging beneath mature trees" },
  p7562: { src: photo7562, alt: "Fresh dark mulch and spring plants beside a brick building" },
  p7769: { src: photo7769, alt: "Curved mowing stripes along a street-side lawn" },
  p7936: { src: photo7936, alt: "Even mowing lines across a backyard lawn" },
  p8288: { src: photo8288, alt: "Dark mulch and flowering shrubs along a white porch" },
  p8366: { src: photo8366, alt: "A curved stone bed with small shrubs below a house window" },
  p8419: { src: photo8419, alt: "A tidy stone border along brown siding" },
  p7788: { src: photo7788, alt: "Long mowing stripes framed by mature trees" },
  p8026: { src: photo8026, alt: "Crosshatched mowing lines across a green backyard" },
  p8415: { src: photo8415, alt: "A curved stone bed around a brick entryway" },
  p8005: { src: photo8005, alt: "Stone beds and small shrubs along a raised deck" },
  p8380: { src: photo8380, alt: "Yellow flowers and rounded shrubs in a fresh dark mulch bed" },
  p8009: { src: photo8009, alt: "An island of evergreen shrubs surrounded by red mulch" },
  p7948: { src: photo7948, alt: "Rounded and box-shaped shrubs beside a brick home" },
  p5292: { src: photo5292, alt: "A refreshed mulch bed around trees and shrubs in spring" },
  p7527: { src: photo7527, alt: "A newly laid patch of turf beside mature trees with work equipment nearby" },
  p8291: { src: photo8291, alt: "Fresh dark mulch around courtyard trees and shrubs bordering a green lawn" },
  p1915: { src: photo1915, alt: "Parallel mowing stripes across a summer lawn", position: '50% 25%' },
  p7678: { src: photo7678, alt: "Light-colored stone beds and small shrubs along a brick house" },
  p8290: { src: photo8290, alt: "Fresh dark mulch around courtyard trees and shrubs" },
  p7604: { src: photo7604, alt: "Rounded shrubs beside a freshly edged stone garden bed" },
  p8289: { src: photo8289, alt: "A person working near newly mulched beds beside a porch" },
  p8281: { src: photo8281, alt: "Flowering plants and dark mulch beside a welcoming front walkway" },
  p1852: { src: photo1852, alt: "Loose soil, a wheelbarrow, and lawn tools beside an area being prepared", position: '50% 65%' },
  p8369: { src: photo8369, alt: "A tidy planted stone bed beside a curved brick path", position: '50% 60%' },
  p7612: { src: photo7612, alt: "Neatly shaped shrubs along a stone bed beside a brick home", position: '50% 40%' },
} satisfies Record<string, ClientPhoto>;

type ServiceId = (typeof serviceOfferings)[number]['id'];
export const servicePhotos: Partial<Record<ServiceId, { hero?: ClientPhoto; detail?: ClientPhoto; preview?: ClientPhoto }>> = {
  'lawn-care': { hero: clientPhotos.p7788, detail: clientPhotos.p8026, preview: clientPhotos.p1915 },
  landscaping: { hero: clientPhotos.p8415, detail: clientPhotos.p8005, preview: clientPhotos.p7678 },
  'mulch-planting': { hero: clientPhotos.p8380, detail: clientPhotos.p8009, preview: clientPhotos.p8290 },
  trimming: { hero: clientPhotos.p7948, detail: clientPhotos.p7612, preview: clientPhotos.p7604 },
  'seasonal-cleanup': { hero: clientPhotos.p5292, detail: clientPhotos.p8369, preview: clientPhotos.p5292 },
  'sod-installation': { hero: clientPhotos.p7527, detail: clientPhotos.p1852, preview: { src: sodPreview, alt: 'Newly installed sod alongside a residential walkway', position: '50% 65%' } },
};
