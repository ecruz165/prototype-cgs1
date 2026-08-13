import { Ticket } from 'lucide-react';
import { PaneWindow } from '@/components/molecules/PaneWindow';
import { designIcon } from '@/lib/designIcons';
import type {
  JobSteering,
  SteeringRequest,
  TeamMember,
} from '@/schemas/steering';

// Request state pills, straight from the design's pane-steering rows.
export const requestStatePills: Record<
  SteeringRequest['state'],
  { pill: string; label: string }
> = {
  blocking: {
    pill: 'bg-status-danger-subtle text-status-danger',
    label: 'BLOCKING',
  },
  changes: {
    pill: 'bg-status-warning-subtle text-status-warning',
    label: 'CHANGES',
  },
  approved: {
    pill: 'bg-status-badge-bg text-status-badge-text',
    label: 'APPROVED',
  },
  awaiting: {
    pill: 'bg-status-warning-subtle text-status-warning',
    label: 'AWAITING',
  },
  open: { pill: 'bg-muted text-muted-foreground', label: 'OPEN' },
  queued: { pill: 'bg-muted text-faint', label: 'QUEUED' },
};

function AuthorityTag({ authority }: { authority: 'commit' | 'advise' }) {
  const Icon = designIcon(authority === 'commit' ? 'gavel' : 'how_to_vote');
  const tone = authority === 'commit' ? 'text-accent-foreground' : 'text-faint';
  return (
    <span className={`flex items-center gap-1 font-mono text-[9px] ${tone}`}>
      <Icon size={12} aria-hidden />
      {authority === 'commit' ? 'you commit' : 'advise'}
    </span>
  );
}

interface SteeringPaneProps {
  steering: JobSteering;
  selectedId: string | undefined;
  onSelect: (id: string) => void;
}

export function SteeringPane({
  steering,
  selectedId,
  onSelect,
}: SteeringPaneProps) {
  const blocking = steering.requests.filter(
    (r) => r.state === 'blocking',
  ).length;
  const connected = steering.team.filter(
    (m) => m.connection === 'connected',
  ).length;

  return (
    <div className="flex flex-col gap-3.5">
      <span className="font-mono font-semibold text-[10px] text-tertiary">
        STEERING
      </span>
      <span className="flex items-center gap-[5px]">
        <Ticket size={12} className="text-tertiary" aria-hidden />
        <span className="font-mono text-[10px] text-tertiary">
          {steering.ticket} · {steering.flow}
        </span>
      </span>

      <PaneWindow
        label="REQUESTS"
        count={
          <span className="font-mono font-semibold text-[10px] text-status-danger">
            {steering.requests.length} · {blocking} blocking
          </span>
        }
      >
        <ul className="flex flex-col gap-0.5 p-1.5">
          {steering.requests.map((request) => (
            <RequestRow
              key={request.id}
              request={request}
              selected={request.id === selectedId}
              onSelect={() => onSelect(request.id)}
            />
          ))}
        </ul>
      </PaneWindow>

      <PaneWindow
        label="TEAM"
        count={
          <span className="font-mono text-[10px] text-tertiary">
            {steering.team.length} members · {connected} connected
          </span>
        }
      >
        <ul className="flex flex-col gap-0.5 p-1.5">
          {steering.team.map((member) => (
            <MemberRow key={member.initials} member={member} />
          ))}
        </ul>
      </PaneWindow>
    </div>
  );
}

function RequestRow({
  request,
  selected,
  onSelect,
}: {
  request: SteeringRequest;
  selected: boolean;
  onSelect: () => void;
}) {
  const state = requestStatePills[request.state];
  return (
    <li>
      <button
        type="button"
        aria-current={selected || undefined}
        onClick={onSelect}
        className={`flex w-full items-start gap-2 rounded-sm border p-2.5 text-left transition-colors ${
          selected
            ? 'border-accent-strong bg-accent'
            : 'border-transparent hover:bg-muted'
        }`}
      >
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate font-medium text-foreground text-xs">
            {request.title}
          </span>
          <span className="font-mono text-[10px] text-tertiary">
            {request.sub}
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={`rounded-full px-2 py-0.5 font-bold font-mono text-[9px] ${state.pill}`}
          >
            {state.label}
          </span>
          <AuthorityTag authority={request.authority} />
        </span>
      </button>
    </li>
  );
}

function MemberRow({ member }: { member: TeamMember }) {
  const sme = member.specs.length > 0;
  const OwnerIcon = designIcon(
    member.authority === 'owner' ? 'gavel' : 'how_to_vote',
  );
  return (
    <li className="flex items-center gap-2.5 rounded-[4px] p-1.5">
      <span
        className={`flex size-[26px] shrink-0 items-center justify-center rounded-full font-bold text-[10px] ${
          sme
            ? 'bg-accent text-accent-foreground'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {member.initials}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-baseline gap-1.5">
          <span className="truncate font-medium text-foreground text-xs">
            {member.name}
          </span>
          <span className="shrink-0 text-[10px] text-tertiary">
            {member.role}
          </span>
        </span>
        {sme && (
          <span className="flex gap-1">
            {member.specs.map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-border px-1.5 font-mono text-[9px] text-muted-foreground"
              >
                {spec}
              </span>
            ))}
          </span>
        )}
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1">
        <span className="flex items-center gap-1 text-[9px] text-tertiary">
          <span
            aria-hidden
            className={`size-1.5 rounded-full ${
              member.connection === 'connected'
                ? 'bg-status-active'
                : 'bg-faint'
            }`}
          />
          {member.connection === 'connected' ? 'Connected' : 'Invited'}
        </span>
        <span
          className={`flex items-center gap-1 font-mono text-[9px] ${
            member.authority === 'owner'
              ? 'text-accent-foreground'
              : 'text-faint'
          }`}
        >
          <OwnerIcon size={11} aria-hidden />
          {member.authority}
        </span>
      </span>
    </li>
  );
}
