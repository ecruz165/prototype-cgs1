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

function renderContext() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: ['/jobs/job_8af21c/context'],
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

describe('Context section', () => {
  it('renders inputs and queries in the pane', async () => {
    renderContext();

    await screen.findByText('INPUTS');
    expect(screen.getByText('Uploaded docs')).toBeInTheDocument();
    expect(screen.getByText('Repos in scope')).toBeInTheDocument();
    expect(screen.getByText('6 · what was used')).toBeInTheDocument();
    expect(
      screen.getByText('session-token rotation usages'),
    ).toBeInTheDocument();
  });

  it('opens on the first query with the scored hit set', async () => {
    renderContext();

    expect(
      await screen.findByRole('heading', {
        name: 'auth token refresh patterns',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('HYBRID')).toBeInTheDocument();
    expect(
      screen.getByText('src/auth/token.service.ts:42'),
    ).toBeInTheDocument();
    expect(screen.getAllByText('USED')).toHaveLength(4);
    expect(screen.getByText('WHAT ACTUALLY FED CONTEXT')).toBeInTheDocument();
    expect(screen.getByText('■ 8 pruned')).toBeInTheDocument();
  });

  it('selecting an input swaps to its minimal detail', async () => {
    const user = userEvent.setup();
    renderContext();

    await screen.findByRole('heading', {
      name: 'auth token refresh patterns',
    });
    const row = screen.getByText('Uploaded docs').closest('button');
    expect(row).not.toBeNull();
    await user.click(row as HTMLElement);

    expect(
      await screen.findByRole('heading', { name: 'Uploaded docs' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('No detail captured for this item yet.'),
    ).toBeInTheDocument();
  });

  it('cross-links to the decision that consumed the hits', async () => {
    const user = userEvent.setup();
    renderContext();

    await screen.findByRole('heading', {
      name: 'auth token refresh patterns',
    });
    await user.click(
      screen.getByRole('link', { name: /the decision that consumed/ }),
    );
    expect(
      await screen.findByRole('heading', {
        name: 'Dispatch coder · Patch phase',
      }),
    ).toBeInTheDocument();
  });
});
