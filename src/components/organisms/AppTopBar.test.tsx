import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider } from '@/lib/theme';
import { AppTopBar } from './AppTopBar';

function renderBar(props: Partial<Parameters<typeof AppTopBar>[0]> = {}) {
  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppTopBar navOpen onToggleNav={() => {}} {...props} />
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

describe('AppTopBar', () => {
  it('renders the brand and the notification count from the server', async () => {
    renderBar();
    expect(screen.getByText('Singularity')).toBeInTheDocument();
    expect(await screen.findByText('7')).toBeInTheDocument();
  });

  it('reports nav state and fires the toggle from the hamburger', async () => {
    const user = userEvent.setup();
    const onToggleNav = vi.fn();
    renderBar({ navOpen: false, onToggleNav });

    const hamburger = screen.getByRole('button', { name: 'Toggle navigation' });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    await user.click(hamburger);
    expect(onToggleNav).toHaveBeenCalledTimes(1);
  });
});
