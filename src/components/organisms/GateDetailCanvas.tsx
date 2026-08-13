import { CanvasShell } from '@/components/molecules/CanvasShell';
import { CrossLink } from '@/components/molecules/CrossLink';
import { TrendBars } from '@/components/molecules/TrendBars';
import { designIcon } from '@/lib/designIcons';
import type { GateDetail } from '@/schemas/quality';

const sectionLabelClass = 'font-mono font-semibold text-[10px] text-tertiary';
const microLabelClass = 'font-mono font-semibold text-[9px] text-tertiary';

const bigStatTones = {
  default: 'text-foreground',
  accent: 'text-accent-foreground',
  warning: 'text-status-warning',
  active: 'text-status-active',
  danger: 'text-status-danger',
  muted: 'text-faint',
} as const;

// The design's "Main Pane · Quality · Gate Detail": assertion card with the
// evaluated stats and threshold bar, the run trend, and what the gate blocks.
export function GateDetailCanvas({
  jobId,
  detail,
}: {
  jobId: string;
  detail: GateDetail;
}) {
  const failed = detail.status === 'failed';
  const StatusIcon = designIcon(failed ? 'cancel' : 'check_circle');
  const BlockIcon = designIcon('block');
  const TrendDownIcon = designIcon('trending_down');
  return (
    <CanvasShell
      title={detail.name}
      titleIcon={
        <StatusIcon
          size={18}
          className={`shrink-0 ${failed ? 'text-status-danger' : 'text-status-active'}`}
          aria-hidden
        />
      }
      pills={
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 font-bold font-mono text-[9px] ${
            failed
              ? 'bg-status-danger-subtle text-status-danger'
              : 'bg-status-badge-bg text-status-badge-text'
          }`}
        >
          {failed ? 'FAILED' : 'PASSED'}
        </span>
      }
      meta={detail.meta}
      breadcrumb={detail.breadcrumb}
      railLabel="GATE"
      railProps={detail.props}
    >
      {detail.assertion && (
        <>
          <span className={sectionLabelClass}>ASSERTION</span>
          <section className="flex flex-col gap-3 rounded-md border border-border bg-card p-3.5">
            <div className="flex flex-col gap-1">
              <span className={microLabelClass}>EXPRESSION</span>
              <span className="font-mono text-[13px] text-foreground">
                {detail.assertion.expression}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className={microLabelClass}>MESSAGE</span>
              <span className="text-muted-foreground text-xs">
                {detail.assertion.message}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className={microLabelClass}>EVALUATED</span>
              <div className="flex items-end gap-8">
                {detail.assertion.evaluated.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className={microLabelClass}>{stat.label}</span>
                    <span
                      className={`font-bold text-2xl ${bigStatTones[stat.tone]}`}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-status-danger"
                  style={{ width: `${detail.assertion.actualPct}%` }}
                />
                <span
                  aria-hidden
                  className="absolute inset-y-0 w-0.5 bg-foreground"
                  style={{ left: `${detail.assertion.thresholdPct}%` }}
                />
              </div>
              <span className="font-mono text-[9px] text-tertiary">
                {detail.assertion.caption}
              </span>
            </div>
          </section>
        </>
      )}
      {detail.trend && (
        <>
          <span className={sectionLabelClass}>{detail.trend.label}</span>
          <section className="flex flex-col gap-3 rounded-md border border-border bg-card p-3.5">
            <TrendBars points={detail.trend.points} height={64} />
            <div className="flex items-start gap-2">
              <TrendDownIcon
                size={14}
                className="mt-0.5 shrink-0 text-status-danger"
                aria-hidden
              />
              <p className="text-muted-foreground text-xs">
                {detail.trend.note}
              </p>
            </div>
          </section>
        </>
      )}
      {detail.blocks && (
        <>
          <span className={sectionLabelClass}>WHAT IT BLOCKS</span>
          <section className="flex flex-col gap-2 rounded-md border border-border bg-card p-3.5">
            <div className="flex items-center gap-2">
              <BlockIcon
                size={15}
                className="shrink-0 text-status-danger"
                aria-hidden
              />
              <span className="font-semibold text-[13px] text-foreground">
                {detail.blocks.title}
              </span>
              <span className="rounded-full bg-status-warning-subtle px-2 py-px font-bold font-mono text-[9px] text-status-warning">
                {detail.blocks.pill}
              </span>
            </div>
            <p className="text-muted-foreground text-xs">
              {detail.blocks.body}
            </p>
          </section>
          {detail.blocks.links.map((link) => (
            <CrossLink key={link.title} jobId={jobId} {...link} />
          ))}
        </>
      )}
      {detail.links.length > 0 && (
        <>
          <span className={sectionLabelClass}>LINKS</span>
          {detail.links.map((link) => (
            <CrossLink key={link.title} jobId={jobId} {...link} />
          ))}
        </>
      )}
      {!detail.assertion && !detail.trend && !detail.blocks && (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No detail captured for this gate yet.
        </p>
      )}
    </CanvasShell>
  );
}
