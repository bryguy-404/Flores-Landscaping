import type { ImageMetadata } from 'astro';
import photo7788 from '../assets/client/tree-lined-lawn.jpg';
import photo7620 from '../assets/landscape-beds.jpg';
import photo8291 from '../assets/client/courtyard-after-mulch.jpg';
import photo8288 from '../assets/client/porch-garden.jpg';
import photo3150 from '../assets/client/pondside-lawn.jpg';
import photo8009 from '../assets/client/evergreen-mulch-island.jpg';
import photo7948 from '../assets/client/shaped-foundation-shrubs.jpg';
import photo8128 from '../assets/client/home-lawn-care.jpg';
import photo8008 from '../assets/backyard.jpg';
import photo8380 from '../assets/client/yellow-flower-border.jpg';
import photo8419 from '../assets/client/side-yard-stone.jpg';
import photo8026 from '../assets/client/crosscut-lawn.jpg';
import photo1915 from '../assets/client/summer-lawn.jpg';
import photo3104 from '../assets/client/gallery/img-3104.jpg';
import photo4354 from '../assets/client/gallery/img-4354.jpg';
import photo5253 from '../assets/client/front-entry-beds.jpg';
import photo5254 from '../assets/client/gallery/img-5254.jpg';
import photo5267 from '../assets/client/red-mulch-border.jpg';
import photo5292 from '../assets/client/spring-bed-refresh.jpg';
import photo6621 from '../assets/client/leaf-cleanup-after.jpg';
import photo7562 from '../assets/client/brick-building-garden.jpg';
import photo7563 from '../assets/client/gallery/img-7563.jpg';
import photo7564 from '../assets/client/gallery/img-7564.jpg';
import photo7604 from '../assets/client/rounded-border-shrubs.jpg';
import photo7608 from '../assets/stone-edging.jpg';
import photo7612 from '../assets/client/shaped-shrub-detail.jpg';
import photo7651 from '../assets/client/evergreen-border-after.jpg';
import photo7676 from '../assets/client/gallery/img-7676.jpg';
import photo7678 from '../assets/client/brick-house-stone-bed.jpg';
import photo7679 from '../assets/client/front-yard-after.jpg';
import photo7680 from '../assets/client/gallery/img-7680.jpg';
import photo7701 from '../assets/client/backyard-border-after.jpg';
import photo7769 from '../assets/client/curving-lawn.jpg';
import photo7925 from '../assets/client/gallery/img-7925.jpg';
import photo7935 from '../assets/client/gallery/img-7935.jpg';
import photo7936 from '../assets/client/backyard-lawn.jpg';
import photo8004 from '../assets/client/gallery/img-8004.jpg';
import photo8005 from '../assets/client/deck-stone-bed.jpg';
import photo8006 from '../assets/client/gallery/img-8006.jpg';
import photo8129 from '../assets/client/gallery/img-8129.jpg';
import photo8248 from '../assets/client/front-garden-after.jpg';
import photo8249 from '../assets/client/gallery/img-8249.jpg';
import photo8361 from '../assets/client/brick-path-after.jpg';
import photo8362 from '../assets/client/gallery/img-8362.jpg';
import photo8364 from '../assets/client/gallery/img-8364.jpg';
import photo8366 from '../assets/client/stone-foundation-bed.jpg';
import photo8369 from '../assets/client/finished-path-garden.jpg';
import photo8289 from '../assets/client/garden-work-in-progress.jpg';
import photo8290 from '../assets/client/fresh-courtyard-mulch.jpg';
import photo8345 from '../assets/client/gallery/img-8345.jpg';
import photo8415 from '../assets/client/curved-stone-entry.jpg';
import photo8416 from '../assets/client/gallery/img-8416.jpg';
import photo8445 from '../assets/client/backyard-mowing-stripes.jpg';
import photo1852 from '../assets/client/ground-preparation.jpg';
import photo5290 from '../assets/client/gallery/img-5290.jpg';
import photo5988 from '../assets/client/gallery/img-5988.jpg';
import photo5997 from '../assets/client/gallery/img-5997.jpg';
import photo6401 from '../assets/client/gallery/img-6401.jpg';
import photo6619 from '../assets/client/leaf-cleanup-before.jpg';
import photo7527 from '../assets/client/new-turf-area.jpg';
import photo7597 from '../assets/client/gallery/img-7597.jpg';
import photo7599 from '../assets/client/gallery/img-7599.jpg';
import photo7601 from '../assets/client/gallery/img-7601.jpg';
import photo7644 from '../assets/client/evergreen-border-before.jpg';
import photo7667 from '../assets/client/gallery/img-7667.jpg';
import photo7668 from '../assets/client/gallery/img-7668.jpg';
import photo7669 from '../assets/client/front-yard-before.jpg';
import photo7671 from '../assets/client/gallery/img-7671.jpg';
import photo7696 from '../assets/client/backyard-border-before.jpg';
import photo7990 from '../assets/client/gallery/img-7990.jpg';
import photo7991 from '../assets/client/gallery/img-7991.jpg';
import photo7992 from '../assets/client/deck-garden-before.jpg';
import photo7993 from '../assets/client/gallery/img-7993.jpg';
import photo8237 from '../assets/client/gallery/img-8237.jpg';
import photo8238 from '../assets/client/front-garden-before.jpg';
import photo8257 from '../assets/client/brick-path-before.jpg';
import photo8258 from '../assets/client/gallery/img-8258.jpg';
import photo8259 from '../assets/client/gallery/img-8259.jpg';
import photo8281 from '../assets/client/welcoming-front-garden.jpg';
import photo8282 from '../assets/client/gallery/img-8282.jpg';
import photo8284 from '../assets/client/gallery/img-8284.jpg';
import photo8285 from '../assets/client/courtyard-garden.jpg';
import photo8407 from '../assets/client/gallery/img-8407.jpg';
import photo8409 from '../assets/client/gallery/img-8409.jpg';

export interface GalleryPhoto { id: string; category: string; stage: 'finished' | 'before' | 'progress' | 'project'; title: string; alt: string; src: ImageMetadata; }

// All 83 client batch photos plus the separately supplied homepage lawn photo.
// Source checksums and reuse mapping: docs/photo-review/gallery-manifest.json.
export const galleryPhotos: GalleryPhoto[] = [
  { id: 'img-7788', category: 'lawn-care', stage: 'finished', title: "A tree-lined lawn", alt: "Long mowing stripes framed by mature trees and a home", src: photo7788 },
  { id: 'img-7620', category: 'landscaping', stage: 'finished', title: "A welcoming front yard", alt: "A green lawn framed by curved stone beds and a brick home", src: photo7620 },
  { id: 'img-8291', category: 'garden-beds', stage: 'finished', title: "Courtyard refreshed", alt: "Fresh mulch in garden beds around a sunny courtyard lawn", src: photo8291 },
  { id: 'img-8288', category: 'garden-beds', stage: 'finished', title: "Good things at your doorstep", alt: "Fresh dark mulch and flowering plants along a white porch", src: photo8288 },
  { id: 'img-3150', category: 'lawn-care', stage: 'finished', title: "Pondside lawn", alt: "Freshly mowed lawn overlooking a neighborhood pond", src: photo3150 },
  { id: 'img-8009', category: 'garden-beds', stage: 'finished', title: "An island of green", alt: "Evergreen shrubs surrounded by a curved red mulch bed", src: photo8009 },
  { id: 'img-7948', category: 'landscaping', stage: 'finished', title: "A little shaping", alt: "Rounded and box-shaped shrubs beside a brick house", src: photo7948 },
  { id: 'img-8128', category: 'lawn-care', stage: 'finished', title: "A lawn to come home to", alt: "Fresh mowing stripes across a lawn in front of a modern home", src: photo8128 },
  { id: 'img-8008', category: 'landscaping', stage: 'finished', title: "A backyard to enjoy", alt: "A backyard deck framed by stone beds and spaced shrubs", src: photo8008 },
  { id: 'img-8380', category: 'garden-beds', stage: 'finished', title: "Color along the border", alt: "Yellow flowers and rounded shrubs in a fresh dark mulch bed", src: photo8380 },
  { id: 'img-8419', category: 'landscaping', stage: 'finished', title: "The details bring it together", alt: "A tidy stone border around a side yard beside brown siding", src: photo8419 },
  { id: 'img-8026', category: 'lawn-care', stage: 'finished', title: "Fresh crosscut lawn", alt: "Crosshatched mowing lines across a green backyard", src: photo8026 },
  { id: 'img-1915', category: 'lawn-care', stage: 'finished', title: "Summer lawn", alt: "Fresh mowing stripes on a lawn beneath mature trees", src: photo1915 },
  { id: 'img-3104', category: 'lawn-care', stage: 'finished', title: "A stretch of green", alt: "Mowing stripes beside a split-rail fence and evergreen trees", src: photo3104 },
  { id: 'img-4354', category: 'lawn-care', stage: 'finished', title: "Lawn care in the sunshine", alt: "Mowing stripes across a sunny lawn, photographed from a mower", src: photo4354 },
  { id: 'img-5253', category: 'garden-beds', stage: 'finished', title: "A welcoming entrance", alt: "Dark mulch and trimmed shrubs beside a light-sided home", src: photo5253 },
  { id: 'img-5254', category: 'garden-beds', stage: 'finished', title: "Front garden details", alt: "Neat mulch beds and shrubs around a front porch", src: photo5254 },
  { id: 'img-5267', category: 'garden-beds', stage: 'finished', title: "Around the trees", alt: "A long red mulch bed with stone edging beneath mature trees", src: photo5267 },
  { id: 'img-5292', category: 'garden-beds', stage: 'finished', title: "Spring garden refreshed", alt: "Fresh red mulch around trees and shrubs beside a green spring lawn", src: photo5292 },
  { id: 'img-6621', category: 'lawn-care', stage: 'finished', title: "Room to enjoy again", alt: "A cleared backyard lawn around a large tree after leaf cleanup", src: photo6621 },
  { id: 'img-7562', category: 'garden-beds', stage: 'finished', title: "Spring planting beds", alt: "Fresh dark mulch and green plants beside an arched brick-building window", src: photo7562 },
  { id: 'img-7563', category: 'garden-beds', stage: 'finished', title: "A garden in bloom", alt: "Spring flowers and green plants in a mulched bed beside an outbuilding", src: photo7563 },
  { id: 'img-7564', category: 'garden-beds', stage: 'finished', title: "Brick-building garden", alt: "A mulched planting bed with spring growth beside a brick building", src: photo7564 },
  { id: 'img-7604', category: 'garden-beds', stage: 'finished', title: "A fresh stone finish", alt: "Rounded shrubs above a dark stone bed with a defined edge", src: photo7604 },
  { id: 'img-7608', category: 'garden-beds', stage: 'finished', title: "Curves and clean edges", alt: "Neatly shaped shrubs surrounded by dark stone and curved edging", src: photo7608 },
  { id: 'img-7612', category: 'landscaping', stage: 'finished', title: "Shaped shrubs", alt: "Trimmed shrubs and stone beds beside a brick home", src: photo7612 },
  { id: 'img-7651', category: 'garden-beds', stage: 'finished', title: "Evergreen border refreshed", alt: "Fresh mulch and a curved edge beneath an evergreen beside a fence", src: photo7651 },
  { id: 'img-7676', category: 'landscaping', stage: 'finished', title: "A clean front entrance", alt: "Light stone beds and small shrubs along a brick home's entrance", src: photo7676 },
  { id: 'img-7678', category: 'landscaping', stage: 'finished', title: "Front garden renewed", alt: "Light stone beds and spaced shrubs below brick-house windows", src: photo7678 },
  { id: 'img-7679', category: 'landscaping', stage: 'finished', title: "A fresh start out front", alt: "The front of a brick home after stone beds and shrubs were installed", src: photo7679 },
  { id: 'img-7680', category: 'landscaping', stage: 'finished', title: "Side garden renewed", alt: "A light stone bed beneath a side window of a brick home", src: photo7680 },
  { id: 'img-7701', category: 'garden-beds', stage: 'finished', title: "Backyard border refreshed", alt: "Fresh dark mulch beneath small trees along a backyard fence", src: photo7701 },
  { id: 'img-7769', category: 'lawn-care', stage: 'finished', title: "Care around every curve", alt: "Curved mowing stripes across a street-side lawn", src: photo7769 },
  { id: 'img-7925', category: 'lawn-care', stage: 'finished', title: "Lawn stripes", alt: "Parallel mowing stripes beside a sidewalk, photographed at an angle", src: photo7925 },
  { id: 'img-7935', category: 'lawn-care', stage: 'finished', title: "A greener backyard", alt: "Fresh mowing stripes through a sunny backyard with mature trees", src: photo7935 },
  { id: 'img-7936', category: 'lawn-care', stage: 'finished', title: "Open green space", alt: "Even mowing lines across an open backyard lawn", src: photo7936 },
  { id: 'img-8004', category: 'landscaping', stage: 'finished', title: "A fresh edge by the deck", alt: "Small shrubs and stone beds beside house siding and a deck", src: photo8004 },
  { id: 'img-8005', category: 'landscaping', stage: 'finished', title: "Room around the deck", alt: "Curved stone beds and small shrubs alongside a raised deck", src: photo8005 },
  { id: 'img-8006', category: 'landscaping', stage: 'finished', title: "Deck garden details", alt: "A curved stone border around the corner of a raised deck", src: photo8006 },
  { id: 'img-8129', category: 'lawn-care', stage: 'finished', title: "Lawn care from another angle", alt: "Mowing stripes across a broad lawn, photographed at an angle", src: photo8129 },
  { id: 'img-8248', category: 'garden-beds', stage: 'finished', title: "A little room to grow", alt: "Dark mulch, small shrubs, and a stone border below a blue-shuttered window", src: photo8248 },
  { id: 'img-8249', category: 'garden-beds', stage: 'finished', title: "A welcoming entry garden", alt: "Small shrubs and fresh mulch beside a house entrance and stone edging", src: photo8249 },
  { id: 'img-8361', category: 'garden-beds', stage: 'finished', title: "A clearer way through", alt: "A refreshed stone bed and small plants beside a curved brick path", src: photo8361 },
  { id: 'img-8362', category: 'garden-beds', stage: 'finished', title: "Around the garden path", alt: "A curved stone bed with small plants below a wooden enclosure", src: photo8362 },
  { id: 'img-8364', category: 'garden-beds', stage: 'finished', title: "Path-side details", alt: "Fresh stone beds and shrubs between brick paving and a fence", src: photo8364 },
  { id: 'img-8366', category: 'landscaping', stage: 'finished', title: "A clean finish close to home", alt: "A curved stone bed and small shrubs below a house window", src: photo8366 },
  { id: 'img-8369', category: 'garden-beds', stage: 'finished', title: "The finished garden path", alt: "A tidy planted stone bed beside a curved brick path", src: photo8369 },
  { id: 'img-8289', category: 'garden-beds', stage: 'finished', title: "Fresh mulch by the porch", alt: "Fresh dark mulch and flowers beside a stone porch, with a person in the background", src: photo8289 },
  { id: 'img-8290', category: 'garden-beds', stage: 'finished', title: "A fresh courtyard border", alt: "Fresh dark mulch around courtyard trees and shrubs", src: photo8290 },
  { id: 'img-8345', category: 'lawn-care', stage: 'finished', title: "Fresh stripes by the walk", alt: "Freshly mowed lawn beside a sidewalk under a blue sky", src: photo8345 },
  { id: 'img-8415', category: 'landscaping', stage: 'finished', title: "Curves around the entry", alt: "A finished curved stone bed around a brick entryway", src: photo8415 },
  { id: 'img-8416', category: 'landscaping', stage: 'finished', title: "A neat side border", alt: "Fresh stone beds along brown house siding and timber posts", src: photo8416 },
  { id: 'img-8445', category: 'lawn-care', stage: 'finished', title: "Fresh backyard stripes", alt: "Fresh mowing stripes across a green backyard beside homes and a wooden fence", src: photo8445 },
  { id: 'img-1852', category: 'landscaping', stage: 'progress', title: "Ground preparation", alt: "Loose soil, a wheelbarrow, and tools beside a lawn under preparation", src: photo1852 },
  { id: 'img-5290', category: 'garden-beds', stage: 'before', title: "Spring garden", alt: "Leaves and sparse ground cover in a curved bed beside a house before refresh", src: photo5290 },
  { id: 'img-5988', category: 'landscaping', stage: 'progress', title: "Around the deck", alt: "Straw-covered ground, stone edging, and a wheelbarrow beside a raised deck", src: photo5988 },
  { id: 'img-5997', category: 'landscaping', stage: 'progress', title: "Deck-side ground work", alt: "A stone border and straw-covered ground below a raised wooden deck", src: photo5997 },
  { id: 'img-6401', category: 'landscaping', stage: 'progress', title: "A yard taking shape", alt: "Straw-covered ground across a yard during landscape work", src: photo6401 },
  { id: 'img-6619', category: 'lawn-care', stage: 'before', title: "Fall cleanup", alt: "Fallen leaves covering a backyard around a large tree", src: photo6619 },
  { id: 'img-7527', category: 'landscaping', stage: 'progress', title: "New turf", alt: "A newly laid patch of turf beside trees and work equipment", src: photo7527 },
  { id: 'img-7597', category: 'landscaping', stage: 'progress', title: "Shaping a border", alt: "Loose edging stones and a marked bed outline beside rounded shrubs", src: photo7597 },
  { id: 'img-7599', category: 'garden-beds', stage: 'before', title: "Shrub border", alt: "Rounded shrubs in a red mulch bed before a stone-bed refresh", src: photo7599 },
  { id: 'img-7601', category: 'garden-beds', stage: 'before', title: "Side garden", alt: "A red mulch bed beneath shrubs along house siding before refresh", src: photo7601 },
  { id: 'img-7644', category: 'garden-beds', stage: 'before', title: "Evergreen border", alt: "Thin ground cover beneath an evergreen beside a wooden and white fence", src: photo7644 },
  { id: 'img-7667', category: 'landscaping', stage: 'before', title: "Front bed starting point", alt: "Overgrown plants below the windows of a single-story brick home", src: photo7667 },
  { id: 'img-7668', category: 'landscaping', stage: 'before', title: "Front entrance starting point", alt: "Tall plants and untrimmed growth along a brick home's front entrance", src: photo7668 },
  { id: 'img-7669', category: 'landscaping', stage: 'before', title: "Front yard starting point", alt: "Overgrown planting beds across the front of a brick home", src: photo7669 },
  { id: 'img-7671', category: 'landscaping', stage: 'before', title: "Side bed starting point", alt: "Tall grass and growth beneath a side window of a brick home", src: photo7671 },
  { id: 'img-7696', category: 'garden-beds', stage: 'before', title: "Backyard border", alt: "Overgrown planting areas along a fence with small trees and a garden statue", src: photo7696 },
  { id: 'img-7990', category: 'landscaping', stage: 'project', title: "Evergreen garden detail", alt: "Tall evergreens beside a wooden fence and neighboring homes", src: photo7990 },
  { id: 'img-7991', category: 'landscaping', stage: 'before', title: "Deck garden starting point", alt: "Large shrubs covering the edge of a raised backyard deck", src: photo7991 },
  { id: 'img-7992', category: 'landscaping', stage: 'before', title: "A garden ready for change", alt: "Overgrown shrubs hiding backyard deck railings beside a house", src: photo7992 },
  { id: 'img-7993', category: 'landscaping', stage: 'before', title: "Deck-side shrubs", alt: "Large shrubs beside a house and backyard deck before the garden refresh", src: photo7993 },
  { id: 'img-8237', category: 'garden-beds', stage: 'before', title: "Entry garden starting point", alt: "Overgrown planting bed beside the entrance of a blue-shuttered house", src: photo8237 },
  { id: 'img-8238', category: 'garden-beds', stage: 'before', title: "Front garden starting point", alt: "Overgrown bed below a blue-shuttered window beside a chain-link fence", src: photo8238 },
  { id: 'img-8257', category: 'garden-beds', stage: 'before', title: "Brick-path garden", alt: "Overgrown plants beside a curved brick path and wooden enclosure", src: photo8257 },
  { id: 'img-8258', category: 'garden-beds', stage: 'before', title: "Path-side starting point", alt: "Weeds and plants crowding a brick path beside a wooden fence", src: photo8258 },
  { id: 'img-8259', category: 'garden-beds', stage: 'before', title: "Foundation garden starting point", alt: "Overgrown plants between a brick path and house siding", src: photo8259 },
  { id: 'img-8281', category: 'garden-beds', stage: 'before', title: "Porch bed before mulch", alt: "Flowering plants beside a stone porch before the mulch refresh", src: photo8281 },
  { id: 'img-8282', category: 'garden-beds', stage: 'before', title: "Porch garden starting point", alt: "Plants beside a white front porch before the mulch refresh", src: photo8282 },
  { id: 'img-8284', category: 'garden-beds', stage: 'before', title: "Courtyard border starting point", alt: "A planted curved bed beside a courtyard before fresh mulch", src: photo8284 },
  { id: 'img-8285', category: 'garden-beds', stage: 'before', title: "Courtyard before mulch", alt: "A green courtyard lawn and surrounding beds before the mulch refresh", src: photo8285 },
  { id: 'img-8407', category: 'landscaping', stage: 'progress', title: "Preparing a new border", alt: "Lifted edging and a dug border around a brick entryway during preparation", src: photo8407 },
  { id: 'img-8409', category: 'landscaping', stage: 'progress', title: "Side-bed preparation", alt: "A garden bed along brown house siding during border preparation", src: photo8409 },
];

export const galleryPhotosById = Object.fromEntries(galleryPhotos.map(photo => [photo.id, photo]));
