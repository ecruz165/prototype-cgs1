import { QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider } from '@/lib/theme';
import { routeTree } from '@/routeTree.gen';

// Shell integration: drawer state lives in the root layout and the sidebar's
// active states come from the route, so these tests mount the real tree.
function renderApp(initialPath = '/jobs') {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });
  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

describe('NavDrawer in the app shell', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects / to /jobs', async () => {
    renderApp('/');
    expect(
      await screen.findByRole('heading', { name: 'Jobs' }),
    ).toBeInTheDocument();
  });

  it('renders the design sidebar with hats hidden at rest', async () => {
    renderApp();

    const drawer = await screen.findByRole('navigation', { name: 'Primary' });
    expect(screen.getByText('Digital Investor Platform')).toBeInTheDocument();
    expect(
      within(drawer).getByRole('link', { name: /New Job/ }),
    ).toBeInTheDocument();
    expect(
      within(drawer).getByRole('link', { name: /Manage/ }),
    ).toBeInTheDocument();
    expect(
      within(drawer).getByRole('link', { name: /Jobs/ }),
    ).toBeInTheDocument();
    expect(
      within(drawer).getByRole('link', { name: 'Benchmarks' }),
    ).toBeInTheDocument();
    expect(
      within(drawer).getByRole('link', { name: 'Settings' }),
    ).toBeInTheDocument();

    const disclosure = screen.getByRole('button', { name: /Workspaces/ });
    expect(disclosure).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('link', { name: 'Plan' }),
    ).not.toBeInTheDocument();
  });

  it('reveals the workspace hats on hover without changing selection', async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByRole('navigation', { name: 'Primary' });
    await user.hover(screen.getByRole('button', { name: /Workspaces/ }));

    for (const hat of ['Plan', 'Build', 'Validate', 'Run']) {
      expect(screen.getByRole('link', { name: hat })).toBeInTheDocument();
    }
  });

  it('keeps the disclosure open when a hat route is active', async () => {
    renderApp('/workspace/build');

    await screen.findByRole('navigation', { name: 'Primary' });
    expect(screen.getByRole('button', { name: /Workspaces/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('link', { name: 'Build' })).toBeInTheDocument();
  });

  it('collapses from the hamburger and persists the choice', async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByRole('navigation', { name: 'Primary' });
    await user.click(screen.getByRole('button', { name: 'Toggle navigation' }));

    expect(
      screen.queryByRole('navigation', { name: 'Primary' }),
    ).not.toBeInTheDocument();
    expect(localStorage.getItem('nav-open')).toBe('closed');

    await user.click(screen.getByRole('button', { name: 'Toggle navigation' }));
    expect(
      screen.getByRole('navigation', { name: 'Primary' }),
    ).toBeInTheDocument();
  });
});
