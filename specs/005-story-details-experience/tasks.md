# Tasks: Story Details Experience Enhancements

**Input**: Design documents from `/specs/005-story-details-experience/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: TDD approach requested — test tasks before implementation tasks for each component.

**Organization**: Tasks grouped by user story. Each story is independently testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US7)
- Exact file paths included in descriptions

---

## Phase 1: Setup

**Purpose**: Verify existing infrastructure works, establish test foundation

- [X] T001 Verify existing tests pass: `npm test && npx playwright test`
- [X] T002 Verify TypeScript compiles: `npx tsc --noEmit`
- [X] T003 Verify build succeeds: `npm run build`
- [X] T004 [P] Add Vitest React Testing Library dependency if not present: `npm install -D @testing-library/react @testing-library/jest-dom`
- [X] T005 [P] Create `tests/unit/components/` directory structure
- [X] T006 [P] Create Vitest setup file at `tests/unit/setup.ts` with IntersectionObserver mock and scroll property mocks

**Checkpoint**: All existing tests pass, test infrastructure ready

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared hooks, CSS variables, and utilities that all stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 [P] Add `getNextStory(currentId: string)` helper to `src/hooks/useStoryData.ts` — returns random story excluding current
- [X] T008 [P] Add CSS custom properties to `src/styles/stories.css` for new typography: `--story-reading-font-size`, `--story-reading-line-height`, `--story-reading-column-width`, `--story-section-gap`, `--story-divider-color`
- [X] T009 [P] Add reduced-motion CSS utilities to `src/styles/stories.css`: `.story-reduced-motion` class that disables animations via `prefers-reduced-motion`
- [X] T009a [P] Create `src/components/Particles.tsx` — renders CSS-only floating particles (50 divs with randomized positions, sizes, and animation delays); accepts `count` prop; respects `prefers-reduced-motion` by rendering nothing when active
- [X] T010 Add `data-testid` attributes to existing `StoryReaderPage.tsx` elements: `story-reader`, `story-hero`, `story-content`, `story-section`

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 — Comfortable Long-Form Reading (Priority: P1) 🎯 MVP

**Goal**: Story body text is comfortable for long-form reading with proper typography, line height, and constrained reading column

**Independent Test**: Open any story with 3+ sections. Verify text is readable, line height allows scanning, paragraphs are separated, reading column is constrained.

### Tests for User Story 1

- [X] T011 [P] [US1] Write unit test for reading typography styles in `tests/unit/components/reading-typography.test.tsx` — verify font size, line height, column width, paragraph spacing via computed styles
- [X] T012 [P] [US1] Write unit test for drop cap rendering in `tests/unit/components/DropCap.test.tsx` — verify first paragraph gets `::first-letter` styling class

### Implementation for User Story 1

- [X] T013 [P] [US1] Create `src/components/DropCap.tsx` — wraps first paragraph of each section, applies `.drop-cap` class to trigger `::first-letter` CSS
- [X] T014 [US1] Update `src/styles/stories.css` — add reading typography rules: `.story-content__section-text` with font-size 1.125rem, line-height 1.8, max-width 72ch, paragraph margin-bottom 1.5em; add `.drop-cap` with `::first-letter` float, font-size 3.5em, line-height 0.8
- [X] T015 [US1] Update `src/pages/StoryReaderPage.tsx` — import DropCap, wrap first `<p>` of each section in `<DropCap>` component
- [X] T016 [US1] Run `npx tsc --noEmit && npm test` to verify no regressions

**Checkpoint**: Story text is comfortable for long-form reading, drop caps render correctly

---

## Phase 4: User Story 2 — Cinematic Story Introduction (Priority: P1) 🎯 MVP

**Goal**: Hero section dominates initial viewport with story image, title, summary, and atmospheric overlay

**Independent Test**: Open a story with real image and verify hero fills viewport. Open with placeholder and verify no visual breakage.

### Tests for User Story 2

- [X] T017 [P] [US2] Write unit test for hero layout in `tests/unit/components/StoryHero.test.tsx` — verify hero occupies substantial viewport area, title renders prominently, summary renders below title
- [X] T018 [P] [US2] Write unit test for image fallback in `tests/unit/components/StoryHero.test.tsx` — verify placeholder image renders without layout breakage

### Implementation for User Story 2

- [X] T019 [US2] Update `src/styles/stories.css` — add hero typography rules: `.story-reader__title` with font-size 3rem, font-weight bold, letter-spacing 0.02em; `.story-reader__summary` with font-size 1.125rem, max-width 600px, opacity 0.9
- [X] T020 [US2] Update `src/pages/StoryReaderPage.tsx` — restructure hero section: ensure image is dominant visual, title has clear hierarchy, summary positioned below, overlay gradient preserves readability
- [X] T021 [US2] Update `src/styles/stories.css` — add/update hero overlay gradient on `.story-reader__hero-overlay`: `linear-gradient(to top, rgba(31,43,30,0.95) 0%, rgba(31,43,30,0.3) 50%, transparent 100%)`
- [X] T022 [US2] Run `npx tsc --noEmit && npm test` to verify no regressions

**Checkpoint**: Hero is cinematic, image dominant, title prominent, placeholder-safe

---

## Phase 5: User Story 3 — Visual Rhythm & Section Transitions (Priority: P2)

**Goal**: Sections feel like movements in a tale with Roman numeral watermarks, ornamental dividers, and gradient fog transitions

**Independent Test**: Scroll through a story with 4+ sections. Verify Roman numerals, dividers, fog transitions, and ending treatment.

### Tests for User Story 3

- [X] T023 [P] [US3] Write unit test for SectionHeader in `tests/unit/components/SectionHeader.test.tsx` — verify Roman numeral renders, title renders, ornamental divider renders
- [X] T024 [P] [US3] Write unit test for FogTransition in `tests/unit/components/FogTransition.test.tsx` — verify gradient overlay renders between sections
- [X] T025 [P] [US3] Write unit test for StoryEnding in `tests/unit/components/StoryEnding.test.tsx` — verify ornamental divider (heavier) renders

### Implementation for User Story 3

- [X] T026 [P] [US3] Create `src/components/SectionHeader.tsx` — accepts `index` (number) and `title` (string), renders Roman numeral (converted via helper), section title, and ornamental divider with centered diamond
- [X] T027 [P] [US3] Create `src/components/FogTransition.tsx` — renders a `div` with CSS `linear-gradient` overlay (transparent → rgba(26,36,25,0.4) → transparent), 40px height
- [X] T028 [P] [US3] Create `src/components/StoryEnding.tsx` — renders ornamental divider with heavier weight (2px line, larger diamond, double lines)
- [X] T029 [US3] Update `src/styles/stories.css` — add `.section-header` styles (Roman numeral: 14px muted, title: 22px bold gold, divider: 1px line with diamond); add `.fog-transition` (gradient overlay); add `.story-ending` (heavier divider)
- [X] T030 [US3] Update `src/pages/StoryReaderPage.tsx` — import SectionHeader, FogTransition, StoryEnding; replace raw `<h2>` with `<SectionHeader>`; insert `<FogTransition>` between sections; add `<StoryEnding>` after final section
- [X] T031 [US3] Run `npx tsc --noEmit && npm test` to verify no regressions

**Checkpoint**: Sections have visual rhythm, Roman numerals, dividers, fog transitions, ending treatment

---

## Phase 6: User Story 4 — Reading Progress Awareness (Priority: P2)

**Goal**: Thin progress bar at viewport top that updates proportionally on scroll

**Independent Test**: Open a story, scroll top to bottom, verify progress bar fills. Verify bar doesn't obscure content.

### Tests for User Story 4

- [X] T032 [P] [US4] Write unit test for ReadingProgressBar in `tests/unit/components/ReadingProgressBar.test.tsx` — verify renders with correct initial state, updates on scroll, respects reduced-motion
- [X] T033 [P] [US4] Write Playwright E2E test in `tests/e2e/story-reader.spec.ts` — verify progress bar visible at top, updates on scroll, reaches 100% at bottom

### Implementation for User Story 4

- [X] T034 [P] [US4] Create `src/components/ReadingProgressBar.tsx` — uses Framer Motion `useScroll` + `useSpring` for GPU-accelerated progress tracking; renders fixed-position bar at top with `scaleX` transform; respects `useReducedMotion()` to disable animation
- [X] T035 [US4] Update `src/styles/stories.css` — add `.reading-progress-bar` styles: fixed top, full width, 4px height, purple accent (#8b5cf6), z-index 50, transform-origin left
- [X] T036 [US4] Update `src/pages/StoryReaderPage.tsx` — import ReadingProgressBar, render at top of page outside hero
- [X] T037 [US4] Run `npx tsc --noEmit && npm test` to verify no regressions

**Checkpoint**: Progress bar updates smoothly, doesn't obscure content

---

## Phase 7: User Story 5 — Related Monsters & Continuation (Priority: P2)

**Goal**: "Monsters of this Tale" section with heading, horizontal scroll monsters, and "Next Tale" card

**Independent Test**: Scroll to end of story with monsterIds. Verify heading, monsters, Next Tale card, navigation links.

### Tests for User Story 5

- [X] T038 [P] [US5] Write unit test for RelatedMonsters heading in `tests/unit/components/RelatedMonsters.test.tsx` — verify "Monsters of this Tale" heading renders
- [X] T039 [P] [US5] Write unit test for NextTaleCard in `tests/unit/components/NextTaleCard.test.tsx` — verify renders with story data, link navigates to correct route
- [X] T040 [P] [US5] Write Playwright E2E test in `tests/e2e/story-reader.spec.ts` — verify related monsters visible, Next Tale card visible, navigation links work

### Implementation for User Story 5

- [X] T041 [P] [US5] Create `src/components/NextTaleCard.tsx` — accepts `story` prop, renders card with title, summary, image; links to `/lore/stories/<id>`; uses `useStoryData().getNextStory()` for random selection
- [X] T042 [US5] Update `src/components/RelatedMonsters.tsx` — add "Monsters of this Tale" heading above horizontal scroll; wrap in styled section with atmospheric background
- [X] T043 [US5] Update `src/styles/stories.css` — add `.next-tale-card` styles (card with image, title, summary, hover effect); add `.related-monsters__heading` styles; update `.related-monsters` wrapper with atmospheric background
- [X] T044 [US5] Update `src/pages/StoryReaderPage.tsx` — import NextTaleCard, render after RelatedMonsters; add navigation links (Return to Stories, Explore Bestiary)
- [X] T045 [US5] Run `npx tsc --noEmit && npm test` to verify no regressions

**Checkpoint**: Related monsters, Next Tale card, and navigation all work

---

## Phase 8: User Story 6 — Responsive Reading (Priority: P3)

**Goal**: Mobile/tablet maintains visual identity and reading comfort without horizontal overflow

**Independent Test**: Open story on 375px viewport. Verify hero, text, sections, monsters all work. No horizontal scrolling.

### Tests for User Story 6

- [X] T046 [P] [US6] Write Playwright E2E responsive tests in `tests/e2e/story-reader.spec.ts` — verify no horizontal overflow at 375px, 768px, 1440px; verify hero visible; verify text readable; verify monsters tappable (44px touch targets)

### Implementation for User Story 6

- [X] T047 [US6] Update `src/styles/stories.css` — add responsive breakpoints: hero height 60vh tablet/50vh mobile; title font-size 2rem tablet/1.5rem mobile; reading column max-width adjustment; section padding reduction; related monsters horizontal scroll on mobile
- [X] T048 [US6] Verify `overflow-x: hidden` on `.story-reader` to prevent horizontal scroll
- [X] T049 [US6] Add Playwright E2E test to verify `overflow-x: hidden` on `.story-reader` and no horizontal scroll at 375px, 768px, and 1440px viewports
- [X] T050 [US6] Run `npx tsc --noEmit && npm test` to verify no regressions

**Checkpoint**: Responsive layout works across all viewports

---

## Phase 9: User Story 7 — Reduced Motion Support (Priority: P3)

**Goal**: Respects prefers-reduced-motion by disabling scroll animations, parallax, particles

**Independent Test**: Enable prefers-reduced-motion. Verify no parallax, no particles, no scroll animations. All content visible.

### Tests for User Story 7

- [X] T051 [P] [US7] Write Playwright E2E test in `tests/e2e/story-reader.spec.ts` — emulate reduced-motion, verify no particles, no section entrance animations, no hero zoom, all content visible

### Implementation for User Story 7

- [X] T052 [US7] Update `src/components/ReadingProgressBar.tsx` — use `useReducedMotion()` to disable spring animation, show static progress or simple CSS transition
- [X] T053 [US7] Update `src/styles/stories.css` — add `@media (prefers-reduced-motion: reduce)` rules: disable `.particle` animations, disable `.story-content__section` entrance animations, disable hero image zoom
- [X] T054 [US7] Update `src/pages/StoryReaderPage.tsx` — conditionally render particles only when motion is not reduced; disable `whileInView` animations on sections when reduced-motion is active
- [X] T054a [US7] Update `src/components/Particles.tsx` — use `useReducedMotion()` to return null when reduced-motion is active
- [X] T055 [US7] Run `npx tsc --noEmit && npm test` to verify no regressions

**Checkpoint**: Reduced motion experience is fully accessible

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Performance, accessibility, final E2E validation

- [X] T056 [P] Add `aria-label` to progress bar: `aria-label="Reading progress"`, `role="progressbar"`, `aria-valuenow` updated on scroll
- [X] T057 [P] Add `aria-label` to Next Tale card and navigation links
- [X] T058 [P] Verify all images have meaningful `alt` text in hero and related monsters
- [X] T059 [P] Add keyboard focus styles for Next Tale card and related monster links
- [X] T060 Run full Playwright E2E suite: `npx playwright test tests/e2e/story-reader.spec.ts`
- [X] T061 Run full regression: `npm run build && npm run validate && npm test && npx playwright test`
- [X] T062 Run quickstart.md validation: verify all 7 scenarios pass
- [X] T063 [P] Verify existing `tests/e2e/stories.spec.ts` still passes (no regressions)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — can start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion — BLOCKS all user stories
- **Phases 3–9 (User Stories)**: All depend on Phase 2 completion
  - US1 (P1) and US2 (P1) can run in parallel
  - US3, US4, US5 (P2) can run in parallel after Phase 2
  - US6, US7 (P3) can run in parallel after Phase 2
- **Phase 10 (Polish)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (Comfortable Reading)**: No dependencies on other stories
- **US2 (Cinematic Hero)**: No dependencies on other stories
- **US3 (Visual Rhythm)**: No dependencies on other stories
- **US4 (Progress Bar)**: No dependencies on other stories
- **US5 (Related Monsters)**: No dependencies on other stories
- **US6 (Responsive)**: Depends on US1–US5 for layout context
- **US7 (Reduced Motion)**: Depends on US3, US4 for animation targets

### Within Each User Story (TDD Order)

1. Tests first (write, verify they FAIL)
2. Component implementation (tests pass)
3. CSS styling (tests still pass)
4. Integration into StoryReaderPage
5. Regression check

### Parallel Opportunities

- T004, T005, T006 (Setup) — all parallel
- T007, T008, T009 (Foundational) — all parallel
- T011, T012 (US1 tests) — parallel
- T017, T018 (US2 tests) — parallel
- T023, T024, T025 (US3 tests) — parallel
- T026, T027, T028 (US3 components) — parallel
- T032, T033 (US4 tests) — parallel
- T038, T039, T040 (US5 tests) — parallel
- T041 (NextTaleCard) parallel with T042 (RelatedMonsters update)

---

## Parallel Example: User Story 3

```bash
# Write all US3 tests in parallel:
Task: "T023 Write unit test for SectionHeader"
Task: "T024 Write unit test for FogTransition"
Task: "T025 Write unit test for StoryEnding"

# Then implement all US3 components in parallel:
Task: "T026 Create SectionHeader.tsx"
Task: "T027 Create FogTransition.tsx"
Task: "T028 Create StoryEnding.tsx"
```

---

## Implementation Strategy

### MVP First (US1 + US2)

1. Complete Phase 1: Setup ✓
2. Complete Phase 2: Foundational ✓
3. Complete Phase 3: US1 (Comfortable Reading) ✓
4. Complete Phase 4: US2 (Cinematic Hero) ✓
5. **STOP and VALIDATE**: Open story — text is comfortable, hero is cinematic
6. MVP ready for review

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 + US2 → MVP (comfortable reading + cinematic hero)
3. US3 + US4 → Visual rhythm + progress bar (P2 features)
4. US5 → Related monsters + continuation
5. US6 + US7 → Responsive + accessibility (P3)
6. Polish → Final validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Each user story is independently completable and testable
- Tests MUST fail before implementation (TDD)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Existing `tests/e2e/stories.spec.ts` must remain passing throughout
