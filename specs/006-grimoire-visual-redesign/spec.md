# Feature Specification: Grimoire Visual Redesign

**Feature Branch**: `006-grimoire-visual-redesign`

**Created**: 2026-08-21

**Status**: Draft

**Input**: User description: "I want to redesign the website without changing much of the functionality. refer Design.md and layouts/animation/typography and styling mentioned in witcher lore website folder from figma make thouroughly to define scope on how we can update current code to follow same look and feel. figma make doesnt have images of monsters or for stories but lets have them on details page as hero on top"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse the Bestiary in Grimoire Style (Priority: P1)

A visitor opens the Bestiary (homepage) and sees the grimoire presentation: a centered hero with a gold eyebrow label, an ornate serif display title, a medallion divider, and an italic lore tagline over a radial glow. Below, the search field and category/threat filter pills sit in a bordered dark panel. Monster entries appear in a hairline-seam grid of cards, each with a category-color accent bar, Cinzel title, gold threat stars, category badge, clamped description, tale count, and "Read Entry" affordance.

**Why this priority**: The Bestiary is the entry point and first impression; the full design language (typography, palette, seam grids, pills, stars) is expressed here, and it is independently valuable.

**Independent Test**: Opening `/bestiary` renders the grimoire hero, filter panel, and card grid without any prior page interaction; search, category pills, threat pills, results count, reset, and session persistence all continue to work.

**Acceptance Scenarios**:

1. **Given** the Bestiary page, **When** it loads, **Then** it shows a centered hero with eyebrow label, Cinzel Decorative display title, medallion divider, and italic lore tagline over a radial glow, and the page background is near-black with parchment-cream text.
2. **Given** the Bestiary page, **When** the user types in search, selects a category pill, and selects a threat-level pill, **Then** the card grid filters by all three and the "N entries found" count and "Reset filters" action update accordingly, matching current behavior.
3. **Given** an active filter state, **When** the user reloads the page within the same session, **Then** the filters are restored from session storage.
4. **Given** no monsters matching the filters, **When** the grid would be empty, **Then** the grimoire empty state (ornate title, italic lore line, gold outline reset button) appears.

---

### User Story 2 - Read a Monster Entry with an Image Hero on Top (Priority: P1)

A visitor opens a monster detail page and sees the monster's image as a full-width hero at the top of the page, overlaid with the entry header: category badge, Cinzel Decorative name, threat stars, and threat-level label. Below the hero, a category-color left rule introduces the Field Description, Scholar's Notes, and Known Weaknesses, with an Entry Details sidebar, followed by the "Featured in Tales" list.

**Why this priority**: The user explicitly requested images as heroes on detail pages; this story delivers the core of the redesign for the bestiary's secondary pages and keeps cross-linking to stories.

**Independent Test**: Navigating from any bestiary card to `/bestiary/:id` shows the image hero on top followed by the full grimoire-styled entry; the 404 state still renders for unknown IDs.

**Acceptance Scenarios**:

1. **Given** a valid monster ID, **When** the detail page loads, **Then** the monster's image renders as a full-width hero at the top, with the entry header (badge, name, threat stars, threat label) overlaid or directly beneath.
2. **Given** a monster whose image is missing or fails to load, **When** the hero renders, **Then** the designated placeholder image appears instead and the page remains fully usable.
3. **Given** the entry content, **When** scrolling, **Then** Field Description (body serif), Scholar's Notes (italic lore serif with left rule), Known Weaknesses (bordered Cinzel tags), and the Entry Details sidebar are all styled per the design reference.
4. **Given** stories referencing the monster, **When** the "Featured in Tales" section renders, **Then** each tale row links to its story reader.

---

### User Story 3 - Browse the Tales in Grimoire Style (Priority: P2)

A visitor opens the Stories page and sees a matching grimoire hero (green-tinted glow), a seam grid of tale cards, each with a "Tale NN" number, Cinzel title, clamped summary, monster tags, and chapter count.

**Why this priority**: Secondary listing page; shares the design language with the bestiary but is independently shippable.

**Independent Test**: Opening `/stories` renders the grimoire hero and tale card grid; clicking any card navigates to its reader.

**Acceptance Scenarios**:

1. **Given** the Stories page, **When** it loads, **Then** it shows the grimoire hero with green-tinted glow and a seam-grid of tale cards with number, title, summary, monster tags, and chapter count.
2. **Given** a tale card, **When** clicked, **Then** the user lands on the corresponding story reader page.

---

### User Story 4 - Read a Tale with Image Hero, Chapter Sidebar, and Progress (Priority: P2)

A visitor opens a story reader page and sees the story's image as a full-width hero at the top, the tale title and italic summary beneath, a reading-progress strip, chapters presented with left rules and active-chapter highlighting, a sticky chapters sidebar with progress meter, "Monsters Encountered" rows, and a "Next Tale" card ending the page.

**Why this priority**: The most complex page; the image hero requirement applies here too, and the reading experience (progress, chapter tracking) must survive the restyle.

**Independent Test**: Opening `/stories/:id` renders image hero, chapters with active highlight, sticky sidebar navigation, and progress; all existing reader behaviors (scroll progress, chapter scroll-into-view, next-tale suggestion, related monsters) continue to work.

**Acceptance Scenarios**:

1. **Given** a valid story ID, **When** the reader loads, **Then** the story's image renders as a full-width hero at the top, followed by the title, italic summary, and chapters.
2. **Given** a story whose image is missing, **When** the hero renders, **Then** the designated placeholder appears and reading is unaffected.
3. **Given** the reader, **When** the user scrolls, **Then** the fixed top progress bar and the sidebar progress meter update, and the active chapter (title, border rule, sidebar row) highlights.
4. **Given** the sidebar chapter rows, **When** the user clicks one, **Then** the reader smooth-scrolls to that chapter.
5. **Given** the end of the tale, **When** the "End of Tale" divider and "Next Tale" card render, **Then** both follow the grimoire styling and the card navigates to another tale.
6. **Given** reduced-motion preference, **When** the reader renders, **Then** animations are reduced or removed.

---

### User Story 5 - Navigate and Recover in the Shared Chrome (Priority: P3)

A visitor uses the fixed top navigation with the wolf-medallion mark and wordmark, uppercase tracked links with gold underline states, back-navigation links on detail pages, and grimoire-styled 404/error states throughout.

**Why this priority**: Global chrome and fallback states complete the redesign's coherence; lower priority because pages remain usable without them.

**Independent Test**: Every page shows the shared nav; navigating to an unknown monster or story ID shows a grimoire-styled not-found state with a working return action.

**Acceptance Scenarios**:

1. **Given** any page, **When** it loads, **Then** the fixed top nav shows the medallion mark, wordmark, and Bestiary/Stories links with active-state gold underline.
2. **Given** an unknown monster or story ID, **When** the page renders, **Then** a grimoire-styled not-found state with an outline-button return action appears.
3. **Given** a detail page, **When** the back navigation is used, **Then** the user returns to the corresponding listing.

---

### Edge Cases

- Monster or story image missing/failing to load: designated placeholder substitutes; page remains functional; entries still show an image slot (never a broken layout).
- Reduced-motion preference enabled: entrance/scroll animations, nav underlines, and card hover effects degrade gracefully to static or near-static presentation.
- Session storage unreadable or corrupt: filter state falls back to defaults without errors.
- Very long stories: sidebar TOC and progress meters still track correctly; chapter list scrolls with the page.
- Zero filter results: empty state with reset action renders instead of a blank grid.
- Unknown IDs on either detail page: not-found states with return actions, matching current behavior.
- Stories with no monster references or no related stories: related sections hide rather than render empty, preserving current behavior.

## Clarifications

### Session 2026-08-21

- Q: Monster detail page content scope — the repo's monster schema has only id, name, category, threatLevel, description, image. Design.md references Scholar's Notes and Known Weaknesses fields that don't exist. How should the redesigned page handle this? → A: Extend the schema. Add optional `lore` (string) and `weaknesses` (string array) fields to the Monster schema. Populate them for existing entries. Render the full grimoire layout (Field Description, Scholar's Notes, Weaknesses tags, Entry Details sidebar). Optional fields degrade gracefully for entries without them.
- Q: Monster detail image layout — Design.md specifies a side-by-side 3:4 portrait (max-width 260px), but user requested "hero on top". Which layout? → A: Full-width hero image at top. The image spans the full page width at the top of the monster detail page, with the entry header and content below. This overrides Design.md's side-portrait layout for this page.

## Requirements *(mandatory)*

### Functional Requirements

**Visual Identity (global)**

- **FR-001**: The site MUST adopt the grimoire palette from the design reference: near-black canvas (`#08070a`), card surfaces (`#100e14`, `#1c1820`), parchment-cream foreground (`#ddd0b8`), medallion gold (`#b8852a`), and blood red (`#8b1a1a`) as the two accent voltages, with the documented text-dim ladder for hierarchy.
- **FR-002**: The site MUST use the four-family serif system: Cinzel Decorative (display), Cinzel (headings/labels), Crimson Text (body), IM Fell English (lore/quotes) — no sans-serif anywhere, per the design reference.
- **FR-003**: Every label (section labels, badges, pills, nav links, buttons, meta) MUST render in Cinzel, uppercase, with the wide letter-spacing ladder (0.1–0.35em) defined in the design reference.
- **FR-004**: Depth MUST come from the brightness ladder, 1px hairlines, seam grids, thin category-color accent bars, the hero glow gradients, and progress gradients — not from drop-shadow tiers (single hover shadow allowed per reference).
- **FR-005**: Sharp geometry MUST be preserved: 0px corners dominant, 2px reserved for chips/inputs/badges, per the design reference.
- **FR-006**: The medallion divider (✦ flanked by gradient hairlines) MUST be used at the documented section boundaries (heroes, Featured in Tales, End of Tale).
- **FR-007**: Category heraldic colors (one muted hue per monster category) MUST be used only as accent bars and left rules, never as fills or text.

**Global chrome**

- **FR-008**: The top navigation MUST become a fixed 64px bar with the wolf-medallion SVG mark, "THE WITCHER" wordmark (Cinzel Decorative, tracked), and Bestiary/Stories links in Cinzel uppercase with the gold underline hover/active state, separated by a ✦ glyph, with blur and gradient background per the reference.
- **FR-009**: Back-navigation links on detail pages MUST render as uppercase tracked Cinzel text links ("← Bestiary", "← The Tales").
- **FR-010**: Empty, error, and not-found states MUST follow the reference: ornate serif title, italic lore sub-line, and a gold outline button with the return action.

**Bestiary page**

- **FR-011**: The page hero MUST follow the reference layout: centered, radial glow (red tint), gold eyebrow label ("A Witcher's Field Guide"), Cinzel Decorative display title, medallion divider, and italic lore tagline.
- **FR-012**: The search field MUST restyle to the reference input (muted fill, 1px border, Cinzel uppercase text, italic placeholder, gold focus border).
- **FR-013**: Category and threat filters MUST render as bordered Cinzel filter pills with the reference states (inactive, gold hover, red active fill with cream text); threat pills MUST embed gold threat stars.
- **FR-014**: The results row MUST show "N entries found" (uppercase Cinzel) and an underlined gold "Reset filters" action.
- **FR-015**: Monster cards MUST restyle to the reference: seam-grid placement, 3px category-color gradient top bar, Cinzel title + gold threat stars, category badge, clamped Crimson Text description, tale count, gold "Read Entry →" footer, and the gold-border hover treatment.
- **FR-016**: The empty state MUST show the reference presentation (ornate title, italic line, outline reset button).
- **FR-017**: All existing filter behavior MUST be preserved: combined search/category/threat filtering, debounced search, session-storage persistence, and reset/clear actions.

**Monster detail page**

- **FR-018**: The monster's image MUST render as a full-width hero at the top of the page, with the entry header (category badge, Cinzel Decorative name, threat stars, "Threat Level N" label) presented per the reference; the designated placeholder MUST substitute on missing/failed assets.
- **FR-019**: The header MUST carry the 4px category-color left rule and the gold gradient divider per the reference.
- **FR-020**: Field Description MUST use gold uppercase section labels and the reference body serif at the documented size/leading.
- **FR-021**: Scholar's Notes MUST render in italic IM Fell English with the 2px left rule and muted parchment color.
- **FR-022**: Known Weaknesses MUST render as bordered Cinzel uppercase tags (sharp corners).
- **FR-023**: The Entry Details sidebar MUST render as a bordered card panel with uppercase Cinzel header, inset hairline, and label/value pairs (classification, threat stars, recorded tales).
- **FR-024**: "Featured in Tales" MUST use the medallion divider label and bordered tale rows with title, clamped summary, and red "Read →", linking to story readers.

**Stories page**

- **FR-025**: The page hero MUST follow the reference with the green-tinted glow variant and the tales eyebrow ("Recorded Accounts").
- **FR-026**: Tale cards MUST restyle to the reference: "Tale NN" number, Cinzel title, clamped Crimson summary, bordered monster-name tags, "N chapters" meta, and the red-border hover treatment, in a seam grid.
- **FR-027**: The "N tales recorded" count line MUST render in uppercase Cinzel per the reference.

**Story reader page**

- **FR-028**: The story's image MUST render as a full-width hero at the top of the page; the designated placeholder MUST substitute on missing/failed assets.
- **FR-029**: The title block MUST follow the reference: "A Witcher's Account" eyebrow, Cinzel Decorative title, and italic IM Fell English summary with left rule.
- **FR-030**: The fixed top progress bar MUST render as the 3px red-to-gold gradient bar bound to scroll progress, and the in-page progress strip MUST show the "N% read" label.
- **FR-031**: Chapters MUST render with the 2px left rule, "Chapter N" labels, and active-chapter highlighting (gold rule + brightened title) that updates on scroll.
- **FR-032**: Chapter paragraphs MUST use the reference body serif with the documented leading and 2em indentation for continuation paragraphs.
- **FR-033**: The sticky chapters sidebar MUST render per the reference: numbered rows with active gold state and left rule, click-to-scroll behavior, and the bordered progress meter with percentage.
- **FR-034**: "Monsters Encountered" rows and the "Next Tale" card MUST follow the reference (bordered rows, red affordances, hover border swaps) and keep their existing navigation behavior.
- **FR-035**: The "End of Tale" medallion divider MUST close the reading section.

**Motion & interaction**

- **FR-036**: Entrance, scroll, hover, and transition animations MUST be tuned to the reference's restrained feel and MUST respect reduced-motion preferences (animations reduced or disabled).
- **FR-037**: Card hover treatments (border color swap, subtle lift, ring shadow) MUST follow the reference's two hover voltages: gold for monster cards, red for story cards.

**Accessibility & quality**

- **FR-038**: All interactive text and controls MUST meet WCAG AA contrast on the new palette; any reference color that fails contrast MUST be promoted to a compliant variant while preserving the visual hierarchy (documented per token).
- **FR-039**: All existing functionality, routes, and behaviors MUST remain unchanged except for visual presentation: filtering, session persistence, navigation, progress, next-tale, related content, placeholder fallback, and reduced-motion support.
- **FR-040**: Existing automated tests MUST continue to pass; visual changes MUST be accompanied by updated/added tests where selectors or expected styling change.

### Key Entities *(include if feature involves data)*

- **Monster**: Bestiary entry (id, name, category, threatLevel, description, image, lore, weaknesses). The `image` field feeds the detail-page hero; `category` selects the heraldic accent color and filter pills; `lore` feeds Scholar's Notes; `weaknesses` feeds the Known Weaknesses tags. The `lore` and `weaknesses` fields are optional extensions to the existing schema — entries without them degrade gracefully (no Scholar's Notes or Weaknesses section rendered).
- **Story**: Tale entry (id, title, summary, content/sections, monsterIds, image). The `image` field feeds the reader hero; `monsterIds` drives "Monsters Encountered" and related sections.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All four pages (Bestiary, Monster Detail, Stories, Story Reader) and the global nav render in the grimoire palette, type system, and layout per the design reference — verified page-by-page against a visual checklist.
- **SC-002**: Every monster entry shows its image as a hero on the monster detail page, and every story shows its image as a hero on the story reader page; entries lacking assets show the designated placeholder (100% of entries have a rendered hero slot).
- **SC-003**: 100% of existing functionality scenarios (filtering, session persistence, navigation, progress tracking, next-tale, related content, empty/error/not-found states, reduced-motion) pass after the redesign — existing automated tests remain green.
- **SC-004**: 100% of interactive text and controls meet WCAG AA contrast on the new palette.
- **SC-005**: _Post-launch metric:_ No functional regression tickets are filed against search/filter/navigation behavior in the first release after the redesign (baseline: zero reported regressions in acceptance testing). This metric is measured after deployment, not during implementation.
- **SC-006**: The design-reference audit (a checklist mapping each documented component token to its rendered page section) is 100% complete, with deviations documented rather than silent.

## Assumptions

- The redesign is visual-only: all routing, data, validation, filtering, persistence, and test infrastructure are reused unchanged, except for the optional Monster schema extension (lore/weaknesses fields) described in the Clarifications section.
- `Design.md` and the `Witcher Lore Website/` folder are the authoritative design sources, per the project constitution (v1.1.0, Principle II).
- The Monster schema will be extended with optional `lore` (string) and `weaknesses` (string array) fields. Existing entries will be populated where possible; entries without these fields will render without Scholar's Notes or Known Weaknesses sections.
- The Figma reference contains no monster/story imagery; the repo's existing image assets (10 monster images, 7 story images, and the `placeholders/missing.png` fallback) are used for the detail-page heroes, and the designated placeholder covers the remaining stories.
- Google Fonts hosting for Cinzel, Cinzel Decorative, Crimson Text, and IM Fell English is acceptable (consistent with the reference implementation); self-hosting is a known gap, not a blocker.
- The existing animation/motion infrastructure remains in use; only the motion language (entrance, scroll, hover) and reduced-motion handling are adjusted to the reference's restraint.
- Breakpoint behavior follows the reference's fluid approach (clamp-based type, auto-fill grids, single-column collapse for detail layouts); no new fixed breakpoints are introduced.
- Category heraldic colors are treated as design data mapped from the existing category list, including categories present in the repo's content but absent from the Figma capture (muted-hue defaults in the same style).