/**
 * Central category list — single source of truth (FR-005).
 * Extensible as data: adding/removing a name here requires no application code changes.
 */
export const categories = [
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
] as const;

export type Category = (typeof categories)[number];
