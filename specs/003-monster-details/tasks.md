# Tasks: Monster Details

**Input**: Design documents from `/specs/003-monster-details/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: User requested TDD approach — Playwright tests FIRST, then implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, etc.)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and React/Vite configuration

- [x] T001 Install framer-motion dependency: `npm install framer-motion`
- [x] T002 Update `src/App.tsx` to add Monster Details route (`/bestiary/:id`)
- [x] T003 Create `src/styles/monster-details.css` with dark theme CSS variables
- [x] T004 Create `src/hooks/useScrollAnimation.ts` for scroll-triggered animations

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core components that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 [P] Create `src/components/MonsterHero.tsx` — full-width hero with overlaid text
- [x] T006 [P] Create `src/components/MonsterInfo.tsx` — information section below hero
- [x] T007 [P] Create `src/components/RelatedStories.tsx` — horizontal scrollable story cards
- [x] T008 [P] Create `src/components/StoryCard.tsx` — individual story card
- [x] T009 [P] Create `src/components/BackNavigation.tsx` — back to Bestiary link
- [x] T010 [P] Create `src/components/NotFoundMonster.tsx` — not-found state
- [x] T011 Create `src/pages/MonsterDetailsPage.tsx` — main page with hero, info, stories
- [x] T012 Update `src/content-loader.ts` to load stories data

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - View Monster Details (Priority: P1) 🎯 MVP

**Goal**: Display monster details with full-width hero and overlaid text

**Independent Test**: Click a monster card in the Bestiary, verify navigation to `/bestiary/:id`, and confirm all monster information is displayed

### Tests for User Story 1 (TDD - Write FIRST, ensure FAIL)

- [ ] T013 [P] [US1] Playwright: Open monster details page in tests/e2e/monster-details.spec.ts
- [ ] T014 [P] [US1] Playwright: Verify hero displays monster image, name, category, threat, description
- [ ] T015 [P] [US1] Playwright: Verify back navigation returns to Bestiary
- [ ] T016 [P] [US1] Playwright: Verify not-found state for invalid monster ID
- [ ] T017 [P] [US1] Playwright: Verify page follows dark visual language

### Implementation for User Story 1

- [x] T018 [US1] Implement MonsterHero component with full-width image and overlaid text
- [x] T019 [US1] Implement MonsterInfo component with dark background
- [x] T020 [US1] Implement BackNavigation component integrated with visual design
- [x] T021 [US1] Implement NotFoundMonster component
- [x] T022 [US1] Wire MonsterDetailsPage to content loader and routing
- [x] T023 [US1] Add placeholder image handling

**Checkpoint**: Monster details page displays correctly with hero, info, and navigation

---

## Phase 4: User Story 2 - View Related Stories (Priority: P1)

**Goal**: Display related stories in horizontal scrollable cards

**Independent Test**: Open a monster that is referenced by a story, verify the related story appears with title, summary, and image

### Tests for User Story 2 (TDD - Write FIRST, ensure FAIL)

- [ ] T024 [P] [US2] Playwright: Open monster with related stories
- [ ] T025 [P] [US2] Playwright: Verify related stories display title, summary, image
- [ ] T026 [P] [US2] Playwright: Verify horizontal scroll on mobile
- [ ] T027 [P] [US2] Playwright: Verify no related stories section when monster has none

### Implementation for User Story 2

- [x] T028 [US2] Implement RelatedStories component with horizontal scroll
- [x] T029 [US2] Implement StoryCard component with image, title, summary
- [x] T030 [US2] Add story filtering logic (filter by monsterIds array)
- [x] T031 [US2] Wire RelatedStories to MonsterDetailsPage

**Checkpoint**: Related stories display correctly for monsters with stories

---

## Phase 5: User Story 3 - Navigate Back to Bestiary (Priority: P1)

**Goal**: Back navigation integrated with visual design

**Independent Test**: Click "Back to Bestiary" on the Monster Details page, verify the Bestiary page is displayed

### Tests for User Story 3 (TDD - Write FIRST, ensure FAIL)

- [ ] T032 [P] [US3] Playwright: Verify back navigation link is visible
- [ ] T033 [P] [US3] Playwright: Verify back navigation is integrated with visual design
- [ ] T034 [P] [US3] Playwright: Verify navigation returns to Bestiary page

### Implementation for User Story 3

- [x] T035 [US3] Style BackNavigation component to match visual design
- [x] T036 [US3] Add keyboard accessibility to back navigation

**Checkpoint**: Back navigation works and is visually integrated

---

## Phase 6: User Story 4 - Handle Missing Monster (Priority: P1)

**Goal**: Clear not-found state for invalid monster IDs

**Independent Test**: Navigate to `/bestiary/nonexistent-monster`, verify the not-found state and ability to return to the Bestiary

### Tests for User Story 4 (TDD - Write FIRST, ensure FAIL)

- [ ] T037 [P] [US4] Playwright: Navigate to invalid monster ID
- [ ] T038 [P] [US4] Playwright: Verify not-found message is displayed
- [ ] T039 [P] [US4] Playwright: Verify back navigation works from not-found state
- [ ] T040 [P] [US4] Playwright: Verify application does not crash

### Implementation for User Story 4

- [x] T041 [US4] Implement NotFoundMonster component with clear message
- [x] T042 [US4] Add not-found state to MonsterDetailsPage routing

**Checkpoint**: Invalid monster IDs show not-found state without crashing

---

## Phase 7: User Story 5 - Responsive Monster Details (Priority: P2)

**Goal**: Responsive layout across desktop, tablet, and mobile

**Independent Test**: Resize the viewport across desktop, tablet, and mobile widths; verify the page remains usable without horizontal scrolling

### Tests for User Story 5 (TDD - Write FIRST, ensure FAIL)

- [ ] T043 [P] [US5] Playwright: Verify desktop layout (1280px+)
- [ ] T044 [P] [US5] Playwright: Verify tablet layout (768px)
- [ ] T045 [P] [US5] Playwright: Verify mobile layout (375px)
- [ ] T046 [P] [US5] Playwright: Verify no horizontal scrolling at any width

### Implementation for User Story 5

- [x] T047 [US5] Add responsive CSS media queries
- [x] T048 [US5] Adapt hero composition for mobile
- [x] T049 [US5] Make related stories horizontally scrollable on mobile

**Checkpoint**: Layout adapts across all screen sizes without horizontal scrolling

---

## Phase 8: User Story 6 - Accessible Monster Details (Priority: P2)

**Goal**: Keyboard navigation, visible focus, alt text, reduced-motion

**Independent Test**: Operate the page with keyboard only; verify visible focus states and reduced-motion preferences are respected

### Tests for User Story 6 (TDD - Write FIRST, ensure FAIL)

- [ ] T050 [P] [US6] Playwright: Verify keyboard navigation works
- [ ] T051 [P] [US6] Playwright: Verify visible focus states
- [ ] T052 [P] [US6] Playwright: Verify alt text on monster images
- [ ] T053 [P] [US6] Playwright: Verify reduced-motion support

### Implementation for User Story 6

- [x] T054 [US6] Add keyboard navigation to all interactive elements
- [x] T055 [US6] Add visible focus states
- [x] T056 [US6] Add alt text to monster images
- [x] T057 [US6] Implement reduced-motion support with Framer Motion

**Checkpoint**: Full keyboard accessibility with focus states and reduced-motion

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Animations, performance, and visual refinements

- [x] T058 Implement slow image zoom animation on hero
- [x] T059 Implement parallax on scroll effect
- [x] T060 Implement text reveal animation (fade/slide entrance)
- [x] T061 Implement atmospheric effects (particles/fog) triggered by scroll
- [x] T062 Add page entrance animation
- [ ] T063 Optimize animations for 60fps performance
- [ ] T064 Run quickstart.md validation scenarios
- [ ] T065 Verify all SC-001 through SC-014 success criteria
- [ ] T066 Create `tests/e2e/monster-details.spec.ts` with comprehensive E2E tests

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Stories (Phase 3–8)**: All depend on Phase 2 completion
  - US1 (View Details) → US2 (Related Stories) → US3 (Back Navigation) → US4 (Missing Monster) → US5 (Responsive) → US6 (Accessible)
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (View Details)**: Can start after Phase 2 — No dependencies on other stories
- **US2 (Related Stories)**: Depends on US1 (needs MonsterDetailsPage)
- **US3 (Back Navigation)**: Depends on US1 (needs MonsterDetailsPage)
- **US4 (Missing Monster)**: Depends on US1 (needs MonsterDetailsPage)
- **US5 (Responsive)**: Depends on US1 (needs page structure)
- **US6 (Accessible)**: Depends on US1 (needs interactive elements)

### Within Each User Story

- **TDD Approach**: Tests FIRST (write and verify they FAIL), then implementation
- Components before page integration
- Logic before styling
- Core implementation before animations
- Story complete before moving to next priority

### Parallel Opportunities

- Phase 1 tasks marked [P] can run in parallel
- Phase 2 tasks marked [P] can run in parallel
- Phase 3 tests (T013–T017) can run in parallel
- Phase 4 tests (T024–T027) can run in parallel
- Different team members can work on different stories after Phase 2

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Feature 1 content layer remains unchanged — UI is a new consumer
- Visual direction follows `image.png` reference (dark, atmospheric, medieval/fantasy)
- Framer Motion for cinematic animations (parallax, scroll-triggered, text reveal)
