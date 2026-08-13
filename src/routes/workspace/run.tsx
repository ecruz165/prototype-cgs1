import { createFileRoute } from '@tanstack/react-router';
import { WorkspaceRoute } from '@/components/organisms/WorkbenchRoute';

export const Route = createFileRoute('/workspace/run')({
  component: () => <WorkspaceRoute hat="run" />,
});
