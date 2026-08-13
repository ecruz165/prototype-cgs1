import { CanvasShell } from '@/components/molecules/CanvasShell';
import { CrossLink } from '@/components/molecules/CrossLink';
import { designIcon } from '@/lib/designIcons';
import type { NodeDetail } from '@/schemas/nodeDetail';

const statusTone: Record<NodeDetail['status'], string> = {
  running: 'text-accent-foreground',
  done: 'text-status-active',
  blocked: 'text-status-warning',
  pending: 'text-tertiary',
  suspended: 'text-status-warning',
};

const diffLineStyles = {
  context: 'text-muted-foreground',
  removed: 'bg-status-danger-subtle text-status-danger',
  added: 'bg-status-badge-bg text-status-badge-text',
} as const;

const sectionLabelClass = 'font-mono font-semibold text-[10px] text-tertiary';

// The design's "Main Pane · Flow Node Detail" canvas: INPUT / OUTPUT / AGENT
// / CROSS-LINKS column with the NODE props rail.
export function NodeDetailCanvas({
  jobId,
  detail,
}: {
  jobId: string;
  detail: NodeDetail;
}) {
  const BotIcon = designIcon('smart_toy');
  return (
    <CanvasShell
      title={detail.name}
      pills={
        <>
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 font-bold font-mono text-[10px] text-muted-foreground">
            {detail.kind}
          </span>
          <span
            className={`shrink-0 rounded-full border border-border px-2 py-0.5 font-bold font-mono text-[10px] ${statusTone[detail.status]}`}
          >
            ● {detail.status.toUpperCase()}
          </span>
        </>
      }
      meta={detail.meta}
      breadcrumb={detail.breadcrumb}
      railLabel="NODE"
      railProps={detail.props}
    >
      {detail.input && (
        <>
          <span className={sectionLabelClass}>INPUT</span>
          <section className="flex flex-col gap-2 rounded-md border border-border bg-card p-3.5">
            <p className="text-[13px] text-foreground">{detail.input.brief}</p>
            <p className="text-muted-foreground text-xs">
              {detail.input.sources}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {detail.input.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border bg-muted px-2 py-0.5 font-mono font-semibold text-[10px] text-muted-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
          </section>
        </>
      )}
      {detail.output && (
        <>
          <span className={sectionLabelClass}>{detail.output.label}</span>
          <section className="overflow-hidden rounded-md border border-border bg-muted py-3">
            {detail.output.lines.map((line) => (
              <pre
                key={line.text}
                className={`px-3 font-mono text-xs leading-5 ${diffLineStyles[line.kind]}`}
              >
                {line.text}
              </pre>
            ))}
          </section>
        </>
      )}
      {detail.agent && (
        <>
          <span className={sectionLabelClass}>AGENT</span>
          <section className="flex flex-col gap-2 rounded-md border border-border bg-card p-3.5">
            <span className="flex items-center gap-2">
              <BotIcon size={16} className="text-accent-strong" aria-hidden />
              <span className="font-semibold text-[13px] text-foreground">
                {detail.agent.name}
              </span>
              <span className="font-mono text-[11px] text-tertiary">
                · {detail.agent.model} · {detail.agent.adapter}
              </span>
            </span>
            <p className="text-muted-foreground text-xs">{detail.agent.note}</p>
          </section>
        </>
      )}
      {detail.crossLinks.length > 0 && (
        <>
          <span className={sectionLabelClass}>CROSS-LINKS</span>
          {detail.crossLinks.map((link) => (
            <CrossLink key={link.title} jobId={jobId} {...link} />
          ))}
        </>
      )}
      {!detail.input && !detail.agent && detail.crossLinks.length === 0 && (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No detail captured for this phase yet.
        </p>
      )}
    </CanvasShell>
  );
}
