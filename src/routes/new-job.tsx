import { createFileRoute } from '@tanstack/react-router';
import { PagePlaceholder } from '@/components/atoms/PagePlaceholder';

export const Route = createFileRoute('/new-job')({
  component: () => <PagePlaceholder title="New Job" />,
});
