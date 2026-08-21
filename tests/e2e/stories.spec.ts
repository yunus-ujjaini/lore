import { test, expect } from '@playwright/test';
import { stories } from '../../content/index';

const BASE_URL = 'http://localhost:5173/lore';

const totalStories = Object.keys(stories).length;

test.describe('Stories Feature', () => {

  // T059: Stories Page - Browse Stories
  test('displays all stories on Stories page', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories`);
    await expect(page.getByRole('heading', { name: 'THE TALES' })).toBeVisible();

    const storyCards = page.locator('.story-card');
    await expect(storyCards).toHaveCount(totalStories);
  });

  // T059: Story Reader - Read a Story
  test('navigates to story reader', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories`);

    // Click on first story card
    await page.click('.story-card:first-child');

    // Should navigate to /stories/:id
    await expect(page).toHaveURL(/\/stories\//);

    // Story reader should show hero and sections
    await expect(page.locator('[data-testid="story-hero"]')).toBeVisible();
    await expect(page.locator('[data-testid="story-section"]').first()).toBeVisible();
  });

  // T059: Back Navigation
  test('navigates back to Stories', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories/the-last-wish`);

    // Click back link
    await page.click('.back-nav');

    // Should navigate back to Stories page
    await expect(page).toHaveURL(`${BASE_URL}/stories`);
  });

  // T059: Related Monsters
  test('displays related monsters', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories/the-last-wish`);

    // Should show related monsters section
    await expect(page.getByRole('heading', { name: 'Monsters Encountered' })).toBeVisible();

    // Should show Leshen (referenced in the story)
    const monsterLinks = page.locator('[role="link"][aria-label^="View "]');
    await expect(monsterLinks).toHaveCount(1);
    await expect(monsterLinks.first()).toHaveAttribute('aria-label', 'View Leshen in bestiary');
  });

  // T059: Missing Story
  test('shows not-found state for invalid story', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories/nonexistent-story`);

    // Should show not-found message
    await expect(page.getByText('Tale Not Found')).toBeVisible();
    await expect(page.getByText(/has not yet been recorded/)).toBeVisible();

    // Should have a way back to Stories
    await expect(page.getByRole('button', { name: 'Return to Stories' })).toBeVisible();
  });

  // T059: Responsive Layout
  test('responsive layout works', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories`);

    const gridColumns = async () =>
      page.locator('.story-card').first().evaluate((el) => {
        const grid = el.parentElement?.parentElement;
        return grid ? window.getComputedStyle(grid).gridTemplateColumns : '';
      });

    // Desktop: 3 columns
    await page.setViewportSize({ width: 1280, height: 720 });
    expect((await gridColumns()).split(' ').length).toBeGreaterThanOrEqual(3);

    // Mobile: 1 column
    await page.setViewportSize({ width: 375, height: 667 });
    expect((await gridColumns()).split(' ').length).toBe(1);
  });

  // T059: Global Navigation
  test('global navigation works', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories`);

    // Should have navigation links
    const nav = page.locator('.global-nav');
    await expect(nav).toBeVisible();

    // Click Bestiary link
    await page.click('.nav-link:has-text("Bestiary")');
    await expect(page).toHaveURL(`${BASE_URL}/bestiary`);

    // Click Stories link
    await page.click('.nav-link:has-text("Stories")');
    await expect(page).toHaveURL(`${BASE_URL}/stories`);
  });
});