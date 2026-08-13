import { delay, HttpResponse, http } from 'msw';
import { jobs } from './fixtures';

export const handlers = [
  http.get('/api/jobs', async () => {
    // Artificial latency so the pending state is visible in the UI.
    await delay(400);
    return HttpResponse.json(jobs);
  }),
];
