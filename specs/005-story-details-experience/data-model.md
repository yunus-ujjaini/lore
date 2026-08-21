# Data Model: Story Details Experience Enhancements

**Date**: 2026-08-17
**Feature**: 005-story-details-experience

## Entities

No new data entities are introduced. This feature enhances the presentation of existing entities.

### Existing Entities (unchanged)

**Story** (`content/stories/<id>.ts`):
- `id: string` — URL-safe identifier
- `title: string` — Story title
- `summary: string` — 1-2 sentence summary
- `image: string` — Image filename (or `placeholders/missing.png`)
- `monsterIds: string[]` — References to Monster entities
- `sections: StorySection[]` — Array of story sections

**StorySection** (sub-entity of Story):
- `id: string` — URL-safe identifier
- `title: string` — Section title
- `content: string` — Section narrative text

**Monster** (`content/monsters/<id>.ts`):
- `id: string` — URL-safe identifier
- `name: string` — Display name
- `category: string` — Monster category
- `threatLevel: number` — 1-5 integer
- `description: string` — Description text
- `image: string` — Image filename

### Transient UI State

**Reading Progress** (not persisted):
- Derived from `window.scrollY` / `document.documentElement.scrollHeight`
- Updated via Framer Motion `useScroll` hook
- Displayed as a CSS `scaleX` transform on the progress bar

**Next Story Selection** (session-scoped):
- Random selection from stories array (excluding current story)
- Computed once on mount via `useMemo`
- Not persisted across page loads

## Relationships

```
Story ──references──> Monster[] (via monsterIds)
StoryReaderPage ──reads──> Story (via route param :id)
RelatedMonsters ──displays──> Monster[] (resolved from monsterIds)
NextTaleCard ──links──> Story (random selection)
ReadingProgressBar ──observes──> scroll position
```

## Validation Rules

No schema changes. All existing validation rules from `src/validation/schema.ts` remain in effect:

- Story IDs must be URL-safe (`[a-z0-9-]`)
- `monsterIds` must reference existing monsters
- `image` must be a valid local image or `placeholders/missing.png`
- Sections must have non-empty `id`, `title`, and `content`

## State Transitions

**Reading Progress**: `0%` → `100%` (continuous, scroll-driven)

**Next Story**: `null` → `Story` (computed on mount, stable thereafter)

**Reduced Motion**: `boolean` (read from OS preference, reactive to changes)
