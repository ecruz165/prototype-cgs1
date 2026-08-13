import { describe, expect, it } from 'vitest';
import { JobFlowSchema } from '@/schemas/flow';
import { JobSchema } from '@/schemas/job';
import { NodeDetailSchema } from '@/schemas/nodeDetail';

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

  it('serves rich node detail for the running phase and minimal for others', async () => {
    const rich = NodeDetailSchema.parse(
      await (await fetch('/api/jobs/job_8af21c/flow/patch')).json(),
    );
    expect(rich.input).not.toBeNull();
    expect(rich.crossLinks.length).toBeGreaterThan(0);

    const minimal = NodeDetailSchema.parse(
      await (await fetch('/api/jobs/job_8af21c/flow/intake')).json(),
    );
    expect(minimal.input).toBeNull();

    const missing = await fetch('/api/jobs/job_8af21c/flow/nope');
    expect(missing.status).toBe(404);
  });
});
