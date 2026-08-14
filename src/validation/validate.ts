import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createMonsterSchema, StorySchema, type Monster, type Story } from './schema';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

export interface ValidateOptions {
  /** Project root; defaults to the repository root. */
  root?: string;
  contentDir?: string;
  monstersDir?: string;
  storiesDir?: string;
  imagesDir?: string;
}

export interface ValidationError {
  entry: string;
  field?: string;
  message: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: ValidationError[];
  monsters: Monster[];
  stories: Story[];
  categories: readonly string[];
}

async function loadCategories(contentDir: string): Promise<readonly string[]> {
  const file = path.join(contentDir, 'categories.ts');
  if (!fs.existsSync(file)) return [];
  const mod = await import(pathToFileURL(file).href);
  return (mod.categories ?? mod.default ?? []) as readonly string[];
}

async function loadEntries<T>(dir: string): Promise<{ file: string; entry: T }[]> {
  const entries: { file: string; entry: T }[] = [];
  if (!fs.existsSync(dir)) return entries;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
    const mod = await import(pathToFileURL(path.join(dir, file)).href);
    const entry = (mod.default ?? mod.entry) as T;
    entries.push({ file, entry });
  }
  return entries;
}

/** Resolve an image value to its file path on disk (FR-022/FR-023). */
export function resolveImagePath(
  image: string,
  kind: 'monster' | 'story',
  imagesDir: string = path.join(ROOT, 'public', 'images'),
): string {
  if (image.startsWith('placeholders/')) return path.join(imagesDir, image);
  return path.join(imagesDir, kind === 'monster' ? 'monsters' : 'stories', image);
}

async function validateEntry<T>(
  entry: unknown,
  schema: ReturnType<typeof createMonsterSchema> | typeof StorySchema,
  file: string,
  errors: ValidationError[],
): Promise<T | null> {
  const result = schema.safeParse(entry);
  if (result.success) return result.data as T;
  for (const issue of result.error.issues) {
    errors.push({
      entry: file,
      field: issue.path.join('.') || undefined,
      message: issue.message,
    });
  }
  return null;
}

export async function validateDataset(options: ValidateOptions = {}): Promise<ValidationResult> {
  const root = options.root ?? ROOT;
  const contentDir = options.contentDir ?? path.join(root, 'content');
  const monstersDir = options.monstersDir ?? path.join(contentDir, 'monsters');
  const storiesDir = options.storiesDir ?? path.join(contentDir, 'stories');
  const imagesDir = options.imagesDir ?? path.join(root, 'public', 'images');

  const errors: ValidationError[] = [];
  const categories = await loadCategories(contentDir);
  const MonsterSchema = createMonsterSchema(categories);

  const monsters = await loadEntries<unknown>(monstersDir);
  const stories = await loadEntries<unknown>(storiesDir);

  const parsedMonsters: { file: string; parsed: Monster | null }[] = [];
  const parsedStories: { file: string; parsed: Story | null }[] = [];

  for (const m of monsters) {
    parsedMonsters.push({ file: m.file, parsed: await validateEntry<Monster>(m.entry, MonsterSchema, `content/monsters/${m.file}`, errors) });
  }
  for (const s of stories) {
    parsedStories.push({ file: s.file, parsed: await validateEntry<Story>(s.entry, StorySchema, `content/stories/${s.file}`, errors) });
  }

  const validMonsters = parsedMonsters.filter((m): m is { file: string; parsed: Monster } => m.parsed !== null);
  const validStories = parsedStories.filter((s): s is { file: string; parsed: Story } => s.parsed !== null);

  // Duplicate IDs across monsters and stories (FR-003/FR-011) — report every duplicate.
  const seen = new Map<string, string>();
  for (const { file, parsed: m } of validMonsters) {
    const owner = `monster ${file ?? m.id}`;
    if (seen.has(m.id)) errors.push({ entry: owner, field: 'id', message: `duplicate ID "${m.id}" also used by ${seen.get(m.id)}` });
    else seen.set(m.id, owner);
  }
  for (const { file, parsed: s } of validStories) {
    const owner = `story ${file ?? s.id}`;
    if (seen.has(s.id)) errors.push({ entry: owner, field: 'id', message: `duplicate ID "${s.id}" also used by ${seen.get(s.id)}` });
    else seen.set(s.id, owner);
  }

  const monsterIds = new Set(validMonsters.map(({ parsed: m }) => m.id));

  // Image existence (user decision in spec Clarifications).
  for (const { parsed: m } of validMonsters) {
    const resolved = resolveImagePath(m.image, 'monster', imagesDir);
    if (!fs.existsSync(resolved)) {
      errors.push({ entry: `content/monsters/${m.id}`, field: 'image', message: `image file not found: ${path.relative(root, resolved)}` });
    }
  }
  for (const { parsed: s } of validStories) {
    const resolved = resolveImagePath(s.image, 'story', imagesDir);
    if (!fs.existsSync(resolved)) {
      errors.push({ entry: `content/stories/${s.id}`, field: 'image', message: `image file not found: ${path.relative(root, resolved)}` });
    }
  }

  // Designated placeholder must exist (FR-023).
  if (!fs.existsSync(path.join(imagesDir, 'placeholders', 'missing.png'))) {
    errors.push({ entry: 'placeholders/missing.png', message: 'designated placeholder image is missing' });
  }

  // Story references resolve to existing monsters (FR-009/FR-011).
  for (const { parsed: s } of validStories) {
    for (const ref of s.monsterIds) {
      if (!monsterIds.has(ref)) {
        errors.push({ entry: `content/stories/${s.id}`, field: 'monsterIds', message: `references nonexistent monster "${ref}"` });
      }
    }
  }

  // Category list invariants (contract rule 9): names unique.
  const categorySeen = new Set<string>();
  for (const c of categories) {
    if (categorySeen.has(c)) errors.push({ entry: 'content/categories.ts', message: `duplicate category "${c}"` });
    categorySeen.add(c);
  }

  return {
    ok: errors.length === 0,
    errors,
    monsters: validMonsters.map(({ parsed: m }) => m),
    stories: validStories.map(({ parsed: s }) => s),
    categories,
  };
}
