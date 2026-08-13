import type { JobStatus } from '@/schemas/job';

// Pill anatomy from the design's StatusBadge components: 7px dot, 12/600
// label, status-token trio per variant.
const treatments: Record<
  JobStatus,
  { pill: string; dot: string; label: string }
> = {
  running: {
    pill: 'bg-accent',
    dot: 'bg-accent-strong',
    label: 'text-accent-foreground',
  },
  awaiting: {
    pill: 'bg-status-warning-subtle',
    dot: 'bg-status-warning',
    label: 'text-status-warning',
  },
  failed: {
    pill: 'bg-status-danger-subtle',
    dot: 'bg-status-danger',
    label: 'text-status-danger',
  },
  completed: {
    pill: 'bg-status-badge-bg',
    dot: 'bg-status-active',
    label: 'text-status-badge-text',
  },
};

const labels: Record<JobStatus, string> = {
  running: 'Running',
  awaiting: 'Awaiting',
  failed: 'Failed',
  completed: 'Completed',
};

export function StatusBadge({ status }: { status: JobStatus }) {
  const t = treatments[status];
  return (
    <span
      className={`flex items-center gap-1.5 rounded-full px-[11px] py-[5px] ${t.pill}`}
    >
      <span className={`size-[7px] rounded-full ${t.dot}`} aria-hidden />
      <span className={`font-semibold text-xs ${t.label}`}>
        {labels[status]}
      </span>
    </span>
  );
}
