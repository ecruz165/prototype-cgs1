import { CanvasShell } from '@/components/molecules/CanvasShell';
import { CrossLink } from '@/components/molecules/CrossLink';
import { designIcon } from '@/lib/designIcons';
import type { HaltDetail } from '@/schemas/budget';

const sectionLabelClass = 'font-mono font-semibold text-[10px] text-tertiary';
const microLabelClass = 'font-mono font-semibold text-[9px] text-tertiary';

const tones = {
  default: 'text-foreground',
  accent: 'text-accent-foreground',
  warning: 'text-status-warning',
  active: 'text-status-active',
  danger: 'text-status-danger',
  muted: 'text-faint',
} as const;

// The design's "Main Pane · Budget & Gates · Halt Detail": the assertion
// with distance-from-threshold stats, the on-trip sequence, and what the
// gate guards.
export function HaltDetailCanvas({
  jobId,
  detail,
}: {
  jobId: string;
  detail: HaltDetail;
}) {
  const clear = detail.status === 'clear';
  const TitleIcon = designIcon('payments');
  const BlockIcon = designIcon('block');
  return (
    <CanvasShell
      title={detail.name}
      titleIcon={
        <TitleIcon
          size={18}
          className="shrink-0 text-accent-strong"
          aria-hidden
        />
      }
      pills={
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 font-bold font-mono text-[9px] ${
            clear
              ? 'bg-status-badge-bg text-status-badge-text'
              : 'bg-status-danger-subtle text-status-danger'
          }`}
        >
          {clear ? 'CLEAR' : 'TRIPPED'}
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
              <span className={microLabelClass}>
                {detail.assertion.statsLabel}
              </span>
              <div className="flex items-end gap-8">
                {detail.assertion.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className={microLabelClass}>{stat.label}</span>
                    <span className={`font-bold text-2xl ${tones[stat.tone]}`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-status-active"
                  style={{ width: `${detail.assertion.nowPct}%` }}
                />
                <span
                  aria-hidden
                  className="absolute inset-y-0 w-0.5 bg-foreground"
                  style={{ left: `${detail.assertion.projectedPct}%` }}
                />
              </div>
              <span className="font-mono text-[9px] text-tertiary">
                {detail.assertion.caption}
              </span>
            </div>
          </section>
        </>
      )}
      {detail.onTrip && (
        <>
          <span className={sectionLabelClass}>
            ON TRIP — what stops the run
          </span>
          <section className="flex flex-col gap-3 rounded-md border border-border bg-card p-3.5">
            <div className="flex items-center gap-2">
              <BlockIcon
                size={15}
                className="shrink-0 text-status-danger"
                aria-hidden
              />
              <span className="font-semibold text-[13px] text-foreground">
                {detail.onTrip.title}
              </span>
              <span className="rounded-full bg-status-warning-subtle px-2 py-px font-bold font-mono text-[9px] text-status-warning">
                {detail.onTrip.pill}
              </span>
            </div>
            <ol className="flex flex-col gap-2.5">
              {detail.onTrip.steps.map((step) => {
                const StepIcon = designIcon(step.icon);
                return (
                  <li key={step.name} className="flex items-start gap-2.5">
                    <StepIcon
                      size={15}
                      className={`mt-0.5 shrink-0 ${tones[step.tone]}`}
                      aria-hidden
                    />
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-semibold text-foreground text-xs">
                        {step.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {step.text}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>
        </>
      )}
      {detail.guards && (
        <>
          <span className={sectionLabelClass}>WHAT IT GUARDS</span>
          <p className="text-muted-foreground text-xs">{detail.guards.body}</p>
          {detail.guards.links.map((link) => (
            <CrossLink key={link.title} jobId={jobId} {...link} />
          ))}
        </>
      )}
      {!detail.assertion && !detail.onTrip && !detail.guards && (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No detail captured for this gate yet.
        </p>
      )}
    </CanvasShell>
  );
}
