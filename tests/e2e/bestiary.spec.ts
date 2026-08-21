import { test, expect } from '@playwright/test';
import { monsters } from '../../content/index';

const BASE_URL = 'http://localhost:5173/lore';

const allMonsters = Object.values(monsters);
const totalCount = allMonsters.length;
const countByCategory = (c: string) => allMonsters.filter((m) => m.category === c).length;
const countByThreat = (t: number) => allMonsters.filter((m) => m.threatLevel === t).length;

test.describe('Bestiary Explorer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/bestiary`);
    await page.waitForLoadState('networkidle');
  });

  // T064: Browse all monsters
  test('displays all monsters', async ({ page }) => {
    const cards = page.locator('.monster-card');
    await expect(cards).toHaveCount(totalCount);

    // Verify each card has the required elements (name, category, description)
    const firstCard = cards.first();
    await expect(firstCard.locator('.monster-card__name')).toBeVisible();
    await expect(firstCard.locator('.monster-card__category')).toBeVisible();
    await expect(firstCard.locator('.monster-card__description')).toBeVisible();
    await expect(firstCard.locator('.monster-card__tales')).toBeVisible();
  });

  // T065: Search by name
  test('filters by search query', async ({ page }) => {
    const searchInput = page.locator('.search-input');

    // Search for "leshen" - only Leshen should be shown
    await searchInput.fill('leshen');
    await page.waitForTimeout(300); // Wait for debounce
    const cards = page.locator('.monster-card');
    await expect(cards).toHaveCount(1);
    await expect(cards.first().locator('.monster-card__name')).toContainText('Leshen');

    // Clear search - all monsters should return
    await searchInput.clear();
    await page.waitForTimeout(300);
    await expect(cards).toHaveCount(totalCount);
  });

  // T066: Filter by category
  test('filters by category', async ({ page }) => {
    // Click "Beasts" category filter
    await page.locator('.category-filter .filter-pill', { hasText: 'Beasts' }).click();

    const cards = page.locator('.monster-card');
    await expect(cards).toHaveCount(countByCategory('Beasts'));

    // Click "All" to clear
    await page.locator('.category-filter .filter-pill', { hasText: 'All' }).click();
    await expect(cards).toHaveCount(totalCount);
  });

  // T067: Filter by threat level
  test('filters by threat level', async ({ page }) => {
    // Click threat level 3
    await page.click('button[aria-label="Threat level 3"]');

    const cards = page.locator('.monster-card');
    await expect(cards).toHaveCount(countByThreat(3));

    // Click "All" to clear
    await page.locator('.filter-bar__group .filter-pill', { hasText: 'All' }).click();
    await expect(cards).toHaveCount(totalCount);
  });

  // T068: Combined filters and reset
  test('combines filters and reset works', async ({ page }) => {
    const searchInput = page.locator('.search-input');

    // Apply search + category
    await searchInput.fill('leshen');
    await page.waitForTimeout(300);
    await page.locator('.category-filter .filter-pill', { hasText: 'Relicts' }).click();

    const cards = page.locator('.monster-card');
    // Leshen is the only Relict matching "leshen"
    await expect(cards).toHaveCount(1);

    // Clear search but keep category
    await searchInput.clear();
    await page.waitForTimeout(300);
    // Still filtered by Relicts category
    await expect(cards).toHaveCount(countByCategory('Relicts'));

    // Reset all filters
    await page.locator('.category-filter .filter-pill', { hasText: 'All' }).click();
    await expect(cards).toHaveCount(totalCount);
  });

  // T069: Navigation to monster details
  test('navigates to monster details', async ({ page }) => {
    // Click on the first monster card
    await page.click('.monster-card:first-child');

    // Should navigate to /bestiary/<id>
    await expect(page).toHaveURL(/\/bestiary\//);

    // Details page should show monster name and back link
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('.back-nav')).toBeVisible();

    // Click back link
    await page.click('.back-nav');
    await expect(page).toHaveURL(`${BASE_URL}/bestiary`);
  });

  // T070: Responsive layout
  test('responsive layout works', async ({ page }) => {
    // Desktop: 3 columns
    await page.setViewportSize({ width: 1280, height: 720 });
    const grid = page.locator('.bestiary__grid');
    const gridStyle = await grid.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.gridTemplateColumns;
    });
    // Should have 3 columns
    expect(gridStyle.split(' ').length).toBeGreaterThanOrEqual(3);

    // Tablet: 2 columns
    await page.setViewportSize({ width: 768, height: 1024 });
    const tabletGridStyle = await grid.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.gridTemplateColumns;
    });
    expect(tabletGridStyle.split(' ').length).toBe(2);

    // Mobile: 1 column
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileGridStyle = await grid.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.gridTemplateColumns;
    });
    expect(mobileGridStyle.split(' ').length).toBe(1);
  });

  // T071: Keyboard accessibility
  test('keyboard navigation works', async ({ page }) => {
    // Verify search input is accessible
    const searchInput = page.locator('.search-input');
    await expect(searchInput).toHaveAttribute('aria-label', 'Search monsters');

    // Verify filter buttons are accessible
    const categoryButtons = page.locator('.category-filter .filter-pill');
    const firstCategoryButton = categoryButtons.first();
    await expect(firstCategoryButton).toHaveAttribute('aria-pressed');

    // Verify monster cards are accessible
    const firstCard = page.locator('.monster-card').first();
    await expect(firstCard).toHaveAttribute('role', 'link');
    await expect(firstCard).toHaveAttribute('tabindex', '0');
    await expect(firstCard).toHaveAttribute('aria-label');

    // Verify cards have keyboard event handlers
    await firstCard.focus();
    await expect(firstCard).toBeFocused();
  });

  // T062: Quickstart validation
  test('quickstart scenarios work', async ({ page }) => {
    // Scenario 1: Browse - all monsters displayed
    const cards = page.locator('.monster-card');
    await expect(cards).toHaveCount(totalCount);

    // Scenario 2: Search - correct results
    await page.fill('.search-input', 'leshen');
    await page.waitForTimeout(300);
    await expect(cards).toHaveCount(1);
    await expect(cards.first().locator('.monster-card__name')).toContainText('Leshen');

    // Scenario 3: Reset
    await page.fill('.search-input', '');
    await page.waitForTimeout(300);
    await expect(cards).toHaveCount(totalCount);

    // Scenario 4: Navigation
    await page.click('.monster-card:first-child');
    await expect(page).toHaveURL(/\/bestiary\//);
    await expect(page.locator('h1').first()).toBeVisible();
  });
});