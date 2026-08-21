# Implementation Plan: Grimoire Visual Redesign

**Branch**: `006-grimoire-visual-redesign` | **Date**: 2026-08-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-grimoire-visual-redesign/spec.md`

## Summary

Restyle the Witcher Lore SPA from its current green/brown Georgia-serif theme to a medieval-grimoire aesthetic (near-black canvas, parchment-cream text, gold+red accents, four serif font families, hairline seam grids, uppercase tracked labels) following `Design.md` and the `Witcher Lore Website/` Figma reference. The redesign is visual-only — all existing functionality (filtering, navigation, progress tracking, session persistence, related content, reduced-motion) is preserved unchanged. Two schema additions are required: optional `lore` (string) and `weaknesses` (string array) fields on the Monster entity to support the full grimoire detail layout. Both detail pages (monster + story) gain a full-width image hero at the top.

## Technical Context

**Language/Version**: TypeScript 5.7+

**Primary Dependencies**: React 19, react-router-dom v7, framer-motion, zod (for schema validation)

**Storage**: Static content modules (`content/*.ts` loaded via `import.meta.glob`), sessionStorage (bestiary filter state)

**Testing**: vitest (unit + integration), Playwright (e2e)

**Target Platform**: Web SPA, Vite build, GitHub Pages deployment (404.html copy)

**Project Type**: Web application (single-page app, static-first)

**Performance Goals**: Standard web (no specific latency targets; animation restraint per design reference)

**Constraints**: Visual-only redesign; no new runtime dependencies; all existing tests must pass; Google Fonts at runtime (known gap, acceptable)

**Scale/Scope**: 10 monsters, 30 stories, 5 routes, ~24 existing components, 3 CSS files (~1468 lines total), 2 hooks, 1 content loader, 1 validation module

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|---|---|---|
| I. Specification-First | ✅ Pass | Spec written and clarified before planning |
| II. Visual-First | ✅ Pass | Design.md and Witcher Lore Website/ are authoritative sources; spec references them per constitution v1.1.0 |
| III. Component Reuse | ✅ Pass | Spec mandates reusable components (filter pills, threat stars, cards, dividers, etc.) |
| IV. Data-Driven | ✅ Pass | Structured content consumed by components; schema extension adds optional fields |
| V. Static-First | ✅ Pass | Vite build, static content, no new runtime dependencies |
| VI. Accessibility | ✅ Pass | WCAG AA mandated (FR-038), reduced-motion (FR-036), alt text on images |
| VII. Performance-Conscious | ✅ Pass | Animation restraint, no expensive effects, lazy-load where appropriate |
| VIII. Automated Quality | ✅ Pass | Existing tests remain green; new tests where selectors change (FR-040) |
| IX. Safe Change | ✅ Pass | Incremental restyle, backward-compatible schema extension |
| X. Knowledge | ✅ Pass | Design.md, spec, and plan documented |
| XI. No Silent Guessing | ✅ Pass | Two clarifications resolved via user interview |
| XII. Governance | ✅ Pass | No new dependencies; validation included |

**Gate result**: PASS — no violations. Proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/006-grimoire-visual-redesign/
├── spec.md              # Feature specification (clarified)
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (UI contracts)
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── App.tsx                    # Routes (unchanged)
├── main.tsx                   # Entry point
├── index.css                  # Global styles (heavy restyle)
├── content-loader.ts          # Vite glob loader (minor update for new fields)
├── components/
│   ├── GlobalNav.tsx           # Nav (major restyle: medallion, wordmark, links)
│   ├── MonsterCard.tsx         # Card (major restyle: seam grid, stars, badge)
│   ├── MonsterHero.tsx         # Hero (major restyle: full-width grimoire hero)
│   ├── MonsterInfo.tsx         # Info (major restyle + add lore/weaknesses rendering)
│   ├── MonsterMiniCard.tsx     # MiniCard (restyle)
│   ├── FilterBar.tsx           # Filters (major restyle: pills, search input)
│   ├── SearchBar.tsx           # Search (restyle to reference input)
│   ├── CategoryFilter.tsx      # Category filter (restyle to pills)
│   ├── ThreatFilter.tsx        # Threat filter (restyle to pills with stars)
│   ├── ThreatStars.tsx         # Stars (restyle: gold fill, dimmer stroke)
│   ├── BackNavigation.tsx      # Back link (restyle: uppercase tracked Cinzel)
│   ├── EmptyState.tsx          # Empty (restyle: ornate title, lore line, outline button)
│   ├── ErrorState.tsx          # Error (restyle)
│   ├── NotFoundMonster.tsx     # 404 (restyle: grimoire not-found)
│   ├── NotFoundStory.tsx       # 404 (restyle: grimoire not-found)
│   ├── StoryCard.tsx           # Card (major restyle: seam grid, number, tags)
│   ├── RelatedStories.tsx      # Related (restyle: medallion divider, bordered rows)
│   ├── RelatedMonsters.tsx     # Related (restyle: bordered rows, gold hover)
│   ├── NextTaleCard.tsx        # Next tale (restyle: card panel, red affordance)
│   ├── ReadingProgressBar.tsx  # Progress (restyle: fixed 3px gradient bar)
│   ├── DropCap.tsx             # Drop cap (restyle or remove per reference)
│   ├── SectionHeader.tsx       # Section header (restyle: gold uppercase label)
│   ├── FogTransition.tsx       # Fog transition (restyle or remove per reference)
│   ├── StoryEnding.tsx         # Story ending (restyle: medallion divider)
│   └── Particles.tsx           # Particles (evaluate: keep/restyle/remove per reference)
├── pages/
│   ├── BestiaryPage.tsx        # (major restyle: hero, filter panel, seam grid)
│   ├── MonsterDetailsPage.tsx  # (major restyle: hero, header, sidebar, tales)
│   ├── StoriesPage.tsx         # (major restyle: hero, seam grid)
│   └── StoryReaderPage.tsx     # (major restyle: hero, chapters, sidebar, progress)
├── hooks/
│   ├── useMonsterFilter.ts     # (unchanged — filter logic preserved)
│   └── useStoryData.ts         # (unchanged — story data helpers preserved)
├── styles/
│   ├── monster-details.css     # (heavy restyle or replace)
│   └── stories.css             # (heavy restyle or replace)
├── types/
│   └── ui.ts                   # (minor: FilterState unchanged)
├── validation/
│   ├── schema.ts               # (extend: add optional lore, weaknesses)
│   └── validate.ts             # (minor: no functional change needed)

content/
├── categories.ts               # (unchanged)
├── index.ts                    # (unchanged)
├── monsters/                   # (extend: add lore/weaknesses to entries)
│   ├── alghoul.ts
│   ├── arachas.ts
│   └── ... (10 files)
└── stories/                    # (unchanged — image field already present)
    ├── the-crows-road.ts
    └── ... (30 files)

public/images/
├── monsters/                   # (unchanged — 10 PNGs exist)
├── stories/                    # (unchanged — 7 PNGs + placeholders)
└── placeholders/
    └── missing.png             # (unchanged — designated fallback)

tests/
├── monster.test.ts             # (update: schema tests for optional fields)
├── story.test.ts               # (update: schema tests if needed)
├── content-validation.test.ts  # (update: validate lore/weaknesses rendering)
├── edge-cases.test.ts          # (update: new edge cases for optional fields)
├── unit/components/            # (update: component tests for restyled selectors)
└── e2e/                        # (update: Playwright tests for restyled pages)
```

**Structure Decision**: Single-project SPA. All changes are within `src/`, `content/`, `tests/`, and `public/images/`. No new directories or files required beyond extending existing content entries with `lore` and `weaknesses` fields.

## Complexity Tracking

> No constitution violations. No complexity justifications needed.
