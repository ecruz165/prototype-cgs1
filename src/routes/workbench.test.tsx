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

function renderAt(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

describe('Workbench pages', () => {
  it('renders Plan with its six views and switches tabs', async () => {
    const user = userEvent.setup();
    renderAt('/workspace/plan');

    expect(
      await screen.findByRole('heading', { name: 'Plan' }),
    ).toBeInTheDocument();
    expect(screen.getByText('INVOKE DISCOVERY')).toBeInTheDocument();
    expect(screen.getByText('Codebase exploration')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'PRDs' }));
    expect(screen.getByText('PRD LIBRARY')).toBeInTheDocument();
    expect(screen.getAllByText('Fractional orders v2').length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Readiness' }));
    expect(
      screen.getByText('Which custodian for fractional lots?'),
    ).toBeInTheDocument();
  });

  it('renders each workspace hat', async () => {
    renderAt('/workspace/build');
    expect(
      await screen.findByRole('heading', { name: 'Build' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('READY TO BUILD').length).toBeGreaterThan(0);
  });

  it('renders Validate and Run', async () => {
    renderAt('/workspace/validate');
    expect(
      await screen.findByRole('heading', { name: 'Validate' }),
    ).toBeInTheDocument();
    expect(screen.getByText('GATE POLICY')).toBeInTheDocument();
  });

  it('renders Manage with its four views', async () => {
    const user = userEvent.setup();
    renderAt('/manage');

    expect(
      await screen.findByRole('heading', { name: 'Manage' }),
    ).toBeInTheDocument();
    expect(screen.getByText('SCALE MIX')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Governance' }));
    expect(screen.getByText('POLICY ENVELOPE')).toBeInTheDocument();
    expect(
      screen.getByText('Skipped HITL on rate-limiter'),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Compare' }));
    expect(screen.getByText('INITIATIVE COMPARISON')).toBeInTheDocument();
  });
});
