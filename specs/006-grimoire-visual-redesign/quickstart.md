# Quickstart Validation: Grimoire Visual Redesign

**Feature**: 006-grimoire-visual-redesign
**Date**: 2026-08-21

## Prerequisites

- Node.js 18+ installed
- Project dependencies installed (`npm install`)

## Validation Scenarios

### V1. Bestiary Page — Visual Identity

1. Run `npm run dev` and open `/bestiary`
2. **Verify**: Page background is near-black (#08070a), text is parchment-cream (#ddd0b8)
3. **Verify**: Hero shows gold eyebrow "A Witcher's Field Guide", ornate display title "BESTIARY", medallion divider (✦ with gradient lines), and italic lore tagline
4. **Verify**: Filter panel has dark card background, search input with italic placeholder, category pills and threat pills
5. **Verify**: Monster cards display in a seam grid (1px hairline gaps), each with category-color top bar, gold threat stars, category badge, clamped description, tale count, and "Read Entry →"
6. **Verify**: Active filter pill has red fill with cream text; hover shows gold border

### V2. Bestiary Page — Functionality Preserved

1. Type in search → cards filter by name (debounced)
2. Click a category pill → only matching monsters shown
3. Click a threat pill → only matching threat level shown
4. Combine search + category + threat → all three filter together
5. "N entries found" count updates correctly
6. Click "Reset filters" → all filters clear
7. Reload page → filters restored from sessionStorage
8. Zero results → empty state with ornate title and reset button

### V3. Monster Detail Page — Image Hero + Content

1. Click any monster card → navigates to `/bestiary/:id`
2. **Verify**: Full-width hero image at top of page
3. **Verify**: Entry header below hero with category-color left rule, badge, name, threat stars
4. **Verify**: Field Description section with gold uppercase label and body serif text
5. If monster has `lore`: **Verify** Scholar's Notes in italic with left rule
6. If monster has `weaknesses`: **Verify** weakness tags as bordered Cinzel chips
7. **Verify**: Entry Details sidebar with classification, threat, tales count
8. **Verify**: "Featured in Tales" section with medallion divider and tale rows linking to stories
9. Image fails to load → placeholder appears, page remains functional

### V4. Stories Page — Visual Identity

1. Navigate to `/stories`
2. **Verify**: Hero with green-tinted glow, eyebrow "Recorded Accounts", display title "THE TALES"
3. **Verify**: Tale cards in seam grid with "Tale NN" number, title, summary, monster tags, chapter count
4. **Verify**: Red-border hover treatment on tale cards

### V5. Story Reader Page — Full Experience

1. Click any tale card → navigates to `/stories/:id`
2. **Verify**: Full-width story image hero at top
3. **Verify**: Title block with eyebrow "A Witcher's Account", display title, italic summary with left rule
4. **Verify**: Fixed 3px progress bar at top of viewport updates on scroll
5. **Verify**: Chapters with left rule, "Chapter N" labels, active chapter highlights (gold rule + bright title)
6. **Verify**: Sticky sidebar with numbered chapter rows, click-to-scroll works
7. **Verify**: Sidebar progress meter updates with scroll
8. **Verify**: "Monsters Encountered" rows link to bestiary
9. **Verify**: "End of Tale" medallion divider, "Next Tale" card with red affordance
10. Image fails to load → placeholder appears, reading unaffected

### V6. Global Chrome

1. **Verify**: Fixed top nav on every page with medallion mark, wordmark, Bestiary/Stories links
2. **Verify**: Active nav link has gold underline; inactive is muted
3. Navigate to `/bestiary/nonexistent` → grimoire-styled 404 with outline button
4. Navigate to `/stories/nonexistent` → grimoire-styled 404 with outline button
5. Back navigation on detail pages returns to listing

### V7. Reduced Motion

1. Enable `prefers-reduced-motion: reduce` in browser dev tools
2. **Verify**: Entrance animations, card hover lifts, and scroll-triggered fades are reduced or removed
3. **Verify**: Progress bar still updates (functional, not decorative)

### V8. Existing Tests Pass

1. Run `npm test` → all vitest unit/integration tests pass
2. Run `npm run test:e2e` → all Playwright e2e tests pass
3. If any tests fail due to changed selectors, update selectors to match new grimoire classes

### V9. Schema Extension

1. Check that monsters with `lore` and `weaknesses` fields pass validation: `npm run validate`
2. Check that monsters without these fields still pass validation
3. Check that `lore` renders as Scholar's Notes and `weaknesses` renders as tags on the detail page
