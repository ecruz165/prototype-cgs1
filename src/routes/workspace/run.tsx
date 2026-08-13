import { createFileRoute } from '@tanstack/react-router';
import { PagePlaceholder } from '@/components/atoms/PagePlaceholder';

export const Route = createFileRoute('/workspace/run')({
  component: () => <PagePlaceholder title="Workspace · Run" />,
});
