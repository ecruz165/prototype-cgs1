import { describe, expect, it } from 'vitest';
import { JobFlowSchema } from '@/schemas/flow';
import { JobSchema } from '@/schemas/job';

describe('jobs handler contract', () => {
  it('serves jobs that satisfy JobSchema', async () => {
    const response = await fetch('/api/jobs');
    expect(response.ok).toBe(true);
    const jobs = JobSchema.array().parse(await response.json());
    expect(jobs.length).toBeGreaterThan(0);
  });

  it('serves a flow that satisfies JobFlowSchema', async () => {
    const response = await fetch('/api/jobs/job_8af21c/flow');
    expect(response.ok).toBe(true);
    const flow = JobFlowSchema.parse(await response.json());
    expect(flow.phases).toHaveLength(11);
  });

  it('404s a flow for an unknown job', async () => {
    const response = await fetch('/api/jobs/job_nope/flow');
    expect(response.status).toBe(404);
  });
});
