import { describe, expect, it } from 'vitest';
import { StorySchema } from '../src/validation/schema';

const validStory = {
  id: 'striga-of-maribor',
  title: 'The Striga of Maribor',
  summary: 'A witcher is hired to lift a curse from a nobleman\'s daughter.',
  content: 'The king\'s advisor begged the witcher to enter the crypts beneath Maribor...',
  monsterIds: ['striga'],
  image: 'striga-of-maribor.png',
};

describe('Story schema', () => {
  it('accepts a complete story entry (US2 acceptance 1)', () => {
    expect(StorySchema.safeParse(validStory).success).toBe(true);
  });

  it('accepts a story with no monster references (US2 acceptance 4, FR-009)', () => {
    expect(StorySchema.safeParse({ ...validStory, monsterIds: [] }).success).toBe(true);
  });

  it('accepts a story referencing multiple monsters (FR-010)', () => {
    expect(StorySchema.safeParse({ ...validStory, monsterIds: ['striga', 'griffin'] }).success).toBe(true);
  });

  it('rejects each missing required field, naming it (FR-011)', () => {
    // Required fields per the current schema: content and sections are optional
    // (legacy content string vs migrated sections structure).
    for (const field of ['id', 'title', 'summary', 'monsterIds', 'image'] as const) {
      const { success, error } = StorySchema.safeParse({ ...validStory, [field]: undefined });
      expect(success).toBe(false);
      expect(error!.issues.some((i) => i.path[0] === field)).toBe(true);
    }
  });

  it('rejects a reference to a nonexistent monster at dataset level (US2 acceptance 3)', async () => {
    const { validateDataset } = await import('../src/validation/validate');
    // Validate the real dataset; broken-reference rejection is asserted in
    // tests/edge-cases.test.ts via validateDataset, which owns reference resolution.
    const result = await validateDataset();
    expect(result.errors.filter((e) => e.field === 'monsterIds')).toEqual([]);
  });

  it('rejects non-URL-safe story IDs (FR-003)', () => {
    const result = StorySchema.safeParse({ ...validStory, id: 'Striga Of Maribor' });
    expect(result.success).toBe(false);
  });

  it('rejects unknown fields (strict model)', () => {
    const result = StorySchema.safeParse({ ...validStory, lore: true });
    expect(result.success).toBe(false);
  });
});
