import { Leaf, TreePine, Flower2, Sprout, Shovel, Scissors, Snowflake } from '@lucide/astro';

// Offerings are based on the existing Flores website. Mulch and planting share
// one entry, matching the approved homepage. Photos will be selected later.
export const serviceOfferings = [
  {
    id: 'lawn-care', title: 'Lawn Care', icon: Leaf,
    summary: 'Fresh cuts, crisp edges, and a lawn you’ll love coming home to.',
    description: 'A well-kept lawn makes the whole property feel cared for. From a fresh cut to a tidy finish, we bring a little extra pride to your everyday outdoor space.',
    highlights: ['Lawn mowing', 'Clean edges', 'Ongoing lawn care'],
    photo: 'A freshly mowed lawn photo here',
    photoDetail: 'Wide lawn view with clean mowing lines and tidy edges.',
    caption: 'A greener everyday.',
  },
  {
    id: 'landscaping', title: 'Landscaping', icon: TreePine,
    summary: 'Thoughtful landscapes that bring out the best in your property.',
    description: 'Give your outdoor space a fresh perspective. We help bring together planting areas, thoughtful details, and landscape maintenance for a property that feels welcoming from the moment you arrive.',
    highlights: ['Landscape design', 'Garden beds', 'Landscape maintenance'],
    photo: 'A finished landscaping project photo here',
    photoDetail: 'A complete view of the yard, planting beds, and finished details.',
    caption: 'A welcome you can see.',
  },
  {
    id: 'mulch-planting', title: 'Mulch & Planting', icon: Flower2,
    summary: 'A fresh layer of mulch and the right plants make all the difference.',
    description: 'Bring color, texture, and a cared-for finish to your garden beds. Fresh mulch and thoughtfully placed plants can give familiar outdoor spaces a whole new feel.',
    highlights: ['Fresh mulch', 'Flowers & plants', 'Garden bed refreshes'],
    photo: 'A mulch and planting photo here',
    photoDetail: 'Freshly mulched beds with flowers or newly planted shrubs.',
    caption: 'Beautiful down to the details.',
  },
  {
    id: 'sod-installation', title: 'Sod Installation', icon: Sprout,
    summary: 'Give your outdoor space a fresh start with a new lawn.',
    description: 'Sometimes a yard is ready for a new beginning. Sod installation brings a fresh layer of green to your outdoor space. Tell us about your property and we’ll talk through the next steps.',
    highlights: ['New sod', 'Fresh lawn spaces'],
    photo: 'A sod installation photo here',
    photoDetail: 'Fresh sod laid across a yard or alongside a walkway.',
    caption: 'A fresh start from the ground up.',
  },
  {
    id: 'seasonal-cleanup', title: 'Spring & Fall Cleanup', icon: Shovel,
    summary: 'A little seasonal care goes a long way toward a beautiful yard.',
    description: 'Help your yard turn the page with the seasons. From spring freshening to fall cleanup, we give outdoor spaces the attention they need as the weather changes.',
    highlights: ['Spring cleanup', 'Fall cleanup', 'Seasonal yard care'],
    photo: 'A seasonal yard cleanup photo here',
    photoDetail: 'A freshly cleared lawn or garden after a spring or fall cleanup.',
    caption: 'Ready for what comes next.',
  },
  {
    id: 'trimming', title: 'Trimming', icon: Scissors,
    summary: 'Neat hedges and carefully shaped shrubs, season after season.',
    description: 'A little shaping can make a big difference. Neatly trimmed hedges and shrubs bring definition back to your landscape and help the rest of your outdoor space shine.',
    highlights: ['Hedge trimming', 'Shrub shaping', 'A tidy finish'],
    photo: 'A hedge or shrub trimming photo here',
    photoDetail: 'A finished hedge or a close view of carefully shaped shrubs.',
    caption: 'Good care. Clean lines.',
  },
  {
    id: 'snow-plowing', title: 'Snow Plowing', icon: Snowflake,
    summary: 'Keep your property accessible when winter weather rolls in.',
    description: 'Our work continues when the growing season ends. When snow arrives, contact our team about plowing for your property and keeping outdoor access clear.',
    highlights: ['Winter snow plowing', 'Residential & commercial'],
    photo: 'A snow plowing project photo here',
    photoDetail: 'A cleared driveway or property with the Flores team at work.',
    caption: 'Here through every season.',
  },
] as const;
