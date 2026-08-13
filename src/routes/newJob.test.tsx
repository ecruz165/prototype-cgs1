import { QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider } from '@/lib/theme';
import { routeTree } from '@/routeTree.gen';

function renderComposer() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/new-job'] }),
  });
  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

describe('New Job composer states', () => {
  it('starts in the simple intake state: chips, tag cloud, textarea only', async () => {
    renderComposer();

    expect(
      await screen.findByRole('heading', { name: 'Start a new job' }),
    ).toBeInTheDocument();
    // Intake shows the tag cloud and intent textarea…
    expect(screen.getByText('56×')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        'Describe the job, or pick a job type above…',
      ),
    ).toBeInTheDocument();
    // …and none of the later-state sections.
    expect(screen.queryByText('PREREQUISITES')).not.toBeInTheDocument();
    expect(screen.queryByText('RISK')).not.toBeInTheDocument();
    expect(screen.queryByText(/GATE LADDER/)).not.toBeInTheDocument();
    expect(screen.queryByText('2 / 3')).not.toBeInTheDocument();
  });

  it('Continue advances to scoping: prerequisites + risk, no tag cloud', async () => {
    const user = userEvent.setup();
    renderComposer();

    await screen.findByRole('heading', { name: 'Start a new job' });
    await user.click(screen.getByRole('button', { name: /Continue/ }));

    expect(screen.getByText('PREREQUISITES')).toBeInTheDocument();
    expect(screen.getByText('RISK')).toBeInTheDocument();
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter the Jira ticket…'),
    ).toBeInTheDocument();
    expect(screen.queryByText('56×')).not.toBeInTheDocument();
  });

  it('Review & start advances to confirm: coordinator, ladder, commit bar', async () => {
    const user = userEvent.setup();
    renderComposer();

    await screen.findByRole('heading', { name: 'Start a new job' });
    await user.click(screen.getByRole('button', { name: /Continue/ }));
    await user.click(screen.getByRole('button', { name: /Review & start/ }));

    expect(screen.getByText(/Routed → bug-fix \(v2\)/)).toBeInTheDocument();
    expect(screen.getByText(/GATE LADDER/)).toBeInTheDocument();
    expect(screen.getByText(/ESTIMATE · ~1 job/)).toBeInTheDocument();
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
    expect(screen.queryByText('PREREQUISITES')).not.toBeInTheDocument();

    // Back to edit returns to scoping.
    await user.click(screen.getByRole('button', { name: /Back to edit/ }));
    expect(screen.getByText('PREREQUISITES')).toBeInTheDocument();
  });

  it('Start job from confirm lands on the jobs list', async () => {
    const user = userEvent.setup();
    renderComposer();

    await screen.findByRole('heading', { name: 'Start a new job' });
    await user.click(screen.getByRole('button', { name: /Continue/ }));
    await user.click(screen.getByRole('button', { name: /Review & start/ }));
    await user.click(screen.getByRole('button', { name: /Start job/ }));

    expect(
      await screen.findByRole('heading', { name: 'Jobs' }),
    ).toBeInTheDocument();
  });

  it('keeps the scale selector across states', async () => {
    const user = userEvent.setup();
    renderComposer();

    await screen.findByRole('heading', { name: 'Start a new job' });
    await user.click(screen.getByRole('button', { name: 'M' }));
    await user.click(screen.getByRole('button', { name: /Continue/ }));
    expect(screen.getByRole('button', { name: 'M' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});
