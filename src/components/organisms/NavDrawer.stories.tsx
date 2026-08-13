import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { fn } from 'storybook/test';
import { ThemeProvider } from '@/lib/theme';
import { NavDrawer } from './NavDrawer';

// Link needs a router in context; a throwaway memory-history router whose
// root route renders the story does the job. The dev-console warning about
// unknown paths inside this story router is expected.
const meta = {
  title: 'Organisms/NavDrawer',
  component: NavDrawer,
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
  args: { onClose: fn() },
} satisfies Meta<typeof NavDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
