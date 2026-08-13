import { createFileRoute } from '@tanstack/react-router';
import { PagePlaceholder } from '@/components/atoms/PagePlaceholder';

export const Route = createFileRoute('/workspace/build')({
  component: () => <PagePlaceholder title="Workspace · Build" />,
});
