import { CanvasShell } from '@/components/molecules/CanvasShell';
import { CrossLink } from '@/components/molecules/CrossLink';
import { designIcon } from '@/lib/designIcons';
import type { QueryDetail } from '@/schemas/context';

const sectionLabelClass = 'font-mono font-semibold text-[10px] text-tertiary';

// The design's "Main Pane · Context · Query Detail": the query, the scored
// hit set (retrieved vs actually USED), and what fed the agent's context.
export function QueryDetailCanvas({
  jobId,
  detail,
}: {
  jobId: string;
  detail: QueryDetail;
}) {
  const TitleIcon = designIcon('manage_search');
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
      railLabel="QUERY"
      railProps={detail.props}
    >
      {detail.query && (
        <>
          <span className={sectionLabelClass}>QUERY</span>
          <section className="flex flex-col gap-2 rounded-md border border-border bg-card p-3.5">
            <span className="flex items-center gap-2">
              <TitleIcon
                size={15}
                className="shrink-0 text-tertiary"
                aria-hidden
              />
              <span className="font-mono text-[13px] text-foreground">
                {detail.query.text}
              </span>
            </span>
            <span className="flex flex-wrap gap-1.5">
              {detail.query.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </span>
            <span className="text-[10px] text-tertiary">
              {detail.query.issuedBy}
            </span>
          </section>
        </>
      )}
      {detail.hits && (
        <>
          <span className={sectionLabelClass}>{detail.hits.label}</span>
          <section className="flex flex-col gap-0.5 rounded-md border border-border bg-card p-1.5">
            {detail.hits.rows.map((hit) => {
              const Icon = designIcon(hit.icon);
              return (
                <div
                  key={hit.path}
                  className="flex items-center gap-2.5 rounded-[4px] px-2 py-1.5"
                >
                  <Icon
                    size={14}
                    className={`shrink-0 ${hit.used ? 'text-accent-strong' : 'text-tertiary'}`}
                    aria-hidden
                  />
                  <span
                    className={`min-w-0 flex-1 truncate font-mono text-xs ${
                      hit.used ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {hit.path}
                  </span>
                  <span
                    className={`shrink-0 font-mono font-semibold text-[11px] ${
                      hit.used ? 'text-accent-foreground' : 'text-tertiary'
                    }`}
                  >
                    {hit.score}
                  </span>
                  {hit.used && (
                    <span className="shrink-0 rounded-full bg-status-badge-bg px-1.5 py-px font-bold font-mono text-[8px] text-status-badge-text">
                      USED
                    </span>
                  )}
                </div>
              );
            })}
            <span className="px-2 py-1.5 text-[10px] text-faint">
              {detail.hits.footer}
            </span>
          </section>
        </>
      )}
      {detail.fed && (
        <>
          <span className={sectionLabelClass}>WHAT ACTUALLY FED CONTEXT</span>
          <section className="flex flex-col gap-2.5 rounded-md border border-border bg-card p-3.5">
            <p className="text-muted-foreground text-xs">{detail.fed.body}</p>
            <div className="flex h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-status-active"
                style={{ width: `${detail.fed.usedPct}%` }}
              />
            </div>
            <span className="flex items-center gap-4">
              <span className="font-mono text-[9px] text-status-active">
                {detail.fed.usedLegend}
              </span>
              <span className="font-mono text-[9px] text-faint">
                {detail.fed.prunedLegend}
              </span>
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
      {!detail.query && !detail.hits && !detail.fed && (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No detail captured for this item yet.
        </p>
      )}
    </CanvasShell>
  );
}
