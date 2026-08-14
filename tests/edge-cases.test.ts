import { afterEach, describe, expect, it } from 'vitest';
import { validateDataset } from '../src/validation/validate';
import { DEFAULT_CATEGORIES, makeFixture, monsterFile, storyFile, type Fixture } from './helpers/fixture';

let fixtures: Fixture[] = [];

afterEach(() => {
  for (const f of fixtures) f.cleanup();
  fixtures = [];
});

function useFixture() {
  const f = makeFixture();
  f.write('content/categories.ts', DEFAULT_CATEGORIES);
  f.write('public/images/monsters/leshen.png', 'img');
  f.write('public/images/stories/striga.png', 'img');
  fixtures.push(f);
  return f;
}

async function errors(f: Fixture) {
  const result = await validateDataset(f.options);
  return result.errors;
}

describe('Validation edge cases (FR-011, SC-002)', () => {
  it('rejects duplicate monster IDs, identifying the entry', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('leshen'));
    f.write('content/monsters/b.ts', monsterFile('leshen'));
    const errs = await errors(f);
    expect(errs.some((e) => e.field === 'id' && e.message.includes('duplicate ID "leshen"'))).toBe(true);
  });

  it('rejects duplicate story IDs', async () => {
    const f = useFixture();
    f.write('content/stories/a.ts', storyFile('tale'));
    f.write('content/stories/b.ts', storyFile('tale'));
    const errs = await errors(f);
    expect(errs.some((e) => e.field === 'id' && e.message.includes('duplicate ID "tale"'))).toBe(true);
  });

  it('rejects a monster and a story sharing an ID (cross-type, FR-003)', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('leshen'));
    f.write('content/stories/a.ts', storyFile('leshen'));
    const errs = await errors(f);
    expect(errs.some((e) => e.field === 'id' && e.message.includes('duplicate ID "leshen"'))).toBe(true);
  });

  it('rejects a non-URL-safe ID with the offending entry and field', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('Bad ID'));
    const errs = await errors(f);
    expect(errs.some((e) => e.field === 'id' && e.entry.includes('a.ts'))).toBe(true);
  });

  it('rejects a missing required field, naming the entry and field', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('leshen', { description: undefined }));
    const errs = await errors(f);
    expect(errs.some((e) => e.field === 'description' && e.entry.includes('a.ts'))).toBe(true);
  });

  it('rejects a category outside the central list', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('leshen', { category: 'Spirits' }));
    const errs = await errors(f);
    expect(errs.some((e) => e.field === 'category')).toBe(true);
  });

  it('rejects a threat level outside 1–5', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('leshen', { threatLevel: 6 }));
    const errs = await errors(f);
    expect(errs.some((e) => e.field === 'threatLevel')).toBe(true);
  });

  it('rejects a story referencing a nonexistent monster', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('leshen'));
    f.write('content/stories/a.ts', storyFile('tale', { monsterIds: ['ghost'] }));
    const errs = await errors(f);
    expect(errs.some((e) => e.field === 'monsterIds' && e.message.includes('ghost'))).toBe(true);
  });

  it('rejects an image reference to a missing file, naming the entry and file', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('leshen', { image: 'ghost.png' }));
    const errs = await errors(f);
    expect(errs.some((e) => e.field === 'image' && e.message.includes('ghost.png'))).toBe(true);
  });

  it('accepts the designated placeholder image (FR-023)', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('leshen', { image: 'placeholders/missing.png' }));
    const errs = await errors(f);
    expect(errs.filter((e) => e.field === 'image')).toEqual([]);
  });

  it('rejects a story referencing a monster whose image is missing (broken dataset)', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('leshen', { image: 'missing-file.png' }));
    f.write('content/stories/a.ts', storyFile('tale', { monsterIds: ['leshen'] }));
    const errs = await errors(f);
    expect(errs.some((e) => e.field === 'image')).toBe(true);
  });

  it('reports duplicate category names in the central list', async () => {
    const f = useFixture();
    f.write(
      'content/categories.ts',
      "export const categories = ['Beasts', 'Beasts'] as const;",
    );
    f.write('content/monsters/a.ts', monsterFile('leshen'));
    const errs = await errors(f);
    expect(errs.some((e) => e.message.includes('duplicate category "Beasts"'))).toBe(true);
  });

  it('passes a fully valid fixture with zero failures', async () => {
    const f = useFixture();
    f.write('content/monsters/a.ts', monsterFile('leshen'));
    f.write('content/stories/a.ts', storyFile('tale', { monsterIds: ['leshen'] }));
    const errs = await errors(f);
    expect(errs).toEqual([]);
  });
});
