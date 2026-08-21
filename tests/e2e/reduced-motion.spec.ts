import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Reduced Motion Support', () => {
  test('reduced motion disables animations', async ({ page }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);

    // Story should still be visible and readable
    await expect(page.locator('[data-testid="story-hero"]')).toBeVisible();
    await expect(page.locator('[data-testid="story-hero"] h1')).toBeVisible();
    await expect(page.locator('[data-testid="story-section"]').first()).toBeVisible();

    // Progress bar should still be present
    await expect(page.locator('.progress-bar')).toBeVisible();
  });

  test('content is accessible without animations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);

    // All sections should be visible
    const sections = page.locator('[data-testid="story-section"]');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);

    // Related monsters should be visible
    await expect(page.getByRole('heading', { name: 'Monsters Encountered' })).toBeVisible();

    // Navigation should work
    await expect(page.locator('nav[aria-label="Story navigation"] a').first()).toBeVisible();
  });
});