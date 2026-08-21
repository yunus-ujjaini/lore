import { expect, test } from '@playwright/test';
import { validateDataset } from '../../src/validation/validate';

const ALLOWED_CONTENT_TYPES = ['image/webp', 'image/jpeg', 'image/png'];
const BASE_URL = 'http://localhost:5173/lore';

test.describe('Served content pipeline (research R8, FR-022/FR-023)', () => {
  test('every content image URL serves 200 with an allowlisted content type', async ({ request }) => {
    const result = await validateDataset();

    // The E2E suite deliberately fails the run if the dataset itself is invalid —
    // serving checks are only meaningful for a valid dataset.
    expect(result.errors).toEqual([]);

    const toCheck = (image: string, kind: 'monster' | 'story'): { url: string; path: string } => {
      const dir = kind === 'monster' ? 'monsters' : 'stories';
      return image.startsWith('placeholders/')
        ? { url: `${BASE_URL}/images/${image}`, path: `public/images/${image}` }
        : { url: `${BASE_URL}/images/${dir}/${image}`, path: `public/images/${dir}/${image}` };
    };

    const urls: { url: string; path: string }[] = [
      ...result.monsters.map((m) => toCheck(m.image, 'monster')),
      ...result.stories.map((s) => toCheck(s.image, 'story')),
    ];

    for (const { url, path } of urls) {
      const response = await request.get(url);
      expect(response.status(), `image should serve 200: ${url}`).toBe(200);
      const contentType = response.headers()['content-type'] ?? '';
      expect(ALLOWED_CONTENT_TYPES.includes(contentType), `unexpected content-type for ${url}: ${contentType}`).toBe(true);
    }
    expect(urls.length).toBeGreaterThanOrEqual(13); // 10 monsters + 3 stories
  });

  test('the designated placeholder is reachable (FR-023)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/images/placeholders/missing.png`);
    expect(response.status()).toBe(200);
  });

  test('no content image value is a remote URL — hotlink ban (FR-022)', async () => {
    const result = await validateDataset();
    const allImages = [...result.monsters.map((m) => m.image), ...result.stories.map((s) => s.image)];
    for (const image of allImages) {
      expect(image.startsWith('http'), `hotlinked image reference: ${image}`).toBe(false);
    }
  });
});
