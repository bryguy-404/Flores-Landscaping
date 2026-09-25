import type { serviceOfferings } from './services';

export type ServiceId = (typeof serviceOfferings)[number]['id'];
export interface ServicePageContent {
  headline: string;
  accent: string;
  introduction: string;
  sectionTitle: string;
  sectionAccent: string;
  sectionCopy: string;
  focus: { title: string; copy: string }[];
  detailPhoto: string;
  detailPhotoNote: string;
  planningTitle: string;
  planningCopy: string;
  faqs: { question: string; answer: string }[];
  estimateTitle: string;
  estimateAccent: string;
  related: ServiceId[];
}

// Editorial drafts based on the confirmed service list, company facts, and
// approved homepage direction. Business-specific inclusions remain for review.
export const servicePages: Record<ServiceId, ServicePageContent> = {
  'lawn-care': {
    headline: 'A lawn you’ll love', accent: 'coming home to.',
    introduction: 'Freshly cut grass. Neat edges. That feeling when the whole yard looks cared for. Our family-owned team brings a personal touch to lawn care around South Bend.',
    sectionTitle: 'Everyday care.', sectionAccent: 'A greener welcome.',
    sectionCopy: 'Your lawn is part of daily life, from the walk to your front door to time spent outside. We help keep it looking neat so your outdoor space feels welcoming throughout the growing season.',
    focus: [
      { title: 'A fresh, even cut', copy: 'Lawn mowing brings a tidy appearance to the open spaces around your home or business.' },
      { title: 'Pride around the edges', copy: 'Clean lawn edges help define the meeting points between grass, paths, and planting beds.' },
      { title: 'Care that keeps going', copy: 'Talk with us about ongoing lawn care and the attention your property needs as the season changes.' },
    ],
    detailPhoto: 'A lawn edge or mowing detail photo here',
    detailPhotoNote: 'A closer view of the finished lawn beside a walkway or planting bed.',
    planningTitle: 'Tell us a little about your lawn.',
    planningCopy: 'Share your address, the areas you’d like maintained, and whether you’re looking for ongoing care. A few current photos are a helpful starting point.',
    faqs: [
      { question: 'Can I ask about ongoing lawn care?', answer: 'Yes. Tell us about your lawn and the schedule you have in mind. We’ll discuss available options for your property when you contact us.' },
      { question: 'Can lawn care be discussed alongside landscaping?', answer: 'Absolutely. We also offer landscaping, mulch and planting, trimming, and seasonal cleanups. Mention the areas you’d like help with when requesting your estimate.' },
      { question: 'Where do you provide lawn care?', answer: 'We serve South Bend, Mishawaka, Granger, and Osceola. If your property is nearby, contact us to check whether it’s in our service area.' },
    ],
    estimateTitle: 'Give your lawn', estimateAccent: 'a little love.',
    related: ['trimming', 'seasonal-cleanup'],
  },
  landscaping: {
    headline: 'Your outdoor space.', accent: 'A fresh perspective.',
    introduction: 'A more welcoming entrance. A garden bed with a little more character. A yard that feels like your own. Let’s bring thoughtful care to the landscape around your home or business.',
    sectionTitle: 'Bring the whole', sectionAccent: 'yard together.',
    sectionCopy: 'Good landscaping is about how the details work together. We help you think through the spaces you want to refresh, then bring care to the planting areas and finishing touches that make a property feel complete.',
    focus: [
      { title: 'Thoughtful landscape design', copy: 'Start with your ideas, the way you use your space, and the parts of your property you’d like to change.' },
      { title: 'Garden beds with purpose', copy: 'Defined planting areas can bring shape, color, and a welcoming feel to the landscape around your home.' },
      { title: 'Attention beyond the first visit', copy: 'Landscape maintenance helps carry that cared-for feeling forward. Talk with us about the ongoing needs of your outdoor space.' },
    ],
    detailPhoto: 'A finished garden bed detail photo here',
    detailPhotoNote: 'A view showing how the planting, bed shape, and surrounding lawn work together.',
    planningTitle: 'Bring us your ideas, big or small.',
    planningCopy: 'Share current photos, the areas you want to change, and any inspiration you’ve collected. Let us know what you like about your yard and what you’d love to improve.',
    faqs: [
      { question: 'Do I need a finished design before contacting you?', answer: 'You can start with an idea or a part of your property you’d like to improve. We offer landscape design and can discuss what you have in mind during the estimate process.' },
      { question: 'Can I start with just one area of my yard?', answer: 'Tell us which area you want to focus on, such as the front entrance or an existing garden bed. We’ll discuss the scope of your project with you.' },
      { question: 'Do you work on commercial properties?', answer: 'Yes. Flores Landscaping serves residential and commercial properties in South Bend and the surrounding communities.' },
    ],
    estimateTitle: 'Let’s make room for', estimateAccent: 'something beautiful.',
    related: ['mulch-planting', 'sod-installation'],
  },
  'mulch-planting': {
    headline: 'A little color.', accent: 'A whole new feeling.',
    introduction: 'Refresh the beds you already love or bring a little life to a space that needs attention. Mulch and planting add the details that make a landscape feel cared for.',
    sectionTitle: 'Fresh layers.', sectionAccent: 'Thoughtful details.',
    sectionCopy: 'Sometimes the smallest parts of a yard make the biggest impression. A refreshed bed, a new planting, or a touch of seasonal color can help the whole outdoor space feel more inviting.',
    focus: [
      { title: 'A freshly mulched finish', copy: 'Refresh the appearance of your garden beds with mulch that brings the planting areas together.' },
      { title: 'Plants with a place to shine', copy: 'Talk with us about flowers and plants for the areas you want to brighten or give a fresh look.' },
      { title: 'A garden bed refresh', copy: 'Bring attention back to established beds and the details around the plants already in your landscape.' },
    ],
    detailPhoto: 'A close-up of mulch and planting here',
    detailPhotoNote: 'Fresh mulch around flowers or shrubs, showing the finished detail.',
    planningTitle: 'Tell us what you’d like to bring to life.',
    planningCopy: 'Send photos of the beds, mention any plants you’d like to keep, and share your preferred colors or overall look. We can discuss materials and planting choices as part of your estimate.',
    faqs: [
      { question: 'Can you refresh existing garden beds?', answer: 'Garden bed refreshes fit within our mulch, planting, and landscaping services. Send us photos and tell us what you’d like to change so we can discuss the work.' },
      { question: 'Can I share plant or mulch preferences?', answer: 'Yes. Bring your ideas, reference photos, and any material preferences to the conversation. Specific selections can be discussed before the project is agreed.' },
      { question: 'Can I request mulch or planting separately?', answer: 'We offer both mulch and planting. Tell us which service you need, or whether you’d like to discuss them together, when requesting your estimate.' },
    ],
    estimateTitle: 'A fresh look starts', estimateAccent: 'with a little care.',
    related: ['landscaping', 'trimming'],
  },
  'sod-installation': {
    headline: 'A fresh start.', accent: 'From the ground up.',
    introduction: 'Ready to give your lawn a new beginning? Talk with the Flores team about sod installation for the outdoor space you have in mind.',
    sectionTitle: 'New grass.', sectionAccent: 'New possibilities.',
    sectionCopy: 'A lawn helps tie the rest of your property together. Whether you’re thinking about a new grass area or a fresh start for an existing space, we’ll begin with a conversation about your yard and what you want to achieve.',
    focus: [
      { title: 'Sod installation', copy: 'Bring a fresh layer of grass to the areas of your property you want to turn into lawn.' },
      { title: 'Your space, considered', copy: 'Share the size, current condition, and location of the area so we can discuss the project you have in mind.' },
      { title: 'Part of a bigger picture', copy: 'If your lawn is one piece of a landscaping refresh, tell us about nearby beds and other areas you’d like to improve.' },
    ],
    detailPhoto: 'A newly installed sod detail photo here',
    detailPhotoNote: 'A closer view of fresh sod meeting a path, garden bed, or existing lawn.',
    planningTitle: 'Show us the space you’re starting with.',
    planningCopy: 'Current photos and approximate dimensions help start the conversation. Mention the condition of the area and ask about preparation, scheduling, and care for the new lawn when discussing your estimate.',
    faqs: [
      { question: 'What information helps with a sod estimate?', answer: 'Share your address, photos of the area, and approximate dimensions if you have them. Let us know whether it is an existing lawn or a new area for grass.' },
      { question: 'Can sod be part of a landscaping project?', answer: 'Yes, you can discuss sod installation alongside our landscaping services. Tell us about the full project so the areas you want to improve can be considered together.' },
      { question: 'When should I ask about care for the new lawn?', answer: 'Bring up watering, mowing, and use of the lawn while discussing your project. Ask the team for guidance suited to the sod and work agreed for your property.' },
    ],
    estimateTitle: 'Let’s talk about', estimateAccent: 'your fresh start.',
    related: ['lawn-care', 'landscaping'],
  },
  'seasonal-cleanup': {
    headline: 'A new season.', accent: 'A fresh-looking yard.',
    introduction: 'Give your outdoor space some attention as the seasons change. Our spring and fall cleanup services help your yard feel cared for from one chapter to the next.',
    sectionTitle: 'Turn the page.', sectionAccent: 'Enjoy your space.',
    sectionCopy: 'After a long winter or a busy growing season, a yard can be ready for a little extra care. Tell us what needs attention, and we’ll discuss a seasonal cleanup for your property.',
    focus: [
      { title: 'A spring freshening', copy: 'Start the growing season with attention to the outdoor areas that need a refresh after winter.' },
      { title: 'A fall tidy-up', copy: 'Give your property a cared-for finish as the growing season winds down and the weather changes.' },
      { title: 'Care where it’s needed', copy: 'Point out the lawns, planting areas, and other parts of your yard you want us to consider in the cleanup.' },
    ],
    detailPhoto: 'A seasonal cleanup before-and-after pair here',
    detailPhotoNote: 'Matching views of the same yard, taken before and after the cleanup.',
    planningTitle: 'A few photos help tell the story.',
    planningCopy: 'Show us the areas you’d like tidied and describe any leaves or accumulated yard debris. Ask which cleanup tasks and removal arrangements are included when reviewing your estimate.',
    faqs: [
      { question: 'Do you offer both spring and fall cleanups?', answer: 'Yes. Spring and fall cleanup are both part of the services offered by Flores Landscaping.' },
      { question: 'What should I include in my request?', answer: 'Share your address, current photos, and the areas that need attention. Mention any particular cleanup tasks you want to discuss so the scope can be clear from the start.' },
      { question: 'Can I also discuss trimming or fresh mulch?', answer: 'Yes. We offer trimming, mulch and planting, and landscaping in addition to seasonal cleanup. Mention any related work when you contact us.' },
    ],
    estimateTitle: 'Help your yard feel', estimateAccent: 'ready for the season.',
    related: ['trimming', 'mulch-planting'],
  },
  trimming: {
    headline: 'Good care.', accent: 'Clean lines.',
    introduction: 'Bring a little definition back to your landscape. Neatly trimmed hedges and shaped shrubs help the spaces around your home or business feel intentional and cared for.',
    sectionTitle: 'A little shaping.', sectionAccent: 'A noticeable difference.',
    sectionCopy: 'Hedges and shrubs help frame a property. When those details look tidy, the rest of the landscape comes into focus. We bring care to the trimming work that gives your yard its finished feel.',
    focus: [
      { title: 'Neatly trimmed hedges', copy: 'Give established hedges a tidier appearance and bring their lines back into the landscape.' },
      { title: 'Carefully shaped shrubs', copy: 'Refresh the shape of shrubs around entrances, garden beds, and the other areas you want to highlight.' },
      { title: 'A more finished landscape', copy: 'Coordinate trimming with the attention your lawn and garden beds need for a cohesive, cared-for look.' },
    ],
    detailPhoto: 'A hedge trimming before-and-after pair here',
    detailPhotoNote: 'The same hedge or shrubs from a matching angle, showing the change in shape.',
    planningTitle: 'Let us see what needs a little shaping.',
    planningCopy: 'Photos of the hedges and shrubs are a useful start. Mention their approximate height, the areas you want trimmed, and the look you have in mind.',
    faqs: [
      { question: 'What trimming work can I ask about?', answer: 'We trim hedges and shrubs. Send photos of what you have in mind so the team can confirm the work for your property.' },
      { question: 'Can trimming be discussed with regular yard care?', answer: 'Yes. Tell us if you also need lawn care, landscape maintenance, or a seasonal cleanup so we can discuss the services together.' },
      { question: 'How do I explain the shape I want?', answer: 'Current photos and a reference image can help. Point out any areas you especially want addressed when speaking with the team.' },
    ],
    estimateTitle: 'Bring the details', estimateAccent: 'back into focus.',
    related: ['lawn-care', 'seasonal-cleanup'],
  },
  'snow-plowing': {
    headline: 'When winter arrives,', accent: 'we’re still here.',
    introduction: 'Our work continues beyond the growing season. Contact Flores Landscaping about snow plowing for your home or business in South Bend and nearby communities.',
    sectionTitle: 'Winter care.', sectionAccent: 'For your property.',
    sectionCopy: 'Snow changes the way you use your outdoor space. Tell us about the areas you need plowed, the access your property needs, and the winter service you’re looking for.',
    focus: [
      { title: 'Residential properties', copy: 'Talk with us about snow plowing for the driveway and access areas around your home.' },
      { title: 'Commercial properties', copy: 'Discuss plowing needs for your business, including the areas visitors and vehicles use to reach the property.' },
      { title: 'A conversation before the snow', copy: 'Share your property details and ask about availability and service arrangements before making winter plans.' },
    ],
    detailPhoto: 'A completed snow plowing photo here',
    detailPhotoNote: 'A cleared driveway or commercial access area after the Flores team’s work.',
    planningTitle: 'Tell us where access matters most.',
    planningCopy: 'Share the address, whether the property is residential or commercial, and the areas you want plowed. Discuss timing, access, and the scope of the work directly with the team.',
    faqs: [
      { question: 'Do you offer residential and commercial snow plowing?', answer: 'Yes. We offer snow plowing for residential and commercial properties. Contact us to discuss your location and plowing needs.' },
      { question: 'How do I check winter availability?', answer: 'Call or text the team with your address and the service you’re looking for. Availability and scheduling should be confirmed directly for your property.' },
      { question: 'What should I share when requesting service?', answer: 'Photos of the driveway or access areas, the property address, and any important access details help explain the work you have in mind.' },
    ],
    estimateTitle: 'Let’s talk about', estimateAccent: 'your winter plans.',
    related: ['seasonal-cleanup', 'lawn-care'],
  },
};
