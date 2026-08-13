import { Clock } from 'lucide-react';
import { CanvasShell } from '@/components/molecules/CanvasShell';
import { CrossLink } from '@/components/molecules/CrossLink';
import { designIcon } from '@/lib/designIcons';
import type { PerfDetail } from '@/schemas/performance';

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

// The design's "Main Pane · Performance · Per-Model Usage": usage stats,
// the latency distribution, and which phases used the model.
export function PerfDetailCanvas({
  jobId,
  detail,
}: {
  jobId: string;
  detail: PerfDetail;
}) {
  const TitleIcon = designIcon('memory');
  return (
    <CanvasShell
      title={detail.title}
      titleIcon={
        <TitleIcon
          size={18}
          className="shrink-0 text-accent-strong"
          aria-hidden
        />
      }
      pills={
        <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 font-bold font-mono text-[9px] text-accent-foreground">
          {detail.pill}
        </span>
      }
      meta={detail.meta}
      breadcrumb={detail.breadcrumb}
      railLabel="MODEL"
      railProps={detail.props}
    >
      {detail.usage && (
        <>
          <span className={sectionLabelClass}>USAGE</span>
          <section className="flex items-end gap-10 rounded-md border border-border bg-card p-3.5">
            {detail.usage.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className={microLabelClass}>{stat.label}</span>
                <span className={`font-bold text-2xl ${tones[stat.tone]}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </section>
        </>
      )}
      {detail.latency && (
        <>
          <span className={sectionLabelClass}>
            LATENCY DISTRIBUTION · per-request
          </span>
          <section className="flex flex-col gap-3 rounded-md border border-border bg-card p-3.5">
            <div className="flex items-end gap-8">
              {detail.latency.points.map((point) => (
                <div
                  key={point.label}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="font-bold font-mono text-[11px] text-accent-foreground">
                    {point.value}
                  </span>
                  <span className={microLabelClass}>{point.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2">
              <Clock
                size={13}
                className="mt-0.5 shrink-0 text-tertiary"
                aria-hidden
              />
              <p className="text-muted-foreground text-xs">
                {detail.latency.note}
              </p>
            </div>
          </section>
        </>
      )}
      {detail.phases && (
        <>
          <span className={sectionLabelClass}>USED IN PHASES</span>
          <section className="flex flex-col gap-0.5 rounded-md bg-muted p-1.5">
            {detail.phases.map((phase) => {
              const Icon = designIcon(phase.icon);
              return (
                <div
                  key={phase.name}
                  className="flex items-center gap-2.5 rounded-[4px] p-2"
                >
                  <Icon
                    size={15}
                    className="shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <span className="flex min-w-0 flex-1 items-baseline gap-2">
                    <span className="font-semibold text-foreground text-xs">
                      {phase.name}
                    </span>
                    <span className="text-[10px] text-tertiary">
                      {phase.agent}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 font-mono font-semibold text-[11px] ${
                      phase.tone === 'accent'
                        ? 'text-accent-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {phase.requests}
                  </span>
                </div>
              );
            })}
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
      {!detail.usage && !detail.latency && !detail.phases && (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No detail captured for this item yet.
        </p>
      )}
    </CanvasShell>
  );
}
