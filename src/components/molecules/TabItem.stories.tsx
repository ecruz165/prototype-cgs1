import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { ThemeProvider } from '@/lib/theme';
import { TabItem } from './TabItem';

const meta = {
  title: 'Molecules/TabItem',
  component: TabItem,
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({
        component: () => (
          <ThemeProvider>
            <Story />
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
} satisfies Meta<typeof TabItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// The story router sits at "/", so exact matching renders the active state.
export const Active: Story = {
  args: { to: '/', label: 'Workflows', exact: true },
};

// Points at a path the story router doesn't have (expected dev warning), so
// the tab renders its inactive state.
export const Inactive: Story = {
  args: { to: '/users', label: 'Tasks' },
};
