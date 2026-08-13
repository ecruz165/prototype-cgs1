import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { House } from 'lucide-react';
import { ThemeProvider } from '@/lib/theme';
import { NavItem, NavItemPlaceholder } from './NavItem';

const meta = {
  title: 'Molecules/NavItem',
  component: NavItem,
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({
        component: () => (
          <ThemeProvider>
            <div className="w-62 bg-sidebar p-3">
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

// The story router sits at "/", so exact matching renders the selected state.
export const Selected: Story = {
  args: { to: '/', label: 'Home', icon: House, exact: true },
};

export const Placeholder: Story = {
  args: { to: '/', label: 'Agents', icon: House },
  render: (args) => <NavItemPlaceholder label={args.label} icon={args.icon} />,
};
