import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SteeringDetailCanvas } from '@/components/organisms/SteeringDetailCanvas';
import { SteeringPane } from '@/components/organisms/SteeringPane';
import { fetchJobSteering, fetchSteeringDetail } from '@/lib/api';

// Steering section: requests/team pane + request-detail canvas.
export function SteeringSection({
  jobId,
  paneOpen,
}: {
  jobId: string;
  paneOpen: boolean;
}) {
  const [selectedRequest, setSelectedRequest] = useState<string>();

  const steeringQuery = useQuery({
    queryKey: ['job-steering', jobId],
    queryFn: () => fetchJobSteering(jobId),
  });
  const steering = steeringQuery.data;
  // The design selects the blocking request at rest.
  const selectedId =
    selectedRequest ??
    (
      steering?.requests.find((r) => r.state === 'blocking') ??
      steering?.requests[0]
    )?.id;

  const detailQuery = useQuery({
    queryKey: ['steering-detail', jobId, selectedId],
    queryFn: () => fetchSteeringDetail(jobId, selectedId ?? ''),
    enabled: Boolean(selectedId),
  });

  return (
    <>
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        {detailQuery.data ? (
          <SteeringDetailCanvas jobId={jobId} detail={detailQuery.data} />
        ) : (
          <p className="py-16 text-center text-muted-foreground text-sm">
            {detailQuery.isError
              ? "Couldn't load the request detail."
              : 'Loading request detail…'}
          </p>
        )}
      </main>
      {paneOpen && (
        <aside
          aria-label="Steering pane"
          className="w-68 shrink-0 overflow-y-auto border-border border-l p-3.5"
        >
          {steeringQuery.isPending ? (
            <p className="text-muted-foreground text-xs">Loading steering…</p>
          ) : steeringQuery.isError ? (
            <p className="text-status-danger text-xs">
              Couldn't load steering.
            </p>
          ) : steering ? (
            <SteeringPane
              steering={steering}
              selectedId={selectedId}
              onSelect={setSelectedRequest}
            />
          ) : null}
        </aside>
      )}
    </>
  );
}
