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

function renderPerformance() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: ['/jobs/job_8af21c/performance'],
    }),
  });
  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

describe('Performance section', () => {
  it('renders models, connections, and failures in the pane', async () => {
    renderPerformance();

    await screen.findByText('MODEL USAGE');
    expect(screen.getByText('claude-sonnet-4.6')).toBeInTheDocument();
    expect(screen.getByText('Fargate workers')).toBeInTheDocument();
    expect(screen.getByText('3/3 healthy')).toBeInTheDocument();
    expect(screen.getByText('Rate-limit (opus) → retried')).toBeInTheDocument();
  });

  it('opens on the primary model with usage and latency', async () => {
    renderPerformance();

    expect(
      await screen.findByRole('heading', { name: 'claude-opus-4.8' }),
    ).toBeInTheDocument();
    expect(screen.getByText('PRIMARY')).toBeInTheDocument();
    expect(screen.getByText('REQUESTS')).toBeInTheDocument();
    expect(screen.getAllByText('p95').length).toBeGreaterThan(0);
    expect(screen.getByText('USED IN PHASES')).toBeInTheDocument();
    expect(screen.getByText('test-runner')).toBeInTheDocument();
  });

  it('selecting a connection swaps to its minimal detail', async () => {
    const user = userEvent.setup();
    renderPerformance();

    await screen.findByRole('heading', { name: 'claude-opus-4.8' });
    const row = screen.getByText('Anthropic API').closest('button');
    expect(row).not.toBeNull();
    await user.click(row as HTMLElement);

    expect(
      await screen.findByRole('heading', { name: 'Anthropic API' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('No detail captured for this item yet.'),
    ).toBeInTheDocument();
  });

  it('cross-links to the decisions using this model', async () => {
    const user = userEvent.setup();
    renderPerformance();

    await screen.findByRole('heading', { name: 'claude-opus-4.8' });
    await user.click(
      screen.getByRole('link', { name: /Decisions using this model/ }),
    );
    expect(
      await screen.findByRole('heading', {
        name: 'Dispatch coder · Patch phase',
      }),
    ).toBeInTheDocument();
  });
});
