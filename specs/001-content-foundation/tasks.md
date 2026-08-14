---

description: "Task list for Content Foundation & Content Pipeline implementation"
---

# Tasks: Content Foundation & Content Pipeline

**Input**: Design documents from `/specs/001-content-foundation/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Included for every user story — the project constitution (VIII: Automated Quality) requires automated tests for every feature, and the user explicitly requested Playwright E2E. Tests are written BEFORE implementation within each story phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US6)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `content/`, `src/`, `tests/`, `public/` at repository root (per plan.md structure)
- Content data: `content/categories.ts`, `content/monsters/<id>.ts`, `content/stories/<id>.ts`
- Images: `public/images/monsters/<id>.png`, `public/images/stories/<id>.png`, placeholder `public/images/placeholders/missing.png`
- Validation layer: `src/validation/schema.ts`, `src/validation/validate.ts`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize npm project in package.json with dependencies (vite, typescript, zod, vitest, @playwright/test) and scripts: dev, build, test (vitest), validate (vitest run on content-validation + edge-cases), test:e2e (playwright test)
- [X] T002 [P] Create strict TypeScript config at tsconfig.json (strict: true, ES2022+, moduleResolution bundler)
- [X] T003 [P] Create minimal Vite config at vite.config.ts (server/build tooling for TS; app shell deferred to UI features)
- [X] T004 [P] Create Playwright config at playwright.config.ts (webServer serving the public/ directory statically, chromium project, tests dir tests/e2e)
- [X] T005 [P] Update .gitignore for node_modules/, dist/, test-results/, playwright-report/, playwright/.cache/
- [X] T006 Create directory skeleton: content/monsters/, content/stories/, public/images/monsters/, public/images/stories/, public/images/placeholders/, src/validation/, tests/e2e/
- [X] T007 Add designated placeholder image at public/images/placeholders/missing.png (FR-023)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 Create the central category list in content/categories.ts with exactly the initial 10 categories (Beasts, Cursed Ones, Draconids, Elementa, Hybrids, Insectoids, Necrophages, Relicts, Specters, Vampires) as extensible data — single source of truth (FR-005)
- [X] T009 [P] Create Zod schemas and derived TypeScript types in src/validation/schema.ts: Monster (id, name, category, threatLevel 1–5 integer, description, image) and Story (id, title, summary, content, monsterIds string[], image); ID refine for lowercase [a-z0-9-] (FR-003); image filename refine for URL-safe + allowlisted extension (webp/jpg/jpeg/png); category validated against the central list (FR-004)
- [X] T010 Create the dataset loader and validator in src/validation/validate.ts: loads categories, all monsters, all stories; reports each failure class with the offending entry and field (FR-011/FR-012); image existence checked relative to public/images/<monsters|stories>/ (FR-011, user decision); placeholder allowed (FR-023); returns pass/fail with exit code

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Represent a Monster as Structured Data (Priority: P1) 🎯 MVP

**Goal**: A complete monster entry (id, name, category, threatLevel 1–5, description, image) validates; missing/invalid fields are rejected with a report.

**Independent Test**: Author a monster entry with all six fields and run validation — accepted; author an entry with any required field missing — rejected.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T011 [P] [US1] Write monster schema tests in tests/monster.test.ts: complete entry accepted; each required field missing/empty rejected; category outside central list rejected; threatLevel 0/6/non-integer rejected; non-URL-safe ID rejected

### Implementation for User Story 1

- [X] T012 [P] [US1] Author 3 monster entries with all six fields in content/monsters/<id>.ts (e.g., leshen, striga, griffin — different categories and threat levels, per contract in contracts/content-schema.md)
- [X] T013 [US1] Save images for the 3 monsters to public/images/monsters/<id>.png (scraped locally per FR-022; use public/images/placeholders/missing.png if retrieval fails)
- [X] T014 [US1] Run validation over the dataset and confirm the 3 monsters pass with zero failures (entry + field reporting per FR-012)

**Checkpoint**: User Story 1 is fully functional and testable independently — MVP complete

---

## Phase 4: User Story 2 - Represent a Story Linked to Monsters (Priority: P1)

**Goal**: A story entry (id, title, summary, content, monsterIds, image) validates; references resolve to existing monsters; broken references are rejected.

**Independent Test**: Author a story referencing existing monsters and one referencing a nonexistent monster — the first validates, the second is rejected with a clear report.

### Tests for User Story 2 ⚠️

- [X] T015 [P] [US2] Write story schema tests in tests/story.test.ts: complete story valid; empty monsterIds valid (US2 acceptance 4); reference to nonexistent monster rejected; missing required fields rejected

### Implementation for User Story 2

- [X] T016 [P] [US2] Author 3 stories in content/stories/<id>.ts referencing the existing monsters (at least one story referencing more than one monster — FR-017)
- [X] T017 [US2] Save images for the stories to public/images/stories/<id>.png (scraped locally per FR-022; placeholder fallback)
- [X] T018 [US2] Run validation and confirm the stories pass with zero failures and all references resolve (SC-005)

**Checkpoint**: User Stories 1 AND 2 both work independently

---

## Phase 5: User Story 3 - Validate the Whole Dataset Automatically (Priority: P1)

**Goal**: One command validates the entire dataset and reports every class of invalid content with the offending entry and field.

**Independent Test**: Introduce each class of invalid content (duplicate ID, missing field, invalid category, out-of-range threat level, broken reference) and confirm validation rejects each with a report identifying the entry.

### Tests for User Story 3 ⚠️

- [X] T019 [P] [US3] Write the full-dataset validation suite in tests/content-validation.test.ts: all content entries load, every entry passes all rules, dataset counts match SC-003 (≥10 monsters, ~3 stories)
- [X] T020 [P] [US3] Write the edge-case suite in tests/edge-cases.test.ts covering every FR-011 class: duplicate IDs (two monsters, two stories, and monster/story collision), non-URL-safe ID, missing required field, invalid category, threat level outside 1–5, story reference to nonexistent monster, image reference to missing file — each asserts the report identifies the offending entry and field

### Implementation for User Story 3

- [X] T021 [US3] Wire npm scripts in package.json: validate runs the content-validation and edge-case suites via vitest and exits non-zero on any failure; test runs all suites
- [X] T022 [US3] Run npm run validate against intentionally broken temporary content and verify report quality (entry + field named per FR-012), then restore valid content

**Checkpoint**: Whole-dataset validation is a single-command safety net

---

## Phase 6: User Story 4 - Reuse a Central Category List (Priority: P2)

**Goal**: The category list is the single source of truth: exactly the 10 initial categories, extensible as a data edit with no code change, consumed by validation and future features.

**Independent Test**: Inspect the category list (10 predefined categories); confirm a monster can only use a category from that list; add a new category as a data edit and confirm a monster can reference it without application code changes.

### Tests for User Story 4 ⚠️

- [X] T023 [P] [US4] Write category tests in tests/categories.test.ts: exactly the 10 initial categories present (SC-004), names unique, monster with non-list category rejected, extensibility as data edit (add a category to the list → entries referencing it are valid with no code change; remove a category → referencing monsters are reported)

### Implementation for User Story 4

- [X] T024 [US4] Audit consumption of categories: confirm validation and all content import the list from content/categories.ts exclusively (no duplicated or hardcoded list anywhere, FR-006/FR-013), fix any violation found

**Checkpoint**: Category list is a verified single source of truth

---

## Phase 7: User Story 5 - Ship the Initial Development Dataset (Priority: P2)

**Goal**: Deliver ~10 monsters (≥4 categories, ≥3 threat levels) and ~3 stories that pass validation with zero failures.

**Independent Test**: Count the dataset (≥10 monsters, ~3 stories); run validation; confirm it passes.

### Implementation for User Story 5

- [X] T025 [P] [US5] Author additional monsters in content/monsters/<id>.ts to reach at least 10 total, spanning at least 4 different categories and 3 distinct threat levels (SC-003), including edge-case variation (long descriptions, long names, special characters)
- [X] T026 [P] [US5] Save images for all remaining monsters to public/images/monsters/<id>.png (scraped locally per FR-022; placeholder fallback per FR-023)
- [X] T027 [US5] Run npm run validate and confirm the full dataset passes with zero failures; verify counts and variety per SC-003 (≥10 monsters, ≥4 categories, ≥3 threat levels, ~3 stories)

**Checkpoint**: Initial dataset is complete and valid (SC-001)

---

## Phase 8: User Story 6 - Structure Content for Future Consumption (Priority: P2)

**Goal**: Content is structurally independent of UI code: adding valid content requires no application code changes; future UI features consume a single entry point.

**Independent Test**: Add a new valid monster to the dataset; run validation; confirm the dataset remains valid and no application code change is needed.

### Tests for User Story 6 ⚠️

- [X] T028 [P] [US6] Create content/index.ts aggregator re-exporting categories, all monsters, and all stories as the single consumption entry point for future UI features (FR-014)
- [X] T029 [US6] Write the expansion test in tests/expansion.test.ts: adding one new valid monster file to content/monsters/ requires no application code change and validation passes through the index (SC-006)

### Implementation for User Story 6

- [X] T030 [US6] Audit the repository: confirm all content data lives under content/ and all validation under src/validation/ (no hardcoded monster/story data anywhere else, FR-013/US6 acceptance 2); fix any violation found

**Checkpoint**: All user stories are independently functional

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T031 [P] Write the Playwright E2E suite in tests/e2e/content-serving.spec.ts: start the static server, assert every content image URL returns HTTP 200 with an allowlisted content type, the placeholder /images/placeholders/missing.png is reachable, and no content image value is a remote URL (FR-022) — per research R8
- [X] T032 [P] Record implementation decisions in the project wiki: content model, validation rules, image convention (local slug-derived files + placeholder), authoring workflow — per DoD and constitution X
- [X] T033 Run the full validation per quickstart.md: npm run validate, npm test, npm run test:e2e — all green
- [X] T034 Final acceptance review against spec Success Criteria SC-001 through SC-006 and Definition of Done; confirm no backend, no UI code, no hardcoded content

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on US1 (stories reference existing monsters) - independently testable once US1 monsters exist
- **User Story 3 (P1)**: Depends on Foundational (validator in src/validation/validate.ts) - independently testable; complements US1/US2 tests
- **User Story 4 (P2)**: Can start after Foundational (category list exists) - No dependencies on other stories
- **User Story 5 (P2)**: Depends on US1 (monsters) and US2 (stories) for dataset counts
- **User Story 6 (P2)**: Depends on US5 (complete dataset) for the expansion proof

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Content entries before image retrieval
- Implementation before integration/verification
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks T002–T005 and T007 marked [P] can run in parallel
- Foundational T009 is [P] alongside T008
- All tests within a story marked [P] can run in parallel
- Content authoring tasks T012, T016, T025 are [P] (different files)
- Image retrieval T013/T017/T026 are [P] (different files)
- Polish T031/T032 are [P]

---

## Parallel Example: User Story 3

```bash
# Launch all tests for User Story 3 together:
Task: "Write the full-dataset validation suite in tests/content-validation.test.ts"
Task: "Write the edge-case suite in tests/edge-cases.test.ts"
```

## Parallel Example: User Story 5

```bash
# Launch dataset authoring together:
Task: "Author additional monsters in content/monsters/<id>.ts"
Task: "Save images for all remaining monsters to public/images/monsters/<id>.png"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (schema + validator + 3 monsters + images + tests)
4. **STOP and VALIDATE**: `npm run validate` + `npm test` green on the 3-monster dataset
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (schema, validator, categories)
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Whole-dataset validation → Deploy/Demo
5. Add User Story 4 → Category list verified → Deploy/Demo
6. Add User Story 5 → Full initial dataset → Deploy/Demo
7. Add User Story 6 → Consumption entry point + expansion proof → Deploy/Demo
8. Polish: E2E suite, wiki documentation, full quickstart validation

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (→ unblocks US2, US5)
   - Developer B: User Story 3
   - Developer C: User Story 4
3. Then: US2, US5, US6 complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Authoring is agent-driven per FR-019: entries and images are created directly in content/ and public/images/ on request (e.g., "10 new monsters in this category")
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

---

## Phase 10: Convergence

**Purpose**: Remaining work identified by `/speckit.converge` after implementation

- [X] T035 Fix the broken build script in package.json — replace `tsc --noEmit && vite build` with typecheck-only `tsc --noEmit` (or an equivalent build that works without an HTML entry) until a UI feature introduces index.html, per plan decision "app shell (index.html) deferred to UI features" (T001, partial)
