import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ThemeProvider } from '@/lib/theme';
import { AppTopBar } from './AppTopBar';

const meta = {
  title: 'Organisms/AppTopBar',
  component: AppTopBar,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  args: { onToggleNav: fn() },
} satisfies Meta<typeof AppTopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAlerts: Story = {
  args: { navOpen: true, alertCount: 7 },
};

export const NoAlerts: Story = {
  args: { navOpen: false, alertCount: 0 },
};
