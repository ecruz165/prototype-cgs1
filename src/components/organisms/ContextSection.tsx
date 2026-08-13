import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ContextPane } from '@/components/organisms/ContextPane';
import { QueryDetailCanvas } from '@/components/organisms/QueryDetailCanvas';
import { fetchJobContext, fetchQueryDetail } from '@/lib/api';

// Context section: inputs + queries pane, query-detail canvas.
export function ContextSection({
  jobId,
  paneOpen,
}: {
  jobId: string;
  paneOpen: boolean;
}) {
  const [selectedItem, setSelectedItem] = useState<string>();

  const contextQuery = useQuery({
    queryKey: ['job-context', jobId],
    queryFn: () => fetchJobContext(jobId),
  });
  const context = contextQuery.data;
  // The design opens on the first query (the one with the full hit set).
  const selectedId = selectedItem ?? context?.queries[0]?.id;

  const detailQuery = useQuery({
    queryKey: ['query-detail', jobId, selectedId],
    queryFn: () => fetchQueryDetail(jobId, selectedId ?? ''),
    enabled: Boolean(selectedId),
  });

  return (
    <>
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        {detailQuery.data ? (
          <QueryDetailCanvas jobId={jobId} detail={detailQuery.data} />
        ) : (
          <p className="py-16 text-center text-muted-foreground text-sm">
            {detailQuery.isError
              ? "Couldn't load the detail."
              : 'Loading detail…'}
          </p>
        )}
      </main>
      {paneOpen && (
        <aside
          aria-label="Context pane"
          className="w-68 shrink-0 overflow-y-auto border-border border-l p-3.5"
        >
          {contextQuery.isPending ? (
            <p className="text-muted-foreground text-xs">Loading context…</p>
          ) : contextQuery.isError ? (
            <p className="text-status-danger text-xs">Couldn't load context.</p>
          ) : context ? (
            <ContextPane
              context={context}
              selectedId={selectedId}
              onSelect={setSelectedItem}
            />
          ) : null}
        </aside>
      )}
    </>
  );
}
