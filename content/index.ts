/**
 * Single consumption entry point for content consumers (FR-014).
 *
 * Monsters and stories are loaded dynamically from the content folders, so
 * adding or removing entries NEVER requires a change to this file (FR-015,
 * SC-006). Future browser-side UI may use its own build-time glob mechanism;
 * per the spec decision, live consumption belongs to future UI features.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Monster, Story } from '../src/validation/schema';

export { categories } from './categories';
export type { Category } from './categories';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadDir<T>(dir: string): Promise<Record<string, T>> {
  const out: Record<string, T> = {};
  const fullDir = path.join(__dirname, dir);
  if (!fs.existsSync(fullDir)) return out;
  for (const file of fs.readdirSync(fullDir).filter((f) => f.endsWith('.ts'))) {
    const id = file.replace(/\.ts$/, '');
    const mod = await import(`./${dir}/${file}`);
    out[id] = (mod.default ?? mod.entry) as T;
  }
  return out;
}

export const monsters: Record<string, Monster> = await loadDir<Monster>('monsters');
export const stories: Record<string, Story> = await loadDir<Story>('stories');

export type { Monster, Story } from '../src/validation/schema';
