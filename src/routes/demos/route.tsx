import { createFileRoute, Outlet } from '@tanstack/react-router';
import { TabItem } from '@/components/molecules/TabItem';

export const Route = createFileRoute('/demos')({ component: DemosLayout });

// Section layout: the design's secondary layout pattern — a horizontal tab
// menu managing the section's views.
function DemosLayout() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <nav aria-label="Demos" className="mb-6 flex items-center gap-1">
        <TabItem to="/demos" label="Overview" exact />
        <TabItem to="/demos/editor" label="Editor" />
        <TabItem to="/demos/markdown" label="Markdown" />
        <TabItem to="/demos/flow" label="Flow" />
        <TabItem to="/demos/form" label="Form" />
      </nav>
      <Outlet />
    </main>
  );
}
