import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { ValidateOptions } from '../../src/validation/validate';

export interface Fixture {
  dir: string;
  options: ValidateOptions;
  cleanup: () => void;
  write: (rel: string, content: string) => string;
}

/** Build an isolated content fixture tree under the OS temp dir. */
export function makeFixture(): Fixture {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lore-content-'));
  const contentDir = path.join(dir, 'content');
  const imagesDir = path.join(dir, 'public', 'images');
  fs.mkdirSync(path.join(contentDir, 'monsters'), { recursive: true });
  fs.mkdirSync(path.join(contentDir, 'stories'), { recursive: true });
  fs.mkdirSync(path.join(imagesDir, 'placeholders'), { recursive: true });
  fs.writeFileSync(path.join(imagesDir, 'placeholders', 'missing.png'), 'placeholder');
  return {
    dir,
    options: {
      root: dir,
      contentDir,
      monstersDir: path.join(contentDir, 'monsters'),
      storiesDir: path.join(contentDir, 'stories'),
      imagesDir,
    },
    cleanup: () => fs.rmSync(dir, { recursive: true, force: true }),
    write: (rel, content) => {
      const file = path.join(dir, rel);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, content);
      return file;
    },
  };
}

export const DEFAULT_CATEGORIES = `export const categories = [
  'Beasts', 'Cursed Ones', 'Draconids', 'Elementa', 'Hybrids', 'Insectoids',
  'Necrophages', 'Relicts', 'Specters', 'Vampires',
] as const;`;

export function monsterFile(id: string, overrides: Record<string, unknown> = {}) {
  return `export default ${JSON.stringify({
    id,
    name: id,
    category: 'Beasts',
    threatLevel: 3,
    description: 'A fixture monster.',
    image: 'leshen.png',
    ...overrides,
  })};`;
}

export function storyFile(id: string, overrides: Record<string, unknown> = {}) {
  return `export default ${JSON.stringify({
    id,
    title: id,
    summary: 'A fixture story.',
    content: 'Fixture story content.',
    monsterIds: [],
    image: 'striga.png',
    ...overrides,
  })};`;
}
