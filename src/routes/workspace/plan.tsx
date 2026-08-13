import { createFileRoute } from '@tanstack/react-router';
import { WorkspaceRoute } from '@/components/organisms/WorkbenchRoute';

export const Route = createFileRoute('/workspace/plan')({
  component: () => <WorkspaceRoute hat="plan" />,
});
