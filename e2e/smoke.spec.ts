import { expect, test } from '@playwright/test';

test('shell: redirect, sidebar navigation, disclosure, theme, collapse', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/jobs$/);
  await expect(page.getByRole('heading', { name: 'Jobs' })).toBeVisible();

  await page.getByRole('link', { name: 'Manage' }).click();
  await expect(page.getByRole('heading', { name: 'Manage' })).toBeVisible();

  // Workspaces is a hover-reveal disclosure; hovering exposes the hats.
  await page.getByRole('button', { name: 'Workspaces' }).hover();
  await page.getByRole('link', { name: 'Build' }).click();
  await expect(
    page.getByRole('heading', { name: 'Workspace · Build' }),
  ).toBeVisible();

  // Playwright contexts default to a light color scheme, so the first
  // toggle click deterministically lands on dark.
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);

  await page.getByRole('button', { name: 'Toggle navigation' }).click();
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden();
});
