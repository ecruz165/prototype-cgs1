import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/lib/theme';
import { StatusBadge } from './StatusBadge';

const meta = {
  title: 'Atoms/StatusBadge',
  component: StatusBadge,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Running: Story = { args: { status: 'running' } };
export const Awaiting: Story = { args: { status: 'awaiting' } };
export const Failed: Story = { args: { status: 'failed' } };
export const Completed: Story = { args: { status: 'completed' } };
