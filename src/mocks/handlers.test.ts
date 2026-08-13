import { describe, expect, it } from 'vitest';
import { JobFlowSchema } from '@/schemas/flow';
import { JobSchema } from '@/schemas/job';
import { NodeDetailSchema } from '@/schemas/nodeDetail';
import { JobSteeringSchema, SteeringDetailSchema } from '@/schemas/steering';

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

  it('serves steering data and request details', async () => {
    const steering = JobSteeringSchema.parse(
      await (await fetch('/api/jobs/job_8af21c/steering')).json(),
    );
    expect(steering.requests).toHaveLength(6);
    expect(steering.team).toHaveLength(5);

    const rich = SteeringDetailSchema.parse(
      await (await fetch('/api/jobs/job_8af21c/steering/approve-merge')).json(),
    );
    expect(rich.actionZone).not.toBeNull();
    expect(rich.deliberation?.votes.approve).toBe(4);

    const minimal = SteeringDetailSchema.parse(
      await (
        await fetch('/api/jobs/job_8af21c/steering/security-review')
      ).json(),
    );
    expect(minimal.actionZone).toBeNull();

    const missing = await fetch('/api/jobs/job_8af21c/steering/nope');
    expect(missing.status).toBe(404);
  });
});
