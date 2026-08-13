import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BudgetPane } from '@/components/organisms/BudgetPane';
import { HaltDetailCanvas } from '@/components/organisms/HaltDetailCanvas';
import { fetchHaltDetail, fetchJobBudget } from '@/lib/api';

// Budget & Gates section: spend + halting-gate meters pane, halt-detail
// canvas.
export function BudgetSection({
  jobId,
  paneOpen,
}: {
  jobId: string;
  paneOpen: boolean;
}) {
  const [selectedGate, setSelectedGate] = useState<string>();

  const budgetQuery = useQuery({
    queryKey: ['job-budget', jobId],
    queryFn: () => fetchJobBudget(jobId),
  });
  const budget = budgetQuery.data;
  // The design opens on the cost ceiling (a tripped gate would win).
  const selectedId =
    selectedGate ??
    (budget?.gates.find((g) => g.tripped) ?? budget?.gates[0])?.id;

  const detailQuery = useQuery({
    queryKey: ['halt-detail', jobId, selectedId],
    queryFn: () => fetchHaltDetail(jobId, selectedId ?? ''),
    enabled: Boolean(selectedId),
  });

  return (
    <>
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        {detailQuery.data ? (
          <HaltDetailCanvas jobId={jobId} detail={detailQuery.data} />
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
          aria-label="Budget pane"
          className="w-68 shrink-0 overflow-y-auto border-border border-l p-3.5"
        >
          {budgetQuery.isPending ? (
            <p className="text-muted-foreground text-xs">Loading budget…</p>
          ) : budgetQuery.isError ? (
            <p className="text-status-danger text-xs">Couldn't load budget.</p>
          ) : budget ? (
            <BudgetPane
              budget={budget}
              selectedId={selectedId}
              onSelect={setSelectedGate}
            />
          ) : null}
        </aside>
      )}
    </>
  );
}
