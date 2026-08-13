import { createFileRoute } from '@tanstack/react-router';
import { ManageRoute } from '@/components/organisms/WorkbenchRoute';

export const Route = createFileRoute('/manage')({
  component: ManageRoute,
});
