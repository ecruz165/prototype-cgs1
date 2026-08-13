import { Ticket } from 'lucide-react';
import { PaneWindow } from '@/components/molecules/PaneWindow';
import { designIcon } from '@/lib/designIcons';
import type { Decision, JobActivity } from '@/schemas/activity';

const subTones = {
  default: 'text-tertiary',
  accent: 'text-accent-foreground',
  warning: 'text-status-warning',
  active: 'text-status-active',
  danger: 'text-status-danger',
  muted: 'text-tertiary',
} as const;

interface ActivityPaneProps {
  activity: JobActivity;
  selectedId: string | undefined;
  onSelect: (decisionId: string) => void;
}

// The design's pane-activity: the coordinator's decision log.
export function ActivityPane({
  activity,
  selectedId,
  onSelect,
}: ActivityPaneProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="font-mono font-semibold text-[10px] text-tertiary">
        ACTIVITY
      </span>
      <span className="flex items-center gap-[5px]">
        <Ticket size={12} className="text-tertiary" aria-hidden />
        <span className="font-mono text-[10px] text-tertiary">
          {activity.ticket} · {activity.flow}
        </span>
      </span>

      <PaneWindow
        label="COORDINATOR DECISIONS"
        count={
          <span className="font-mono font-semibold text-[10px] text-tertiary">
            {activity.decisions.length}
          </span>
        }
      >
        <ul className="flex flex-col gap-0.5 p-1.5">
          {activity.decisions.map((decision) => (
            <DecisionRow
              key={decision.id}
              decision={decision}
              selected={decision.id === selectedId}
              onSelect={() => onSelect(decision.id)}
            />
          ))}
        </ul>
      </PaneWindow>
    </div>
  );
}

function DecisionRow({
  decision,
  selected,
  onSelect,
}: {
  decision: Decision;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = designIcon(decision.icon);
  return (
    <li>
      <button
        type="button"
        aria-current={selected || undefined}
        onClick={onSelect}
        className={`flex w-full items-start gap-2 rounded-[4px] border px-2.5 py-2 text-left transition-colors ${
          selected
            ? 'border-accent-strong bg-accent'
            : 'border-transparent hover:bg-muted'
        }`}
      >
        <Icon
          size={15}
          className={`mt-0.5 shrink-0 ${selected ? 'text-accent-strong' : 'text-muted-foreground'}`}
          aria-hidden
        />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-semibold text-foreground text-xs">
            {decision.title}
          </span>
          <span
            className={`truncate font-mono text-[10px] ${subTones[decision.subTone]}`}
          >
            {decision.sub}
          </span>
        </span>
      </button>
    </li>
  );
}
