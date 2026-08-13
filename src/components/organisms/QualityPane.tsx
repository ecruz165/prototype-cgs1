import { Ticket } from 'lucide-react';
import { PaneWindow } from '@/components/molecules/PaneWindow';
import { TrendBars } from '@/components/molecules/TrendBars';
import { designIcon } from '@/lib/designIcons';
import type { JobQuality, QualityGate } from '@/schemas/quality';

interface QualityPaneProps {
  quality: JobQuality;
  selectedId: string | undefined;
  onSelect: (gateId: string) => void;
}

// The design's pane-quality: merge-blocked banner, grouped gates with lock
// badges, and the per-phase pass-rate trend.
export function QualityPane({
  quality,
  selectedId,
  onSelect,
}: QualityPaneProps) {
  const allGates = quality.groups.flatMap((g) => g.gates);
  const passed = allGates.filter((g) => g.status === 'pass').length;
  const failing = allGates.length - passed;
  const BlockIcon = designIcon('block');

  return (
    <div className="flex flex-col gap-3.5">
      <span className="font-mono font-semibold text-[10px] text-tertiary">
        QUALITY
      </span>
      <span className="flex items-center gap-[5px]">
        <Ticket size={12} className="text-tertiary" aria-hidden />
        <span className="font-mono text-[10px] text-tertiary">
          {quality.ticket} · {quality.flow}
        </span>
      </span>

      {quality.banner && (
        <div className="flex items-center gap-2 rounded-sm bg-status-danger-subtle px-2.5 py-2">
          <BlockIcon
            size={14}
            className="shrink-0 text-status-danger"
            aria-hidden
          />
          <span className="min-w-0 flex-1 truncate font-semibold text-status-danger text-xs">
            {quality.banner.text}
          </span>
          <span className="shrink-0 font-semibold text-[11px] text-status-danger">
            {quality.banner.stat}
          </span>
        </div>
      )}

      <PaneWindow
        label="QUALITY GATES"
        count={
          <span className="font-mono font-semibold text-[10px]">
            <span className="text-muted-foreground">
              {passed}/{allGates.length}
            </span>
            <span className="text-faint"> · </span>
            <span className="text-status-danger">{failing} failing</span>
          </span>
        }
      >
        <div className="flex flex-col gap-2.5 p-1.5">
          {quality.groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-0.5">
              <div className="flex items-baseline justify-between px-1 pt-1">
                <span className="font-bold font-mono text-[10px] text-tertiary">
                  {group.label}
                </span>
                <span className="font-mono font-semibold text-[9px] text-faint">
                  {group.gates.filter((g) => g.status === 'pass').length}/
                  {group.gates.length}
                </span>
              </div>
              <ul className="flex flex-col gap-0.5">
                {group.gates.map((gate) => (
                  <GateRow
                    key={gate.id}
                    gate={gate}
                    selected={gate.id === selectedId}
                    onSelect={() => onSelect(gate.id)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PaneWindow>

      <PaneWindow
        label="PER-PHASE TREND"
        count={
          <span className="font-mono font-semibold text-[10px] text-tertiary">
            {quality.trend.label}
          </span>
        }
      >
        <div className="p-3">
          <TrendBars points={quality.trend.points} height={48} />
        </div>
      </PaneWindow>
    </div>
  );
}

function GateRow({
  gate,
  selected,
  onSelect,
}: {
  gate: QualityGate;
  selected: boolean;
  onSelect: () => void;
}) {
  const failed = gate.status === 'fail';
  const StatusIcon = designIcon(failed ? 'cancel' : 'check_circle');
  const LockIcon = designIcon('lock');
  return (
    <li>
      <button
        type="button"
        aria-current={selected || undefined}
        onClick={onSelect}
        className={`flex w-full items-center gap-2 rounded-[4px] border px-2 py-1.5 text-left transition-colors ${
          selected
            ? 'border-accent-strong bg-accent'
            : 'border-transparent hover:bg-muted'
        }`}
      >
        <StatusIcon
          size={15}
          className={`shrink-0 ${failed ? 'text-status-danger' : 'text-status-active'}`}
          aria-hidden
        />
        <span
          className={`min-w-0 flex-1 truncate text-xs ${
            failed ? 'font-semibold text-foreground' : 'text-muted-foreground'
          }`}
        >
          {gate.name}
        </span>
        <span
          className={`shrink-0 font-mono font-semibold text-[11px] ${
            failed ? 'text-status-danger' : 'text-status-active'
          }`}
        >
          {gate.stat}
        </span>
        {gate.locked && (
          <LockIcon size={12} className="shrink-0 text-faint" aria-hidden />
        )}
      </button>
    </li>
  );
}
