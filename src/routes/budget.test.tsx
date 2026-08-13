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

function renderBudget() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: ['/jobs/job_8af21c/budget'],
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

describe('Budget & Gates section', () => {
  it('renders the spend hero and halting-gate meters', async () => {
    renderBudget();

    await screen.findByText('SPENT SO FAR');
    expect(screen.getByText('$0.41')).toBeInTheDocument();
    expect(screen.getByText('8% used')).toBeInTheDocument();
    expect(screen.getByText('Max HITL pauses')).toBeInTheDocument();
    expect(screen.getByText('0 / 5 tripped')).toBeInTheDocument();
    expect(screen.getByText('On track')).toBeInTheDocument();
  });

  it('opens on the cost ceiling with the full halt detail', async () => {
    renderBudget();

    expect(
      await screen.findByRole('heading', { name: 'Cost ceiling' }),
    ).toBeInTheDocument();
    expect(screen.getByText('run.cost.usd <= 5.00')).toBeInTheDocument();
    expect(screen.getByText('HEADROOM')).toBeInTheDocument();
    expect(screen.getByText('HALT-ON-EXCEED')).toBeInTheDocument();
    expect(screen.getByText('2 · Halt')).toBeInTheDocument();
    expect(screen.getByText('checkpoint + halt')).toBeInTheDocument();
  });

  it('selecting another gate swaps to its minimal detail', async () => {
    const user = userEvent.setup();
    renderBudget();

    await screen.findByRole('heading', { name: 'Cost ceiling' });
    const row = screen.getByText('Wall-clock').closest('button');
    expect(row).not.toBeNull();
    await user.click(row as HTMLElement);

    expect(
      await screen.findByRole('heading', { name: 'Wall-clock' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('No detail captured for this gate yet.'),
    ).toBeInTheDocument();
  });

  it('cross-links to the flow it guards', async () => {
    const user = userEvent.setup();
    renderBudget();

    await screen.findByRole('heading', { name: 'Cost ceiling' });
    await user.click(screen.getByRole('link', { name: /Run continuation/ }));
    expect(await screen.findByText('Job intake')).toBeInTheDocument();
  });
});
