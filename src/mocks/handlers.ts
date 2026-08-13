import { delay, HttpResponse, http } from 'msw';
import { jobs } from './fixtures';
import { jobFlow } from './flowFixture';
import { nodeDetailFor } from './nodeDetailFixture';

export const handlers = [
  http.get('/api/jobs', async () => {
    // Artificial latency so the pending state is visible in the UI.
    await delay(400);
    return HttpResponse.json(jobs);
  }),
  http.get('/api/jobs/:jobId/flow', async ({ params }) => {
    await delay(300);
    if (!jobs.some((job) => job.id === params.jobId)) {
      return HttpResponse.json({ message: 'unknown job' }, { status: 404 });
    }
    // Every job serves the same design pipeline until flows are per-job.
    return HttpResponse.json(jobFlow);
  }),
  http.get('/api/jobs/:jobId/flow/:phaseId', async ({ params }) => {
    await delay(200);
    const detail =
      jobs.some((job) => job.id === params.jobId) &&
      typeof params.phaseId === 'string'
        ? nodeDetailFor(params.phaseId)
        : undefined;
    if (!detail) {
      return HttpResponse.json({ message: 'unknown node' }, { status: 404 });
    }
    return HttpResponse.json(detail);
  }),
];
