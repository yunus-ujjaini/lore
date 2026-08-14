# Tasks: Stories & Story Reader

**Input**: Design documents from `/specs/004-stories/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Not explicitly requested in the feature specification. Tasks below focus on implementation only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, etc.)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and navigation updates

- [x] T001 Update `src/App.tsx` to add `/stories` and `/stories/:id` routes
- [x] T002 Create `src/components/GlobalNav.tsx` with links to Bestiary and Stories
- [x] T003 Add GlobalNav to `src/App.tsx` layout
- [x] T004 Create `src/styles/stories.css` with dark theme CSS variables
- [x] T005 Update `src/content-loader.ts` to load stories with sections structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core components that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 [P] Create `src/components/StoryCard.tsx` — story card with image, title, summary, monsters
- [x] T007 [P] Create `src/components/MonsterMiniCard.tsx` — compact monster card for related section
- [x] T008 [P] Create `src/components/RelatedMonsters.tsx` — horizontal scrollable monster cards
- [x] T009 [P] Create `src/components/NotFoundStory.tsx` — not-found state
- [x] T010 Create `src/hooks/useStoryData.ts` — hook for loading and filtering stories
- [x] T011 Create `src/pages/StoriesPage.tsx` — stories landing page with story cards

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Browse Stories (Priority: P1) 🎯 MVP

**Goal**: Display all stories as illustrated cards with image, title, summary, and related monsters

**Independent Test**: Open the Stories page and confirm every story appears as a card with all required elements

### Implementation for User Story 1

- [x] T012 [US1] Wire StoriesPage to content loader and routing
- [x] T013 [US1] Implement story card grid layout (3-col desktop, 2-col tablet, 1-col mobile)
- [x] T014 [US1] Add hero section with "STORIES" title and atmospheric background
- [x] T015 [US1] Style story cards with dark theme and decorative borders
- [x] T016 [US1] Add hover effects to story cards (scale + lift)
- [x] T017 [US1] Implement GlobalNav with Stories and Bestiary links

**Checkpoint**: Stories landing page displays all stories as styled cards

---

## Phase 4: User Story 2 - Read a Story (Priority: P1)

**Goal**: Story Reader with hero, ordered sections, and comfortable reading experience

**Independent Test**: Open a story, verify navigation to `/stories/:id`, and confirm all story information and sections are displayed in order

### Implementation for User Story 2

- [x] T018 [US2] Create `src/pages/StoryReaderPage.tsx` — main story reader with hero and sections
- [x] T019 [US2] Implement story hero with title, summary, and hero image
- [x] T020 [US2] Implement ordered sections display with proper separation
- [x] T021 [US2] Add section titles and content rendering
- [x] T022 [US2] Style story content for comfortable reading (width, line-height, spacing)
- [x] T023 [US2] Add placeholder image handling for story images

**Checkpoint**: Story Reader displays all story information and sections correctly

---

## Phase 5: User Story 3 - Navigate to Related Monsters (Priority: P1)

**Goal**: Display related monsters and enable navigation to Monster Details

**Independent Test**: Open a story with associated monsters, verify they are displayed, click one, and confirm navigation to Monster Details page

### Implementation for User Story 3

- [x] T024 [US3] Implement RelatedMonsters component with horizontal scroll
- [x] T025 [US3] Implement MonsterMiniCard component with image, name, category, threat
- [x] T026 [US3] Add story filtering logic (filter by monsterIds array)
- [x] T027 [US3] Wire RelatedMonsters to StoryReaderPage
- [x] T028 [US3] Add click handler to navigate to `/bestiary/:id`

**Checkpoint**: Related monsters display and navigate correctly

---

## Phase 6: User Story 4 - Navigate Back to Stories (Priority: P1)

**Goal**: Back navigation integrated with visual design

**Independent Test**: Click "Back to Stories" on the Story Reader page, verify the Stories page is displayed

### Implementation for User Story 4

- [x] T029 [US4] Add back navigation component to StoryReaderPage
- [x] T030 [US4] Style back navigation to match dark theme
- [x] T031 [US4] Add keyboard accessibility to back navigation

**Checkpoint**: Back navigation works and is visually integrated

---

## Phase 7: User Story 5 - Handle Missing Story (Priority: P1)

**Goal**: Clear not-found state for invalid story IDs

**Independent Test**: Navigate to `/stories/nonexistent-story`, verify the not-found state and ability to return to Stories page

### Implementation for User Story 5

- [x] T032 [US5] Implement NotFoundStory component with clear message
- [x] T033 [US5] Add not-found state to StoryReaderPage routing
- [x] T034 [US5] Add "Back to Stories" link in NotFoundStory

**Checkpoint**: Invalid story IDs show not-found state without crashing

---

## Phase 8: User Story 6 - Responsive Stories (Priority: P2)

**Goal**: Responsive layout across desktop, tablet, and mobile

**Independent Test**: Resize the viewport across desktop, tablet, and mobile widths; verify the pages remain usable without horizontal scrolling

### Implementation for User Story 6

- [x] T035 [US6] Add responsive CSS media queries for StoriesPage
- [x] T036 [US6] Add responsive CSS media queries for StoryReaderPage
- [x] T037 [US6] Adapt hero sections for mobile (smaller titles, preserved identity)
- [x] T038 [US6] Make related monsters horizontally scrollable on mobile
- [x] T039 [US6] Ensure no horizontal scrolling at any breakpoint

**Checkpoint**: Layout adapts across all screen sizes without horizontal scroll

---

## Phase 9: User Story 7 - Accessible Stories (Priority: P2)

**Goal**: Keyboard navigation, visible focus, alt text, reduced-motion

**Independent Test**: Operate the pages with keyboard only; verify visible focus states and reduced-motion preferences are respected

### Implementation for User Story 7

- [x] T040 [US7] Add keyboard navigation to all interactive elements
- [x] T041 [US7] Add visible focus states to all interactive elements
- [x] T042 [US7] Add ARIA labels to story cards and navigation
- [x] T043 [US7] Add alt text to story and monster images
- [x] T044 [US7] Implement reduced-motion support with Framer Motion
- [x] T045 [US7] Ensure sufficient color contrast for all text

**Checkpoint**: Full keyboard accessibility with focus states and reduced-motion

---

## Phase 10: User Story 8 - Story Schema Migration (Priority: P1)

**Goal**: Migrate existing stories from content string to sections array with ≥4 sections each

**Independent Test**: Verify existing stories have been migrated to sections format with at least 4 sections each

### Implementation for User Story 8

- [x] T046 [US8] Create migration script/logic to convert content → sections
- [x] T047 [US8] Migrate `the-last-wish.ts` to sections format (4 sections)
- [x] T048 [US8] Migrate `the-giant-of-the-pass.ts` to sections format (4 sections)
- [x] T049 [US8] Migrate `striga-of-maribor.ts` to sections format (4 sections)
- [x] T050 [US8] Verify all migrated stories display correctly in Story Reader

**Checkpoint**: All existing stories migrated with ≥4 sections each

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Animations, performance, and visual refinements

- [x] T051 Add page entrance animation for StoriesPage
- [x] T052 Add staggered card appearance animation
- [x] T053 Add story hero entrance animation
- [x] T054 Add section reveal animation on scroll
- [x] T055 Add atmospheric effects (particles, fog) triggered by scroll
- [x] T056 Optimize animations for 60fps performance
- [x] T057 Run quickstart.md validation scenarios
- [x] T058 Verify all SC-001 through SC-014 success criteria
- [x] T059 Create `tests/e2e/stories.spec.ts` with comprehensive E2E tests

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Stories (Phase 3–10)**: All depend on Phase 2 completion
- **Polish (Phase 11)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (Browse)**: Can start after Phase 2 — No dependencies on other stories
- **US2 (Read Story)**: Depends on US1 (needs StoriesPage structure)
- **US3 (Related Monsters)**: Depends on US2 (needs StoryReaderPage)
- **US4 (Back Nav)**: Depends on US2 (needs StoryReaderPage)
- **US5 (Missing Story)**: Depends on US2 (needs StoryReaderPage routing)
- **US6 (Responsive)**: Depends on US1, US2 (needs page structures)
- **US7 (Accessible)**: Depends on US1, US2 (needs interactive elements)
- **US8 (Schema Migration)**: Depends on US2 (needs StoryReaderPage to verify migration)

### Parallel Opportunities

- Phase 1 tasks marked [P] can run in parallel
- Phase 2 tasks marked [P] can run in parallel
- US6 (Responsive) and US7 (Accessible) can run in parallel
- Different team members can work on different stories after Phase 2

---

## Implementation Strategy

### MVP First (US1 + US4 + US5)

1. Complete Phase 1: Setup (T001–T005)
2. Complete Phase 2: Foundational (T006–T011)
3. Complete Phase 3: User Story 1 (T012–T017)
4. **STOP and VALIDATE**: Test Stories page displays all stories as styled cards
5. Deploy/demo if ready

### Incremental Delivery

1. Phase 1 + Phase 2 → Foundation ready
2. Phase 3 (US1) → All stories displayed → MVP!
3. Phase 4 (US2) → Story Reader works → Demo
4. Phase 5 (US3) → Related monsters → Demo
5. Phase 6 (US4) → Back navigation → Demo
6. Phase 7 (US5) → Missing story handling → Demo
7. Phase 8 (US6) → Responsive → Demo
8. Phase 9 (US7) → Accessibility → Demo
9. Phase 10 (US8) → Schema migration → Demo
10. Phase 11 → Polish → Final release

### Parallel Team Strategy

With multiple developers:

1. Team completes Phase 1 + Phase 2 together
2. Once Phase 2 is done:
   - Developer A: US1 (Browse) → US2 (Read Story) → US3 (Related Monsters)
   - Developer B: US4 (Back Nav) → US5 (Missing Story) → US6 (Responsive)
   - Developer C: US7 (Accessible) → US8 (Schema Migration)
3. Stories complete and integrate independently

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
- Global navigation component affects Features 2 and 3 (adds shared nav)
