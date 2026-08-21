import { z } from 'zod';
import { categories } from '../../content/categories';

/** URL-safe ID: lowercase letters, digits, hyphens (FR-003). */
const urlSafeId = z.string().regex(/^[a-z0-9-]+$/, 'must be URL-safe (lowercase letters, digits, hyphens)');

const IMAGE_EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png'] as const;

/** Local image filename (FR-022) or the designated placeholder path (FR-023). */
const imageRef = z.string().regex(
  /^(?:[a-z0-9-]+\.(?:webp|jpg|jpeg|png)|placeholders\/missing\.png)$/,
  'must be a local image filename (URL-safe, extension webp/jpg/jpeg/png) or placeholders/missing.png',
);

export const threatLevelRef = z.number().int().min(1).max(5);

/**
 * Build the Monster schema against a given category list (FR-004/FR-005).
 * The list is loaded from content data so extending it is a data edit.
 */
export function createMonsterSchema(categoryList: readonly string[]) {
  const categoryRef = z.string().refine(
    (c) => categoryList.includes(c),
    'must be one of the central category list',
  );
  return z
    .object({
      id: urlSafeId,
      name: z.string().min(1, 'required'),
      category: categoryRef,
      threatLevel: threatLevelRef,
      description: z.string().min(1, 'required'),
      image: imageRef,
      lore: z.string().optional(),
      weaknesses: z.array(z.string()).optional(),
    })
    .strict();
}

/** Story section schema for the new sections-based structure. */
export const StorySectionSchema = z
  .object({
    id: urlSafeId,
    title: z.string().min(1, 'required'),
    content: z.string().min(1, 'required'),
  })
  .strict();

export type StorySection = z.infer<typeof StorySectionSchema>;

/** Story schema - supports both legacy content and new sections structure. */
export const StorySchema = z
  .object({
    id: urlSafeId,
    title: z.string().min(1, 'required'),
    summary: z.string().min(1, 'required'),
    content: z.string().optional(), // Legacy format (pre-migration)
    sections: z.array(StorySectionSchema).optional(), // New format (post-migration)
    monsterIds: z.array(urlSafeId),
    image: imageRef,
  })
  .strict();

/** Default schemas built against the repository's real category list. */
export const MonsterSchema = createMonsterSchema(categories);

export type Monster = z.infer<typeof MonsterSchema>;
export type Story = z.infer<typeof StorySchema>;
export type ImageExtension = (typeof IMAGE_EXTENSIONS)[number];
