import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { ActivityRail } from '@/components/organisms/ActivityRail';
import { FlowPane } from '@/components/organisms/FlowPane';
import { fetchJobFlow } from '@/lib/api';
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
  const section = isJobSection(sectionSlug)
    ? jobSections.find((s) => s.slug === sectionSlug)
    : undefined;
  const [paneOpen, setPaneOpen] = useState(true);
  const [selectedPhase, setSelectedPhase] = useState<string>();

  const flowQuery = useQuery({
    queryKey: ['job-flow', jobId],
    queryFn: () => fetchJobFlow(jobId),
    enabled: sectionSlug === 'flow',
  });
  const flow = flowQuery.data;
  // The design selects the running agent phase ("Generate patch") at rest.
  const selectedId =
    selectedPhase ??
    flow?.phases.find((p) => p.status === 'running' && p.kind === 'agent')?.id;
  const selectedName = flow?.phases.find((p) => p.id === selectedId)?.name;

  if (!section) return null;

  return (
    <div className="flex h-full min-h-0">
      <main className="min-w-0 flex-1 overflow-y-auto px-7 py-6">
        <Link
          to="/jobs"
          className="mb-4 flex w-fit items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} aria-hidden />
          Jobs
        </Link>
        <div className="flex h-[70%] items-center justify-center">
          <div className="rounded-lg border border-border border-dashed bg-card px-10 py-8 text-center">
            <h1 className="font-semibold text-foreground text-lg">
              {section.label}
              {sectionSlug === 'flow' && selectedName
                ? ` · ${selectedName}`
                : ''}
            </h1>
            <p className="mt-1 text-muted-foreground text-sm">
              Canvas not built yet
            </p>
          </div>
        </div>
      </main>
      {paneOpen && (
        <aside
          aria-label={`${section.label} pane`}
          className="w-68 shrink-0 overflow-y-auto border-border border-l p-3.5"
        >
          {sectionSlug === 'flow' ? (
            flowQuery.isPending ? (
              <p className="text-muted-foreground text-xs">Loading flow…</p>
            ) : flowQuery.isError ? (
              <p className="text-status-danger text-xs">
                Couldn't load the flow.
              </p>
            ) : flow ? (
              <FlowPane
                flow={flow}
                selectedId={selectedId}
                onSelect={setSelectedPhase}
              />
            ) : null
          ) : (
            <div className="flex flex-col gap-3.5">
              <span className="font-mono font-semibold text-[10px] text-tertiary uppercase">
                {section.label}
              </span>
              <p className="text-muted-foreground text-xs">
                Pane not built yet
              </p>
            </div>
          )}
        </aside>
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
