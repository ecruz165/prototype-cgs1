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

function renderApp() {
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

describe('NotificationsPanel', () => {
  it('opens from the bell with all three sections', async () => {
    const user = userEvent.setup();
    renderApp();

    const bell = await screen.findByRole('button', { name: 'Notifications' });
    await user.click(bell);

    expect(await screen.findByText('7 new')).toBeInTheDocument();
    expect(screen.getByText('HITL REQUESTS')).toBeInTheDocument();
    expect(screen.getByText('CHIME-IN REQUESTS')).toBeInTheDocument();
    expect(screen.getByText('AGENT SUGGESTED')).toBeInTheDocument();
    expect(
      screen.getByText('WEBMOD-12350 matches the implement-feature workflow'),
    ).toBeInTheDocument();
    expect(screen.getByText('JIRA')).toBeInTheDocument();
  });

  it('closes via the backdrop', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(
      await screen.findByRole('button', { name: 'Notifications' }),
    );
    await screen.findByText('7 new');

    await user.click(
      screen.getByRole('button', { name: 'Close notifications' }),
    );
    expect(screen.queryByText('7 new')).not.toBeInTheDocument();
  });

  it('a HITL notification navigates to steering and closes the panel', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(
      await screen.findByRole('button', { name: 'Notifications' }),
    );
    await screen.findByText('7 new');

    const row = screen.getByText('Approve merge to main').closest('button');
    expect(row).not.toBeNull();
    await user.click(row as HTMLElement);

    expect(screen.queryByText('7 new')).not.toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: 'Approve merge to main' }),
    ).toBeInTheDocument();
    expect(screen.getByText('ACTION ZONE · OWNER COMMIT')).toBeInTheDocument();
  });
});
