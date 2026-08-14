# Tasks: Bestiary Explorer

**Input**: Design documents from `/specs/002-bestiary-explorer/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in the feature specification. Tasks below focus on implementation only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, etc.)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and React/Vite configuration

- [x] T001 Install React dependencies: `npm install react react-dom react-router-dom @types/react @types/react-dom @vitejs/plugin-react`
- [x] T002 Update `vite.config.ts` to add `@vitejs/plugin-react` while preserving existing Vitest config
- [x] T003 Update `tsconfig.json` to add JSX support (`"jsx": "react-jsx"`)
- [x] T004 Create `index.html` entry point with `<div id="root">` mount point
- [x] T005 Create `src/main.tsx` with React root mount and BrowserRouter setup
- [x] T006 Create `src/App.tsx` with route definitions (`/bestiary`, `/bestiary/:id`)
- [x] T007 Create `src/index.css` with CSS custom properties for dark theme palette
- [x] T008 Create `src/content-loader.ts` using `import.meta.glob` for browser-safe monster loading

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core components and hooks that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 [P] Create `src/types/ui.ts` with FilterState interface
- [x] T010 [P] Create `src/hooks/useMonsterFilter.ts` with search, category, and threat filter logic
- [x] T011 [P] Create `src/components/MonsterCard.tsx` with image, name, category, threat, description
- [x] T012 [P] Create `src/components/SearchBar.tsx` with debounced input and clear button
- [x] T013 [P] Create `src/components/CategoryFilter.tsx` with pill/tag buttons for 10 categories
- [x] T014 [P] Create `src/components/ThreatFilter.tsx` with pill/tag buttons for levels 1–5
- [x] T015 [P] Create `src/components/FilterBar.tsx` combining SearchBar, CategoryFilter, ThreatFilter
- [x] T016 [P] Create `src/components/EmptyState.tsx` with "No monsters found" message and reset
- [x] T017 Create `src/pages/BestiaryPage.tsx` with hero section, FilterBar, and monster grid
- [x] T017a [P] Create `src/components/ErrorState.tsx` for data load failure (FR-014)
- [x] T017b Add error boundary and error state handling to `src/pages/BestiaryPage.tsx` (FR-014)

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Browse the Bestiary (Priority: P1) 🎯 MVP

**Goal**: Display all monsters as a grid of cards with editorial composition and cinematic hero

**Independent Test**: Open Bestiary and confirm every monster appears as a card with all five required elements

### Implementation for User Story 1

- [x] T018 [US1] Implement monster grid layout in `src/pages/BestiaryPage.tsx` (3-col desktop, 2-col tablet, 1-col mobile)
- [x] T019 [US1] Add hero section with "BESTIARY" title, tagline, and atmospheric background
- [x] T020 [US1] Add decorative elements (shield, ornamental lines) to hero section
- [x] T021 [US1] Implement card hover effect (scale 1.02-1.05 + shadow lift) in `src/components/MonsterCard.tsx`
- [x] T022 [US1] Add consistent image area reservation in MonsterCard (handles placeholder images)
- [x] T023 [US1] Add decorative borders and atmospheric styling to cards
- [x] T024 [US1] Implement staggered card entrance animation on page load

**Checkpoint**: All monsters displayed as styled cards with hero section

---

## Phase 4: User Story 2 - Search Monsters by Name (Priority: P1)

**Goal**: Live search that filters monsters by name with debounced input

**Independent Test**: Type "leshen" — only Leshen shown; type "griff" — only Griffin shown; clear — all return

### Implementation for User Story 2

- [x] T025 [US2] Wire SearchBar to useMonsterFilter hook in `src/pages/BestiaryPage.tsx`
- [x] T026 [US2] Implement debounced search (150-300ms) in `src/hooks/useMonsterFilter.ts`
- [x] T027 [US2] Add case-insensitive partial matching logic for search
- [x] T028 [US2] Implement smooth card rearrangement when search results change

**Checkpoint**: Search filters monsters in real-time with debounced input

---

## Phase 5: User Story 3 - Filter by Category (Priority: P1)

**Goal**: Category filter with pill/tag buttons and active selection state

**Independent Test**: Select "Relicts" — only Relict monsters shown; select "All" — all return

### Implementation for User Story 3

- [x] T029 [US3] Wire CategoryFilter to useMonsterFilter hook in `src/pages/BestiaryPage.tsx`
- [x] T030 [US3] Implement category filtering logic in `src/hooks/useMonsterFilter.ts`
- [x] T031 [US3] Style active category pill with distinct visual state
- [x] T032 [US3] Add "All" option that clears category filter

**Checkpoint**: Category filter shows only matching monsters

---

## Phase 6: User Story 4 - Filter by Threat Level (Priority: P1)

**Goal**: Threat level filter with exact-level semantics

**Independent Test**: Select level 4 — only monsters with threat 4 shown; select "All" — all return

### Implementation for User Story 4

- [x] T033 [US4] Wire ThreatFilter to useMonsterFilter hook in `src/pages/BestiaryPage.tsx`
- [x] T034 [US4] Implement threat level filtering logic in `src/hooks/useMonsterFilter.ts`
- [x] T035 [US4] Style threat level pills with muted colors (level 4 = `#6a5a3a`)
- [x] T036 [US4] Add "All" option that clears threat filter

**Checkpoint**: Threat filter shows only exact-level matches

---

## Phase 7: User Story 5 - Combine Search and Filters (Priority: P1)

**Goal**: All filters compose correctly; empty state with reset; filter persistence

**Independent Test**: Apply search + category + threat — all three compose; clear one — others remain

### Implementation for User Story 5

- [x] T037 [US5] Implement filter composition logic in `src/hooks/useMonsterFilter.ts` (all filters combine)
- [x] T038 [US5] Wire Reset button in FilterBar to clear all filters
- [x] T039 [US5] Wire EmptyState component when no monsters match filters
- [x] T040 [US5] Implement sessionStorage persistence for filter state (FR-020)
- [x] T041 [US5] Add filter preservation across navigation (persist on BestiaryPage unmount)

**Checkpoint**: Combined filters work; reset clears all; empty state shown; filters persist across navigation

---

## Phase 8: User Story 6 - Navigate to a Monster (Priority: P1)

**Goal**: Clicking card navigates to `/bestiary/:id` with placeholder page

**Independent Test**: Click card — navigates to `/bestiary/leshen`; placeholder page shows monster name

### Implementation for User Story 6

- [x] T042 [US6] Create `src/pages/MonsterPlaceholderPage.tsx` with monster name and "details coming" message
- [x] T043 [US6] Add click handler to MonsterCard that navigates to `/bestiary/:id`
- [x] T044 [US6] Implement not-found state for invalid monster IDs
- [x] T045 [US6] Add back navigation link from placeholder page to Bestiary

**Checkpoint**: Card click navigates to placeholder route; back returns to list

---

## Phase 9: User Story 7 - Use the Bestiary on Any Screen (Priority: P2)

**Goal**: Responsive layout across desktop, tablet, and mobile

**Independent Test**: Resize viewport — grid adapts (3-col → 2-col → 1-col); no horizontal scroll

### Implementation for User Story 7

- [x] T046 [US7] Add responsive CSS media queries for grid layout (desktop 3-col, tablet 2-col, mobile 1-col)
- [x] T047 [US7] Make FilterBar responsive (stacked on mobile, horizontal on desktop)
- [x] T048 [US7] Adapt hero section for mobile (smaller title, preserved visual identity)
- [x] T049 [US7] Make SearchBar full-width on mobile
- [x] T050 [US7] Ensure no horizontal scrolling at any breakpoint

**Checkpoint**: Layout adapts across all screen sizes without horizontal scroll

---

## Phase 10: User Story 8 - A Bestiary Accessible to Everyone (Priority: P2)

**Goal**: Keyboard navigation, visible focus, meaningful labels, reduced-motion support

**Independent Test**: Navigate with keyboard only; verify visible focus and reduced-motion preferences

### Implementation for User Story 8

- [x] T051 [US8] Add keyboard navigation to cards (Tab focus, Enter/Space activation)
- [x] T052 [US8] Add visible focus rings to all interactive elements
- [x] T053 [US8] Add ARIA labels to search, filters, and cards
- [x] T054 [US8] Add alt text to monster images
- [x] T055 [US8] Implement reduced-motion support (disable animations when `prefers-reduced-motion: reduce`)
- [x] T056 [US8] Ensure sufficient color contrast (4.5:1 minimum)

**Checkpoint**: Full keyboard accessibility with focus states and reduced-motion support

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Visual refinements, performance, and quality assurance

- [x] T057 Add atmospheric effects (particles, fog) triggered by hover/scroll interaction
- [x] T058 Add cinematic transition when navigating to monster placeholder
- [x] T059 Optimize animations for 60fps performance (SC-012)
- [x] T060 Add decorative section transitions between hero and card grid
- [x] T061 Final visual polish and spacing adjustments
- [x] T062 Run quickstart.md validation scenarios manually
- [x] T063 Verify all SC-001 through SC-012 success criteria
- [x] T064 Create `tests/e2e/bestiary.spec.ts` — Playwright E2E: browse all monsters (FR-019, SC-007)
- [x] T065 [P] Add Playwright E2E: search by name (FR-019, SC-007)
- [x] T066 [P] Add Playwright E2E: filter by category (FR-019, SC-007)
- [x] T067 [P] Add Playwright E2E: filter by threat level (FR-019, SC-007)
- [x] T068 [P] Add Playwright E2E: combined filters and reset (FR-019, SC-007)
- [x] T069 [P] Add Playwright E2E: navigation to monster placeholder (FR-019, SC-007)
- [x] T070 [P] Add Playwright E2E: responsive layout (FR-019, SC-007)
- [x] T071 [P] Add Playwright E2E: keyboard accessibility (FR-019, SC-007)
- [x] T072 Run full Playwright E2E suite and verify all tests pass (SC-007)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Stories (Phase 3–10)**: All depend on Phase 2 completion
  - US1 (Browse) → US2 (Search) → US3 (Category) → US4 (Threat) → US5 (Combined) → US6 (Navigation) → US7 (Responsive) → US8 (Accessibility)
  - Sequential order recommended for stability; US7 and US8 can run in parallel if needed
- **Polish (Phase 11)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (Browse)**: Can start after Phase 2 — No dependencies on other stories
- **US2 (Search)**: Depends on US1 (needs MonsterCard and page structure)
- **US3 (Category)**: Depends on US1 (needs MonsterCard and page structure)
- **US4 (Threat)**: Depends on US1 (needs MonsterCard and page structure)
- **US5 (Combined)**: Depends on US2, US3, US4 (composes all filters)
- **US6 (Navigation)**: Depends on US1 (needs MonsterCard click handler)
- **US7 (Responsive)**: Depends on US1 (needs grid structure)
- **US8 (Accessibility)**: Depends on US1 (needs interactive elements)

### Within Each User Story

- Components before page integration
- Logic before styling
- Core implementation before animations
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T009–T016)
- US7 (Responsive) and US8 (Accessibility) can run in parallel
- Different team members can work on different stories after Phase 2

---

## Parallel Example: Foundational Phase

```bash
# Launch all foundational components together:
Task: "Create FilterState interface in src/types/ui.ts"
Task: "Create useMonsterFilter hook in src/hooks/useMonsterFilter.ts"
Task: "Create MonsterCard in src/components/MonsterCard.tsx"
Task: "Create SearchBar in src/components/SearchBar.tsx"
Task: "Create CategoryFilter in src/components/CategoryFilter.tsx"
Task: "Create ThreatFilter in src/components/ThreatFilter.tsx"
Task: "Create FilterBar in src/components/FilterBar.tsx"
Task: "Create EmptyState in src/components/EmptyState.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T008)
2. Complete Phase 2: Foundational (T009–T017)
3. Complete Phase 3: User Story 1 (T018–T024)
4. **STOP and VALIDATE**: Test Bestiary page displays all monsters as styled cards
5. Deploy/demo if ready

### Incremental Delivery

1. Phase 1 + Phase 2 → Foundation ready
2. Phase 3 (US1) → All monsters displayed → MVP!
3. Phase 4 (US2) → Search works → Demo
4. Phase 5 (US3) → Category filter → Demo
5. Phase 6 (US4) → Threat filter → Demo
6. Phase 7 (US5) → Combined filters + persistence → Demo
7. Phase 8 (US6) → Navigation → Demo
8. Phase 9 (US7) → Responsive → Demo
9. Phase 10 (US8) → Accessibility → Demo
10. Phase 11 → Polish → Final release

### Parallel Team Strategy

With multiple developers:

1. Team completes Phase 1 + Phase 2 together
2. Once Phase 2 is done:
   - Developer A: US1 (Browse) → US2 (Search) → US5 (Combined)
   - Developer B: US3 (Category) → US4 (Threat) → US6 (Navigation)
   - Developer C: US7 (Responsive) + US8 (Accessibility)
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
