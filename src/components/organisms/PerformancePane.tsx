import { Ticket } from 'lucide-react';
import { PaneWindow } from '@/components/molecules/PaneWindow';
import { designIcon } from '@/lib/designIcons';
import type { JobPerformance, PerfItem } from '@/schemas/performance';

const statTones = {
  default: 'text-muted-foreground',
  accent: 'text-accent-foreground',
  warning: 'text-status-warning',
  active: 'text-status-active',
  danger: 'text-status-danger',
  muted: 'text-faint',
} as const;

interface PerformancePaneProps {
  performance: JobPerformance;
  selectedId: string | undefined;
  onSelect: (itemId: string) => void;
}

// The design's pane-perf: model usage, connection state, and failures.
export function PerformancePane({
  performance,
  selectedId,
  onSelect,
}: PerformancePaneProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="font-mono font-semibold text-[10px] text-tertiary">
        PERFORMANCE
      </span>
      <span className="flex items-center gap-[5px]">
        <Ticket size={12} className="text-tertiary" aria-hidden />
        <span className="font-mono text-[10px] text-tertiary">
          {performance.ticket} · {performance.flow}
        </span>
      </span>

      <PaneWindow
        label="MODEL USAGE"
        count={
          <span className="font-mono font-semibold text-[10px] text-tertiary">
            {performance.models.length} engines
          </span>
        }
      >
        <ItemList
          items={performance.models}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </PaneWindow>

      <PaneWindow
        label="CONNECTION STATE"
        count={
          <span className="font-mono font-semibold text-[10px] text-status-active">
            healthy
          </span>
        }
      >
        <ItemList
          items={performance.connections}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </PaneWindow>

      <PaneWindow
        label="FAILURES"
        count={
          <span className="font-mono font-semibold text-[10px] text-status-warning">
            {performance.failuresLabel}
          </span>
        }
      >
        <ItemList
          items={performance.failures}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </PaneWindow>
    </div>
  );
}

function ItemList({
  items,
  selectedId,
  onSelect,
}: {
  items: PerfItem[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-0.5 p-1.5">
      {items.map((item) => {
        const Icon = designIcon(item.icon);
        const selected = item.id === selectedId;
        return (
          <li key={item.id}>
            <button
              type="button"
              aria-current={selected || undefined}
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-2 rounded-[4px] border px-2.5 py-2 text-left transition-colors ${
                selected
                  ? 'border-accent-strong bg-accent'
                  : 'border-transparent hover:bg-muted'
              }`}
            >
              <Icon
                size={15}
                className={`shrink-0 ${selected ? 'text-accent-strong' : 'text-muted-foreground'}`}
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate text-foreground text-xs">
                {item.name}
              </span>
              <span
                className={`shrink-0 font-mono font-semibold text-[10px] ${statTones[item.statTone]}`}
              >
                {item.stat}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
