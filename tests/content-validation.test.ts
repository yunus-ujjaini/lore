import { describe, expect, it } from 'vitest';
import { validateDataset } from '../src/validation/validate';

describe('Full dataset validation (SC-001, SC-003)', () => {
  it('loads every content entry and passes with zero failures', async () => {
    const result = await validateDataset();
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it('reports the dataset counts required by SC-003', async () => {
    const result = await validateDataset();
    expect(result.monsters.length).toBeGreaterThanOrEqual(10);
    expect(result.stories.length).toBeGreaterThanOrEqual(3);
    expect(result.categories.length).toBe(10);
  });

  it('spans at least 4 different categories and 3 distinct threat levels (SC-003)', async () => {
    const result = await validateDataset();
    const categories = new Set(result.monsters.map((m) => m.category));
    const threatLevels = new Set(result.monsters.map((m) => m.threatLevel));
    expect(categories.size).toBeGreaterThanOrEqual(4);
    expect(threatLevels.size).toBeGreaterThanOrEqual(3);
  });

  it('has every story reference resolving to an existing monster (SC-005)', async () => {
    const result = await validateDataset();
    expect(result.errors.filter((e) => e.field === 'monsterIds')).toEqual([]);
    expect(result.errors.filter((e) => e.field === 'image')).toEqual([]);
  });

  it('includes at least one story referencing more than one monster (FR-017)', async () => {
    const result = await validateDataset();
    expect(result.stories.some((s) => s.monsterIds.length > 1)).toBe(true);
  });

  it('has exactly the 10 initial categories in the central list (SC-004)', async () => {
    const result = await validateDataset();
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
});
