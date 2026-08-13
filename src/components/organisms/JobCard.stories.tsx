import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/lib/theme';
import { jobs } from '@/mocks/fixtures';
import { JobCard } from './JobCard';

const meta = {
  title: 'Organisms/JobCard',
  component: JobCard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="w-[1088px] bg-background p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof JobCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Running: Story = { args: { job: jobs[0] } };
export const Awaiting: Story = { args: { job: jobs[2] } };
export const Failed: Story = { args: { job: jobs[4] } };
