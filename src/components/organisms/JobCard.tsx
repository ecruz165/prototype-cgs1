import { Link } from '@tanstack/react-router';
import { Clock, MoreHorizontal } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { ContextChip } from '@/components/molecules/ContextChip';
import { designIcon } from '@/lib/designIcons';
import type { Job, JobStatus } from '@/schemas/job';

// The status drives accent bar, step icon, and progress fill together —
// one trio per status, straight from the design's job rows.
const statusTreatments: Record<
  JobStatus,
  { bar: string; icon: string; fill: string }
> = {
  running: {
    bar: 'bg-accent-strong',
    icon: 'text-accent-strong',
    fill: 'bg-accent-strong',
  },
  awaiting: {
    bar: 'bg-status-warning',
    icon: 'text-status-warning',
    fill: 'bg-status-warning',
  },
  failed: {
    bar: 'bg-status-danger',
    icon: 'text-status-danger',
    fill: 'bg-status-danger',
  },
  completed: {
    bar: 'bg-status-active',
    icon: 'text-status-active',
    fill: 'bg-status-active',
  },
};

export function JobCard({ job }: { job: Job }) {
  const t = statusTreatments[job.status];
  const StepIcon = designIcon(job.stepIcon);
  return (
    <div className="flex items-center gap-[18px] rounded-lg border border-border-subtle bg-card px-[18px] py-3.5">
      <span
        className={`h-12 w-[3px] shrink-0 rounded-[2px] ${t.bar}`}
        aria-hidden
      />
      <StatusBadge status={job.status} />
      <div className="flex min-w-0 flex-1 flex-col gap-[7px]">
        <div className="flex items-center gap-2.5">
          <Link
            to="/jobs/$jobId"
            params={{ jobId: job.id }}
            className="truncate font-semibold text-[15px] text-foreground transition-colors hover:text-accent-foreground"
          >
            {job.name}
          </Link>
          <span className="shrink-0 font-mono text-[11px] text-tertiary">
            {job.id}
          </span>
          <span className="text-[13px] text-faint" aria-hidden>
            ·
          </span>
          <span className="shrink-0 whitespace-nowrap font-medium font-mono text-[11px] text-muted-foreground">
            {job.agent}
          </span>
        </div>
        <div className="flex items-center gap-[9px]">
          <StepIcon size={13} className={`shrink-0 ${t.icon}`} aria-hidden />
          <span className="truncate text-muted-foreground text-xs">
            {job.stepText}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-[5px] w-full max-w-[560px] overflow-hidden rounded-[3px] bg-border">
            <div
              className={`h-full rounded-[3px] ${t.fill}`}
              style={{ width: `${job.progress}%` }}
            />
          </div>
          <span className="font-medium font-mono text-[11px] text-tertiary">
            {job.progress}%
          </span>
        </div>
      </div>
      <div className="flex shrink-0 gap-1.5">
        {job.contexts.map((context) => (
          <ContextChip key={context.label} context={context} />
        ))}
      </div>
      <div className="flex shrink-0 flex-col items-start gap-1">
        <span className="flex items-center gap-[5px]">
          <Clock size={12} className="text-tertiary" aria-hidden />
          <span className="font-mono font-semibold text-muted-foreground text-xs">
            {job.elapsed}
          </span>
        </span>
        <span className="text-[10px] text-tertiary">elapsed</span>
      </div>
      <Avatar initials={job.owner} size="sm" />
      <button
        type="button"
        aria-label={`Actions for ${job.name}`}
        className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
      >
        <MoreHorizontal size={16} aria-hidden />
      </button>
    </div>
  );
}
