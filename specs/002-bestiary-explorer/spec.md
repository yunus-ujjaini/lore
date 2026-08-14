# Feature Specification: Bestiary Explorer

**Feature Branch**: `002-bestiary-explorer`

**Created**: 2026-08-14

**Status**: Clarified

**Input**: User description: "@witcher_bestiary_functional_design.md" — Feature 2, Bestiary Explorer, the first user-facing experience, consuming Feature 1's monster and category data.

## Clarifications

### Session 2026-08-14

- Q: What should the Bestiary UI be built with? → A: This is the project's first user-facing feature and establishes the UI approach for future features; the Feature 1 no-framework decision applies to the content foundation, not to UI features. (Tech stack: see plan.md)
- Q: Does the threat filter mean exact level or minimum level? → A: Exact level. Selecting a level shows only monsters with exactly that level (per functional design §6.6, defined here as required).
- Q: Should search and filters be reflected in the page URL? → A: No. Filters are client state only, preserved across navigation within the session (FR-020); reloading resets to the default view, and filtered states are not shareable via URL.
- Q: Should SC-012 include a specific frame rate target? → A: Yes, add 60fps target to SC-012 to make animation quality measurable.
- Q: How much card rotation is acceptable? → A: 1-3 degrees max for subtle organic feel.
- Q: How should atmospheric effects (particles, fog) work? → A: Triggered by hover/scroll interaction, not always present.
- Q: What should the mobile hero look like? → A: Smaller title with atmospheric background, preserving visual identity.
- Q: What's the ideal layout for search and filters below the hero? → A: Search above filters, following the natural discovery-then-refine flow.
- Q: What kind of monster-related shapes should the cards use? → A: Simple rectangular cards with decorative borders and atmospheric styling. Visual impact comes from dark palette, ornamental details, and premium presentation rather than unusual card shapes.
- Q: What type of hover effect should cards have? → A: Scale + slight lift (1.02-1.05 scale with shadow).
- Q: Should search be immediate or debounced? → A: Debounced (150-300ms) for responsive feel without performance issues.
- Q: Should there be a dedicated Reset button in the filter bar? → A: No. Remove the Reset button entirely. Users can clear filters by selecting "All" in each filter category. The empty state retains a reset button for when no monsters match.

## User Scenarios & Testing

### User Story 1 - Browse the Bestiary (Priority: P1)

A visitor can open the Bestiary page and see all available monsters presented as a grid of cards. Each card shows the monster's image, name, category, threat level, and a short description. The page works with the current sample dataset and automatically includes any monsters added later.

**Why this priority**: Browsing is the core experience; every other interaction (search, filters, navigation) builds on the card grid.

**Independent Test**: Open the Bestiary and confirm every monster in the dataset appears as a card with all five required elements.

**Acceptance Scenarios**:

1. **Given** the Bestiary page, **When** it loads, **Then** a card is shown for every monster in the dataset.
2. **Given** a monster card, **When** it is inspected, **Then** it displays the image, name, category, and threat level (description is on the details page only).
3. **Given** the dataset, **When** a new monster is added as data, **Then** it appears as a card without any application code changes.
4. **Given** the Bestiary page, **When** it loads, **Then** the page has an editorial composition with a cinematic hero section, not a conventional dashboard grid.
5. **Given** a monster card, **When** it is inspected, **Then** it uses a simple rectangular shape with decorative borders and atmospheric styling while remaining readable.
6. **Given** the Bestiary page, **When** it loads, **Then** animations play (page entrance, staggered card appearance) and respect reduced-motion preferences.

---

### User Story 2 - Search Monsters by Name (Priority: P1)

A visitor can type into a search field to filter monsters by name. Matching is case-insensitive and supports partial matches; results update immediately without a page reload. An empty search shows all monsters.

**Why this priority**: Search is a primary discovery path for the Reference User persona and one of the feature's acceptance criteria.

**Independent Test**: Type "leshen" — Leshen is shown; type "griff" — Griffin is shown; unrelated monsters are hidden.

**Acceptance Scenarios**:

1. **Given** the search field, **When** the visitor types "leshen", **Then** Leshen is shown and unrelated monsters are hidden.
2. **Given** the search field, **When** the visitor types "griff", **Then** Griffin is shown (partial match).
3. **Given** a search query, **When** the visitor changes letter casing, **Then** results are unchanged (case-insensitive).
4. **Given** the search field, **When** it is emptied, **Then** all monsters are shown again.

---

### User Story 3 - Filter by Category (Priority: P1)

A visitor can filter the grid by monster category, choosing from the central category list created in Feature 1 (Beasts, Cursed Ones, Draconids, Elementa, Hybrids, Insectoids, Necrophages, Relicts, Specters, Vampires). Selecting a category shows only matching monsters.

**Why this priority**: Category navigation is a core organizational axis of the bestiary and a functional-design requirement.

**Independent Test**: Select "Relicts" — only relict monsters are displayed; select "All" — all monsters return.

**Acceptance Scenarios**:

1. **Given** the category filter, **When** the visitor selects a category, **Then** only monsters in that category are displayed.
2. **Given** the category filter, **When** the visitor selects the clear/all option, **Then** all monsters are displayed again.
3. **Given** the category list, **When** a category is added to the central data, **Then** it appears as a filter option without code changes.

---

### User Story 4 - Filter by Threat Level (Priority: P1)

A visitor can filter the grid by threat level (1–5). The level may be shown as numbers, labels (Low, Moderate, Dangerous, Very Dangerous, Extreme), or another visual treatment, while the stored data stays numeric.

**Why this priority**: Threat filtering is a functional-design requirement and a useful triage tool for the Witcher Fan persona.

**Acceptance Scenarios**:

1. **Given** the threat filter, **When** the visitor selects level 4, **Then** only monsters with threat level exactly 4 are displayed (levels 1–3 and 5 hidden).
2. **Given** the threat filter, **When** the visitor clears it, **Then** all monsters are displayed again.

---

### User Story 5 - Combine Search and Filters (Priority: P1)

Search, category, and threat filters work together: the displayed results satisfy all active filters. Clearing one filter preserves the others. When nothing matches, a clear empty state is shown with an obvious way to reset.

**Why this priority**: Combined filtering is where the feature's value compounds, and the empty state prevents dead ends.

**Independent Test**: Apply search + category + threat filters and confirm every visible card satisfies all three; clear one and confirm the others remain.

**Acceptance Scenarios**:

1. **Given** active search and filters, **When** the visitor changes the category, **Then** the search and threat filters remain applied.
2. **Given** the visitor navigates from the Bestiary to a monster and back, **When** the Bestiary is shown again, **Then** the previously active search and filters are preserved unless the visitor clears them (per functional design §6.4).
3. **Given** no monsters matching the active search/filters, **When** the page is rendered, **Then** a clear "no monsters found" message and a visible reset control are shown.
4. **Given** the reset control, **When** the visitor activates it, **Then** all monsters are displayed and all filters/search are cleared.

---

### User Story 6 - Navigate to a Monster (Priority: P1)

Clicking a monster card navigates to a route based on the monster's unique ID (e.g., `/bestiary/leshen`). Because the full details page belongs to a later feature, a placeholder page is sufficient as long as the route is future-ready.

**Why this priority**: Navigation closes the browse loop and sets up the next feature's details page.

**Acceptance Scenarios**:

1. **Given** a monster card, **When** the visitor clicks it, **Then** the visitor is taken to the route for that monster's ID.
2. **Given** the route `/bestiary/leshen`, **When** it is opened directly, **Then** a placeholder page for Leshen is shown (no broken page).

---

### User Story 7 - Use the Bestiary on Any Screen (Priority: P2)

The Bestiary works on desktop, tablet, and mobile. The grid adapts to the available width, and search/filters remain usable on small screens without horizontal scrolling.

**Why this priority**: A responsive foundation is required before the site's visual language is reused elsewhere.

**Independent Test**: Resize the viewport across desktop/tablet/mobile widths and confirm the grid adapts and no horizontal scrolling is needed for normal use.

**Acceptance Scenarios**:

1. **Given** the Bestiary, **When** it is viewed on mobile and tablet widths, **Then** the grid adapts and remains usable without horizontal scrolling.
2. **Given** the Bestiary, **When** it is viewed on desktop, **Then** the grid uses the available width effectively.

---

### User Story 8 - A Bestiary Accessible to Everyone (Priority: P2)

The Bestiary supports keyboard navigation, visible focus states, meaningful control labels, alternative text for meaningful images, sufficient text contrast, and reduced-motion behavior.

**Why this priority**: Accessibility is a project constitution requirement for all user-facing functionality.

**Independent Test**: Operate search, filters, and cards with keyboard only; verify visible focus and reduced-motion preferences are respected.

**Acceptance Scenarios**:

1. **Given** the Bestiary, **When** it is operated with a keyboard, **Then** search, filters, and cards are all reachable and usable, with visible focus states.
2. **Given** meaningful monster images, **When** they are inspected, **Then** they have alternative text; controls have meaningful labels.
3. **Given** the user prefers reduced motion, **When** the page is rendered, **Then** animations are reduced or removed.

---

### Edge Cases

- What happens when no monsters match search/filters? (A clear empty state with a visible reset control is shown.)
- What happens when one filter is cleared while others are active? (Only the cleared filter is reset; the others remain applied.)
- What happens when a monster has a placeholder or solid-color image? (The card reserves a consistent image area and the layout does not depend on image dimensions.)
- What happens when the dataset is empty or fails to load? (A clear error message is shown rather than a broken page.)
- What happens when search input has leading/trailing whitespace or unusual casing? (Whitespace is ignored; matching is case-insensitive.)
- What happens when a category has no monsters in the dataset? (The category still appears as a filter option; selecting it yields the empty state.)
- What happens when the visitor reloads on a monster route? (The placeholder details page renders; it does not depend on prior navigation state.)
- What happens when the visitor reloads the Bestiary page? (Search and filters reset to the default view — filter state is session-only, not URL-bound.)
- What happens when the visitor opens a route for a monster that does not exist? (A clear not-found state is shown on the placeholder page, not a broken page.)
- What happens when a monster name or description is longer than the card space? (Text truncates gracefully; the full text remains available on the details page.)

## Requirements

### Functional Requirements

- **FR-001**: The application MUST provide a Bestiary page presenting all monsters from the Feature 1 content data as a grid of cards.
- **FR-002**: Every monster card MUST display the monster's image, name, category, and threat level. The description is only shown on the Monster Details page.
- **FR-003**: Monster cards MUST be reusable and data-driven: adding a monster to the dataset MUST NOT require new components, pages, filtering logic, or hardcoded UI.
- **FR-004**: The Bestiary MUST provide a search field that matches monster names case-insensitively and supports partial matches.
- **FR-005**: Search results MUST update as the visitor types (debounced 150-300ms), without a page reload; an empty search MUST display all monsters.
- **FR-006**: The Bestiary MUST provide a category filter whose options come from the central category data created in Feature 1; categories added later MUST appear without code changes, and the active category selection MUST be visually obvious (per functional design §6.5). Filters MUST be presented as pill/tag buttons, not conventional form controls.
- **FR-007**: The Bestiary MUST provide a threat-level filter over the stored numeric values 1–5 with exact-level semantics (selecting a level shows only monsters with exactly that level); display treatment (numbers, labels, or other) is a presentation choice. Filters MUST be presented as pill/tag buttons, not conventional form controls.
- **FR-008**: Search, category, and threat filters MUST combine so displayed results satisfy all active filters, and clearing one filter MUST preserve the others.
- **FR-009**: When no monsters match the active search and filters, the Bestiary MUST show a clear empty state with an obvious way to reset (via the empty state's reset button or by selecting "All" in filters).
- **FR-011**: Selecting a monster card MUST navigate to a route based on the monster's unique ID (e.g., `/bestiary/leshen`); a placeholder details page is sufficient until the details feature exists.
- **FR-012**: The Bestiary MUST work on desktop, tablet, and mobile widths; the grid MUST adapt and normal use MUST NOT require horizontal scrolling.
- **FR-013**: Monster cards MUST reserve a consistent image area and MUST NOT depend on image dimensions; placeholder or solid-color images MUST NOT break the layout.
- **FR-014**: If monster data cannot be loaded or processed, the user MUST receive a clear error message rather than a broken page; a simple loading state is acceptable while content is prepared.
- **FR-015**: The Bestiary MUST be keyboard-accessible (search, filters, cards), with visible focus states, meaningful labels, alternative text for meaningful images, sufficient text contrast, and reduced-motion support.
- **FR-016**: Card animations MUST be subtle and MUST NOT interfere with usability; animations MUST respect reduced-motion preferences.
- **FR-017**: The UI MUST consume monster and category data from the Feature 1 content layer and MUST NOT duplicate monster information inside UI components.
- **FR-018**: The page MUST establish the project's visual direction: dark, atmospheric, medieval/fantasy-inspired, clean, and premium. The visual experience is a major requirement of this feature, not a later enhancement.
- **FR-021**: Monster cards MUST feel collectible and illustrated, using decorative borders, ornamental frames, and atmospheric styling while remaining readable and usable.
- **FR-022**: Animation MUST be a fundamental part of the experience, including page entrance, staggered card appearance, hover effects, and smooth filter transitions, while respecting reduced-motion preferences.
- **FR-023**: The page composition MUST explore an editorial layout with cinematic introduction, layered imagery, and decorative transitions, not a conventional dashboard grid.
- **FR-019**: Automated browser tests MUST cover the main user journeys: browse, search, category filtering, threat filtering, combined filtering, reset, and navigation.
- **FR-020**: Active search and filter selections MUST be preserved when the visitor navigates away from the Bestiary and returns, until the visitor clears them (per functional design §6.4). Filter state is session-only: a page reload resets to the default view (decision: 2026-08-14).

### Key Entities

- **Monster**: Consumed from Feature 1 content (id, name, category, threat level, description, image); read-only for this feature.
- **Category**: Consumed from the Feature 1 central category list; drives the category filter options.
- **Threat Level**: Numeric 1–5 stored in monster data; displayed per the presentation choice.
- **Monster Route**: A URL path derived from a monster's unique ID, pointing at a placeholder details page for now.

## Success Criteria

### Measurable Outcomes

- **SC-001**: 100% of dataset monsters appear on the Bestiary page as cards with all five required elements.
- **SC-002**: Search returns correct results for case-insensitive and partial queries (e.g., "leshen", "griff") with no page reload.
- **SC-003**: Category, threat, and combined filter selections always display only matching monsters.
- **SC-004**: Filters can be cleared by selecting "All" in each filter or via the empty state's reset button.
- **SC-005**: Clicking a card navigates to the correct monster route for 100% of dataset monsters.
- **SC-006**: The Bestiary is usable at desktop, tablet, and mobile widths with no horizontal scrolling for normal use.
- **SC-007**: All primary user journeys (browse, search, category, threat, combined, reset, navigation) pass automated browser tests.
- **SC-008**: Adding one new monster to the dataset requires no application code changes to be shown correctly.
- **SC-009**: Search and filter interactions respond within 100ms for the current dataset size (~10 monsters).
- **SC-010**: The Bestiary page establishes a strong visual identity that feels like an animated, illustrated dark-fantasy field guide, not a conventional dashboard or admin interface.
- **SC-011**: Monster cards feel collectible and characterful, using decorative borders, ornamental details, and atmospheric styling while remaining readable.
- **SC-012**: Animations are intentional and polished, including page entrance, card appearance, hover effects, and filter transitions, while respecting reduced-motion preferences. Target 60fps for all animations.

## Visual Experience

The Bestiary must NOT look like a conventional dashboard, admin interface, data table, or generic card grid.

It should feel like:

**An animated, illustrated dark-fantasy field guide brought to life.**

The visual experience is a major requirement of this feature, not a later enhancement.

Use the supplied visual reference (`image.png`) as inspiration for the overall aesthetic.

The reference should influence:

- Composition
- Typography
- Whitespace
- Ornamental details
- Illustration-led presentation
- Color relationships
- Editorial/field-guide feeling
- Premium fantasy atmosphere

Do not copy the reference literally. Adapt its visual language to a monster bestiary.

### Desired Visual Personality

The website should feel:

- Dark and atmospheric
- Elegant and premium
- Medieval/fantasy inspired
- Playful and slightly mischievous
- Illustrated rather than UI-heavy
- Whimsical without becoming childish
- Cinematic without becoming cluttered

Avoid a generic "dark gaming website" aesthetic. Avoid excessive boxes, dense dashboards, ordinary rectangular cards, and large rows of conventional form controls. The interface should feel like a curated illustrated bestiary rather than a database.

### Color Palette

From the reference image (`image.png`):

- **Background**: Dark forest green/olive (#2a3629 → #1f2b1e)
- **Panels/Cards**: Desaturated stone/parchment (#d4c9a8, #c9b896, #bfb392)
- **Text**: Dark (#1a1a1a) or parchment (#c9b896)
- **Borders**: Muted green (#5a6558)
- **Threat badges**: Muted tones (not bright colors)
  - Level 5: Muted red (#6a4a4a)
  - Level 4: Muted orange (#6a5a3a)
  - Level 3: Muted yellow (#5a5a3a)
  - Level 1: Muted green (#4a5a4a)
- **Callouts**: Muted red (#6a4a4a)

### Typography

- Elegant serif or refined sans-serif for headings
- Clean legible body text
- Heraldic/title feel from the reference
- Minimum font size: 14px

### Card Design

Monster cards are the main visual component of the page.

They should feel:

- Collectible
- Illustrated
- Tactile
- Characterful
- Premium and atmospheric

**Implementation approach**: Simple rectangular cards with decorative borders and atmospheric styling. The visual impact comes from the dark palette, ornamental details, and premium presentation rather than unusual card shapes.

The design includes:

- Decorative borders (muted green, subtle texture)
- Ornamental frames or corner details
- Layered imagery with atmospheric treatment
- Subtle texture on card backgrounds
- Small fantasy symbols or heraldic details
- Consistent rectangular layout for all categories
- Subtle rotations (1-3 degrees max) or variation where appropriate

Cards must remain readable and usable across all categories.

### Animation & Motion

Animation should be a fundamental part of the experience.

The page should feel alive rather than static.

Motion includes:

- Animated page entrance
- Staggered monster-card appearance
- Subtle card hover movement (scale + slight lift, e.g., 1.02-1.05 scale with shadow)
- Image zoom or parallax
- Decorative particles, foliage, fog, or atmospheric movement (triggered by hover/scroll interaction)
- Animated threat indicators
- Smooth filter transitions
- Cards rearranging smoothly when search/filter results change
- Subtle transitions between Bestiary states
- A cinematic transition when navigating to a monster

**Implementation approach**: Full animation suite using browser-native animation mechanisms for base effects and scripted sequences for complex transitions (filter transitions, page transitions, particle systems). Performance budgets must maintain 60fps.

Animations should feel intentional and polished. They must not become distracting or make the interface difficult to use.

The design must support reduced-motion preferences.

### Playful Interaction

The site should have a mischievous personality.

This should come primarily from:

- Interaction behavior
- Motion
- Visual details
- Unexpected but tasteful transitions
- Small discoveries during hover or navigation

Do NOT achieve "goofy" primarily through joke text or childish labels. The website should remain sophisticated.

### Image Handling

Current monster images are placeholder/solid-color images.

The design must therefore work with placeholder images while establishing an image-first architecture.

The visual design should leave room for the current placeholders to later be replaced with detailed monster artwork without requiring a redesign of the component architecture.

### Page Composition

Do not assume the page must follow:

```
Header → title → search row → filter row → rectangular card grid
```

Explore a more editorial composition:

- **Hero section**: Large "Bestiary" title with atmospheric background and brief tagline. Search field positioned below the hero, followed by category and threat filters.
- Layered monster imagery
- Decorative section transitions
- An immersive search/filter area
- An illustrated collection of monsters
- Large whitespace around major sections

The functional controls must remain easy to discover and use.

### Responsive Design

The visual personality must survive on mobile.

Mobile should not simply become a compressed desktop dashboard.

Mobile compositions:
- **Hero**: Smaller title with atmospheric background, preserving visual identity
- **Search**: Full-width search field
- **Filters**: Horizontally scrollable pill/tag buttons
- **Monster cards**: Single column with consistent rectangular layout
- **Navigation**: Accessible hamburger menu or simplified nav

The mobile experience uses different layouts where necessary while preserving the same visual identity.

### Accessibility

All interactive elements must remain accessible.

Include:

- Keyboard navigation
- Visible focus states
- Meaningful labels
- Appropriate image alt text
- Sufficient contrast
- Reduced-motion support

Visual experimentation must never replace basic usability.

### Design Constraints (Priority Order)

1. Strong visual identity
2. Clear information hierarchy
3. Engaging interaction and motion
4. Usability
5. Functional completeness

The goal is NOT simply to satisfy the functional requirements with a standard grid.

The goal is to create a Bestiary that users want to explore.

## Assumptions

- Search matches the monster name only (per the functional design).
- Threat filtering uses exact-level matching (decision: 2026-08-14).
- The category filter includes an "all/clear" option alongside the central categories.
- Search and filter state is client-side only and resets on reload (decision: 2026-08-14).
- The details page is a placeholder route in this feature; Feature 3 delivers full content.
- Loading state is optional and may be minimal given the static architecture.
- Playwright E2E tests are part of this feature per the functional design and project constitution.
- The UI is built with React on the existing Vite toolchain (per the 2026-08-14 clarification); the Feature 1 no-framework decision applies to the content foundation only.

## Out of Scope

Full monster detail content, abilities, weaknesses, combat information, loot, stories, story reader, map, favorites, user accounts, backend, database, advanced animations, advanced sorting, and pagination — these belong to later features.

## Definition of Done (Reference)

Per the functional design: the Bestiary page is functional; search and filters work together; monster cards are reusable and data-driven; the layout is responsive; basic animations are present; placeholder images work correctly; accessibility basics are covered; Playwright tests pass; the implementation follows the approved wireframe; and no existing Feature 1 content behavior is broken. The project constitution's Definition of Done also applies.
