import { createFileRoute } from '@tanstack/react-router';
import { PagePlaceholder } from '@/components/atoms/PagePlaceholder';

export const Route = createFileRoute('/workspace/validate')({
  component: () => <PagePlaceholder title="Workspace · Validate" />,
});
