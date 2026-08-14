import { afterEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { validateDataset } from '../src/validation/validate';
import { makeFixture, monsterFile, type Fixture } from './helpers/fixture';
import { resolveImagePath } from '../src/validation/validate';

let fixtures: Fixture[] = [];

afterEach(() => {
  for (const f of fixtures) f.cleanup();
  fixtures = [];
});

describe('Content expansion without code changes (US6, SC-006)', () => {
  it('accepts a newly added monster with zero application code changes', async () => {
    const f = makeFixture();
    f.write(
      'content/categories.ts',
      "export const categories = ['Beasts', 'Cursed Ones', 'Draconids', 'Elementa', 'Hybrids', 'Insectoids', 'Necrophages', 'Relicts', 'Specters', 'Vampires'] as const;",
    );
    f.write('content/monsters/leshen.ts', monsterFile('leshen'));
    f.write('content/stories/tale.ts', `export default ${JSON.stringify({ id: 'tale', title: 't', summary: 's', content: 'c', monsterIds: ['leshen'], image: 'striga.png' })};`);
    f.write('public/images/monsters/leshen.png', 'img');
    f.write('public/images/stories/striga.png', 'img');
    const before = await validateDataset(f.options);
    expect(before.ok).toBe(true);

    // Add a new monster entry — a data-only change.
    f.write('content/monsters/striga.ts', monsterFile('striga', { category: 'Cursed Ones', threatLevel: 4 }));
    f.write('public/images/monsters/striga.png', 'img');
    const after = await validateDataset(f.options);
    expect(after.ok).toBe(true);
    expect(after.monsters).toHaveLength(2);
  });

  it('resolves the dynamic content index without modification when content grows', async () => {
    // The repository's real index loads every entry in the content folders
    // dynamically (content/index.ts), so the index itself needs no edit when
    // entries are added (FR-015).
    const { monsters, stories } = await import('../content/index');
    const ids = Object.keys(monsters);
    expect(ids.length).toBeGreaterThanOrEqual(10);
    expect(Object.keys(stories).length).toBeGreaterThanOrEqual(3);
  });

  it('validates image existence for every entry in the repo dataset (SC-002)', async () => {
    const result = await validateDataset();
    expect(result.errors).toEqual([]);
    for (const m of result.monsters) {
      const resolved = resolveImagePath(m.image, 'monster');
      expect(fs.existsSync(resolved), `missing image ${resolved}`).toBe(true);
    }
    for (const s of result.stories) {
      const resolved = resolveImagePath(s.image, 'story');
      expect(fs.existsSync(resolved), `missing image ${resolved}`).toBe(true);
    }
  });

  it('has no content data outside the content folders (FR-013)', () => {
    const contentRoot = path.resolve(__dirname, '../content');
    const entries = fs.readdirSync(contentRoot);
    expect(entries).toEqual(expect.arrayContaining(['categories.ts', 'index.ts', 'monsters', 'stories']));
    expect(entries).toHaveLength(4);
  });
});
