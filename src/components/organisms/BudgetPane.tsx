import { Ticket } from 'lucide-react';
import { PaneWindow } from '@/components/molecules/PaneWindow';
import { designIcon } from '@/lib/designIcons';
import type { BudgetGate, JobBudget } from '@/schemas/budget';

const rowTones = {
  default: 'text-foreground',
  accent: 'text-accent-foreground',
  warning: 'text-status-warning',
  active: 'text-status-active',
  danger: 'text-status-danger',
  muted: 'text-faint',
} as const;

interface BudgetPaneProps {
  budget: JobBudget;
  selectedId: string | undefined;
  onSelect: (gateId: string) => void;
}

// The design's pane-budget: spend hero with the ceiling bar, and the five
// halting-gate meters.
export function BudgetPane({ budget, selectedId, onSelect }: BudgetPaneProps) {
  const tripped = budget.gates.filter((g) => g.tripped).length;
  const CheckIcon = designIcon('check_circle');

  return (
    <div className="flex flex-col gap-3.5">
      <span className="font-mono font-semibold text-[10px] text-tertiary">
        BUDGET &amp; GATES
      </span>
      <span className="flex items-center gap-[5px]">
        <Ticket size={12} className="text-tertiary" aria-hidden />
        <span className="font-mono text-[10px] text-tertiary">
          {budget.ticket} · {budget.flow}
        </span>
      </span>

      <PaneWindow
        label="BUDGET"
        count={
          <span className="font-mono font-semibold text-[10px] text-tertiary">
            {budget.budget.usedPct}% used
          </span>
        }
      >
        <div className="flex flex-col gap-2 p-3">
          <span className="font-mono font-semibold text-[9px] text-tertiary">
            SPENT SO FAR
          </span>
          <span className="font-bold text-3xl text-foreground">
            {budget.budget.spent}
          </span>
          <span className="text-[11px] text-tertiary">
            {budget.budget.ceiling}
          </span>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent-strong"
              style={{ width: `${budget.budget.usedPct}%` }}
            />
            <span
              aria-hidden
              className="absolute inset-y-0 w-0.5 bg-muted-foreground"
              style={{ left: `${budget.budget.projectedPct}%` }}
            />
          </div>
          <dl className="mt-1 flex flex-col gap-1">
            {budget.budget.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
              >
                <dt className="text-muted-foreground text-xs">{row.label}</dt>
                <dd className={`font-semibold text-xs ${rowTones[row.tone]}`}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex items-center gap-1.5 border-border border-t px-3 py-2">
          <CheckIcon size={13} className="text-status-active" aria-hidden />
          <span className="font-semibold text-[10px] text-status-active">
            {budget.budget.footStatus}
          </span>
          <span className="ml-auto text-[10px] text-tertiary">
            {budget.budget.footNote}
          </span>
        </div>
      </PaneWindow>

      <PaneWindow
        label="HALTING GATES"
        count={
          <span className="font-mono font-semibold text-[10px] text-status-active">
            {budget.gates.length} · all clear
          </span>
        }
      >
        <p className="px-3 pt-2 text-[10px] text-tertiary">
          {budget.gatesNote}
        </p>
        <ul className="flex flex-col gap-0.5 p-1.5">
          {budget.gates.map((gate) => (
            <GateMeter
              key={gate.id}
              gate={gate}
              selected={gate.id === selectedId}
              onSelect={() => onSelect(gate.id)}
            />
          ))}
        </ul>
        <div className="flex items-center gap-1.5 border-border border-t px-3 py-2">
          <CheckIcon size={13} className="text-status-active" aria-hidden />
          <span className="font-semibold text-[10px] text-status-active">
            {tripped} / {budget.gates.length} tripped
          </span>
          <span className="ml-auto text-[10px] text-tertiary">
            {budget.gatesFootNote}
          </span>
        </div>
      </PaneWindow>
    </div>
  );
}

function GateMeter({
  gate,
  selected,
  onSelect,
}: {
  gate: BudgetGate;
  selected: boolean;
  onSelect: () => void;
}) {
  const StatusIcon = designIcon(gate.tripped ? 'cancel' : 'check_circle');
  return (
    <li>
      <button
        type="button"
        aria-current={selected || undefined}
        onClick={onSelect}
        className={`flex w-full flex-col gap-1.5 rounded-[4px] border px-2.5 py-2 text-left transition-colors ${
          selected
            ? 'border-accent-strong bg-accent'
            : 'border-transparent hover:bg-muted'
        }`}
      >
        <span className="flex w-full items-center gap-2">
          <StatusIcon
            size={14}
            className={`shrink-0 ${gate.tripped ? 'text-status-danger' : 'text-status-active'}`}
            aria-hidden
          />
          <span className="min-w-0 flex-1 truncate font-semibold text-foreground text-xs">
            {gate.name}
          </span>
          <span className="shrink-0 font-mono font-semibold text-[10px] text-muted-foreground">
            {gate.now}
          </span>
        </span>
        <span className="block h-1 w-full overflow-hidden rounded-full bg-muted">
          <span
            className={`block h-full rounded-full ${gate.tripped ? 'bg-status-danger' : 'bg-status-active'}`}
            style={{ width: `${gate.usedPct}%` }}
          />
        </span>
        <span className="flex w-full items-center justify-between">
          <span className="font-mono text-[9px] text-tertiary">
            {gate.limit}
          </span>
          <span className="font-mono text-[9px] text-faint">
            {gate.usedPct}% of limit
          </span>
        </span>
      </button>
    </li>
  );
}
