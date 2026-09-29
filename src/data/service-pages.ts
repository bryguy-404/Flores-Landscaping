import { serviceContent, type ServiceId } from './services';
const related: Record<ServiceId, ServiceId[]> = {
  "lawn-care": [
    "trimming",
    "seasonal-cleanup"
  ],
  "landscaping": [
    "mulch-planting",
    "sod-installation"
  ],
  "mulch-planting": [
    "landscaping",
    "trimming"
  ],
  "sod-installation": [
    "lawn-care",
    "landscaping"
  ],
  "seasonal-cleanup": [
    "trimming",
    "mulch-planting"
  ],
  "trimming": [
    "lawn-care",
    "seasonal-cleanup"
  ],
  "snow-plowing": [
    "seasonal-cleanup",
    "lawn-care"
  ]
};
export const servicePages = Object.fromEntries(Object.entries(serviceContent).map(([id, content]) => [id, { ...content.detail, focus: Object.values(content.detail.focus), faqs: Object.values(content.detail.faqs), related: related[id as ServiceId] }])) as Record<ServiceId, ServicePageContent>;
export interface ServicePageContent {
 headline: string; accent: string; introduction: string; sectionTitle: string; sectionAccent: string; sectionCopy: string; focus: {title:string;copy:string}[]; planningTitle:string; planningCopy:string; faqs:{question:string;answer:string}[]; estimateTitle:string;estimateAccent:string;related:ServiceId[];
}
