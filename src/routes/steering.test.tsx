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

function renderSteering() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: ['/jobs/job_8af21c/steering'],
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

describe('Steering section', () => {
  it('renders requests and team in the pane, blocking request selected', async () => {
    renderSteering();

    await screen.findByText('6 · 1 blocking');
    expect(screen.getByText('5 members · 4 connected')).toBeInTheDocument();
    expect(screen.getByText('Dana Ruiz')).toBeInTheDocument();

    const selected = screen.getByRole('button', { current: true });
    expect(selected).toHaveTextContent('Approve merge to main');
  });

  it('renders the request detail canvas with the owner action zone', async () => {
    renderSteering();

    expect(
      await screen.findByRole('heading', { name: 'Approve merge to main' }),
    ).toBeInTheDocument();
    expect(screen.getByText('ACTION ZONE · OWNER COMMIT')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Approve & merge/ }),
    ).toBeInTheDocument();
    expect(screen.getByText('PEER VOTES')).toBeInTheDocument();
    expect(screen.getByText('4 approve')).toBeInTheDocument();
    expect(screen.getByText('Marcus Lindqvist')).toBeInTheDocument();
    expect(screen.getByText('4h · 3h 42m left')).toBeInTheDocument();
  });

  it('selecting another request swaps the canvas to its minimal detail', async () => {
    const user = userEvent.setup();
    renderSteering();

    await screen.findByRole('heading', { name: 'Approve merge to main' });
    const row = screen
      .getByText('Security review: rotation policy')
      .closest('button');
    expect(row).not.toBeNull();
    await user.click(row as HTMLElement);

    expect(
      await screen.findByRole('heading', {
        name: 'Security review: rotation policy',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('No detail captured for this request yet.'),
    ).toBeInTheDocument();
  });

  it('jumps to the flow section via the context cross-link', async () => {
    const user = userEvent.setup();
    renderSteering();

    await screen.findByRole('heading', { name: 'Approve merge to main' });
    await user.click(
      screen.getByRole('link', { name: /Jump to the ‘Approve merge’/ }),
    );
    expect(await screen.findByText('Job intake')).toBeInTheDocument();
  });
});
