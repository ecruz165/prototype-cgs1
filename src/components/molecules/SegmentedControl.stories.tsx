import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ThemeProvider } from '@/lib/theme';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StatusFilter: Story = {
  args: {
    ariaLabel: 'Status filter',
    value: 'all',
    options: [],
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = useState('all');
    return (
      <SegmentedControl
        ariaLabel="Status filter"
        value={value}
        onChange={setValue}
        options={[
          { value: 'all', label: 'All · 16' },
          { value: 'running', label: 'Running · 12' },
          { value: 'awaiting', label: 'Awaiting · 3' },
          { value: 'failed', label: 'Failed · 1' },
          { value: 'completed', label: 'Completed' },
        ]}
      />
    );
  },
};
