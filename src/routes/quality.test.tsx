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

function renderQuality() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: ['/jobs/job_8af21c/quality'],
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

describe('Quality section', () => {
  it('renders the gates pane with banner, groups, and trend', async () => {
    renderQuality();

    await screen.findByText('Merge blocked by 1 gate');
    expect(screen.getByText('1 failing')).toBeInTheDocument();
    expect(screen.getByText('CONVENTION VERIFICATIONS')).toBeInTheDocument();
    expect(screen.getByText('Unit tests')).toBeInTheDocument();
    expect(screen.getByText('PER-PHASE TREND')).toBeInTheDocument();
    expect(screen.getByText('Scaffold')).toBeInTheDocument();
  });

  it('opens on the failing gate with the full detail canvas', async () => {
    renderQuality();

    expect(
      await screen.findByRole('heading', { name: 'Coverage ≥ 80%' }),
    ).toBeInTheDocument();
    expect(screen.getByText('coverage.lines.pct >= 80')).toBeInTheDocument();
    expect(screen.getByText('ACTUAL')).toBeInTheDocument();
    expect(screen.getAllByText('−8 pts').length).toBeGreaterThan(0);
    expect(screen.getByText('Blocks merge-to-main')).toBeInTheDocument();
    expect(screen.getByText('HALT-ON-FAIL')).toBeInTheDocument();
  });

  it('selecting a passing gate swaps to its minimal detail', async () => {
    const user = userEvent.setup();
    renderQuality();

    await screen.findByRole('heading', { name: 'Coverage ≥ 80%' });
    const row = screen.getByText('Lint').closest('button');
    expect(row).not.toBeNull();
    await user.click(row as HTMLElement);

    expect(
      await screen.findByRole('heading', { name: 'Lint' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('No detail captured for this gate yet.'),
    ).toBeInTheDocument();
  });

  it('links to Budget & Gates halt semantics', async () => {
    const user = userEvent.setup();
    renderQuality();

    await screen.findByRole('heading', { name: 'Coverage ≥ 80%' });
    await user.click(screen.getByRole('link', { name: /Halt semantics/ }));
    expect(
      await screen.findByRole('heading', { name: 'Cost ceiling' }),
    ).toBeInTheDocument();
  });
});
