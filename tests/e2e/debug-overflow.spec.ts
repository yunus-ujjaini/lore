import { test } from '@playwright/test';

test('debug mobile overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:5173/lore/stories/the-last-wish');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);
  const info = await page.evaluate(() => {
    const doc = document.documentElement;
    const wide: { tag: string; cls: string; w: number; sw: number }[] = [];
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > doc.clientWidth + 1 || r.width > doc.clientWidth + 1) {
        wide.push({ tag: el.tagName, cls: (el as HTMLElement).className?.toString?.().slice(0, 40) || '', w: Math.round(r.width), sw: Math.round(r.right) });
      }
    });
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      wide: wide.slice(0, 15),
      computed: window.getComputedStyle(document.querySelector('[data-testid="story-content"]')!.parentElement!.parentElement!).display,
    };
  });
  console.log('DEBUG', JSON.stringify(info, null, 1));
});