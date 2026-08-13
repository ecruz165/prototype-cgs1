import { useQuery } from '@tanstack/react-query';
import { WorkbenchPage } from '@/components/organisms/WorkbenchPage';
import { fetchManageSection, fetchWorkspaceSection } from '@/lib/api';

// Shared loader for the workspace-hat and manage pages.
export function WorkspaceRoute({ hat }: { hat: string }) {
  const { data: section, isError } = useQuery({
    queryKey: ['workspace', hat],
    queryFn: () => fetchWorkspaceSection(hat),
  });
  if (!section) {
    return (
      <p className="py-16 text-center text-muted-foreground text-sm">
        {isError ? "Couldn't load the workspace." : 'Loading workspace…'}
      </p>
    );
  }
  return <WorkbenchPage section={section} />;
}

export function ManageRoute() {
  const { data: section, isError } = useQuery({
    queryKey: ['manage'],
    queryFn: fetchManageSection,
  });
  if (!section) {
    return (
      <p className="py-16 text-center text-muted-foreground text-sm">
        {isError ? "Couldn't load manage." : 'Loading manage…'}
      </p>
    );
  }
  return <WorkbenchPage section={section} />;
}
