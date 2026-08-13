import type { RequestHandler } from 'msw';

// Empty until the Singularity screens define their API surface; the four
// consumers (dev worker, Vitest server, Storybook, Playwright) stay wired.
export const handlers: RequestHandler[] = [];
