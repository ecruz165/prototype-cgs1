import { CanvasShell } from '@/components/molecules/CanvasShell';
import { CrossLink } from '@/components/molecules/CrossLink';
import { requestStatePills } from '@/components/organisms/SteeringPane';
import { designIcon } from '@/lib/designIcons';
import type { SteeringDetail } from '@/schemas/steering';

const sectionLabelClass = 'font-mono font-semibold text-[10px] text-tertiary';

// The design's "Main Pane · Steering Request Detail": context, the
// owner-commit action zone, advisory experts, the deliberation thread, and
// the REQUEST props rail.
export function SteeringDetailCanvas({
  jobId,
  detail,
}: {
  jobId: string;
  detail: SteeringDetail;
}) {
  const state = requestStatePills[detail.state];
  const GavelIcon = designIcon('gavel');
  return (
    <CanvasShell
      title={detail.title}
      pills={
        <>
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 font-bold font-mono text-[10px] text-muted-foreground">
            {detail.kind}
          </span>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 font-bold font-mono text-[10px] ${state.pill}`}
          >
            ● {state.label}
          </span>
        </>
      }
      meta={detail.meta}
      breadcrumb={detail.breadcrumb}
      railLabel="REQUEST"
      railProps={detail.props}
    >
      {detail.context && (
        <>
          <span className={sectionLabelClass}>CONTEXT</span>
          <section className="flex flex-col gap-2 rounded-md border border-border bg-card p-3.5">
            <p className="font-semibold text-[13px] text-foreground">
              {detail.context.headline}
            </p>
            <p className="text-muted-foreground text-xs">
              {detail.context.body}
            </p>
          </section>
          <CrossLink jobId={jobId} {...detail.context.link} />
        </>
      )}
      {detail.actionZone && (
        <>
          <span className="font-bold font-mono text-[10px] text-accent-foreground">
            {detail.actionZone.label}
          </span>
          <section className="flex flex-col gap-3 rounded-md border border-border bg-card p-3.5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-bold text-[13px] text-foreground">
                {detail.actionZone.title}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-[3px] font-bold font-mono text-[10px] text-accent-foreground">
                <ShieldIcon />
                {detail.actionZone.badge}
              </span>
            </div>
            <span className="font-mono text-[10px] text-tertiary">
              {detail.actionZone.sub}
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="flex items-center gap-2 rounded-md bg-accent-strong px-4 py-2.5 font-bold text-[13px] text-on-accent"
              >
                <MergeIcon />
                Approve &amp; merge
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-medium text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <RateIcon />
                Request changes
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-medium text-[13px] text-status-danger"
              >
                <BanIcon />
                Reject
              </button>
            </div>
          </section>
        </>
      )}
      {detail.experts.length > 0 && (
        <>
          <span className="flex items-center gap-2">
            <span className={sectionLabelClass}>RELEVANT EXPERTS</span>
            <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 font-bold font-mono text-[9px] text-tertiary">
              <InfoIcon />
              ADVISORY · CANNOT COMMIT
            </span>
          </span>
          <section className="flex flex-col gap-0.5 rounded-md bg-muted p-1.5">
            {detail.experts.map((expert) => (
              <div
                key={expert.initials}
                className="flex items-center gap-2.5 rounded-[4px] p-2"
              >
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full font-bold text-[11px] text-white"
                  style={{ backgroundColor: expert.color }}
                >
                  {expert.initials}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="flex items-center gap-1.5">
                    {expert.pinned && <PinIcon />}
                    <span className="truncate font-semibold text-foreground text-xs">
                      {expert.name}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-px font-bold font-mono text-[9px] ${
                        expert.roleTone === 'accent'
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-card text-tertiary'
                      }`}
                    >
                      {expert.role}
                    </span>
                  </span>
                  <span className="truncate text-[10px] text-tertiary">
                    {expert.note}
                  </span>
                </span>
                <button
                  type="button"
                  className="flex shrink-0 items-center gap-1.5 font-semibold text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SendIcon />
                  Reach out
                </button>
              </div>
            ))}
          </section>
        </>
      )}
      {detail.deliberation && (
        <>
          <span className={sectionLabelClass}>DELIBERATION THREAD</span>
          <div className="flex items-start gap-2.5">
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full font-bold text-[11px] text-white"
              style={{ backgroundColor: detail.deliberation.proposal.color }}
            >
              {detail.deliberation.proposal.initials}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5 rounded-md border border-border bg-card px-3 py-2.5">
              <span className="flex items-baseline gap-2">
                <span className="font-semibold text-foreground text-xs">
                  {detail.deliberation.proposal.name}
                </span>
                <span className="text-[10px] text-tertiary">
                  {detail.deliberation.proposal.role}
                </span>
                <span className="rounded-full bg-accent px-2 py-px font-bold font-mono text-[9px] text-accent-foreground">
                  PROPOSAL
                </span>
                <span className="text-[10px] text-tertiary">
                  · {detail.deliberation.proposal.age}
                </span>
              </span>
              <p className="text-muted-foreground text-xs">
                {detail.deliberation.proposal.text}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md bg-muted px-3 py-2">
            <VoteIcon />
            <span className="font-bold font-mono text-[9px] text-tertiary">
              PEER VOTES
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-muted-foreground text-xs">
              <ThumbIcon />
              {detail.deliberation.votes.approve} approve
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-muted-foreground text-xs">
              <EditIcon />
              {detail.deliberation.votes.requestChanges} request changes
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-md bg-accent px-3 py-2.5">
            <GavelIcon
              size={16}
              className="shrink-0 text-accent-strong"
              aria-hidden
            />
            <p className="font-semibold text-foreground text-xs">
              {detail.deliberation.verdict}
            </p>
          </div>
        </>
      )}
      {!detail.context && !detail.deliberation && (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No detail captured for this request yet.
        </p>
      )}
    </CanvasShell>
  );
}

function iconOf(name: string, className: string, size = 14) {
  const Icon = designIcon(name);
  return <Icon size={size} className={className} aria-hidden />;
}
const ShieldIcon = () => iconOf('shield_person', 'text-accent-strong', 13);
const MergeIcon = () => iconOf('merge', 'text-on-accent', 16);
const RateIcon = () => iconOf('rate_review', 'text-muted-foreground', 16);
const BanIcon = () => iconOf('block', 'text-status-danger', 16);
const InfoIcon = () => iconOf('info', 'text-tertiary', 11);
const PinIcon = () => iconOf('keep', 'text-accent-strong', 12);
const SendIcon = () => iconOf('send', 'text-muted-foreground', 12);
const VoteIcon = () => iconOf('how_to_vote', 'text-muted-foreground', 14);
const ThumbIcon = () => iconOf('thumb_up', 'text-status-active', 13);
const EditIcon = () => iconOf('edit_note', 'text-status-warning', 14);
