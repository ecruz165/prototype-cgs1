import { createFileRoute } from '@tanstack/react-router';
import { PagePlaceholder } from '@/components/atoms/PagePlaceholder';

export const Route = createFileRoute('/workspace/plan')({
  component: () => <PagePlaceholder title="Workspace · Plan" />,
});
