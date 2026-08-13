import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { ActivityRail } from '@/components/organisms/ActivityRail';
import { ActivitySection } from '@/components/organisms/ActivitySection';
import { BudgetSection } from '@/components/organisms/BudgetSection';
import { FlowSection } from '@/components/organisms/FlowSection';
import { OutputSection } from '@/components/organisms/OutputSection';
import { PerformanceSection } from '@/components/organisms/PerformanceSection';
import { QualitySection } from '@/components/organisms/QualitySection';
import { SteeringSection } from '@/components/organisms/SteeringSection';
import { isJobSection, jobSections } from '@/lib/jobSections';

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

function JobDetailPage() {
  const { jobId, section: sectionSlug } = Route.useParams();
  const section = jobSections.find((s) => s.slug === sectionSlug);
  const [paneOpen, setPaneOpen] = useState(true);

  if (!section) return null;

  return (
    <div className="flex h-full min-h-0">
      {sectionSlug === 'flow' ? (
        <FlowSection jobId={jobId} paneOpen={paneOpen} />
      ) : sectionSlug === 'steering' ? (
        <SteeringSection jobId={jobId} paneOpen={paneOpen} />
      ) : sectionSlug === 'output' ? (
        <OutputSection jobId={jobId} paneOpen={paneOpen} />
      ) : sectionSlug === 'quality' ? (
        <QualitySection jobId={jobId} paneOpen={paneOpen} />
      ) : sectionSlug === 'budget' ? (
        <BudgetSection jobId={jobId} paneOpen={paneOpen} />
      ) : sectionSlug === 'activity' ? (
        <ActivitySection jobId={jobId} paneOpen={paneOpen} />
      ) : sectionSlug === 'performance' ? (
        <PerformanceSection jobId={jobId} paneOpen={paneOpen} />
      ) : (
        <PlaceholderSection label={section.label} paneOpen={paneOpen} />
      )}
      <ActivityRail
        jobId={jobId}
        activeSection={section.slug}
        paneOpen={paneOpen}
        onTogglePane={() => setPaneOpen((o) => !o)}
      />
    </div>
  );
}

function PlaceholderSection({
  label,
  paneOpen,
}: {
  label: string;
  paneOpen: boolean;
}) {
  return (
    <>
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        <Link
          to="/jobs"
          className="mb-4 flex w-fit items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} aria-hidden />
          Jobs
        </Link>
        <div className="flex h-[70%] items-center justify-center">
          <div className="rounded-lg border border-border border-dashed bg-card px-10 py-8 text-center">
            <h1 className="font-semibold text-foreground text-lg">{label}</h1>
            <p className="mt-1 text-muted-foreground text-sm">
              Canvas not built yet
            </p>
          </div>
        </div>
      </main>
      {paneOpen && (
        <aside
          aria-label={`${label} pane`}
          className="w-68 shrink-0 overflow-y-auto border-border border-l p-3.5"
        >
          <div className="flex flex-col gap-3.5">
            <span className="font-mono font-semibold text-[10px] text-tertiary uppercase">
              {label}
            </span>
            <p className="text-muted-foreground text-xs">Pane not built yet</p>
          </div>
        </aside>
      )}
    </>
  );
}
