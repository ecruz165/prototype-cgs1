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

function renderActivity() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: ['/jobs/job_8af21c/activity'],
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

describe('Activity section', () => {
  it('renders the coordinator decision log', async () => {
    renderActivity();

    await screen.findByText('COORDINATOR DECISIONS');
    expect(
      screen.getByText('Routed → implement-feature v3'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Escalated coverage gate failure'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Paused for HITL at merge gate'),
    ).toBeInTheDocument();
  });

  it('opens on the dispatch decision with reasoning and raw transcript', async () => {
    renderActivity();

    expect(
      await screen.findByRole('heading', {
        name: 'Dispatch coder · Patch phase',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('INPUTS WEIGHED')).toBeInTheDocument();
    expect(screen.getByText('opus: +accuracy / +cost')).toBeInTheDocument();
    expect(screen.getByText('REQUEST')).toBeInTheDocument();
    expect(screen.getByText(/rotateSessionToken/)).toBeInTheDocument();
    expect(screen.getByText('patch produced')).toBeInTheDocument();
  });

  it('selecting another decision swaps to its minimal detail', async () => {
    const user = userEvent.setup();
    renderActivity();

    await screen.findByRole('heading', {
      name: 'Dispatch coder · Patch phase',
    });
    const row = screen.getByText('Re-ran tests after patch').closest('button');
    expect(row).not.toBeNull();
    await user.click(row as HTMLElement);

    expect(
      await screen.findByRole('heading', {
        name: 'Re-ran tests after patch',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('No detail captured for this decision yet.'),
    ).toBeInTheDocument();
  });

  it('cross-links to the flow node the decision drove', async () => {
    const user = userEvent.setup();
    renderActivity();

    await screen.findByRole('heading', {
      name: 'Dispatch coder · Patch phase',
    });
    await user.click(
      screen.getByRole('link', { name: /the Flow node this decision drove/ }),
    );
    expect(await screen.findByText('Job intake')).toBeInTheDocument();
  });
});
