import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { ChartPie, CirclePlus, Construction } from 'lucide-react';
import { ThemeProvider } from '@/lib/theme';
import { NavItem } from './NavItem';

// Link needs a router in context; a throwaway memory-history router whose
// root route renders the story does the job. The dev-console warning about
// unknown paths inside this story router is expected.
const meta = {
  title: 'Molecules/NavItem',
  component: NavItem,
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({
        component: () => (
          <ThemeProvider>
            <div className="w-80 bg-sidebar p-3">
              <Story />
            </div>
          </ThemeProvider>
        ),
      });
      const router = createRouter({
        routeTree: rootRoute,
        history: createMemoryHistory({ initialEntries: ['/'] }),
      });
      return <RouterProvider router={router} />;
    },
  ],
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { to: '/manage', label: 'Manage', icon: ChartPie, tag: 'overview' },
};

export const Entry: Story = {
  args: { to: '/new-job', label: 'New Job', icon: CirclePlus, tag: 'entry' },
};

export const Hat: Story = {
  args: {
    to: '/workspace/build',
    label: 'Build',
    icon: Construction,
    variant: 'hat',
  },
};
