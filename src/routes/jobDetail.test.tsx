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

function renderDetail(initialPath = '/jobs/job_8af21c/flow') {
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

describe('Job detail with ActivityRail', () => {
  it('renders the flow pane phases and selects the running agent phase', async () => {
    renderDetail();

    await screen.findByText('Job intake');
    expect(
      screen.getByText('WEBMOD-12345 · implement-feature v3'),
    ).toBeInTheDocument();
    expect(screen.getByText('running · 11 phases')).toBeInTheDocument();

    const selected = screen.getByRole('button', { current: true });
    expect(selected).toHaveTextContent('Generate patch');
    // The selection feeds the canvas.
    expect(
      await screen.findByRole('heading', { name: 'Generate patch' }),
    ).toBeInTheDocument();
  });

  it('renders the node detail canvas for the selected phase', async () => {
    renderDetail();

    await screen.findByRole('heading', { name: 'Generate patch' });
    expect(screen.getByText('INPUT')).toBeInTheDocument();
    expect(
      screen.getByText('node-4a · started 14:05:46 · 2m14s'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('· claude-opus-4.8 · anthropic'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('OUTPUT — streaming · 2 of 4 files'),
    ).toBeInTheDocument();
  });

  it('navigates to a section via a cross-link', async () => {
    const user = userEvent.setup();
    renderDetail();

    await screen.findByRole('heading', { name: 'Generate patch' });
    await user.click(screen.getByRole('link', { name: /Changed Files/ }));
    expect(
      await screen.findByRole('heading', { name: 'token.service.ts' }),
    ).toBeInTheDocument();
  });

  it('updates the canvas when another phase is selected', async () => {
    const user = userEvent.setup();
    renderDetail();

    await screen.findByRole('heading', { name: 'Generate patch' });
    const planButton = screen
      .getByText('Plan', { exact: true })
      .closest('button');
    expect(planButton).not.toBeNull();
    await user.click(planButton as HTMLElement);
    expect(
      await screen.findByRole('heading', { name: 'Plan' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('No detail captured for this phase yet.'),
    ).toBeInTheDocument();
  });

  it('shows all eight sections on the rail and navigates between them', async () => {
    const user = userEvent.setup();
    renderDetail();

    const rail = await screen.findByRole('navigation', {
      name: 'Job sections',
    });
    expect(rail).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Context' }));
    expect(await screen.findByText('Pane not built yet')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Context' }),
    ).toBeInTheDocument();
  });

  it('toggles the pane when the active rail section is clicked', async () => {
    const user = userEvent.setup();
    renderDetail();

    await screen.findByText('Job intake');
    const active = screen.getByRole('button', { name: 'Flow' });
    expect(active).toHaveAttribute('aria-expanded', 'true');

    await user.click(active);
    expect(screen.queryByText('Job intake')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Flow' }));
    expect(await screen.findByText('Job intake')).toBeInTheDocument();
  });

  it('redirects unknown sections and bare job ids to flow', async () => {
    renderDetail('/jobs/job_8af21c/nonsense');
    expect(await screen.findByText('Job intake')).toBeInTheDocument();
  });
});
