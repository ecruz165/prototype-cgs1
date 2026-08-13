import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FlowPane } from '@/components/organisms/FlowPane';
import { NodeDetailCanvas } from '@/components/organisms/NodeDetailCanvas';
import { fetchJobFlow, fetchNodeDetail } from '@/lib/api';

// Flow section: pipeline pane + node-detail canvas, selection-driven.
export function FlowSection({
  jobId,
  paneOpen,
}: {
  jobId: string;
  paneOpen: boolean;
}) {
  const [selectedPhase, setSelectedPhase] = useState<string>();

  const flowQuery = useQuery({
    queryKey: ['job-flow', jobId],
    queryFn: () => fetchJobFlow(jobId),
  });
  const flow = flowQuery.data;
  // The design selects the running agent phase ("Generate patch") at rest.
  const selectedId =
    selectedPhase ??
    flow?.phases.find((p) => p.status === 'running' && p.kind === 'agent')?.id;

  const detailQuery = useQuery({
    queryKey: ['node-detail', jobId, selectedId],
    queryFn: () => fetchNodeDetail(jobId, selectedId ?? ''),
    enabled: Boolean(selectedId),
  });

  return (
    <>
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        {detailQuery.data ? (
          <NodeDetailCanvas jobId={jobId} detail={detailQuery.data} />
        ) : (
          <p className="py-16 text-center text-muted-foreground text-sm">
            {detailQuery.isError
              ? "Couldn't load the node detail."
              : 'Loading node detail…'}
          </p>
        )}
      </main>
      {paneOpen && (
        <aside
          aria-label="Flow pane"
          className="w-68 shrink-0 overflow-y-auto border-border border-l p-3.5"
        >
          {flowQuery.isPending ? (
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
          ) : null}
        </aside>
      )}
    </>
  );
}
