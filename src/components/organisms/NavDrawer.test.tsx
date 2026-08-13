import { QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider } from '@/lib/theme';
import { routeTree } from '@/routeTree.gen';

// Shell integration: the drawer's open state lives in the root layout, so
// these tests mount the real route tree instead of the drawer alone.
function renderApp() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
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

  it('renders MENU links and CATALOG placeholders', async () => {
    renderApp();

    const drawer = await screen.findByRole('navigation', { name: 'Primary' });
    expect(drawer).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Users/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Demos/ })).toBeInTheDocument();

    // Catalog entries have no routes yet: rendered, but not as links.
    expect(screen.getByText('CATALOG')).toBeInTheDocument();
    expect(screen.getByText('Agents')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /Agents/ }),
    ).not.toBeInTheDocument();
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

  it('starts collapsed when a previous session closed it', async () => {
    localStorage.setItem('nav-open', 'closed');
    renderApp();

    await screen.findByRole('button', { name: 'Toggle navigation' });
    expect(
      screen.queryByRole('navigation', { name: 'Primary' }),
    ).not.toBeInTheDocument();
  });
});
