import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PlanPage } from '@/components/organisms/PlanPage';
import { fetchPlanData } from '@/lib/api';

export const Route = createFileRoute('/workspace/plan')({
  component: PlanRoute,
});

function PlanRoute() {
  const { data: plan, isError } = useQuery({
    queryKey: ['plan-data'],
    queryFn: fetchPlanData,
  });
  if (!plan) {
    return (
      <p className="py-16 text-center text-muted-foreground text-sm">
        {isError ? "Couldn't load Plan." : 'Loading Plan…'}
      </p>
    );
  }
  return <PlanPage plan={plan} />;
}
