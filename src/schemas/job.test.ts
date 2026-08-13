import { describe, expect, it } from 'vitest';
import { JobSchema } from './job';

const valid = {
  id: 'job_8af21c',
  name: 'Backfill analytics events to BigQuery',
  agent: 'data.etl.bq-loader',
  status: 'running',
  stepIcon: 'sync',
  stepText: 'Streaming page_view shard 14/22 · 1.2M rows/min',
  progress: 62,
  contexts: [{ icon: 'description', label: 'events_2026_q2.sql' }],
  elapsed: '04:18',
  owner: 'EC',
};

describe('JobSchema', () => {
  it('accepts a design-shaped job', () => {
    expect(JobSchema.parse(valid)).toEqual(valid);
  });

  it('rejects an unknown status', () => {
    expect(JobSchema.safeParse({ ...valid, status: 'exploded' }).success).toBe(
      false,
    );
  });

  it('rejects progress outside 0-100', () => {
    expect(JobSchema.safeParse({ ...valid, progress: 140 }).success).toBe(
      false,
    );
  });
});
