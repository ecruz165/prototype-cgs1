import { ChevronDown, ChevronRight, Ticket } from 'lucide-react';
import { useState } from 'react';
import { designIcon } from '@/lib/designIcons';
import type { FlowPhase, JobFlow } from '@/schemas/flow';

const iconTones: Record<FlowPhase['tone'], string> = {
  active: 'text-status-active',
  accent: 'text-accent-strong',
  warning: 'text-status-warning',
  muted: 'text-faint',
  secondary: 'text-muted-foreground',
};

const detailTones: Record<FlowPhase['detailTone'], string> = {
  default: 'text-tertiary',
  accent: 'text-accent-foreground',
  warning: 'text-status-warning',
  muted: 'text-faint',
  secondary: 'text-muted-foreground',
};

interface FlowPaneProps {
  flow: JobFlow;
  selectedId: string | undefined;
  onSelect: (id: string) => void;
}

// The design's pane-flow: phases as a spine (connector turns accent once a
// phase completes), fork children indented, selection feeds the canvas.
export function FlowPane({ flow, selectedId, onSelect }: FlowPaneProps) {
  const [open, setOpen] = useState(true);
  const Chevron = open ? ChevronDown : ChevronRight;
  const statusWord = flow.phases.some((p) => p.status === 'running')
    ? 'running'
    : 'idle';

  return (
    <div className="flex flex-col gap-3.5">
      <span className="font-mono font-semibold text-[10px] text-tertiary">
        FLOW
      </span>
      <span className="flex items-center gap-[5px]">
        <Ticket size={12} className="text-tertiary" aria-hidden />
        <span className="font-mono text-[10px] text-tertiary">
          {flow.ticket} · {flow.flow}
        </span>
      </span>
      <section className="rounded-md border border-border bg-card">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-[34px] w-full items-center gap-2 px-3"
        >
          <Chevron size={16} className="text-tertiary" aria-hidden />
          <span className="font-mono font-semibold text-[11px] text-foreground">
            PIPELINE
          </span>
          <span className="ml-auto font-mono font-semibold text-[10px] text-accent-foreground">
            {statusWord} · {flow.phases.length} phases
          </span>
        </button>
        {open && (
          <ul className="flex flex-col border-border border-t p-1.5">
            {flow.phases.map((phase, index) => (
              <PhaseNode
                key={phase.id}
                phase={phase}
                last={index === flow.phases.length - 1}
                selected={phase.id === selectedId}
                onSelect={() => onSelect(phase.id)}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function PhaseNode({
  phase,
  last,
  selected,
  onSelect,
}: {
  phase: FlowPhase;
  last: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = designIcon(phase.icon);
  const emphasis = selected
    ? 'border-accent-strong bg-accent'
    : phase.status === 'suspended'
      ? 'border-status-warning bg-status-warning-subtle'
      : 'border-transparent hover:bg-muted';

  return (
    <li className={phase.indent ? 'pl-4' : undefined}>
      <button
        type="button"
        aria-current={selected || undefined}
        onClick={onSelect}
        className={`flex h-[46px] w-full items-center gap-2.5 rounded-[4px] border px-2 py-1.5 text-left transition-colors ${emphasis}`}
      >
        <span className="flex h-full w-5 shrink-0 flex-col items-center">
          <Icon
            size={18}
            className={`shrink-0 ${iconTones[phase.tone]}`}
            aria-hidden
          />
          {!last && (
            <span
              aria-hidden
              className={`mt-0.5 w-0.5 flex-1 ${
                phase.status === 'done' ? 'bg-accent-strong' : 'bg-border'
              }`}
            />
          )}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex items-baseline gap-2">
            <span className="truncate font-semibold text-foreground text-xs">
              {phase.name}
            </span>
            <span className="shrink-0 font-semibold text-[9px] text-muted-foreground">
              {phase.kind}
            </span>
          </span>
          <span
            className={`truncate text-[10px] ${detailTones[phase.detailTone]}`}
          >
            {phase.detail}
          </span>
        </span>
      </button>
    </li>
  );
}
