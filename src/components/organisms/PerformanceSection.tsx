import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PerfDetailCanvas } from '@/components/organisms/PerfDetailCanvas';
import { PerformancePane } from '@/components/organisms/PerformancePane';
import { fetchJobPerformance, fetchPerfDetail } from '@/lib/api';

// Performance section: model/connection/failure pane + per-item detail.
export function PerformanceSection({
  jobId,
  paneOpen,
}: {
  jobId: string;
  paneOpen: boolean;
}) {
  const [selectedItem, setSelectedItem] = useState<string>();

  const perfQuery = useQuery({
    queryKey: ['job-performance', jobId],
    queryFn: () => fetchJobPerformance(jobId),
  });
  const performance = perfQuery.data;
  // The design opens on the primary model.
  const selectedId = selectedItem ?? performance?.models[0]?.id;

  const detailQuery = useQuery({
    queryKey: ['perf-detail', jobId, selectedId],
    queryFn: () => fetchPerfDetail(jobId, selectedId ?? ''),
    enabled: Boolean(selectedId),
  });

  return (
    <>
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        {detailQuery.data ? (
          <PerfDetailCanvas jobId={jobId} detail={detailQuery.data} />
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
          aria-label="Performance pane"
          className="w-68 shrink-0 overflow-y-auto border-border border-l p-3.5"
        >
          {perfQuery.isPending ? (
            <p className="text-muted-foreground text-xs">
              Loading performance…
            </p>
          ) : perfQuery.isError ? (
            <p className="text-status-danger text-xs">
              Couldn't load performance.
            </p>
          ) : performance ? (
            <PerformancePane
              performance={performance}
              selectedId={selectedId}
              onSelect={setSelectedItem}
            />
          ) : null}
        </aside>
      )}
    </>
  );
}
