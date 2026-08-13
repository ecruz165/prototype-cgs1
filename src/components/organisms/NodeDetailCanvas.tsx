import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
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

const propTones = {
  default: 'text-muted-foreground',
  accent: 'text-accent-foreground',
  muted: 'text-faint',
} as const;

const diffLineStyles = {
  context: 'text-muted-foreground',
  removed: 'bg-status-danger-subtle text-status-danger',
  added: 'bg-status-badge-bg text-status-badge-text',
} as const;

const sectionLabelClass = 'font-mono font-semibold text-[10px] text-tertiary';

// The design's "Main Pane · Flow Node Detail" canvas: header with pills and
// breadcrumb, INPUT / OUTPUT / AGENT / CROSS-LINKS column, NODE props rail.
export function NodeDetailCanvas({
  jobId,
  detail,
}: {
  jobId: string;
  detail: NodeDetail;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border">
      <header className="flex flex-col gap-2 border-border border-b bg-sidebar px-5 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/jobs"
              aria-label="Back to jobs"
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={18} aria-hidden />
            </Link>
            <h1 className="truncate font-bold text-foreground text-lg">
              {detail.name}
            </h1>
            <span className="shrink-0 rounded-full border border-border px-2 py-0.5 font-bold font-mono text-[10px] text-muted-foreground">
              {detail.kind}
            </span>
            <span
              className={`shrink-0 rounded-full border border-border px-2 py-0.5 font-bold font-mono text-[10px] ${statusTone[detail.status]}`}
            >
              ● {detail.status.toUpperCase()}
            </span>
          </div>
          <span className="shrink-0 font-mono text-[11px] text-tertiary">
            {detail.meta}
          </span>
        </div>
        <span className="font-mono text-[11px] text-tertiary">
          {detail.breadcrumb.join('  ▸  ')}
        </span>
      </header>
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
          {detail.input && (
            <>
              <span className={sectionLabelClass}>INPUT</span>
              <section className="flex flex-col gap-2 rounded-md border border-border bg-card p-3.5">
                <p className="text-[13px] text-foreground">
                  {detail.input.brief}
                </p>
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
                  <BotIcon />
                  <span className="font-semibold text-[13px] text-foreground">
                    {detail.agent.name}
                  </span>
                  <span className="font-mono text-[11px] text-tertiary">
                    · {detail.agent.model} · {detail.agent.adapter}
                  </span>
                </span>
                <p className="text-muted-foreground text-xs">
                  {detail.agent.note}
                </p>
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
        </div>
        <aside
          aria-label="Node properties"
          className="w-59 shrink-0 overflow-y-auto border-border border-l bg-sidebar"
        >
          <div className="flex h-10 items-center border-border border-b px-4">
            <span className={sectionLabelClass}>NODE</span>
          </div>
          <dl className="flex flex-col gap-0.5 px-2 py-2.5">
            {detail.props.map((prop) => (
              <div
                key={prop.label}
                className="flex items-center justify-between gap-2 px-2 py-1"
              >
                <dt className="font-mono text-[11px] text-tertiary">
                  {prop.label}
                </dt>
                <dd
                  className={`text-right font-mono font-semibold text-[11px] ${propTones[prop.tone]}`}
                >
                  {prop.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}

function BotIcon() {
  const Icon = designIcon('smart_toy');
  return <Icon size={16} className="text-accent-strong" aria-hidden />;
}
