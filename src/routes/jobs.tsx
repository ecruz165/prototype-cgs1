import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpDown, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SegmentedControl } from '@/components/molecules/SegmentedControl';
import { JobCard } from '@/components/organisms/JobCard';
import { fetchJobs } from '@/lib/api';
import type { Job, JobStatus } from '@/schemas/job';

export const Route = createFileRoute('/jobs')({ component: JobsPage });

type StatusFilter = 'all' | JobStatus;
type Scope = 'my' | 'all' | 'team';

const statusOrder: JobStatus[] = ['running', 'awaiting', 'failed', 'completed'];
const statusNames: Record<JobStatus, string> = {
  running: 'Running',
  awaiting: 'Awaiting',
  failed: 'Failed',
  completed: 'Completed',
};

function matchesSearch(job: Job, term: string) {
  const haystack = [
    job.name,
    job.id,
    job.agent,
    ...job.contexts.map((c) => c.label),
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(term.toLowerCase());
}

function JobsPage() {
  const {
    data: jobs,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
  // Scope has no data meaning until jobs carry owners vs. viewer identity.
  const [scope, setScope] = useState<Scope>('my');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => {
    const byStatus = { running: 0, awaiting: 0, failed: 0, completed: 0 };
    for (const job of jobs ?? []) byStatus[job.status] += 1;
    return { ...byStatus, total: jobs?.length ?? 0 };
  }, [jobs]);

  const visible = useMemo(
    () =>
      (jobs ?? []).filter(
        (job) =>
          (status === 'all' || job.status === status) &&
          (search === '' || matchesSearch(job, search)),
      ),
    [jobs, status, search],
  );

  const statusOptions = [
    { value: 'all' as StatusFilter, label: `All · ${counts.total}` },
    ...statusOrder.map((s) => ({
      value: s as StatusFilter,
      // The design appends counts only where they exist (Completed shows none).
      label:
        counts[s] > 0 ? `${statusNames[s]} · ${counts[s]}` : statusNames[s],
    })),
  ];

  return (
    <main className="flex flex-col gap-5 px-7 py-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-[26px] text-foreground">Jobs</h1>
          <span className="flex items-center gap-2 rounded-full bg-muted px-3 py-[5px]">
            <span
              className="size-[7px] rounded-full bg-accent-strong"
              aria-hidden
            />
            <span className="font-mono font-semibold text-accent-foreground text-xs">
              {counts.running} running · {counts.total} total
            </span>
          </span>
        </div>
        <Link
          to="/new-job"
          className="flex items-center gap-2 rounded-md bg-accent-strong px-4 py-[9px] font-semibold text-on-accent text-sm"
        >
          <Plus size={18} aria-hidden />
          New Job
        </Link>
      </header>

      <div className="flex items-center gap-4">
        <SegmentedControl
          ariaLabel="Scope"
          value={scope}
          onChange={setScope}
          options={[
            { value: 'my', label: 'My Jobs' },
            { value: 'all', label: 'All Jobs' },
            { value: 'team', label: 'Team' },
          ]}
        />
        <div className="flex-1" />
        <label className="flex w-[340px] items-center gap-2 rounded-md border border-border bg-muted px-3 py-[9px]">
          <Search size={18} className="shrink-0 text-tertiary" aria-hidden />
          <input
            type="search"
            aria-label="Search jobs"
            placeholder="Search jobs, tickets, agents…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-tertiary"
          />
        </label>
      </div>

      <div className="flex items-center gap-2">
        <SegmentedControl
          ariaLabel="Status filter"
          value={status}
          onChange={setStatus}
          options={statusOptions}
        />
        <div className="flex-1" />
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-sm bg-muted px-2.5 py-1.5 text-[13px] text-muted-foreground"
        >
          <ArrowUpDown size={16} className="text-tertiary" aria-hidden />
          Recent
        </button>
      </div>

      {isPending && (
        <p className="py-10 text-center text-muted-foreground text-sm">
          Loading jobs…
        </p>
      )}
      {isError && (
        <p className="py-10 text-center text-sm text-status-danger">
          Couldn't load jobs. Retry shortly.
        </p>
      )}
      {jobs && (
        <ul className="flex flex-col gap-2.5">
          {visible.map((job) => (
            <li key={job.id}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
