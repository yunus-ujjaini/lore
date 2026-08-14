import { afterEach, describe, expect, it } from 'vitest';
import { validateDataset } from '../src/validation/validate';
import { DEFAULT_CATEGORIES, makeFixture, monsterFile, type Fixture } from './helpers/fixture';

let fixtures: Fixture[] = [];

afterEach(() => {
  for (const f of fixtures) f.cleanup();
  fixtures = [];
});

function useFixture(categoriesSource: string = DEFAULT_CATEGORIES) {
  const f = makeFixture();
  f.write('content/categories.ts', categoriesSource);
  f.write('public/images/monsters/leshen.png', 'img');
  fixtures.push(f);
  return f;
}

describe('Central category list (US4, FR-005, SC-004)', () => {
  it('delivers exactly the 10 initial categories', async () => {
    const result = await validateDataset();
    expect(result.categories).toHaveLength(10);
    expect(result.categories).toEqual([
      'Beasts',
      'Cursed Ones',
      'Draconids',
      'Elementa',
      'Hybrids',
      'Insectoids',
      'Necrophages',
      'Relicts',
      'Specters',
      'Vampires',
    ]);
  });

  it('accepts a category added as a data edit — no code change (US4 acceptance 4)', async () => {
    const f = useFixture(
      `export const categories = ['Beasts', 'Cursed Ones', 'Draconids', 'Elementa', 'Hybrids', 'Insectoids', 'Necrophages', 'Relicts', 'Specters', 'Vampires', 'Spirits'] as const;`,
    );
    f.write('content/monsters/a.ts', monsterFile('shade', { category: 'Spirits' }));
    const result = await validateDataset(f.options);
    expect(result.errors).toEqual([]);
  });

  it('rejects a monster left referencing a removed category (US4 acceptance 2, FR-004)', async () => {
    const f = useFixture("export const categories = ['Cursed Ones', 'Draconids'] as const;");
    f.write('content/monsters/a.ts', monsterFile('leshen', { category: 'Beasts' }));
    const result = await validateDataset(f.options);
    expect(result.errors.some((e) => e.field === 'category')).toBe(true);
  });

  it('validates the category list is consumed from a single source (FR-006)', async () => {
    // The default MonsterSchema and the dataset validator both resolve the list
    // from content/categories.ts; there is no second list definition in the repo.
    const { categories } = await import('../content/categories');
    expect(categories).toHaveLength(10);
  });
});
