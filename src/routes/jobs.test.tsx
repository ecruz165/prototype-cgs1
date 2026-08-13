import { QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider } from '@/lib/theme';
import { routeTree } from '@/routeTree.gen';

// Full-path integration: MSW's Node server feeds /api/jobs, Zod parses at
// the boundary, Query renders, filters and search run client-side.
function renderJobs() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/jobs'] }),
  });
  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

async function findCards() {
  await screen.findByText('Backfill analytics events to BigQuery');
  return screen.getAllByRole('listitem');
}

describe('Jobs page', () => {
  it('renders all fixture jobs with computed counts', async () => {
    renderJobs();
    const cards = await findCards();
    expect(cards).toHaveLength(6);
    expect(screen.getByText('3 running · 6 total')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Failed · 1' }),
    ).toBeInTheDocument();
  });

  it('filters by status segment', async () => {
    const user = userEvent.setup();
    renderJobs();
    await findCards();

    await user.click(screen.getByRole('button', { name: 'Failed · 1' }));
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(1);
    expect(
      within(cards[0]).getByText('Refresh stripe customer reconciliation'),
    ).toBeInTheDocument();
  });

  it('searches across name, agent, and contexts', async () => {
    const user = userEvent.setup();
    renderJobs();
    await findCards();

    await user.type(screen.getByRole('searchbox'), 'digest');
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(1);
    expect(
      within(cards[0]).getByText('Generate weekly exec digest'),
    ).toBeInTheDocument();
  });
});
