import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/lib/theme';
import { AppTopBar } from './AppTopBar';

function renderBar(props: Partial<Parameters<typeof AppTopBar>[0]> = {}) {
  return render(
    <ThemeProvider>
      <AppTopBar navOpen onToggleNav={() => {}} {...props} />
    </ThemeProvider>,
  );
}

describe('AppTopBar', () => {
  it('renders the brand and alert count', () => {
    renderBar({ alertCount: 7 });
    expect(screen.getByText('Singularity')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('hides the alert badge when there are no alerts', () => {
    renderBar({ alertCount: 0 });
    expect(screen.queryByText('0')).not.toBeInTheDocument();
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
