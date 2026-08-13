import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { OutputDiffCanvas } from '@/components/organisms/OutputDiffCanvas';
import { OutputPane } from '@/components/organisms/OutputPane';
import { fetchFileDiff, fetchJobOutput } from '@/lib/api';

// Output section: changes-by-task pane + diff-view canvas.
export function OutputSection({
  jobId,
  paneOpen,
}: {
  jobId: string;
  paneOpen: boolean;
}) {
  const [selectedFile, setSelectedFile] = useState<string>();

  const outputQuery = useQuery({
    queryKey: ['job-output', jobId],
    queryFn: () => fetchJobOutput(jobId),
  });
  const output = outputQuery.data;
  // The design opens on token.service.ts — the first file of the first task.
  const selectedId = selectedFile ?? output?.tasks[0]?.files[0]?.id;

  const diffQuery = useQuery({
    queryKey: ['file-diff', jobId, selectedId],
    queryFn: () => fetchFileDiff(jobId, selectedId ?? ''),
    enabled: Boolean(selectedId),
  });

  return (
    <>
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        {diffQuery.data ? (
          <OutputDiffCanvas jobId={jobId} diff={diffQuery.data} />
        ) : (
          <p className="py-16 text-center text-muted-foreground text-sm">
            {diffQuery.isError ? "Couldn't load the diff." : 'Loading diff…'}
          </p>
        )}
      </main>
      {paneOpen && (
        <aside
          aria-label="Output pane"
          className="w-68 shrink-0 overflow-y-auto border-border border-l p-3.5"
        >
          {outputQuery.isPending ? (
            <p className="text-muted-foreground text-xs">Loading output…</p>
          ) : outputQuery.isError ? (
            <p className="text-status-danger text-xs">Couldn't load output.</p>
          ) : output ? (
            <OutputPane
              output={output}
              selectedId={selectedId}
              onSelect={setSelectedFile}
            />
          ) : null}
        </aside>
      )}
    </>
  );
}
