import { CanvasShell } from '@/components/molecules/CanvasShell';
import { CrossLink } from '@/components/molecules/CrossLink';
import { designIcon } from '@/lib/designIcons';
import type { FileDiff } from '@/schemas/output';

const sectionLabelClass = 'font-mono font-semibold text-[10px] text-tertiary';

const diffLineStyles = {
  context: 'text-muted-foreground',
  removed: 'bg-status-danger-subtle text-status-danger',
  added: 'bg-status-badge-bg text-status-badge-text',
} as const;

const changePills: Record<FileDiff['change'], { pill: string; label: string }> =
  {
    modified: {
      pill: 'bg-status-warning-subtle text-status-warning',
      label: 'MODIFIED',
    },
    added: {
      pill: 'bg-status-badge-bg text-status-badge-text',
      label: 'ADDED',
    },
    removed: {
      pill: 'bg-status-danger-subtle text-status-danger',
      label: 'REMOVED',
    },
  };

// The design's "Main Pane · Output · Diff View": hunked diff, PRODUCED BY
// provenance card, cross-links back to the flow node and steering decision.
export function OutputDiffCanvas({
  jobId,
  diff,
}: {
  jobId: string;
  diff: FileDiff;
}) {
  const change = changePills[diff.change];
  const FileIcon = designIcon('description');
  return (
    <CanvasShell
      title={diff.name}
      titleIcon={
        <FileIcon
          size={18}
          className="shrink-0 text-muted-foreground"
          aria-hidden
        />
      }
      pills={
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 font-bold font-mono text-[10px] ${change.pill}`}
        >
          ● {change.label}
        </span>
      }
      meta={diff.meta}
      breadcrumb={diff.breadcrumb}
      railLabel="FILE"
      railProps={diff.props}
    >
      {diff.hunks.length > 0 ? (
        <>
          <span className={sectionLabelClass}>DIFF</span>
          {diff.hunkLabel && (
            <span className="font-mono text-[11px] text-tertiary">
              {diff.hunkLabel}
            </span>
          )}
          {diff.hunks.map((hunk) => (
            <section
              key={hunk.lines[0]?.text}
              className="overflow-hidden rounded-md border border-border bg-muted py-3"
            >
              {hunk.lines.map((line) => (
                <pre
                  key={line.text}
                  className={`px-3 font-mono text-xs leading-5 ${diffLineStyles[line.kind]}`}
                >
                  {line.text}
                </pre>
              ))}
            </section>
          ))}
        </>
      ) : (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No diff captured for this file yet.
        </p>
      )}
      {diff.producedBy.length > 0 && (
        <>
          <span className={sectionLabelClass}>PRODUCED BY</span>
          <section className="flex flex-col gap-2.5 rounded-md border border-border bg-card p-3.5">
            {diff.producedBy.map((row) => (
              <div key={row.label} className="flex items-baseline gap-3">
                <span className="w-16 shrink-0 font-mono text-[11px] text-tertiary">
                  {row.label}
                </span>
                <span
                  className={`font-medium text-xs ${
                    row.tone === 'accent'
                      ? 'font-mono font-semibold text-accent-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </section>
        </>
      )}
      {diff.crossLinks.length > 0 && (
        <>
          <span className={sectionLabelClass}>CROSS-LINKS</span>
          {diff.crossLinks.map((link) => (
            <CrossLink key={link.title} jobId={jobId} {...link} />
          ))}
        </>
      )}
    </CanvasShell>
  );
}
