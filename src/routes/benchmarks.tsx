import { createFileRoute } from '@tanstack/react-router';
import { PagePlaceholder } from '@/components/atoms/PagePlaceholder';

export const Route = createFileRoute('/benchmarks')({
  component: () => <PagePlaceholder title="Benchmarks" />,
});
