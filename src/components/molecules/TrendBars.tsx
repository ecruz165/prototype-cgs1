import type { TrendPoint } from '@/schemas/quality';

const barTones = {
  active: 'bg-status-active',
  warning: 'bg-status-warning',
  danger: 'bg-status-danger',
} as const;

const valueTones = {
  active: 'text-status-active',
  warning: 'text-status-warning',
  danger: 'text-status-danger',
} as const;

// The design's per-phase mini bar chart: value over a column, label under.
export function TrendBars({
  points,
  height = 56,
}: {
  points: TrendPoint[];
  height?: number;
}) {
  return (
    <div className="flex items-end gap-2.5">
      {points.map((point) => (
        <div
          key={point.label}
          className="flex flex-1 flex-col items-center gap-1"
        >
          <span
            className={`font-bold font-mono text-[10px] ${valueTones[point.tone]}`}
          >
            {point.value}%
          </span>
          <div
            className="flex w-full items-end overflow-hidden rounded-[3px] bg-muted"
            style={{ height }}
          >
            <div
              className={`w-full rounded-[3px] ${barTones[point.tone]}`}
              style={{ height: `${point.value}%` }}
            />
          </div>
          <span
            className={`font-semibold text-[9px] ${
              point.labelTone === 'danger'
                ? 'text-status-danger'
                : 'text-tertiary'
            }`}
          >
            {point.label}
          </span>
        </div>
      ))}
    </div>
  );
}
