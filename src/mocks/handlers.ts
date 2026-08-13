import { delay, HttpResponse, http } from 'msw';
import { decisionDetailFor, jobActivity } from './activityFixture';
import { haltDetailFor, jobBudget } from './budgetFixture';
import { jobContext, queryDetailFor } from './contextFixture';
import { jobs } from './fixtures';
import { jobFlow } from './flowFixture';
import { newJobDraft } from './newJobFixture';
import { nodeDetailFor } from './nodeDetailFixture';
import { notifications } from './notificationsFixture';
import {
  buildSection,
  manageSection,
  planSection,
  runSection,
  validateSection,
} from './workbenchFixture';

const workspaceSections: Record<string, unknown> = {
  plan: planSection,
  build: buildSection,
  validate: validateSection,
  run: runSection,
};

import { fileDiffFor, jobOutput } from './outputFixture';
import { jobPerformance, perfDetailFor } from './performanceFixture';
import { gateDetailFor, jobQuality } from './qualityFixture';
import { jobSteering, steeringDetailFor } from './steeringFixture';

export const handlers = [
  http.get('/api/workspace/:hat', async ({ params }) => {
    await delay(200);
    const section =
      typeof params.hat === 'string'
        ? workspaceSections[params.hat]
        : undefined;
    if (!section) {
      return HttpResponse.json({ message: 'unknown hat' }, { status: 404 });
    }
    return HttpResponse.json(section);
  }),
  http.get('/api/manage', async () => {
    await delay(200);
    return HttpResponse.json(manageSection);
  }),
  http.get('/api/new-job', async () => {
    await delay(200);
    return HttpResponse.json(newJobDraft);
  }),
  http.get('/api/notifications', async () => {
    await delay(200);
    return HttpResponse.json(notifications);
  }),
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
  http.get('/api/jobs/:jobId/steering', async ({ params }) => {
    await delay(250);
    if (!jobs.some((job) => job.id === params.jobId)) {
      return HttpResponse.json({ message: 'unknown job' }, { status: 404 });
    }
    return HttpResponse.json(jobSteering);
  }),
  http.get('/api/jobs/:jobId/steering/:requestId', async ({ params }) => {
    await delay(200);
    const detail =
      jobs.some((job) => job.id === params.jobId) &&
      typeof params.requestId === 'string'
        ? steeringDetailFor(params.requestId)
        : undefined;
    if (!detail) {
      return HttpResponse.json({ message: 'unknown request' }, { status: 404 });
    }
    return HttpResponse.json(detail);
  }),
  http.get('/api/jobs/:jobId/output', async ({ params }) => {
    await delay(250);
    if (!jobs.some((job) => job.id === params.jobId)) {
      return HttpResponse.json({ message: 'unknown job' }, { status: 404 });
    }
    return HttpResponse.json(jobOutput);
  }),
  http.get('/api/jobs/:jobId/output/files/:fileId', async ({ params }) => {
    await delay(200);
    const diff =
      jobs.some((job) => job.id === params.jobId) &&
      typeof params.fileId === 'string'
        ? fileDiffFor(decodeURIComponent(params.fileId))
        : undefined;
    if (!diff) {
      return HttpResponse.json({ message: 'unknown file' }, { status: 404 });
    }
    return HttpResponse.json(diff);
  }),
  http.get('/api/jobs/:jobId/activity', async ({ params }) => {
    await delay(250);
    if (!jobs.some((job) => job.id === params.jobId)) {
      return HttpResponse.json({ message: 'unknown job' }, { status: 404 });
    }
    return HttpResponse.json(jobActivity);
  }),
  http.get('/api/jobs/:jobId/activity/:decisionId', async ({ params }) => {
    await delay(200);
    const detail =
      jobs.some((job) => job.id === params.jobId) &&
      typeof params.decisionId === 'string'
        ? decisionDetailFor(params.decisionId)
        : undefined;
    if (!detail) {
      return HttpResponse.json(
        { message: 'unknown decision' },
        { status: 404 },
      );
    }
    return HttpResponse.json(detail);
  }),
  http.get('/api/jobs/:jobId/budget', async ({ params }) => {
    await delay(250);
    if (!jobs.some((job) => job.id === params.jobId)) {
      return HttpResponse.json({ message: 'unknown job' }, { status: 404 });
    }
    return HttpResponse.json(jobBudget);
  }),
  http.get('/api/jobs/:jobId/budget/:gateId', async ({ params }) => {
    await delay(200);
    const detail =
      jobs.some((job) => job.id === params.jobId) &&
      typeof params.gateId === 'string'
        ? haltDetailFor(params.gateId)
        : undefined;
    if (!detail) {
      return HttpResponse.json({ message: 'unknown gate' }, { status: 404 });
    }
    return HttpResponse.json(detail);
  }),
  http.get('/api/jobs/:jobId/context', async ({ params }) => {
    await delay(250);
    if (!jobs.some((job) => job.id === params.jobId)) {
      return HttpResponse.json({ message: 'unknown job' }, { status: 404 });
    }
    return HttpResponse.json(jobContext);
  }),
  http.get('/api/jobs/:jobId/context/:itemId', async ({ params }) => {
    await delay(200);
    const detail =
      jobs.some((job) => job.id === params.jobId) &&
      typeof params.itemId === 'string'
        ? queryDetailFor(params.itemId)
        : undefined;
    if (!detail) {
      return HttpResponse.json({ message: 'unknown item' }, { status: 404 });
    }
    return HttpResponse.json(detail);
  }),
  http.get('/api/jobs/:jobId/performance', async ({ params }) => {
    await delay(250);
    if (!jobs.some((job) => job.id === params.jobId)) {
      return HttpResponse.json({ message: 'unknown job' }, { status: 404 });
    }
    return HttpResponse.json(jobPerformance);
  }),
  http.get('/api/jobs/:jobId/performance/:itemId', async ({ params }) => {
    await delay(200);
    const detail =
      jobs.some((job) => job.id === params.jobId) &&
      typeof params.itemId === 'string'
        ? perfDetailFor(params.itemId)
        : undefined;
    if (!detail) {
      return HttpResponse.json({ message: 'unknown item' }, { status: 404 });
    }
    return HttpResponse.json(detail);
  }),
  http.get('/api/jobs/:jobId/quality', async ({ params }) => {
    await delay(250);
    if (!jobs.some((job) => job.id === params.jobId)) {
      return HttpResponse.json({ message: 'unknown job' }, { status: 404 });
    }
    return HttpResponse.json(jobQuality);
  }),
  http.get('/api/jobs/:jobId/quality/:gateId', async ({ params }) => {
    await delay(200);
    const detail =
      jobs.some((job) => job.id === params.jobId) &&
      typeof params.gateId === 'string'
        ? gateDetailFor(params.gateId)
        : undefined;
    if (!detail) {
      return HttpResponse.json({ message: 'unknown gate' }, { status: 404 });
    }
    return HttpResponse.json(detail);
  }),
];
