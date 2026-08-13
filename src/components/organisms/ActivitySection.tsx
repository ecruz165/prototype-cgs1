import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityPane } from '@/components/organisms/ActivityPane';
import { DecisionDetailCanvas } from '@/components/organisms/DecisionDetailCanvas';
import { fetchDecisionDetail, fetchJobActivity } from '@/lib/api';

// Activity section: coordinator decision log + decision-detail canvas.
export function ActivitySection({
  jobId,
  paneOpen,
}: {
  jobId: string;
  paneOpen: boolean;
}) {
  const [selectedDecision, setSelectedDecision] = useState<string>();

  const activityQuery = useQuery({
    queryKey: ['job-activity', jobId],
    queryFn: () => fetchJobActivity(jobId),
  });
  const activity = activityQuery.data;
  // The design opens on the dispatch decision (the one with a full trace).
  const selectedId =
    selectedDecision ??
    (
      activity?.decisions.find((d) => d.id === 'dispatch-coder') ??
      activity?.decisions[0]
    )?.id;

  const detailQuery = useQuery({
    queryKey: ['decision-detail', jobId, selectedId],
    queryFn: () => fetchDecisionDetail(jobId, selectedId ?? ''),
    enabled: Boolean(selectedId),
  });

  return (
    <>
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        {detailQuery.data ? (
          <DecisionDetailCanvas jobId={jobId} detail={detailQuery.data} />
        ) : (
          <p className="py-16 text-center text-muted-foreground text-sm">
            {detailQuery.isError
              ? "Couldn't load the decision detail."
              : 'Loading decision detail…'}
          </p>
        )}
      </main>
      {paneOpen && (
        <aside
          aria-label="Activity pane"
          className="w-68 shrink-0 overflow-y-auto border-border border-l p-3.5"
        >
          {activityQuery.isPending ? (
            <p className="text-muted-foreground text-xs">Loading activity…</p>
          ) : activityQuery.isError ? (
            <p className="text-status-danger text-xs">
              Couldn't load activity.
            </p>
          ) : activity ? (
            <ActivityPane
              activity={activity}
              selectedId={selectedId}
              onSelect={setSelectedDecision}
            />
          ) : null}
        </aside>
      )}
    </>
  );
}
