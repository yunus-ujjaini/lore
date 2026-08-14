# Implementation Plan: Stories & Story Reader

**Branch**: `004-stories` | **Date**: 2026-08-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/004-stories/spec.md`

## Summary

Build the final core V1 feature for the Witcher Bestiary: a dedicated story experience with a Stories landing page and Story Reader. The feature migrates existing stories from a single `content` string to an ordered `sections` structure, enabling short and long-form narratives. Users can discover stories via illustrated cards, read stories with cinematic presentation, and navigate to related monsters. The visual language continues the dark, atmospheric, medieval/fantasy aesthetic established by the Bestiary Explorer and Monster Details features.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode); JSX via React 19; tooling runs on Node 24

**Primary Dependencies**:
- **React 19 + React DOM** — UI library (same as Features 2 and 3).
- **react-router-dom** — client-side routing for `/stories` and `/stories/:id` routes (same as Features 2 and 3).
- **@vitejs/plugin-react** — Vite React Fast Refresh and JSX transform (same as Features 2 and 3).
- **Framer Motion (^11.0)** — animation library for cinematic effects (same as Feature 3).
- **Vitest** + **@testing-library/react** — component testing.
- **Playwright (@playwright/test)** — E2E tests for all primary user journeys.

**Styling**: Plain CSS with CSS custom properties (same as Features 2 and 3). The dark palette continues from the Bestiary Explorer and Monster Details.

**Storage**: Content consumed from `content/` (TypeScript modules) and `public/images/` (static assets) — same as Features 1-3. The UI does not store content; it references it.

**Testing**:
- Vitest + RTL: unit tests for story filtering, navigation, error states.
- Playwright E2E: browse stories, read story, related monsters, back navigation, missing story, responsive behavior (per FR-022 and SC-014).

**Target Platform**: Browser (desktop, tablet, mobile). Static web project.

**Project Type**: Static web (frontend-only SPA).

**Performance Goals**:
- Story content loads without perceivable delay for the current dataset size (~3 stories).
- Animations maintain 60fps (same as Feature 3).
- Scroll-triggered effects should not cause jank.

**Constraints**:
- Static-first per constitution V: no runtime backend; content is bundled at build time.
- Content MUST NOT be duplicated in UI components (FR-021, constitution IV); UI consumes `content/` via build-time imports.
- Story schema migration required: `content` string → ordered `sections` array with ≥4 sections per story.
- Accessibility: keyboard navigation, visible focus, meaningful labels, alt text, reduced-motion support (FR-018, constitution II).
- Responsive: no horizontal scrolling for normal use at any breakpoint (FR-017).
- Animations must respect `prefers-reduced-motion` (FR-018).
- Global navigation required: link to both Bestiary and Stories pages (FR-001a).

**Scale/Scope**: ~3 stories (existing dataset), ~10 monsters. The implementation must remain efficient and usable when the dataset grows.

## Constitution Check

| Principle | Assessment |
|-----------|------------|
| I. Specification-First | Pass — this plan implements [spec.md](./spec.md); all design decisions trace to it. |
| II. Deliberate Visual Language | Pass — visual direction continues from Bestiary Explorer and Monster Details (dark, atmospheric, cinematic). |
| III. Progressive Disclosure | Pass — story cards show summary; full content in Story Reader. |
| IV. Data-Driven Content | Pass — story data consumed from Feature 1 content layer (FR-021); adding a story requires no UI code changes. |
| V. Static-First Architecture | Pass — content bundled at build time via `import.meta.glob`; no runtime backend or API calls. |
| VI. Performance Budget | Pass — no heavy libraries beyond Framer Motion; animations target 60fps. |
| VII. No Premature Complexity | Pass — section-based schema is intentionally simple but extensible. |
| VIII. Automated Quality | Pass — Vitest + RTL for component tests; Playwright E2E for all primary user journeys (FR-022). |
| IX. Safe Change & Backward Compatibility | Pass — Features 1-3 content and UI remain unchanged; this feature extends the UI and migrates story data. |
| X. Project Knowledge & Traceability | Pass — decisions recorded here; visual reference and navigation approach documented. |
| XI. No Silent Guessing | Pass — navigation approach (global nav), section IDs (per-story), and related monsters (monsterIds) all clarified. |
| XII. Governance & Compliance | Pass — Framer Motion is a standard, well-maintained dependency; justified above. |

No gate violations.

## Complexity Tracking

No constitution violations — table intentionally empty.

## Project Structure

### Documentation (this feature)

```text
specs/004-stories/
├── spec.md                        # Feature specification (clarified)
├── plan.md                        # This file (/speckit.plan output)
├── checklists/
│   └── requirements.md            # Spec quality checklist
└── wireframes/
    ├── 01-stories-landing.svg     # Stories landing page wireframe
    └── 02-story-reader.svg        # Story Reader wireframe
```

### Source Code (repository root — additions and changes)

```text
src/
├── App.tsx                        # MODIFIED: Add /stories and /stories/:id routes
├── components/
│   ├── GlobalNav.tsx              # NEW: Navigation bar with Bestiary and Stories links
│   ├── StoryCard.tsx              # NEW: Individual story card
│   ├── RelatedMonsters.tsx        # NEW: Horizontal scrollable monster cards
│   └── MonsterMiniCard.tsx        # NEW: Compact monster card for related section
├── pages/
│   ├── StoriesPage.tsx            # NEW: Stories landing page with story cards
│   └── StoryReaderPage.tsx        # NEW: Story reader with hero, sections, related monsters
├── hooks/
│   └── useStoryData.ts            # NEW: Hook for loading and filtering stories
└── styles/
    └── stories.css                # NEW: Styles for Stories feature

tests/
├── components/
│   ├── StoryCard.test.tsx         # NEW: Story card renders correctly
│   ├── RelatedMonsters.test.tsx   # NEW: Related monsters display
│   ├── MonsterMiniCard.test.tsx   # NEW: Mini card renders correctly
│   └── GlobalNav.test.tsx         # NEW: Navigation links work
└── e2e/
    └── stories.spec.ts            # NEW: Playwright E2E for all user journeys
```

**Content Migration Decision**: Existing stories will be migrated from `content` string to `sections` array. Each story must have at least 4 sections after migration. This is a one-time migration that preserves all content.

**Navigation Decision**: Global navigation component added to `App.tsx` with links to both Bestiary (`/bestiary`) and Stories (`/stories`). This affects Features 2 and 3 by adding shared navigation.

**Related Stories Decision**: Filter stories by checking if monster ID appears in the `monsterIds` array (same pattern as Feature 3's related stories).

**Schema Migration Decision**: Migrate existing stories to have ≥4 sections each. Short stories may initially have one section split into 4 meaningful parts.

## Implementation Strategy

### MVP First (US1 + US4 + US5)

1. Implement StoriesPage with story cards and global navigation
2. Verify story cards display correctly
3. Add back navigation and not-found state
4. Add responsive layout

### Incremental Delivery

1. US1 (Browse) + US4 (Back Nav) + US5 (Missing Story) → Stories landing page works
2. US2 (Read Story) → Story Reader with sections
3. US3 (Related Monsters) → Two-way discovery flow
4. US6 (Responsive) → Responsive polish
5. US7 (Accessibility) → Accessibility polish
6. US8 (Schema Migration) → Migrate existing stories
7. Polish → Animations and final refinements
