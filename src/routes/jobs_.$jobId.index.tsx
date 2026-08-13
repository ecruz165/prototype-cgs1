import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/jobs_/$jobId/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/jobs/$jobId/$section',
      params: { jobId: params.jobId, section: 'flow' },
    });
  },
});
