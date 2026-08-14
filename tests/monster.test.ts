import { describe, expect, it } from 'vitest';
import { MonsterSchema } from '../src/validation/schema';

const validMonster = {
  id: 'leshen',
  name: 'Leshen',
  category: 'Relicts',
  threatLevel: 5,
  description: 'An ancient creature associated with forests.',
  image: 'leshen.png',
};

describe('Monster schema', () => {
  it('accepts a complete monster entry (US1 acceptance 1)', () => {
    expect(MonsterSchema.safeParse(validMonster).success).toBe(true);
  });

  it('accepts the designated placeholder image (FR-023)', () => {
    expect(MonsterSchema.safeParse({ ...validMonster, image: 'placeholders/missing.png' }).success).toBe(true);
  });

  it('rejects each missing required field, naming it (US1 acceptance 2, FR-011)', () => {
    for (const field of ['id', 'name', 'category', 'threatLevel', 'description', 'image'] as const) {
      const { success, error } = MonsterSchema.safeParse({ ...validMonster, [field]: undefined });
      expect(success).toBe(false);
      expect(error!.issues.some((i) => i.path[0] === field)).toBe(true);
    }
  });

  it('rejects an empty required field', () => {
    const result = MonsterSchema.safeParse({ ...validMonster, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects a category outside the central list (US1 acceptance 3, FR-004)', () => {
    const result = MonsterSchema.safeParse({ ...validMonster, category: 'Spirits' });
    expect(result.success).toBe(false);
    expect(result.error!.issues[0]!.path[0]).toBe('category');
  });

  it.each([0, 6, 3.5, 'high'])('rejects out-of-range or non-integer threat level %p (US1 acceptance 4, FR-007)', (threatLevel) => {
    const result = MonsterSchema.safeParse({ ...validMonster, threatLevel });
    expect(result.success).toBe(false);
    expect(result.error!.issues[0]!.path[0]).toBe('threatLevel');
  });

  it.each(['Leshen', 'leshen_1', 'les hen', 'leshen!'])('rejects non-URL-safe ID "%s" (FR-003)', (id) => {
    const result = MonsterSchema.safeParse({ ...validMonster, id });
    expect(result.success).toBe(false);
  });

  it.each(['leshen.gif', 'LESHEN.png', 'leshen 2.png', 'http://x/leshen.png'])(
    'rejects invalid image reference "%s" (FR-022)',
    (image) => {
      const result = MonsterSchema.safeParse({ ...validMonster, image });
      expect(result.success).toBe(false);
    },
  );

  it('rejects unknown fields (strict model)', () => {
    const result = MonsterSchema.safeParse({ ...validMonster, extra: true });
    expect(result.success).toBe(false);
  });
});
