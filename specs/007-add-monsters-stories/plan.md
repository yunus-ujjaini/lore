# Implementation Plan: Add 20 New Monsters with 2 Stories Each

**Branch**: `007-add-monsters-stories` | **Date**: 2026-08-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/007-add-monsters-stories/spec.md`

## Summary

Expand the static content dataset with 20 new canonical Witcher monsters (2 per category across all 10 central categories, selected by the authoring agent) and 40 new stories — exactly 2 per new monster, each centered on one new monster with optional co-features of existing monsters, matching the conventions of the current 30 stories (5–6 sections, dark-fantasy cinematic prose, local images or placeholder, references resolving to existing monsters). Content is authored as data files under `content/` with images under `public/images/`; zero application code changes are required (FR-014) and the entire expanded dataset must pass `npm run validate` with zero failures (FR-011).

## Technical Context

**Language/Version**: TypeScript 5.7+ (strict), Node 24 (verified v24.12.0)

**Primary Dependencies**: None new. Existing: zod 3.24 (content schema), vite-node (validation CLI), vitest 2.1 (unit/integration), @playwright/test 1.49 (E2E), Vite 6 (build/dev)

**Storage**: Static content modules — `content/monsters/<id>.ts` (20 new), `content/stories/<id>.ts` (40 new); images in `public/images/monsters/` and `public/images/stories/`; placeholder `public/images/placeholders/missing.png`

**Testing**: `npm run validate` (vite-node validation CLI), `npm test` (vitest suites: content-validation, edge-cases, expansion, schema), `npm run test:e2e` (Playwright: served-content checks + existing UI journeys)

**Target Platform**: Web SPA, Vite static build (feature itself is content-only; no runtime code touched)

**Project Type**: Web application (single-page app, static-first) — content expansion feature

**Performance Goals**: None specific — static data consumed at build time; no runtime impact expected

**Constraints**: Zero application code changes (FR-014); no new dependencies; all existing tests must stay green; images local files, never hotlinked (FR-012); placeholder allowed when retrieval fails (FR-013); existing content untouched (FR-016); each new story references exactly one new monster (FR-008)

**Scale/Scope**: +20 monsters (10 → 30), +40 stories (30 → 70), up to 60 new image files, ~60 new content files, ~40 new story files. Existing test assertions use lower bounds (`≥10` monsters, `≥3` stories, exactly 10 categories — verified), so the expansion cannot break them.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|---|---|---|
| I. Specification-First | ✅ Pass | Spec written, validated, and clarified (specify + grill sessions) before planning |
| II. Visual-First | ✅ Pass | No UI changes; imagery follows the established image convention (Design.md / Witcher Lore Website references unaffected) |
| III. Component Reuse | ✅ Pass | No UI work; existing components consume data dynamically — no duplication |
| IV. Data-Driven | ✅ Pass | All new content is structured data under `content/`; UI consumes via the dynamic content layer (FR-014) |
| V. Static-First | ✅ Pass | Content files are build-time static modules; no runtime dependencies added |
| VI. Accessibility | ✅ Pass | No new interactive UI; images already flow through existing alt-text handling |
| VII. Performance-Conscious | ✅ Pass | Static files; no effects; images saved locally (no hotlinks, no remote load) |
| VIII. Automated Quality | ✅ Pass | `npm run validate` + vitest suites + Playwright E2E must pass; tests already cover the dataset dynamically |
| IX. Safe Change | ✅ Pass | Strictly additive; no existing entry modified (FR-016); existing tests verified compatible (lower-bound assertions) |
| X. Knowledge | ✅ Pass | Research, data model, and contract recorded in this feature's docs; wiki updated per authoring workflow |
| XI. No Silent Guessing | ✅ Pass | All material decisions clarified: story scope (40 stories), guidelines (current-story approach), canonical selection, co-referencing rule |
| XII. Governance | ✅ Pass | No new dependencies; automated validation included; fan-project lore accuracy left to user post-hoc review |

**Gate result**: PASS — no violations. Proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/007-add-monsters-stories/
├── spec.md              # Feature specification (clarified)
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (content expansion contract)
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
content/
├── categories.ts               # (unchanged — central 10 categories)
├── index.ts                    # (unchanged — dynamic aggregation)
├── monsters/                   # (+20 new files)
│   ├── bear.ts                 # Beasts
│   ├── wild-boar.ts            # Beasts
│   ├── werewolf.ts             # Cursed Ones
│   ├── werebear.ts             # Cursed Ones
│   ├── basilisk.ts             # Draconids
│   ├── forktail.ts             # Draconids
│   ├── earth-elemental.ts      # Elementa
│   ├── djinn.ts                # Elementa
│   ├── harpy.ts                # Hybrids
│   ├── siren.ts                # Hybrids
│   ├── endrega.ts              # Insectoids
│   ├── giant-centipede.ts      # Insectoids
│   ├── ghoul.ts                # Necrophages
│   ├── rotfiend.ts             # Necrophages
│   ├── fiend.ts                # Relicts
│   ├── chort.ts                # Relicts
│   ├── noonwraith.ts           # Specters
│   ├── plague-maiden.ts        # Specters
│   ├── ekimmara.ts             # Vampires
│   └── bruxa.ts                # Vampires
└── stories/                    # (+40 new files, 2 per new monster)
    ├── <story-slug>.ts         # e.g., the-winter-bear; IDs locked in roster.md
    └── ... (40 files)

public/images/
├── monsters/                   # (+20 new local images, ID-derived filenames)
├── stories/                    # (+up to 40 new local images; placeholder allowed)
└── placeholders/
    └── missing.png             # (unchanged — designated fallback)

src/                            # (UNCHANGED — zero application code changes, FR-014)
tests/                          # (UNCHANGED — existing suites validate dynamically)
```

**Structure Decision**: Single project, no new directories. All additions live in the existing `content/monsters/`, `content/stories/`, and `public/images/` folders following the one-entry-per-file convention from Feature 1. No `src/` or `tests/` files are modified — the dynamic content loader (`content/index.ts`) and the dataset-driven test suites pick up new entries automatically.

## Complexity Tracking

> No constitution violations. No complexity justifications needed.