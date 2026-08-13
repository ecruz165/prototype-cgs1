import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClientProvider } from '@tanstack/react-query';
import { fn } from 'storybook/test';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider } from '@/lib/theme';
import { AppTopBar } from './AppTopBar';

const meta = {
  title: 'Organisms/AppTopBar',
  component: AppTopBar,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </ThemeProvider>
    ),
  ],
  args: { onToggleNav: fn() },
} satisfies Meta<typeof AppTopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavOpen: Story = {
  args: { navOpen: true },
};

export const NavCollapsed: Story = {
  args: { navOpen: false },
};
