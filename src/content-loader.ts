import type { Monster, Story } from './validation/schema';
import { categories } from '../content/categories';

// Browser-safe content loader using Vite's import.meta.glob
// Loads all monster and story modules at build time (eager loading)

interface MonsterModule {
  default: Monster;
}

interface StoryModule {
  default: Story;
}

// Load monsters
const monsterModules = import.meta.glob<MonsterModule>(
  '../content/monsters/*.ts',
  { eager: true }
);

export const monsters: Record<string, Monster> = {};

for (const path in monsterModules) {
  const mod = monsterModules[path];
  const id = path.split('/').pop()?.replace('.ts', '') ?? '';
  if (id && mod.default) {
    monsters[id] = mod.default;
  }
}

// Load stories
const storyModules = import.meta.glob<StoryModule>(
  '../content/stories/*.ts',
  { eager: true }
);

export const stories: Record<string, Story> = {};

for (const path in storyModules) {
  const mod = storyModules[path];
  const id = path.split('/').pop()?.replace('.ts', '') ?? '';
  if (id && mod.default) {
    stories[id] = mod.default;
  }
}

export { categories };
export type { Category } from '../content/categories';
