# Implementation Plan: Content Foundation & Content Pipeline

**Branch**: `001-content-foundation` | **Date**: 2026-08-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-content-foundation/spec.md`

## Summary

Build a static-first content foundation for the Witcher Bestiary: structured TypeScript content data (categories, monsters, stories) separate from UI code, plus automated validation that reports entry-level failures (duplicate/non-URL-safe IDs, missing fields, invalid categories, out-of-range threat levels, broken story references, missing image files). Deliver an initial dataset of ~10 monsters and ~3 stories, authored by AI on request with post-hoc user review. No backend, database, or UI in this feature; future UI features consume the content layer directly.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode); tooling runs on Node 24 (verified: node v24.12.0, npm 11.6.2)

**Primary Dependencies**:
- **Vite 7** — build/dev tooling; provides the TS pipeline future UI features will use. Justification: project stack decision (user-selected).
- **Zod** — runtime validation with error paths (entry + field). Justification: FR-011 requires validation reports identifying the offending entry and field; Zod derives types from schemas, keeping the contract and dataset in sync.
- **Vitest** — test runner sharing Vite config. Justification: constitution VIII (automated quality); zero extra config on Vite.
- **Playwright (@playwright/test)** — E2E tests of the served content pipeline (user request). Justification: constitution VIII explicitly names Playwright for E2E; browser-level checks catch serving-path issues (case sensitivity, paths, content types) that unit tests cannot.
- No other runtime dependencies. No backend, database, or framework.

**Storage**: Filesystem only — `content/` (TypeScript content modules) + `public/images/` (local image files). No database.

**Testing**: Vitest covers every FR-011 rule class plus edge cases (`npm run validate` runs the full-dataset validation suite). Playwright E2E (`npm run test:e2e`) starts the static server and verifies every content image URL returns 200 with an allowlisted content type, the placeholder is reachable, and no hotlinks exist — validating the dataset through the real serving path.

**Target Platform**: Static web project (browser target for future UI; content/validation tooling runs on Node). No UI in this feature.

**Project Type**: Static web (frontend-only foundation feature — data + validation layer).

**Performance Goals**: Validation of the dataset (dozens of entries) completes in under 2 seconds. No other performance goals in this feature (no runtime behavior).

**Constraints**:
- Static-first per constitution V: no runtime dependencies beyond the content itself; validation runs at build/dev time, never at runtime in the browser.
- Content MUST NOT be hardcoded in UI code (constitution IV); UI features are out of scope here.
- Images stored locally, never hotlinked (FR-022); filenames derived from entry IDs, URL-safe, allowlisted extensions (webp/jpg/jpeg/png).
- IDs are URL-safe lowercase `[a-z0-9-]`, unique across monsters and stories (FR-003).
- Categories are content data, extensible without code changes (FR-005).

**Scale/Scope**: Initial dataset ~10 monsters / ~3 stories; grows on demand via AI-assisted authoring (FR-019/FR-021). Content layer must stay schema-stable so future features consume it without changes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design — still passes.*

| Principle | Assessment |
|-----------|------------|
| I. Specification-First | Pass — this plan implements [spec.md](./spec.md); all design decisions trace to it. |
| II/III/VI/VII. UI principles | Not applicable — no user-facing UI in this feature. |
| IV. Data-Driven Content | Pass — content lives in `content/` modules consumed by the content layer; UI (future) must not hardcode it. |
| V. Static-First Architecture | Pass — no runtime dependencies, no backend; validation is a build/dev-time step. |
| VIII. Automated Quality | Pass — automated validation (FR-011), Vitest suites, and Playwright E2E of the served content pipeline are first-class deliverables. Full user-journey E2E applies once UI features exist (constitution VIII: E2E for critical user journeys of user-facing features). |
| IX. Safe Change & Backward Compatibility | Pass — schema additions must not break existing content; category list changes are data edits validated against the same rules. |
| X. Project Knowledge & Traceability | Pass — decisions from planning recorded in this plan; implementation must record content-model/validation decisions in the project Wiki (DoD item). |
| XI. No Silent Guessing | Pass — stack and validation approach confirmed with the user; all spec ambiguities resolved in `## Clarifications`. |
| XII. Governance & Compliance | Pass — dependencies (Zod, Vitest) are justified above; validation is included per "every significant feature MUST include automated validation." |

No gate violations. Complexity Tracking not required.

## Project Structure

### Documentation (this feature)

```text
specs/001-content-foundation/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── content-schema.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
content/                      # Content data (single source of truth, no UI code)
├── categories.ts             # Central category list (extensible data)
├── monsters/                 # One file per monster, named <id>.ts
│   ├── leshen.ts
│   └── ...                   # (~10 monsters)
└── stories/                  # One file per story, named <id>.ts
    ├── the-last-wish.ts
    └── ...                   # (~3 stories)

public/                       # Static assets served as-is
└── images/
    ├── monsters/<id>.png    # Local image per monster (slug-derived filename)
    ├── stories/<id>.png     # Local image per story
    └── placeholders/missing.png  # Designated placeholder (FR-023)

src/
└── validation/               # Content validation layer (build/dev-time only)
    ├── schema.ts             # Zod schemas + types (Monster, Story, Category)
    └── validate.ts           # Dataset loader + validator with entry-level reports

tests/
├── content-validation.test.ts    # Full-dataset validation suite (also = npm run validate)
├── edge-cases.test.ts            # Per-rule invalid-content tests (FR-011 classes)
└── e2e/
    └── content-serving.spec.ts   # Playwright: every content image URL serves 200 + allowlisted type; placeholder reachable; no hotlinks

e2e/                              # Playwright fixtures/output (auto-generated, gitignored)
playwright.config.ts              # webServer: serve public/ (static preview); chromium project
scripts/                      # (empty for now; authoring is agent-driven per FR-019)
package.json
tsconfig.json                 # strict
vite.config.ts                # minimal; app shell (index.html) deferred to UI features
```

**Structure Decision**: Monorepo-free single project at repo root. Content in `content/` (TS modules per research: type safety, AI-authoring-friendly, atomic diffs via one-file-per-entry) and images in `public/` (Vite serves them as-is; stable paths for future UI). Validation isolated in `src/validation/` so future UI features can import the same schema/types for consumption; validation runs only in Node (dev/build), never shipped to the browser.

## Complexity Tracking

No constitution violations — table intentionally empty.
