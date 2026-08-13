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

function renderComposer() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/new-job'] }),
  });
  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

describe('New Job composer', () => {
  it('renders the intake journey', async () => {
    renderComposer();

    expect(
      await screen.findByRole('heading', { name: 'Start a new job' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Intake')).toBeInTheDocument();
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    expect(screen.getByText('PREREQUISITES')).toBeInTheDocument();
    expect(screen.getByText('Reproduction steps')).toBeInTheDocument();
    expect(screen.getByText('needs-you')).toBeInTheDocument();
    expect(screen.getByText(/Routed → bug-fix \(v2\)/)).toBeInTheDocument();
    expect(screen.getByText(/GATE LADDER/)).toBeInTheDocument();
    expect(screen.getByText(/ESTIMATE · ~1 job/)).toBeInTheDocument();
  });

  it('toggles the scale selector', async () => {
    const user = userEvent.setup();
    renderComposer();

    await screen.findByRole('heading', { name: 'Start a new job' });
    const small = screen.getByRole('button', { name: 'S' });
    const medium = screen.getByRole('button', { name: 'M' });
    expect(small).toHaveAttribute('aria-pressed', 'true');

    await user.click(medium);
    expect(medium).toHaveAttribute('aria-pressed', 'true');
    expect(small).toHaveAttribute('aria-pressed', 'false');
  });

  it('picking a tag selects that job type', async () => {
    const user = userEvent.setup();
    renderComposer();

    await screen.findByRole('heading', { name: 'Start a new job' });
    await user.click(
      screen.getByRole('button', { name: /implement-feature-v3/ }),
    );
    // The selection also relabels the job-type chip, so match the tag by
    // its pressed state.
    const pressed = screen
      .getAllByRole('button', { name: /implement-feature-v3/ })
      .find((b) => b.getAttribute('aria-pressed') === 'true');
    expect(pressed).toBeTruthy();
  });

  it('starting the job lands on the jobs list', async () => {
    const user = userEvent.setup();
    renderComposer();

    await screen.findByRole('heading', { name: 'Start a new job' });
    await user.click(screen.getByRole('button', { name: /Start job/ }));
    expect(
      await screen.findByRole('heading', { name: 'Jobs' }),
    ).toBeInTheDocument();
  });
});
