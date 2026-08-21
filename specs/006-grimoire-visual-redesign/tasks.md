# Tasks: Grimoire Visual Redesign

**Input**: Design documents from `/specs/006-grimoire-visual-redesign/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Test updates are part of the Polish phase (FR-040). No dedicated test-first phase — existing tests must remain green throughout, and selectors are updated as part of each component restyle.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: CSS foundation, fonts, and schema extension — blocks all user stories

- [x] T001 Replace CSS custom properties in `src/index.css` with the grimoire palette (near-black #08070a, card #100e14, muted #1c1820, foreground #ddd0b8, accent #b8852a, primary #8b1a1a, border #2e2530, text-dim ladder with WCAG-compliant promoted variants from research.md R1). Remove all old green/brown variables (--bg-primary, --bg-secondary, --panel-*, --text-*, --border-*, --threat-*, --accent-primary, --focus-ring).
- [x] T002 Add Google Fonts `<link rel="preconnect">` tags for `fonts.googleapis.com` and `fonts.gstatic.com`, plus `<link>` tag loading Cinzel Decorative (400;700;900), Cinzel (400–700), Crimson Text (400;600 + italic), IM Fell English (400 + italic) with `display=swap` in `index.html`.
- [x] T003 Replace global body styles in `src/index.css`: font-family → Crimson Text/Georgia/serif, background → #08070a, color → #ddd0b8, line-height → 1.7. Add `.font-display` (Cinzel Decorative), `.font-heading` (Cinzel), `.font-lore` (IM Fell English) utility classes per the reference.
- [x] T004 Extend the Monster zod schema in `src/validation/schema.ts` with optional `lore: z.string().optional()` and `weaknesses: z.array(z.string()).optional()` fields. Verify existing entries still pass with `npm run validate`.
- [x] T005 Add `lore` and `weaknesses` fields to all 10 monster content entries in `content/monsters/*.ts` (alghoul, arachas, drowners, golem, griffin, katakan, leshen, striga, wraith, wyvern). Populate with appropriate Witcher-lore text. Verify `npm run validate` passes.

---

## Phase 2: Foundational (Shared Components)

**Purpose**: Nav and shared components that ALL pages depend on — must complete before user stories

**⚠️ CRITICAL**: No user story page work can begin until this phase is complete

- [x] T006 [P] Restyle `src/components/GlobalNav.tsx` per the reference: fixed 64px bar, gradient near-black background with `backdrop-filter: blur(8px)`, 1px border bottom. Add wolf-medallion SVG mark (gold stroke circle + wolf-glyph paths), "THE WITCHER" wordmark (Cinzel Decorative 0.9rem / 700 / 0.2em), nav links (Cinzel 0.8rem / 0.15em / uppercase) with gold underline hover/active, ✦ glyph separator. Update `src/index.css` with `.global-nav`, `.nav-link`, `.nav-link.active` styles.
- [x] T007 [P] Restyle `src/components/ThreatStars.tsx` per the reference: gold fill (#b8852a) + gold stroke for filled stars, transparent fill + #5a4e3a stroke for empty stars, 2px gap between glyphs. Keep SVG star path and size props.
- [x] T008 [P] Restyle `src/components/BackNavigation.tsx` per the reference: uppercase tracked Cinzel 0.65rem / 0.2em, color #7a6d5a, no border/fill, "← Bestiary" / "← The Tales". Update CSS.
- [x] T009 [P] Restyle `src/components/EmptyState.tsx` per the reference: centered block with 1px border, Cinzel Decorative title in #5a4e3a, italic IM Fell English sub-line, gold outline button (transparent bg, 1px #b8852a border, Cinzel 0.7rem / 0.15em uppercase).
- [x] T010a [P] Restyle `src/components/NotFoundMonster.tsx` per the reference: ornate serif title in #5a4e3a, italic lore sub-line in #7a6d5a, gold outline return button navigating to `/bestiary`.
- [x] T010b [P] Restyle `src/components/NotFoundStory.tsx` per the reference: ornate serif title in #5a4e3a, italic lore sub-line in #7a6d5a, gold outline return button navigating to `/stories`.
- [x] T011 [P] Restyle `src/components/ErrorState.tsx` per the reference: match the empty/not-found visual language.
- [x] T012 [P] Create medallion-divider CSS class in `src/index.css`: flex row, ✦ glyph in #b8852a, 1px gradient hairlines (`linear-gradient(90deg, transparent, #b8852a, transparent)`), gold color.
- [x] T013 [P] Add `@media (prefers-reduced-motion: reduce)` CSS rule in `src/index.css` that sets `transition: none` and `animation: none` on all elements. Add `.progress-bar` styles (fixed 3px, `linear-gradient(90deg, #8b1a1a, #b8852a)`, z-index 100).

**Checkpoint**: Foundation ready — nav, shared components, palette, fonts, and schema all in place. User story implementation can begin.

---

## Phase 3: User Story 1 — Browse the Bestiary in Grimoire Style (Priority: P1) 🎯 MVP

**Goal**: Bestiary page renders in grimoire style with hero, filter panel, seam-grid cards, and all existing filter behavior preserved

**Independent Test**: Open `/bestiary` — see grimoire hero, filter panel with pills, card grid with category bars and threat stars. Search, category, threat filters work. Session persistence works. Empty state shows grimoire styling.

### Implementation for User Story 1

- [x] T014 [US1] Restyle `src/components/SearchBar.tsx` per the reference: muted fill (#1c1820), 1px #2e2530 border, Cinzel 0.8rem / 0.05em, italic placeholder in #7a6d5a, 2px radius, gold (#b8852a) border on focus. Update CSS class `.search-input`.
- [x] T015 [US1] Restyle `src/components/CategoryFilter.tsx` per the reference: bordered Cinzel filter pills (0.7rem / 0.1em / uppercase, 2px radius). States: inactive (#7a6d5a on transparent), hover (gold border + gold text), active (#8b1a1a fill + #f0e8d8 text). Update CSS class `.filter-pill`.
- [x] T016 [US1] Restyle `src/components/ThreatFilter.tsx` per the reference: same filter-pill styling as CategoryFilter, with embedded ThreatStars at 11px inside each pill.
- [x] T017 [US1] Restyle `src/components/FilterBar.tsx` per the reference: dark card panel (#100e14, 1px #2e2530 border, 1.5rem padding), group labels in uppercase Cinzel 0.65rem / 0.2em, results row with "N entries found" (Cinzel 0.7rem) and underlined gold "Reset filters" link.
- [x] T018 [US1] Restyle `src/components/MonsterCard.tsx` per the reference: background #08070a, 1px #2e2530 border, 3px category-color gradient top bar, body with 1.5rem padding, Cinzel card title + ThreatStars row, category badge (Cinzel 0.65rem / 0.12em / uppercase / 1px currentColor border / 2px radius), clamped Crimson Text description (3 lines, #8a7d6a), hairline-inset footer (#1c1820 top border) with "N tales" (#5a4e3a) + gold "Read Entry →". Hover: gold border, -2px translate, deep shadow + gold ring. Update CSS class `.monster-card`.
- [x] T019 [US1] Add seam-grid styles in `src/index.css`: `.bestiary__grid` with `display: grid`, `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, `gap: 1px`, `background: #2e2530` (parent color shows through gaps as hairlines).
- [x] T020 [US1] Restyle `src/pages/BestiaryPage.tsx` per the reference: centered hero with radial glow (`rgba(139,26,26,0.12)`), gold eyebrow "A Witcher's Field Guide" (Cinzel 0.7rem / 0.35em / uppercase), Cinzel Decorative display title "BESTIARY" (clamp 2rem–3.5rem / 900 / 0.08em), medallion divider, italic lore tagline (IM Fell English, max-width 600px). Filter panel directly below hero. Footer with count. Update `src/styles/stories.css` or `src/index.css` with `.bestiary`, `.bestiary__hero`, `.bestiary__title`, `.bestiary__tagline`, `.bestiary__footer` styles.
- [x] T021 [US1] Verify all existing Bestiary filter behavior: combined search+category+threat filtering, debounced search (200ms), sessionStorage persistence, reset/clear actions, empty state rendering. Run `npm test` and `npm run test:e2e` — update any broken test selectors from class name changes. Tests MUST pass before this task is complete (Constitution Principle VIII).

**Checkpoint**: Bestiary page fully functional in grimoire style. MVP deliverable.

---

## Phase 4: User Story 2 — Monster Detail with Image Hero (Priority: P1)

**Goal**: Monster detail page shows full-width image hero on top, grimoire-styled header, Field Description, Scholar's Notes, Weaknesses, Entry Details sidebar, and Featured in Tales

**Independent Test**: Navigate to `/bestiary/:id` — full-width hero image at top, entry header below, body sections styled per reference, sidebar renders, tale rows link to stories. 404 state works. Schema extension visible (lore/weaknesses render when present).

### Implementation for User Story 2

- [x] T022 [US2] Restyle `src/components/MonsterHero.tsx` per the reference: full-width hero with near-black overlay gradient, image as background or top element, entry header overlaid/below with category badge (Cinzel 0.65rem / 0.12em / uppercase), Cinzel Decorative name (clamp 1.6–3rem / 700), ThreatStars + "Threat Level N" label (Cinzel 0.65rem / 0.2em / uppercase / #7a6d5a). Preserve existing image load error fallback to placeholder.
- [x] T023 [US2] Restyle `src/components/MonsterInfo.tsx` per the reference: expand to render Field Description (gold uppercase section label + body-serif text in #c0b09a, 1.1rem / 1.8), Scholar's Notes (italic IM Fell English, #7a6d5a, 2px #2e2530 left rule, 1.25rem padding-left, line-height 1.9 — only if `monster.lore` exists), Known Weaknesses (section label + weakness tags as bordered Cinzel 0.65rem / 0.1em / uppercase / 1px #2e2530 border / 0.25rem 0.7rem padding — only if `monster.weaknesses` exists). Use category-color 4px left rule on the detail header.
- [x] T024 [US2] Restyle `src/components/RelatedStories.tsx` per the reference: medallion-divider label "Featured in Tales", bordered tale rows (#100e14 bg, 1px #2e2530 border) with title (Cinzel 1rem), 2-line clamped summary (Crimson Text 0.9rem / #7a6d5a), red "Read →" (#8b1a1a). Hover: border → gold.
- [x] T025 [US2] Add Entry Details sidebar styles in `src/styles/monster-details.css` or `src/index.css`: bordered card panel (#100e14, 1px #2e2530, 1.5rem padding), uppercase Cinzel header (0.65rem / 0.25em / #7a6d5a) with inset hairline bottom border, dl rows with dt (Cinzel 0.6rem / 0.15em / uppercase / #5a4e3a) and dd (Crimson Text 1rem / #ddd0b8). Two-column layout: content + sidebar (1fr minmax(0, 260px)).
- [x] T026 [US2] Restyle `src/pages/MonsterDetailsPage.tsx` per the reference: full-width hero on top, detail header with category-color left rule and gold gradient divider below, two-column body (content + sticky sidebar), Featured in Tales section. Scroll-to-top on id change. Update `src/styles/monster-details.css` with `.monster-details` layout styles.
- [x] T027 [US2] Verify MonsterDetail functionality: image hero renders, placeholder fallback on error, lore/weaknesses render when present, Featured in Tales links to stories, 404 state works, back navigation returns to bestiary. Run tests — update any broken selectors from class name changes. Tests MUST pass before this task is complete (Constitution Principle VIII).

**Checkpoint**: Monster detail page fully functional in grimoire style with image hero and extended content.

---

## Phase 5: User Story 3 — Browse the Tales in Grimoire Style (Priority: P2)

**Goal**: Stories listing page renders in grimoire style with green-glow hero, seam-grid tale cards, and correct navigation

**Independent Test**: Open `/stories` — see grimoire hero with green glow, tale cards in seam grid with number/title/summary/tags/chapters. Click any card navigates to reader.

### Implementation for User Story 3

- [x] T028 [US3] Restyle `src/components/StoryCard.tsx` per the reference: background #100e14, 1px #2e2530 border, 1.75rem padding, "Tale NN" number (Cinzel 0.6rem / 0.25em / uppercase / #5a4e3a), Cinzel title (1.05rem / 600 / 0.04em / #ddd0b8), 3-line clamped Crimson summary (0.95rem / #8a7d6a), hairline-inset footer (#1c1820 top border) with monster-name tags (bordered Cinzel 0.55rem / 0.1em / uppercase / #7a6d5a) + "N chapters" meta (#5a4e3a). Hover: red (#8b1a1a) border, -2px translate, red-ring shadow. Update CSS class `.story-card`.
- [x] T029 [US3] Add story seam-grid styles in `src/index.css` or `src/styles/stories.css`: `.stories-grid` with `display: grid`, `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`, `gap: 1px`, `background: #2e2530`.
- [x] T030 [US3] Restyle `src/pages/StoriesPage.tsx` per the reference: centered hero with green-tinted radial glow (`rgba(26,36,21,0.5)`), gold eyebrow "Recorded Accounts", Cinzel Decorative display title "THE TALES", medallion divider, italic lore tagline. "N tales recorded" count line (Cinzel 0.7rem / 0.15em / uppercase / #7a6d5a). Story card grid. Update `src/styles/stories.css` with `.stories-page`, `.stories-hero`, `.stories-hero__title` styles.
- [x] T031 [US3] Verify StoriesPage functionality: all 30 stories render as cards, click navigates to reader, count line is accurate. Run tests — update any broken selectors from class name changes. Tests MUST pass before this task is complete (Constitution Principle VIII).

**Checkpoint**: Stories listing page fully functional in grimoire style.

---

## Phase 6: User Story 4 — Story Reader with Image Hero, Sidebar, and Progress (Priority: P2)

**Goal**: Story reader page shows full-width image hero, grimoire-styled chapters with active highlighting, sticky TOC sidebar with progress, Monsters Encountered, Next Tale, and End of Tale

**Independent Test**: Open `/stories/:id` — full-width hero, chapters with left rules and active state, sticky sidebar with progress, related monsters, next tale card. Progress bar updates on scroll. Reduced-motion respected.

### Implementation for User Story 4

- [x] T032 [US4] Restyle `src/components/ReadingProgressBar.tsx` per the reference: fixed 3px bar at top of viewport (below 64px nav), `linear-gradient(90deg, #8b1a1a, #b8852a)`, width bound to scroll percentage, z-index 100. Update CSS class `.progress-bar`.
- [x] T033 [US4] Restyle `src/components/SectionHeader.tsx` per the reference: uppercase Cinzel section labels (0.65rem / 0.25em / #b8852a for active, #5a4e3a for inactive).
- [x] T034 [US4] Remove `src/components/DropCap.tsx` from StoryReaderPage — the Witcher Lore Website reference does not use drop caps. Replace any DropCap usage in `src/pages/StoryReaderPage.tsx` with standard Crimson Text body paragraphs.
- [x] T035 [US4] Remove `src/components/FogTransition.tsx` from StoryReaderPage — the Witcher Lore Website reference uses medallion dividers between sections, not fog transitions. Replace any FogTransition usage in `src/pages/StoryReaderPage.tsx` with the medallion-divider CSS class (T012).
- [x] T036 [US4] Restyle `src/components/StoryEnding.tsx` per the reference: render as medallion divider with "✦ End of Tale ✦" label (Cinzel 0.7rem / 0.25em / #b8852a).
- [x] T037 [US4] Remove `src/components/Particles.tsx` from StoryReaderPage — the Witcher Lore Website reference has no particle effects. Remove any Particles usage in `src/pages/StoryReaderPage.tsx`.
- [x] T038 [US4] Restyle `src/components/RelatedMonsters.tsx` per the reference: bordered rows (#100e14 bg, 1px #2e2530 border) with monster name (Cinzel 0.9rem / #ddd0b8), category label (Cinzel 0.6rem / 0.1em / uppercase / #7a6d5a), ThreatStars, red "Bestiary →" (#8b1a1a). Hover: border → gold.
- [x] T039 [US4] Restyle `src/components/NextTaleCard.tsx` per the reference: card panel (#100e14, 1px #2e2530 border, 2rem padding), "Next Tale" label (Cinzel 0.6rem / 0.3em / uppercase / #7a6d5a), Cinzel title (1.1rem / #ddd0b8), 2-line clamped summary (Crimson Text 0.95rem / #7a6d5a), red "Continue Reading →" (#8b1a1a). Hover: border → red.
- [x] T040 [US4] Add chapter-section styles in `src/styles/stories.css` or `src/index.css`: `.chapter-section` with 2px #2e2530 left rule, 2rem padding-left, 1rem margin-left. Active state: left-rule → gold (#b8852a), title brightens. Chapter paragraphs: Crimson Text 1.15rem / 1.85 / #c0b09a, 2em text-indent for continuation paragraphs. `.toc-sidebar` sticky card (top 84px), numbered rows, active row with gold left rule + gold text, progress meter.
- [x] T041 [US4] Restyle `src/pages/StoryReaderPage.tsx` per the reference: full-width story image hero at top with overlay, title block ("A Witcher's Account" eyebrow + Cinzel Decorative title + italic summary with left rule), fixed progress bar, chapter sections with active highlight, sticky TOC sidebar with click-to-scroll and progress meter, "Monsters Encountered" rows, "End of Tale" divider, "Next Tale" card, navigation links. Ensure `useReducedMotion()` gates all framer-motion animations. Update `src/styles/stories.css` with `.story-reader`, `.story-reader__hero`, `.story-content`, `.story-navigation` styles.
- [x] T042 [US4] Verify StoryReader functionality: hero image renders, placeholder fallback, chapters highlight on scroll, sidebar tracks active chapter, progress bar updates, click-to-scroll works, Monsters Encountered links to bestiary, Next Tale navigates, reduced-motion respected. Run tests — update any broken selectors from class name changes. Tests MUST pass before this task is complete (Constitution Principle VIII).

**Checkpoint**: Story reader page fully functional in grimoire style with image hero, chapters, sidebar, and progress.

---

## Phase 7: User Story 5 — Navigate and Recover in Shared Chrome (Priority: P3)

**Goal**: Global nav, back navigation, and 404/error states are fully restyled and functional across all pages

**Independent Test**: Every page shows the restyled nav; unknown IDs show grimoire 404 states with working return actions; back navigation works on detail pages.

### Implementation for User Story 5

- [x] T043 [US5] Verify GlobalNav renders correctly on all 5 routes (bestiary, bestiary/:id, stories, stories/:id, fallback). Active state gold underline updates on navigation. Medallion mark and wordmark display correctly.
- [x] T044 [US5] Verify BackNavigation on both detail pages: "← Bestiary" on monster detail, "← The Tales" on story reader. Both return to the correct listing page.
- [x] T045 [US5] Verify NotFoundMonster and NotFoundStory pages: grimoire-styled title, lore sub-line, gold outline return button. Navigation back to listing works.
- [x] T046 [US5] Verify ErrorState renders correctly when content fails to load.

**Checkpoint**: All shared chrome and error states functional across all pages.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Test updates, accessibility audit, and final validation

- [x] T047 Update test selectors in `tests/unit/components/` for any components whose CSS class names changed during restyle. Ensure all vitest unit tests pass with `npm test`.
- [x] T048 Update Playwright e2e selectors in `tests/e2e/` for restyled pages (bestiary, stories, story-reader, content-serving, reduced-motion). Ensure all e2e tests pass with `npm run test:e2e`.
- [x] T049 Run WCAG AA contrast audit on the implemented palette: verify all interactive text and controls meet 4.5:1 (normal) or 3:1 (large) contrast ratios. Fix any remaining failures.
- [x] T050 Run `npm run validate` to confirm all content entries (with optional lore/weaknesses fields) pass schema validation.
- [x] T051 Create a design-reference audit checklist mapping each Design.md component token to its rendered page section. Document any deviations from the reference.
- [x] T052 Run the full quickstart.md validation guide: V1–V9 scenarios. Confirm all pass.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — can start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS all user stories
- **Phases 3–7 (User Stories)**: All depend on Phase 2 completion. US1–US5 can proceed in parallel once Phase 2 is done.
- **Phase 8 (Polish)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1 Bestiary)**: Can start after Phase 2 — no dependencies on other stories
- **US2 (P1 Monster Detail)**: Can start after Phase 2 — may share component styles with US1 but independently testable
- **US3 (P2 Stories)**: Can start after Phase 2 — may share component styles with US1 but independently testable
- **US4 (P2 Story Reader)**: Can start after Phase 2 — most complex page, may share patterns with US2 (hero, progress)
- **US5 (P3 Shared Chrome)**: Can start after Phase 2 — nav already restyled in Phase 2; this phase is verification

### Parallel Opportunities

- Phase 1 tasks T001–T003 can run in parallel (different files: index.css, index.html)
- Phase 2 tasks T006–T013 are all marked [P] — different components, can run in parallel
- Once Phase 2 completes, all 5 user stories can start in parallel
- Within US1: T014–T017 (filter components) can run in parallel
- Within US2: T022–T025 can run in parallel
- Within US4: T032–T039 can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all filter components in parallel:
Task: "T014 [US1] Restyle SearchBar in src/components/SearchBar.tsx"
Task: "T015 [US1] Restyle CategoryFilter in src/components/CategoryFilter.tsx"
Task: "T016 [US1] Restyle ThreatFilter in src/components/ThreatFilter.tsx"
Task: "T017 [US1] Restyle FilterBar in src/components/FilterBar.tsx"

# Then card + grid (sequential — card depends on filter styling):
Task: "T018 [US1] Restyle MonsterCard in src/components/MonsterCard.tsx"
Task: "T019 [US1] Add seam-grid styles in src/index.css"
Task: "T020 [US1] Restyle BestiaryPage in src/pages/BestiaryPage.tsx"
Task: "T021 [US1] Verify filter behavior and run tests"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (palette, fonts, schema)
2. Complete Phase 2: Foundational (nav, shared components)
3. Complete Phase 3: User Story 1 (Bestiary page)
4. **STOP and VALIDATE**: Test Bestiary page independently — filters, grid, cards, session persistence
5. Deploy/demo if ready

### Incremental Delivery

1. Phase 1 + Phase 2 → Foundation ready
2. Phase 3 (US1: Bestiary) → Test independently → Deploy/Demo (MVP!)
3. Phase 4 (US2: Monster Detail) → Test independently → Deploy/Demo
4. Phase 5 (US3: Stories) → Test independently → Deploy/Demo
5. Phase 6 (US4: Story Reader) → Test independently → Deploy/Demo
6. Phase 7 (US5: Shared Chrome) → Verify across all pages
7. Phase 8 (Polish) → Final validation and test updates

### Parallel Team Strategy

With multiple developers:
1. Team completes Phase 1 + Phase 2 together
2. Once Phase 2 is done:
   - Developer A: Phase 3 (US1: Bestiary)
   - Developer B: Phase 4 (US2: Monster Detail)
   - Developer C: Phase 5 + 6 (US3 + US4: Stories)
3. Phase 7 + 8: Team reconvenes for polish and validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Existing tests must remain green throughout — fix selectors as part of each component restyle
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All content entries must have `lore` and `weaknesses` fields before US2 can render Scholar's Notes and Weaknesses sections (T005 must complete before T023)
