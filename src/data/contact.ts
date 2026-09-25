// Shared by the form and its server-side validation.
export const contactServices = [
  { id: 'lawn-care', title: 'Lawn Care' },
  { id: 'landscaping', title: 'Landscaping' },
  { id: 'mulch-planting', title: 'Mulch & Planting' },
  { id: 'sod-installation', title: 'Sod Installation' },
  { id: 'seasonal-cleanup', title: 'Spring & Fall Cleanup' },
  { id: 'trimming', title: 'Trimming' },
  { id: 'snow-plowing', title: 'Snow Plowing' },
  { id: 'not-sure', title: 'A few things / not sure yet' },
] as const;

export const propertyTypes = ['Residential', 'Commercial', 'Not sure yet'] as const;
