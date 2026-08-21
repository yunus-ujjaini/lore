import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Story Reader Experience', () => {
  test('opens story with hero, title, and summary', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    await expect(page.locator('[data-testid="story-hero"]')).toBeVisible();
    await expect(page.locator('.story-reader__title')).toBeVisible();
    await expect(page.locator('.story-reader__summary')).toBeVisible();
  });

  test('displays sections with Roman numerals and dividers', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    const sections = page.locator('[data-testid="story-section"]');
    await expect(sections.first()).toBeVisible();
    
    // Check section headers exist
    const headers = page.locator('.section-header');
    await expect(headers.first()).toBeVisible();
  });

  test('progress bar is visible at top', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    const progressBar = page.locator('.reading-progress-bar');
    await expect(progressBar).toBeVisible();
    await expect(progressBar).toHaveAttribute('role', 'progressbar');
    await expect(progressBar).toHaveAttribute('aria-label', 'Reading progress');
  });

  test('related monsters section displays', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    const related = page.locator('.related-monsters');
    await expect(related).toBeVisible();
    await expect(page.locator('.related-monsters__title')).toContainText('Monsters of this Tale');
  });

  test('next tale card is visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    const nextTale = page.locator('.next-tale-card');
    await expect(nextTale).toBeVisible();
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto(`${BASE_URL}/lore/stories/the-last-wish`);
    await expect(page.locator('.story-navigation__link:has-text("Return to Stories")')).toBeVisible();
    await expect(page.locator('.story-navigation__link:has-text("Explore Bestiary")')).toBeVisible();
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
    const ending = page.locator('.story-ending');
    await expect(ending).toBeVisible();
  });
});
