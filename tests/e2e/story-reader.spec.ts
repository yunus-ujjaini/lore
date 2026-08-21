import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Story Reader Experience', () => {
  test('opens story with hero, title, and summary', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    await expect(page.locator('[data-testid="story-hero"]')).toBeVisible();
    await expect(page.locator('[data-testid="story-hero"] h1')).toContainText('The Last Wish');
    await expect(page.locator('[data-testid="story-hero"] p').last()).toBeVisible();
  });

  test('displays sections with chapter headings', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    const sections = page.locator('[data-testid="story-section"]');
    await expect(sections.first()).toBeVisible();

    // Each section is introduced by a "Chapter N" heading
    await expect(sections.first()).toContainText('Chapter 1');
    await expect(sections).toHaveCount(4); // The Last Wish has 4 sections
  });

  test('progress bar is visible at top', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    // Scroll so the scroll-driven progress bar expands beyond zero width
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(300);
    const progressBar = page.locator('.progress-bar');
    await expect(progressBar).toBeVisible();
    await expect(progressBar).toHaveAttribute('role', 'progressbar');
    await expect(progressBar).toHaveAttribute('aria-label', 'Reading progress');
  });

  test('related monsters section displays', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    await expect(page.getByRole('heading', { name: 'Monsters Encountered' })).toBeVisible();
    await expect(page.locator('[role="link"][aria-label^="View "]').first()).toBeVisible();
  });

  test('next tale card is visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    const nextTale = page.locator('[role="link"][aria-label^="Next Tale:"]');
    await expect(nextTale).toBeVisible();
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    await expect(page.locator('nav[aria-label="Story navigation"] a', { hasText: 'Return to Stories' })).toBeVisible();
    await expect(page.locator('nav[aria-label="Story navigation"] a', { hasText: 'Explore Bestiary' })).toBeVisible();
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });

  test('no horizontal overflow on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });

  test('story ending divider is present', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    const ending = page.locator('.medallion-divider');
    await expect(ending.first()).toBeVisible();
  });
});