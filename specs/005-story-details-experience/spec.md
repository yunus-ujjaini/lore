# Feature Specification: Story Details Experience Enhancements

**Feature Branch**: `005-story-details-experience`

**Created**: 2026-08-17

**Status**: Draft

**Input**: User description: "I want to enhance story details page user experience. currently story is difficult to read in one go"

## UI Mockup

Signed off: 2026-08-17

- Desktop + Mobile: [`wireframes/01-story-reader.svg`](./wireframes/01-story-reader.svg) (dark theme)

These wireframes are spec constraints — implementation should match their layout,
component structure, and interaction flow. Deviations require spec revision.

## User Scenarios & Testing

### User Story 1 - Comfortable Long-Form Reading (Priority: P1)

A reader opens a story and can comfortably read through all sections without eye strain or losing their place. The text is sized appropriately, lines are well-spaced, and the reading column is constrained to a width that supports easy scanning. The reader finishes the story without fatigue.

**Why this priority**: The core problem stated by the user is that stories are "difficult to read in one go." Comfortable typography and layout are the foundation all other enhancements build on.

**Independent Test**: Open any story with 3+ sections. Read through the entire story on desktop and verify: text is readable without zooming, line height allows comfortable scanning, paragraphs are clearly separated, and the reading column does not span the full viewport width.

**Acceptance Scenarios**:

1. **Given** a reader opens a story, **When** the page loads, **Then** the body text is sized for comfortable long-form reading (not smaller than surrounding UI text)
2. **Given** a reader is reading a section, **When** they scan across a line, **Then** the line width does not exceed a comfortable reading measure (approximately 60-80 characters per line)
3. **Given** a reader scrolls through the story, **When** they pass between sections, **Then** each section is visually separated with clear spacing and hierarchy
4. **Given** a reader reaches a long section, **When** they read through it, **Then** the content does not appear as a dense wall of text (generous paragraph spacing and line height are applied)

---

### User Story 2 - Cinematic Story Introduction (Priority: P1)

A reader opens a story and is immediately immersed in a cinematic hero experience. The story image dominates the initial viewport, the title is displayed prominently with fantasy-appropriate typography, and the summary provides context. The hero sets the tone for the reading experience.

**Why this priority**: The hero is the first thing readers see and establishes whether the story feels like a premium dark-fantasy experience or a generic page. It must work correctly with existing placeholder images.

**Independent Test**: Open a story with a real image and verify the hero fills a substantial portion of the viewport with the image, title, and summary visible. Open a story with a placeholder image and verify the layout remains intact without broken visuals.

**Acceptance Scenarios**:

1. **Given** a reader opens a story with a real image, **When** the page loads, **Then** the hero occupies a substantial portion of the initial viewport with the story image as the dominant visual
2. **Given** a reader views the hero, **When** the page loads, **Then** the story title is displayed prominently with clear hierarchy above the summary
3. **Given** a reader views the hero, **When** the page loads, **Then** the summary is visible as supporting text below the title
4. **Given** a reader views the hero, **When** text overlaps the image, **Then** an atmospheric overlay or gradient preserves text readability
5. **Given** a story uses a placeholder image, **When** the page loads, **Then** the hero layout remains intact without visual breakage

---

### User Story 3 - Visual Rhythm and Section Transitions (Priority: P2)

A reader scrolling through a story experiences deliberate visual rhythm. Sections feel like movements in a tale rather than article headings. Transitions between sections provide breathing room through dividers, spacing, or subtle background shifts. The story has a clear beginning, middle, and end.

**Why this priority**: Without visual rhythm, long stories feel like a continuous wall of text. Section transitions and hierarchy are essential for maintaining reader engagement across multiple sections.

**Independent Test**: Scroll through a story with 4+ sections. Verify each section has a distinct title treatment, sections are visually separated, and the story ends with a deliberate closing treatment (not an abrupt stop or empty space).

**Acceptance Scenarios**:

1. **Given** a reader views a section, **When** they look at the section header, **Then** a Roman numeral (I, II, III) appears above the section title with an ornamental divider below it
2. **Given** a reader scrolls between sections, **When** they pass from one section to the next, **Then** there is clear visual separation (ornamental divider, generous spacing, and subtle background shift)
3. **Given** a reader reaches the end of the story, **When** they finish the last section, **Then** an ornamental divider (heavier than inter-section dividers) signals the story's conclusion
4. **Given** a reader reaches the end of the story, **When** they look below the final section, **Then** there is no large unexplained empty area

---

### User Story 4 - Reading Progress Awareness (Priority: P2)

A reader can see at a glance how far through the story they have progressed. A lightweight progress indicator updates as they scroll, helping them gauge remaining reading time without obscuring content.

**Why this priority**: Progress indicators help readers commit to finishing long content and reduce the feeling of being lost in a long story.

**Independent Test**: Open a story, scroll from top to bottom, and verify a progress indicator appears and updates proportionally. Verify the indicator does not overlap story content.

**Acceptance Scenarios**:

1. **Given** a reader opens a story, **When** the page loads, **Then** a thin progress bar is visible at the top of the viewport
2. **Given** a reader scrolls through the story, **When** they reach the midpoint, **Then** the progress bar reflects approximately 50% completion
3. **Given** a reader scrolls to the end, **When** they reach the final section, **Then** the progress bar shows 100% completion
4. **Given** a reader views the progress bar, **When** they read the story, **Then** the bar does not obscure any story content

---

### User Story 5 - Related Monsters and Continuation (Priority: P2)

A reader who finishes a story sees the related monsters displayed as a natural continuation of the experience, with each monster linking to its details page. A "Next Tale" card offers another story to read. The reader is offered clear next steps: return to stories, explore the bestiary, or continue to another story.

**Why this priority**: Related monsters and continuation paths keep readers engaged and connect the story experience back to the broader bestiary.

**Independent Test**: Scroll to the end of a story with `monsterIds`. Verify related monsters appear under the heading "Monsters of this Tale" with name, category, and threat level. Click a related monster and verify navigation to the Monster Details page. Verify a "Next Tale" card appears linking to another story.

**Acceptance Scenarios**:

1. **Given** a reader finishes a story, **When** they scroll past the final section, **Then** related monsters (from `monsterIds`) are displayed under the heading "Monsters of this Tale" with name, category, and threat level
2. **Given** a reader views related monsters, **When** they click a monster, **Then** they navigate to the Monster Details page for that monster
3. **Given** a reader finishes a story, **When** they look for next steps, **Then** a "Next Tale" card appears linking to a random other story, showing its title, summary, and image
4. **Given** a reader finishes a story, **When** they look for navigation, **Then** options to return to Stories and explore the Bestiary are available
5. **Given** a story has no related monsters, **When** the reader reaches the end, **Then** the "Next Tale" card and navigation options still appear

---

### User Story 6 - Responsive Reading Experience (Priority: P3)

A reader on mobile or tablet has the same visual identity and reading comfort as on desktop. The hero remains impactful, text remains readable, sections remain well-spaced, and no horizontal scrolling is required.

**Why this priority**: Mobile readers are a significant audience, and the reading experience must translate without simply shrinking the desktop layout.

**Independent Test**: Open a story on a mobile viewport (375px width). Verify: hero image is visible, title is readable, story text is comfortable to read, sections are well-spaced, and no horizontal overflow occurs.

**Acceptance Scenarios**:

1. **Given** a reader opens a story on mobile, **When** the page loads, **Then** the hero remains visually impactful (image, title, summary all visible)
2. **Given** a reader reads on mobile, **When** they scroll through sections, **Then** body text is comfortable to read (not too small, adequate line height)
3. **Given** a reader views the page on mobile, **When** they check for overflow, **Then** no horizontal scrolling is required
4. **Given** a reader on mobile, **When** they view related monsters, **Then** the monsters are easy to browse and tap

---

### User Story 7 - Reduced Motion Support (Priority: P3)

A reader who has enabled reduced-motion preferences in their operating system sees a simplified experience without scroll-based animations, parallax effects, or ambient motion. The story remains fully readable and navigable.

**Why this priority**: Accessibility requirements mandate that animations are not required to understand or navigate content.

**Independent Test**: Enable `prefers-reduced-motion: reduce` in browser settings. Open a story and verify: no parallax, no scroll-triggered animations, no ambient particles, but all content is still visible and readable.

**Acceptance Scenarios**:

1. **Given** a reader has reduced-motion enabled, **When** they open a story, **Then** scroll-based animations (parallax, section entrance) are disabled
2. **Given** a reader has reduced-motion enabled, **When** they view the hero, **Then** the hero loads without animation (no zoom, no reveal effects)
3. **Given** a reader has reduced-motion enabled, **When** they read the story, **Then** all content is visible and navigable without any animation dependency

---

### Edge Cases

- What happens when a story has only one section? The section should still display with proper hierarchy and the story should still have a clear ending treatment.
- What happens when a story has no `monsterIds`? The related-monsters section should be omitted, and continuation navigation should still appear.
- What happens when a story image fails to load? The hero should fall back to the placeholder gracefully without breaking the layout.
- What happens when a story has very short sections (1-2 paragraphs)? Sections should still have clear visual separation and hierarchy.
- What happens when a reader rapidly scrolls through the entire story? Progress indicator should update smoothly; no jank or layout shifts.

## Requirements

### Functional Requirements

- **FR-001**: System MUST display the story hero with the story image as the dominant visual element, occupying a substantial portion of the initial viewport
- **FR-002**: System MUST display the story title prominently in the hero with fantasy-appropriate typography hierarchy
- **FR-003**: System MUST display the story summary as supporting text in the hero
- **FR-004**: System MUST apply an atmospheric overlay or gradient to the hero to preserve text readability over the image
- **FR-005**: System MUST render story body text at a size comfortable for long-form reading with generous line height and paragraph spacing
- **FR-006**: System MUST constrain the reading column to a comfortable maximum width (approximately 60-80 characters per line)
- **FR-007**: System MUST display each story section with a Roman numeral (I, II, III) above the section title and an ornamental divider below the title, creating strong visual hierarchy
- **FR-008**: System MUST provide visual separation between sections using ornamental dividers, generous spacing, and subtle background shifts
- **FR-009**: System MUST provide a thin progress bar at the top of the viewport that updates proportionally as the user scrolls, without obscuring story content
- **FR-010**: System MUST display related monsters (from `monsterIds`) at the end of the story with name, category, and threat level
- **FR-011**: System MUST link each related monster to its Monster Details page
- **FR-012**: System MUST provide continuation navigation at the end of the story (return to stories, explore bestiary, next story if available)
- **FR-013**: System MUST display an ornamental divider (with more weight than inter-section dividers) after the final section to signal the story's conclusion
- **FR-014**: System MUST remain responsive across desktop, tablet, and mobile viewports without horizontal overflow
- **FR-015**: System MUST respect `prefers-reduced-motion` by disabling scroll-based animations, parallax, and ambient effects
- **FR-016**: System MUST use the existing story `image` value without introducing image generation
- **FR-017**: System MUST preserve the existing story data schema and section structure
- **FR-018**: System MUST support both real story images and placeholder images without layout breakage
- **FR-019**: System MUST maintain keyboard navigation and visible focus states for all interactive elements
- **FR-020**: System MUST provide meaningful alternative text for story images
- **FR-021**: System MUST apply reduced decorative animation on mobile viewports
- **FR-022**: System MUST use the established Lore color palette (deep forest green, muted charcoal, warm parchment/cream, restrained gold/earth accents)
- **FR-023**: System MUST apply a drop cap treatment to the first paragraph of each section (enlarged decorative initial letter)
- **FR-024**: System MUST display subtle floating particles in the hero section that fade out as the user scrolls past
- **FR-025**: System MUST apply a faint fog or gradient shift on section transitions to create atmospheric visual rhythm
- **FR-026**: System MUST display a "Next Tale" card at the end of the story linking to a random other story, showing title, summary, and image
- **FR-027**: System MUST wrap related monsters in a styled section with the heading "Monsters of this Tale" and atmospheric background

### Key Entities

- **Story**: Existing entity with `id`, `title`, `summary`, `image`, `monsterIds`, `sections[]`. Schema unchanged.
- **Story Section**: Existing sub-entity with `id`, `title`, `content`. Structure unchanged.
- **Monster**: Existing entity referenced via `monsterIds`. Displayed at story end with name, category, threat level, and link to details page.
- **Reading Progress**: Transient UI state representing scroll position as a percentage of story length.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Readers can scroll through a 5-section story without encountering a dense wall of text (verified by comfortable line height ≥ 1.6, paragraph spacing ≥ 1em, and reading column ≤ 72ch)
- **SC-002**: The hero occupies at least 60% of the initial viewport height on desktop and 50% on mobile (existing 70/60/50vh values satisfy this)
- **SC-003**: The reading progress indicator updates proportionally within 100ms of scroll events
- **SC-004**: Related monsters are visible within 2 scrolls past the final story section
- **SC-005**: The page passes automated accessibility checks (keyboard navigation, heading hierarchy, alt text, contrast)
- **SC-006**: No horizontal overflow occurs on viewports from 375px to 1440px width
- **SC-007**: Playwright E2E tests pass for all defined scenarios (open story, read story, progress, related monsters, ending, responsive, accessibility)
- **SC-008**: Existing Bestiary Explorer, Monster Details, and story functionality remain intact (no regressions)

## Clarifications

### Session 2026-08-17

- Q: What style should the reading progress indicator take? → A: Thin bar at the top of the viewport, updates proportionally on scroll, does not obscure content.
- Q: Should opening paragraph editorial treatment be included, and which treatment? → A: Drop cap on the first paragraph of each section. The first letter is enlarged and styled as a decorative initial.
- Q: How should the "Next Story" feature work? → A: Show a "Next Tale" card linking to a random other story. The card displays the next story's title, summary, and image as a visually prominent call-to-action.
- Q: What ambient animation scope should be included? → A: Subtle floating particles in the hero section only, plus a faint fog/gradient shift on section transitions. Particles fade out as the user scrolls past the hero.
- Q: What visual treatment should separate sections? → A: Each section displays a Roman numeral (I, II, III) above its title, with an ornamental divider line below the title.
- Q: How pronounced should reading surface background transitions be? → A: Subtle gradient. The hero uses the deepest dark, the reading area shifts to a slightly warmer tone, and the ending returns to dark. The shift is barely perceptible but creates visual rhythm.
- Q: What form should the story ending treatment take? → A: An ornamental divider only, no "THE END" text. The divider has more weight than inter-section dividers to signal conclusion.
- Q: Should the existing hero heights (70/60/50vh) be changed? → A: Keep existing values. They already satisfy SC-002 (70% > 60% desktop, 50% = 50% mobile).
- Q: Should the RelatedMonsters layout change from horizontal scroll? → A: Keep horizontal scroll. Add a section heading ("Monsters of this Tale") and wrap in an atmospheric section with the reading surface background.
- Q: Should an eyebrow label ("A TALE", "FIELD NOTE") appear above the title? → A: No. The title and summary hierarchy is sufficient. Eyebrow label is excluded from scope.

## Assumptions

- The existing story data model and section structure will not change during this feature
- Story images are provided externally; this feature does not generate or source images
- The existing Lore color palette, typography system, and component patterns will be extended rather than replaced
- Framer Motion is available for animation (already in project dependencies)
- The placeholder image at `public/images/placeholders/missing.png` will continue to be used for stories without artwork
- Mobile support targets a minimum viewport width of 375px
- Reduced-motion support uses the `prefers-reduced-motion` CSS media query
- The feature builds on the existing `StoryReaderPage` component and its current routing
- The existing hero heights (70vh desktop, 60vh tablet, 50vh mobile) are retained as they satisfy SC-002
- Eyebrow labels above the title are excluded from scope
