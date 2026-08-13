// The eight job activity sections, in the design's rail order
// (jobs-activity-bar wireframe). The slug is the route segment.
export const jobSections = [
  { slug: 'flow', label: 'Flow', icon: 'account_tree' },
  { slug: 'steering', label: 'Steering', icon: 'front_hand' },
  { slug: 'output', label: 'Output', icon: 'difference' },
  { slug: 'quality', label: 'Quality', icon: 'fact_check' },
  { slug: 'budget', label: 'Budget & Gates', icon: 'savings' },
  { slug: 'activity', label: 'Activity', icon: 'hub' },
  { slug: 'performance', label: 'Performance', icon: 'speed' },
  { slug: 'context', label: 'Context', icon: 'folder_open' },
] as const;

export type JobSectionSlug = (typeof jobSections)[number]['slug'];

export function isJobSection(slug: string): slug is JobSectionSlug {
  return jobSections.some((section) => section.slug === slug);
}
