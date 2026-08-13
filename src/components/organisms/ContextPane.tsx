import { Ticket } from 'lucide-react';
import { PaneWindow } from '@/components/molecules/PaneWindow';
import { designIcon } from '@/lib/designIcons';
import type { ContextItem, JobContextData } from '@/schemas/context';

const statTones = {
  default: 'text-muted-foreground',
  accent: 'text-accent-foreground',
  warning: 'text-status-warning',
  active: 'text-status-active',
  danger: 'text-status-danger',
  muted: 'text-tertiary',
} as const;

interface ContextPaneProps {
  context: JobContextData;
  selectedId: string | undefined;
  onSelect: (itemId: string) => void;
}

// The design's pane-context: demoted inputs, and the queries that show what
// was retrieved vs actually used.
export function ContextPane({
  context,
  selectedId,
  onSelect,
}: ContextPaneProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="font-mono font-semibold text-[10px] text-tertiary">
        CONTEXT
      </span>
      <span className="flex items-center gap-[5px]">
        <Ticket size={12} className="text-tertiary" aria-hidden />
        <span className="font-mono text-[10px] text-tertiary">
          {context.ticket} · {context.flow}
        </span>
      </span>

      <PaneWindow
        label="INPUTS"
        count={
          <span className="font-mono font-semibold text-[10px] text-tertiary">
            demoted
          </span>
        }
      >
        <ItemList
          items={context.inputs}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </PaneWindow>

      <PaneWindow
        label="QUERIES"
        count={
          <span className="font-mono font-semibold text-[10px] text-tertiary">
            {context.queriesLabel}
          </span>
        }
      >
        <ItemList
          items={context.queries}
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
  items: ContextItem[];
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
