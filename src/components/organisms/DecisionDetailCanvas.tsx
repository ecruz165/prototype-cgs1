import { CanvasShell } from '@/components/molecules/CanvasShell';
import { CrossLink } from '@/components/molecules/CrossLink';
import { designIcon } from '@/lib/designIcons';
import type { DecisionDetail } from '@/schemas/activity';

const sectionLabelClass = 'font-mono font-semibold text-[10px] text-tertiary';
const microLabelClass = 'font-mono font-semibold text-[9px] text-tertiary';

// The design's "Main Pane · Activity · Decision Detail": the coordinator's
// reasoning with its weighed inputs, and the raw LLM transcript drill-down.
export function DecisionDetailCanvas({
  jobId,
  detail,
}: {
  jobId: string;
  detail: DecisionDetail;
}) {
  const TitleIcon = designIcon('hub');
  const StatsIcon = designIcon('memory');
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
          {detail.kind}
        </span>
      }
      meta={detail.meta}
      breadcrumb={detail.breadcrumb}
      railLabel="DECISION"
      railProps={detail.props}
    >
      {detail.reasoning && (
        <>
          <span className={sectionLabelClass}>REASONING</span>
          <section className="flex flex-col gap-3 rounded-md border border-border bg-card p-3.5">
            <p className="text-[13px] text-muted-foreground">
              {detail.reasoning.body}
            </p>
            <div className="flex flex-col gap-1.5">
              <span className={microLabelClass}>INPUTS WEIGHED</span>
              {detail.reasoning.inputs.map((input) => {
                const Icon = designIcon(input.icon);
                return (
                  <div key={input.label} className="flex items-center gap-2.5">
                    <Icon
                      size={14}
                      className="shrink-0 text-tertiary"
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1 text-muted-foreground text-xs">
                      {input.label}
                    </span>
                    <span className="shrink-0 font-semibold text-[11px] text-foreground">
                      {input.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
      {detail.io && (
        <>
          <span className={sectionLabelClass}>
            RAW REQUEST / RESPONSE — drill-down
          </span>
          <section className="flex flex-col gap-3 rounded-md border border-border bg-card p-3.5">
            <p className="text-[10px] text-tertiary">{detail.io.note}</p>
            <div className="flex flex-col gap-1">
              <span className={microLabelClass}>REQUEST</span>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-sm bg-muted p-2.5 font-mono text-muted-foreground text-xs leading-5">
                {detail.io.request}
              </pre>
            </div>
            <div className="flex flex-col gap-1">
              <span className={microLabelClass}>RESPONSE</span>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-sm bg-muted p-2.5 font-mono text-muted-foreground text-xs leading-5">
                {detail.io.response}
              </pre>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-tertiary">
              <StatsIcon size={13} aria-hidden />
              {detail.io.stats}
            </span>
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
      {!detail.reasoning && !detail.io && detail.crossLinks.length === 0 && (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No detail captured for this decision yet.
        </p>
      )}
    </CanvasShell>
  );
}
