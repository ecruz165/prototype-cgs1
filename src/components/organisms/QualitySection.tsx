import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { GateDetailCanvas } from '@/components/organisms/GateDetailCanvas';
import { QualityPane } from '@/components/organisms/QualityPane';
import { fetchGateDetail, fetchJobQuality } from '@/lib/api';

// Quality section: grouped gates pane + gate-detail canvas.
export function QualitySection({
  jobId,
  paneOpen,
}: {
  jobId: string;
  paneOpen: boolean;
}) {
  const [selectedGate, setSelectedGate] = useState<string>();

  const qualityQuery = useQuery({
    queryKey: ['job-quality', jobId],
    queryFn: () => fetchJobQuality(jobId),
  });
  const quality = qualityQuery.data;
  const allGates = quality?.groups.flatMap((g) => g.gates);
  // The design opens on the failing gate.
  const selectedId =
    selectedGate ??
    (allGates?.find((g) => g.status === 'fail') ?? allGates?.[0])?.id;

  const detailQuery = useQuery({
    queryKey: ['gate-detail', jobId, selectedId],
    queryFn: () => fetchGateDetail(jobId, selectedId ?? ''),
    enabled: Boolean(selectedId),
  });

  return (
    <>
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        {detailQuery.data ? (
          <GateDetailCanvas jobId={jobId} detail={detailQuery.data} />
        ) : (
          <p className="py-16 text-center text-muted-foreground text-sm">
            {detailQuery.isError
              ? "Couldn't load the gate detail."
              : 'Loading gate detail…'}
          </p>
        )}
      </main>
      {paneOpen && (
        <aside
          aria-label="Quality pane"
          className="w-68 shrink-0 overflow-y-auto border-border border-l p-3.5"
        >
          {qualityQuery.isPending ? (
            <p className="text-muted-foreground text-xs">Loading quality…</p>
          ) : qualityQuery.isError ? (
            <p className="text-status-danger text-xs">Couldn't load quality.</p>
          ) : quality ? (
            <QualityPane
              quality={quality}
              selectedId={selectedId}
              onSelect={setSelectedGate}
            />
          ) : null}
        </aside>
      )}
    </>
  );
}
