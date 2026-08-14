---
title: Browser-safe content loader
type: concept
sources: [S004]
updated: 2026-08-14
---

# Browser-safe content loader

The existing `content/index.ts` uses Node's `fs` module and cannot run in the
browser. A new `src/content-loader.ts` uses Vite's `import.meta.glob` to load
all monster modules at build time. (S004)

## How it works

- Uses `import.meta.glob('../../content/monsters/*.ts', { eager: true })` to
  load all monster modules at build time
- Transforms the glob result into a `Record<string, Monster>` for easy lookup
- New monsters added to `content/monsters/` are automatically picked up by the
  glob pattern — no code changes required (FR-003)
- Categories are re-exported from `content/categories.ts`

## Key decisions

- **Eager loading**: All monster data is available immediately (no async loading
  states needed for ~10 monsters)
- **Build-time bundling**: Static-first per constitution V; no runtime fetch
- **Browser-safe**: The loader runs in the browser, unlike `content/index.ts`
  which uses Node's `fs` module

## Implementation

```typescript
// src/content-loader.ts
const monsterModules = import.meta.glob<MonsterModule>(
  '../../content/monsters/*.ts',
  { eager: true }
);
```

The glob path is relative to the file location (`src/content-loader.ts` to
`content/monsters/`).

Related: [content-model](./content-model.md), [tech-stack](./tech-stack.md).
