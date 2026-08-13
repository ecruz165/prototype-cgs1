import { createFileRoute } from '@tanstack/react-router';
import { WorkspaceRoute } from '@/components/organisms/WorkbenchRoute';

export const Route = createFileRoute('/workspace/validate')({
  component: () => <WorkspaceRoute hat="validate" />,
});
