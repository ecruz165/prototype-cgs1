import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { ActivityRail } from '@/components/organisms/ActivityRail';
import { ActivitySection } from '@/components/organisms/ActivitySection';
import { BudgetSection } from '@/components/organisms/BudgetSection';
import { ContextSection } from '@/components/organisms/ContextSection';
import { FlowSection } from '@/components/organisms/FlowSection';
import { OutputSection } from '@/components/organisms/OutputSection';
import { PerformanceSection } from '@/components/organisms/PerformanceSection';
import { QualitySection } from '@/components/organisms/QualitySection';
import { SteeringSection } from '@/components/organisms/SteeringSection';
import {
  isJobSection,
  type JobSectionSlug,
  jobSections,
} from '@/lib/jobSections';

export const Route = createFileRoute('/jobs_/$jobId/$section')({
  beforeLoad: ({ params }) => {
    if (!isJobSection(params.section)) {
      throw redirect({
        to: '/jobs/$jobId/$section',
        params: { jobId: params.jobId, section: 'flow' },
      });
    }
  },
  component: JobDetailPage,
});

const sections: Record<
  JobSectionSlug,
  (props: { jobId: string; paneOpen: boolean }) => React.ReactNode
> = {
  flow: FlowSection,
  steering: SteeringSection,
  output: OutputSection,
  quality: QualitySection,
  budget: BudgetSection,
  activity: ActivitySection,
  performance: PerformanceSection,
  context: ContextSection,
};

function JobDetailPage() {
  const { jobId, section: sectionSlug } = Route.useParams();
  const section = jobSections.find((s) => s.slug === sectionSlug);
  const [paneOpen, setPaneOpen] = useState(true);

  if (!section) return null;
  const Section = sections[section.slug];

  return (
    <div className="flex h-full min-h-0">
      <Section jobId={jobId} paneOpen={paneOpen} />
      <ActivityRail
        jobId={jobId}
        activeSection={section.slug}
        paneOpen={paneOpen}
        onTogglePane={() => setPaneOpen((o) => !o)}
      />
    </div>
  );
}
