import { describe, expect, it } from 'vitest';
import { JobSchema } from '@/schemas/job';

describe('jobs handler contract', () => {
  it('serves jobs that satisfy JobSchema', async () => {
    const response = await fetch('/api/jobs');
    expect(response.ok).toBe(true);
    const jobs = JobSchema.array().parse(await response.json());
    expect(jobs.length).toBeGreaterThan(0);
  });
});
