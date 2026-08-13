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

function renderOutput() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: ['/jobs/job_8af21c/output'],
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

describe('Output section', () => {
  it('renders the changes-by-task pane with artifacts', async () => {
    renderOutput();

    await screen.findByText('9 files · 5 tasks');
    expect(
      screen.getByText('Rotate session tokens on a 1h window'),
    ).toBeInTheDocument();
    expect(screen.getByText('a1b2c3d')).toBeInTheDocument();
    expect(screen.getByText('4 · non-code')).toBeInTheDocument();
    expect(screen.getByText('rotation-summary.md')).toBeInTheDocument();
  });

  it('opens on token.service.ts with the full diff canvas', async () => {
    renderOutput();

    expect(
      await screen.findByRole('heading', { name: 'token.service.ts' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('@@ src/auth/token.service.ts'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/const ROTATION_WINDOW_MS/),
    ).toBeInTheDocument();
    expect(screen.getByText('PRODUCED BY')).toBeInTheDocument();
    expect(screen.getByText('coder · claude-opus-4.8')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('selecting another file swaps to its minimal diff', async () => {
    const user = userEvent.setup();
    renderOutput();

    await screen.findByRole('heading', { name: 'token.service.ts' });
    const row = screen.getByText('session.ts').closest('button');
    expect(row).not.toBeNull();
    await user.click(row as HTMLElement);

    expect(
      await screen.findByRole('heading', { name: 'session.ts' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('No diff captured for this file yet.'),
    ).toBeInTheDocument();
  });

  it('cross-links to the steering decision', async () => {
    const user = userEvent.setup();
    renderOutput();

    await screen.findByRole('heading', { name: 'token.service.ts' });
    await user.click(screen.getByRole('link', { name: /Cap rotation at 1h/ }));
    expect(
      await screen.findByRole('heading', { name: 'Approve merge to main' }),
    ).toBeInTheDocument();
  });
});
