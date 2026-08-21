---

description: "Task list for implementing the 20-monster / 40-story content expansion"
---

# Tasks: Add 20 New Monsters with 2 Stories Each

**Input**: Design documents from `/specs/007-add-monsters-stories/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature spec mandates automated validation (FR-011) and the constitution requires the automated gates to stay green. The existing validation suites and Playwright E2E already consume the dataset dynamically, so this feature adds NO new test files — verification tasks run the existing gates. Tests are included as verification tasks per story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `content/`, `public/images/`, `src/`, `tests/` at repository root
- All new content lives in `content/monsters/<id>.ts`, `content/stories/<id>.ts`, `public/images/monsters/<id>.png`, `public/images/stories/<id>.png`
- `src/`, `tests/`, `scripts/`, `content/categories.ts`, `content/index.ts` are NEVER modified (FR-014)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify the repository baseline is green before authoring

- [X] T001 Verify baseline dataset: run `npm install` and `npm run validate`; expect `content: VALID — 10 monsters, 30 stories, 10 categories` (exit 0)
- [X] T002 [P] Verify baseline tests: run `npm test` and `npm run test:e2e`; expect all suites and Playwright specs to pass

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Authoring references that MUST exist before any story work, so IDs stay consistent

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Create `specs/007-add-monsters-stories/roster.md` — the locked authoring roster: the 20 canonical monsters from research.md R1 (id, name, category, threatLevel) and the 2 assigned story IDs per monster (e.g., `the-winter-bear`, `the-slavering-maw` for `bear`), so all authoring uses consistent IDs
- [X] T004 Assign co-feature pairings in `specs/007-add-monsters-stories/roster.md` — for each of the 40 story IDs, assign an optional co-feature from the EXISTING 10 monsters (alghoul, arachas, drowners, golem, griffin, katakan, leshen, striga, wraith, wyvern) or none; NEVER a second new monster (FR-008); spread co-features across the existing 10 to avoid over-using any single one

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Expand the Bestiary with 20 New Monsters (Priority: P1) 🎯 MVP

**Goal**: 20 canonical Witcher monster entries (2 per category) appear in the bestiary via the data layer

**Independent Test**: `npm run validate` passes with 30 monsters; each new entry has id, name, category, threatLevel 1–5, description, image, lore, weaknesses; `npm run dev` → `/bestiary` shows the new monsters

### Implementation for User Story 1

Each task: create `content/monsters/<id>.ts` (all 8 fields per [expansion-contract.md](./contracts/expansion-contract.md)) AND save the scraped local image to `public/images/monsters/<id>.png` (or reference `placeholders/missing.png` if retrieval fails, FR-013).

- [X] T005 [P] [US1] Author `bear` (Beasts, threat 2) entry in content/monsters/bear.ts + image public/images/monsters/bear.png
- [X] T006 [P] [US1] Author `wild-boar` (Beasts, threat 1) entry in content/monsters/wild-boar.ts + image public/images/monsters/wild-boar.png
- [X] T007 [P] [US1] Author `werewolf` (Cursed Ones, threat 3) entry in content/monsters/werewolf.ts + image public/images/monsters/werewolf.png
- [X] T008 [P] [US1] Author `werebear` (Cursed Ones, threat 4) entry in content/monsters/werebear.ts + image public/images/monsters/werebear.png
- [X] T009 [P] [US1] Author `basilisk` (Draconids, threat 4) entry in content/monsters/basilisk.ts + image public/images/monsters/basilisk.png
- [X] T010 [P] [US1] Author `forktail` (Draconids, threat 3) entry in content/monsters/forktail.ts + image public/images/monsters/forktail.png
- [X] T011 [P] [US1] Author `earth-elemental` (Elementa, threat 4) entry in content/monsters/earth-elemental.ts + image public/images/monsters/earth-elemental.png
- [X] T012 [P] [US1] Author `djinn` (Elementa, threat 5) entry in content/monsters/djinn.ts + image public/images/monsters/djinn.png
- [X] T013 [P] [US1] Author `harpy` (Hybrids, threat 2) entry in content/monsters/harpy.ts + image public/images/monsters/harpy.png
- [X] T014 [P] [US1] Author `siren` (Hybrids, threat 2) entry in content/monsters/siren.ts + image public/images/monsters/siren.png
- [X] T015 [P] [US1] Author `endrega` (Insectoids, threat 2) entry in content/monsters/endrega.ts + image public/images/monsters/endrega.png
- [X] T016 [P] [US1] Author `giant-centipede` (Insectoids, threat 3) entry in content/monsters/giant-centipede.ts + image public/images/monsters/giant-centipede.png
- [X] T017 [P] [US1] Author `ghoul` (Necrophages, threat 2) entry in content/monsters/ghoul.ts + image public/images/monsters/ghoul.png
- [X] T018 [P] [US1] Author `rotfiend` (Necrophages, threat 3) entry in content/monsters/rotfiend.ts + image public/images/monsters/rotfiend.png
- [X] T019 [P] [US1] Author `fiend` (Relicts, threat 4) entry in content/monsters/fiend.ts + image public/images/monsters/fiend.png
- [X] T020 [P] [US1] Author `chort` (Relicts, threat 3) entry in content/monsters/chort.ts + image public/images/monsters/chort.png
- [X] T021 [P] [US1] Author `noonwraith` (Specters, threat 2) entry in content/monsters/noonwraith.ts + image public/images/monsters/noonwraith.png
- [X] T022 [P] [US1] Author `plague-maiden` (Specters, threat 3) entry in content/monsters/plague-maiden.ts + image public/images/monsters/plague-maiden.png
- [X] T023 [P] [US1] Author `ekimmara` (Vampires, threat 3) entry in content/monsters/ekimmara.ts + image public/images/monsters/ekimmara.png
- [X] T024 [P] [US1] Author `bruxa` (Vampires, threat 4) entry in content/monsters/bruxa.ts + image public/images/monsters/bruxa.png

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently (MVP)

---

## Phase 4: User Story 2 - Provide 2 Stories for Each New Monster (Priority: P1)

**Goal**: Each of the 20 new monsters has exactly 2 new stories following the current-story conventions

**Independent Test**: For every new monster ID, exactly 2 story files reference it; each new story has 5–6 sections, a summary, `monsterIds` = its new monster (+ optional existing co-feature per roster.md), and a local image or placeholder

### Implementation for User Story 2

Each task: create `content/stories/<story-id>.ts` per [expansion-contract.md](./contracts/expansion-contract.md) — title, 1–2 sentence summary, 5–6 ordered sections (per-section title + multi-paragraph dark-fantasy cinematic prose), `monsterIds` = [new monster] + optional co-feature from roster.md, image `public/images/stories/<story-id>.png` or `placeholders/missing.png`. Story ID and co-feature are assigned in roster.md (T003/T004).

- [X] T025 [P] [US2] Author `the-winter-bear` (centers `bear`) in content/stories/the-winter-bear.ts + image
- [X] T026 [P] [US2] Author `the-slavering-maw` (centers `bear`) in content/stories/the-slavering-maw.ts + image
- [X] T027 [P] [US2] Author `the-boars-ridge` (centers `wild-boar`) in content/stories/the-boars-ridge.ts + image
- [X] T028 [P] [US2] Author `the-tusked-fury` (centers `wild-boar`) in content/stories/the-tusked-fury.ts + image
- [X] T029 [P] [US2] Author `the-moonlit-hunt` (centers `werewolf`) in content/stories/the-moonlit-hunt.ts + image
- [X] T030 [P] [US2] Author `the-cursed-fur` (centers `werewolf`) in content/stories/the-cursed-fur.ts + image
- [X] T031 [P] [US2] Author `the-berserkers-curse` (centers `werebear`) in content/stories/the-berserkers-curse.ts + image
- [X] T032 [P] [US2] Author `the-skellige-bloodrage` (centers `werebear`) in content/stories/the-skellige-bloodrage.ts + image
- [X] T033 [P] [US2] Author `the-ruined-spire` (centers `basilisk`) in content/stories/the-ruined-spire.ts + image
- [X] T034 [P] [US2] Author `the-petrifying-gaze` (centers `basilisk`) in content/stories/the-petrifying-gaze.ts + image
- [X] T035 [P] [US2] Author `the-forked-tail` (centers `forktail`) in content/stories/the-forked-tail.ts + image
- [X] T036 [P] [US2] Author `the-herdsmans-lament` (centers `forktail`) in content/stories/the-herdsmans-lament.ts + image
- [X] T037 [P] [US2] Author `the-stone-wake` (centers `earth-elemental`) in content/stories/the-stone-wake.ts + image
- [X] T038 [P] [US2] Author `the-bound-colossus` (centers `earth-elemental`) in content/stories/the-bound-colossus.ts + image
- [X] T039 [P] [US2] Author `the-djinns-bargain` (centers `djinn`) in content/stories/the-djinns-bargain.ts + image
- [X] T040 [P] [US2] Author `the-stormbound-wish` (centers `djinn`) in content/stories/the-stormbound-wish.ts + image
- [X] T041 [P] [US2] Author `the-clifftop-shriek` (centers `harpy`) in content/stories/the-clifftop-shriek.ts + image
- [X] T042 [P] [US2] Author `the-trinket-hoard` (centers `harpy`) in content/stories/the-trinket-hoard.ts + image
- [X] T043 [P] [US2] Author `the-sirens-call` (centers `siren`) in content/stories/the-sirens-call.ts + image
- [X] T044 [P] [US2] Author `the-coastal-widow` (centers `siren`) in content/stories/the-coastal-widow.ts + image
- [X] T045 [P] [US2] Author `the-nest-war` (centers `endrega`) in content/stories/the-nest-war.ts + image
- [X] T046 [P] [US2] Author `the-queens-brood` (centers `endrega`) in content/stories/the-queens-brood.ts + image
- [X] T047 [P] [US2] Author `the-toussaint-tunnel` (centers `giant-centipede`) in content/stories/the-toussaint-tunnel.ts + image
- [X] T048 [P] [US2] Author `the-chitinous-eruption` (centers `giant-centipede`) in content/stories/the-chitinous-eruption.ts + image
- [X] T049 [P] [US2] Author `the-battlefield-feast` (centers `ghoul`) in content/stories/the-battlefield-feast.ts + image
- [X] T050 [P] [US2] Author `the-gravediggers-dilemma` (centers `ghoul`) in content/stories/the-gravediggers-dilemma.ts + image
- [X] T051 [P] [US2] Author `the-bloated-one` (centers `rotfiend`) in content/stories/the-bloated-one.ts + image
- [X] T052 [P] [US2] Author `the-pox-cart` (centers `rotfiend`) in content/stories/the-pox-cart.ts + image
- [X] T053 [P] [US2] Author `the-horned-watch` (centers `fiend`) in content/stories/the-horned-watch.ts + image
- [X] T054 [P] [US2] Author `the-still-gaze` (centers `fiend`) in content/stories/the-still-gaze.ts + image
- [X] T055 [P] [US2] Author `the-farmsteads-end` (centers `chort`) in content/stories/the-farmsteads-end.ts + image
- [X] T056 [P] [US2] Author `the-cabbage-thief` (centers `chort`) in content/stories/the-cabbage-thief.ts + image
- [X] T057 [P] [US2] Author `the-midday-death` (centers `noonwraith`) in content/stories/the-midday-death.ts + image
- [X] T058 [P] [US2] Author `the-harvest-field-ghost` (centers `noonwraith`) in content/stories/the-harvest-field-ghost.ts + image
- [X] T059 [P] [US2] Author `the-pestas-path` (centers `plague-maiden`) in content/stories/the-pestas-path.ts + image
- [X] T060 [P] [US2] Author `the-rotting-veil` (centers `plague-maiden`) in content/stories/the-rotting-veil.ts + image
- [X] T061 [P] [US2] Author `the-invisible-feast` (centers `ekimmara`) in content/stories/the-invisible-feast.ts + image
- [X] T062 [P] [US2] Author `the-bat-faced-vengeance` (centers `ekimmara`) in content/stories/the-bat-faced-vengeance.ts + image
- [X] T063 [P] [US2] Author `the-bruxas-lullaby` (centers `bruxa`) in content/stories/the-bruxas-lullaby.ts + image
- [X] T064 [P] [US2] Author `the-immortal-maiden` (centers `bruxa`) in content/stories/the-immortal-maiden.ts + image

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Keep the Expanded Dataset Valid and Consistent (Priority: P1)

**Goal**: The expanded dataset passes all automated gates with zero failures

**Independent Test**: `npm run validate` exits 0 (`content: VALID — 30 monsters, 70 stories, 10 categories`); `npm test` and `npm run test:e2e` pass; pairing and co-reference invariants hold

### Implementation for User Story 3

- [X] T065 [US3] Run `npm run validate`; fix every reported failure (missing fields, broken references, invalid categories, missing images, ID collisions) until exit 0 with 30 monsters, 70 stories, 10 categories
- [X] T066 [US3] Run `npm test`; ensure all vitest suites pass (content-validation, edge-cases, expansion, schema)
- [X] T067 [US3] Run `npm run test:e2e`; ensure all Playwright specs pass (served content images HTTP 200 + allowlisted content type + no hotlinks; existing UI journeys)
- [X] T068 [US3] Verify pairing invariant per quickstart: for each of the 20 new monster IDs, exactly 2 story files in content/stories/ reference it (grep `monsterIds`)
- [X] T069 [US3] Verify co-reference invariant per FR-008: no story in content/stories/ references two of the 20 new monster IDs (grep `monsterIds` against the roster)
- [X] T070 [US3] Verify section-count invariant: every new story in content/stories/ has roughly 5–6 ordered sections (floor 4) with non-empty titles and content (grep/script per quickstart)

**Checkpoint**: Dataset is valid and consistent

---

## Phase 6: User Story 4 - Preserve the Data-Driven Architecture (Priority: P1)

**Goal**: Zero application code changes; new content flows into existing views through the data layer

**Independent Test**: `git diff --stat` on `src/`, `tests/`, `scripts/`, `content/categories.ts`, `content/index.ts` is empty; `npm run dev` shows the new monsters and stories in the existing UI

### Implementation for User Story 4

- [X] T071 [US4] Verify zero application code changes: run `git diff --stat -- src/ tests/ scripts/ content/categories.ts content/index.ts`; expect empty output (FR-014)
- [X] T072 [US4] Smoke test the data flow: `npm run dev`; verify `/bestiary` lists the new monsters, `/stories` lists the new stories, and a monster detail page and story reader render a sample new entry end-to-end

**Checkpoint**: Data-driven architecture preserved

---

## Phase 7: User Story 5 - Handle Monster and Story Imagery (Priority: P2)

**Goal**: Every new entry references a local image file (or the placeholder); no hotlinks

**Independent Test**: For every new entry, the `image` field points to an existing file under `public/images/` or `placeholders/missing.png`; E2E served-image checks pass

### Implementation for User Story 5

- [X] T073 [US5] Verify every new monster/story `image` value in content/ resolves to an existing local file (or `placeholders/missing.png`); confirm no remote/hotlinked URLs anywhere in the new entries (data-level check complementing the serving-level E2E assertion in T067)
- [X] T074 [US5] Run a deterministic image-integrity check: every new file under public/images/monsters/ and public/images/stories/ is non-empty and a valid PNG (e.g., `file <path>` reports "PNG image data"); list entries using placeholders for the user's post-hoc review

**Checkpoint**: Imagery complete

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, final gates, and review readiness

- [X] T075 [P] Update the project wiki per constitution X: record the dataset expansion (30 monsters / 70 stories) and any authoring lessons in wiki/pages/ (e.g., authoring-workflow.md / content-model.md)
- [X] T076 Run the full [quickstart.md](./quickstart.md) verification scenarios end-to-end; confirm each expected result
- [X] T077 [P] Final review pass: `git status` — confirm only additions under `content/`, `public/images/`, and `specs/007-add-monsters-stories/`; summarize the 20 monsters and 40 stories for the user's post-hoc lore review
- [X] T078 Final full gate: `npm run validate` && `npm test` && `npm run test:e2e` — all green before handoff

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories (roster IDs must be locked first)
- **US1 (Phase 3)**: Depends on Phase 2 (roster)
- **US2 (Phase 4)**: Depends on Phase 2 AND US1 — stories reference the new monster IDs, which must exist for references to resolve (FR-008)
- **US3 (Phase 5)**: Depends on US1 + US2 complete (validates the full expanded dataset)
- **US4 (Phase 6)**: Depends on US1 + US2 (verifies the data flows into existing views)
- **US5 (Phase 7)**: Depends on US1 + US2 (images are authored there); runs alongside US3/US4
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 - no dependencies on other stories (MVP)
- **User Story 2 (P1)**: Depends on US1 (new monster IDs must exist); 40 story tasks fully parallel
- **User Story 3 (P1)**: Depends on US1 + US2 - final validation gate
- **User Story 4 (P1)**: Depends on US1 + US2 - architecture verification
- **User Story 5 (P2)**: Depends on US1 + US2 - imagery verification

### Within Each User Story

- Roster and pairings (Phase 2) MUST be complete before any authoring
- Monster entries before their stories (US2 depends on US1)
- Authoring before verification (US3/US4/US5)
- Story complete before moving to next priority

### Parallel Opportunities

- T001/T002 (Setup) in parallel
- T003/T004 sequential (pairings need roster first)
- All 20 US1 monster tasks marked [P] can run in parallel (different files)
- All 40 US2 story tasks marked [P] can run in parallel (different files; after US1 monsters exist)
- US3 verification tasks T065–T070 sequential (each builds on the previous)
- T075 and T077 [P] can run in parallel with T076

---

## Parallel Example: User Story 1

```bash
# Launch all 20 monster entries together:
Task: "Author bear entry in content/monsters/bear.ts + image"
Task: "Author wild-boar entry in content/monsters/wild-boar.ts + image"
Task: "Author werewolf entry in content/monsters/werewolf.ts + image"
Task: "Author werebear entry in content/monsters/werebear.ts + image"
# ... (all 20)
```

## Parallel Example: User Story 2

```bash
# Launch all 40 story entries together (after US1):
Task: "Author the-winter-bear in content/stories/the-winter-bear.ts"
Task: "Author the-slavering-maw in content/stories/the-slavering-maw.ts"
Task: "Author the-boars-ridge in content/stories/the-boars-ridge.ts"
# ... (all 40)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (roster + pairings — CRITICAL, blocks all stories)
3. Complete Phase 3: User Story 1 (20 monsters)
4. **STOP and VALIDATE**: `npm run validate` + `npm test` + `npm run test:e2e`; smoke test `/bestiary`
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (20 monsters) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (40 stories) → Test independently → Deploy/Demo
4. Add User Story 3 → validation gate → Deploy/Demo
5. Add User Stories 4–5 (verification) → final gates
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A–D: split the 20 US1 monster tasks
   - After US1: split the 40 US2 story tasks
   - Then run US3–US5 verification sequentially
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No `src/`, `tests/`, `scripts/`, or `content/index.ts`/`content/categories.ts` modifications are allowed (FR-014/FR-016)
- Story/monster IDs must match roster.md exactly (T003/T004)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- The user performs post-hoc lore review of the created content (fan project; constitution governance)