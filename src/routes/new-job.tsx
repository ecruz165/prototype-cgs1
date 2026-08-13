import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { NewJobComposer } from '@/components/organisms/NewJobComposer';
import { fetchNewJobDraft } from '@/lib/api';

export const Route = createFileRoute('/new-job')({ component: NewJobPage });

function NewJobPage() {
  const { data: draft, isError } = useQuery({
    queryKey: ['new-job-draft'],
    queryFn: fetchNewJobDraft,
  });

  if (!draft) {
    return (
      <p className="py-16 text-center text-muted-foreground text-sm">
        {isError ? "Couldn't load the composer." : 'Loading composer…'}
      </p>
    );
  }
  return <NewJobComposer draft={draft} />;
}
