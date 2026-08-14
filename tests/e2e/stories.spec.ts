import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Stories Feature', () => {

  // T059: Stories Page - Browse Stories
  test('displays all stories on Stories page', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories`);
    await expect(page.locator('.stories-hero__title')).toBeVisible();
    
    const storyCards = page.locator('.story-card');
    await expect(storyCards).toHaveCount(3); // 3 existing stories
  });

  // T059: Story Reader - Read a Story
  test('navigates to story reader', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories`);
    
    // Click on first story card
    await page.click('.story-card:first-child');
    
    // Should navigate to /stories/:id
    await expect(page).toHaveURL(/\/stories\//);
    
    // Story reader should show title and sections
    await expect(page.locator('.story-reader__title')).toBeVisible();
    await expect(page.locator('.story-content__section').first()).toBeVisible();
  });

  // T059: Back Navigation
  test('navigates back to Stories', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories/the-last-wish`);
    
    // Click back link
    await page.click('.back-navigation__link');
    
    // Should navigate back to Stories page
    await expect(page).toHaveURL(`${BASE_URL}/stories`);
  });

  // T059: Related Monsters
  test('displays related monsters', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories/the-last-wish`);
    
    // Should show related monsters section
    const relatedSection = page.locator('.related-monsters');
    await expect(relatedSection).toBeVisible();
    
    // Should show Leshen (referenced in the story)
    const monsterCards = page.locator('.monster-mini-card');
    await expect(monsterCards).toHaveCount(1);
  });

  // T059: Missing Story
  test('shows not-found state for invalid story', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories/nonexistent-story`);
    
    // Should show not-found message
    await expect(page.locator('.not-found-story__title')).toBeVisible();
    await expect(page.locator('.not-found-story__message')).toBeVisible();
    
    // Should have back navigation
    await expect(page.locator('.back-navigation__link')).toBeVisible();
  });

  // T059: Responsive Layout
  test('responsive layout works', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories`);
    
    // Desktop: 3 columns
    await page.setViewportSize({ width: 1280, height: 720 });
    const grid = page.locator('.stories-grid');
    const desktopGridStyle = await grid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });
    expect(desktopGridStyle.split(' ').length).toBeGreaterThanOrEqual(3);

    // Mobile: 1 column
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileGridStyle = await grid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });
    expect(mobileGridStyle.split(' ').length).toBe(1);
  });

  // T059: Global Navigation
  test('global navigation works', async ({ page }) => {
    await page.goto(`${BASE_URL}/stories`);
    
    // Should have navigation links
    const nav = page.locator('.global-nav');
    await expect(nav).toBeVisible();
    
    // Click Bestiary link
    await page.click('.global-nav__link:has-text("Bestiary")');
    await expect(page).toHaveURL(`${BASE_URL}/bestiary`);
    
    // Click Stories link
    await page.click('.global-nav__link:has-text("Stories")');
    await expect(page).toHaveURL(`${BASE_URL}/stories`);
  });
});
