# Feature Specification: Stories & Story Reader

**Feature Branch**: `004-stories`

**Created**: 2026-08-14

**Status**: Draft

**Input**: User description: "@witcher_bestiary_feature_4_stories_functional_requirements.md" — Feature 4, Stories & Story Reader, the final core V1 feature providing a dedicated story experience.

## Clarifications

### Session 2026-08-14

- Q: Should section IDs be unique within a story or globally unique across all stories? → A: Unique within each story. IDs like `section-1`, `section-2` work fine since they're scoped to the story.
- Q: How should malformed section data be handled? → A: Show a graceful fallback message for invalid sections rather than crashing; validation at build time catches most issues.
- Q: How should related monsters be displayed on the Story Reader? → A: Horizontal scrollable cards showing image, name, category, and threat level. Consistent with Monster Details pattern.
- Q: How will related monsters be decided? → A: Based on the `monsterIds` array in the story data. A story is related to a monster when the monster's ID appears in that array. This is already defined in the existing story data structure.
- Q: How do users navigate to the Stories page? → A: Add a "Stories" navigation link in the header/navigation bar. The Stories page will be accessible at `/stories`. A global navigation component will link to both Bestiary (`/bestiary`) and Stories (`/stories`).

## User Scenarios & Testing

### User Story 1 - Browse Stories (Priority: P1)

A visitor can open the Stories page and see all available stories presented as illustrated cards. Each card shows the story image, title, summary, and associated monster information. The page automatically supports additional stories added to the data.

**Why this priority**: Story discovery is the entry point; users must find stories before reading them.

**Independent Test**: Open the Stories page and confirm every story in the dataset appears as a card with all required elements.

**Acceptance Scenarios**:

1. **Given** the Stories page, **When** it loads, **Then** a card is shown for every story in the dataset.
2. **Given** a story card, **When** it is inspected, **Then** it displays the image, title, summary, and associated monster information.
3. **Given** the dataset, **When** a new story is added as data, **Then** it appears as a card without any application code changes.
4. **Given** the Stories page, **When** it loads, **Then** the page follows the established dark, atmospheric, cinematic visual language.

---

### User Story 2 - Read a Story (Priority: P1)

A visitor can select a story from the Stories page and read its full content on a dedicated Story Reader page. The reader displays the story title, summary, hero image, and ordered sections in a comfortable long-form reading experience.

**Why this priority**: Reading stories is the core value; the reader must support both short and long-form content.

**Independent Test**: Open a story, verify navigation to `/stories/:id`, and confirm all story information and sections are displayed in order.

**Acceptance Scenarios**:

1. **Given** the Stories page, **When** a visitor clicks a story card, **Then** the visitor is taken to the route for that story's ID.
2. **Given** the Story Reader page, **When** it loads, **Then** the hero displays the story title, summary, and hero image.
3. **Given** the Story Reader page, **When** it loads, **Then** all ordered sections are displayed in the correct sequence.
4. **Given** a short story (one section), **When** the Story Reader loads, **Then** the single section is displayed correctly.
5. **Given** a long story (multiple sections), **When** the Story Reader loads, **Then** all sections appear in order with proper separation.

---

### User Story 3 - Navigate to Related Monsters (Priority: P1)

A visitor can discover monsters associated with a story and navigate directly to their Monster Details pages.

**Why this priority**: Related monsters create a two-way discovery flow between stories and the bestiary.

**Independent Test**: Open a story with associated monsters, verify they are displayed, click one, and confirm navigation to the Monster Details page.

**Acceptance Scenarios**:

1. **Given** a story with associated monsters, **When** the Story Reader loads, **Then** the related monsters are displayed.
2. **Given** a related monster, **When** it is displayed, **Then** it shows image, name, category, and threat level.
3. **Given** a related monster, **When** the visitor clicks it, **Then** navigation occurs to `/bestiary/:id`.
4. **Given** a story with no associated monsters, **When** the Story Reader loads, **Then** no related monsters section is shown.

---

### User Story 4 - Navigate Back to Stories (Priority: P1)

A visitor can return to the Stories page from the Story Reader via navigation controls that follow the established visual design.

**Why this priority**: Navigation closes the loop and allows users to continue exploring stories.

**Independent Test**: Click "Back to Stories" on the Story Reader page, verify the Stories page is displayed.

**Acceptance Scenarios**:

1. **Given** the Story Reader page, **When** the visitor clicks "Back to Stories", **Then** the Stories page is displayed.
2. **Given** the Story Reader page, **When** the back navigation is displayed, **Then** it feels integrated with the visual design.

---

### User Story 5 - Handle Missing Story (Priority: P1)

If a visitor navigates to a route for a story that does not exist, the application displays a clear not-found state with a way to return to the Stories page.

**Why this priority**: Error handling prevents broken experiences and dead ends.

**Independent Test**: Navigate to `/stories/nonexistent-story`, verify the not-found state and ability to return to the Stories page.

**Acceptance Scenarios**:

1. **Given** a route for a story that does not exist, **When** the page loads, **Then** a clear not-found message is displayed.
2. **Given** the not-found state, **When** the visitor activates the return control, **Then** the Stories page is displayed.
3. **Given** an invalid story ID, **When** the page loads, **Then** the application does not crash.

---

### User Story 6 - Responsive Stories (Priority: P2)

The Stories landing page and Story Reader work across desktop, tablet, and mobile. The visual identity survives on mobile without becoming a compressed desktop layout.

**Why this priority**: Responsive design ensures the experience is accessible on all devices.

**Independent Test**: Resize the viewport across desktop, tablet, and mobile widths; verify the pages remain usable without horizontal scrolling.

**Acceptance Scenarios**:

1. **Given** the Stories page, **When** it is viewed on mobile, **Then** the visual identity is preserved.
2. **Given** the Story Reader, **When** it is viewed on mobile, **Then** the reading experience remains comfortable.
3. **Given** landscape artwork, **When** it is viewed on mobile, **Then** it adapts correctly to smaller screens.

---

### User Story 7 - Accessible Stories (Priority: P2)

The Stories feature supports keyboard navigation, visible focus states, semantic headings, meaningful alternative text, sufficient contrast, accessible navigation, and reduced-motion behavior.

**Why this priority**: Accessibility is a constitution requirement for all user-facing functionality.

**Independent Test**: Operate the pages with keyboard only; verify visible focus states and reduced-motion preferences are respected.

**Acceptance Scenarios**:

1. **Given** the Stories pages, **When** they are operated with a keyboard, **Then** all interactive elements are reachable and usable.
2. **Given** meaningful images, **When** they are inspected, **Then** they have alternative text.
3. **Given** the user prefers reduced motion, **When** the pages are rendered, **Then** animations are reduced or removed.

---

### User Story 8 - Story Schema Migration (Priority: P1)

Existing stories must be migrated from the single `content` string to the ordered `sections` structure. Each story must have at least 4 sections after migration.

**Why this priority**: The schema migration is a prerequisite for the Story Reader to function correctly.

**Independent Test**: Verify existing stories have been migrated to sections format with at least 4 sections each.

**Acceptance Scenarios**:

1. **Given** existing stories, **When** the migration runs, **Then** each story has a `sections` array instead of a `content` string.
2. **Given** migrated stories, **When** they are inspected, **Then** each story has at least 4 sections.
3. **Given** migrated stories, **When** the Story Reader loads, **Then** all sections appear in the correct order.
4. **Given** the migration, **When** it completes, **Then** no story content is lost or altered.

---

### Edge Cases

- What happens when a story has no sections? (An empty state message is shown.)
- What happens when a section has an empty content string? (The section is rendered but shows a placeholder or is skipped.)
- What happens when a story has no associated monsters? (The related monsters section is not shown.)
- What happens when the dataset is empty or fails to load? (A clear error message is shown.)
- What happens when a story title or section content is very long? (Text wraps appropriately; no horizontal scrolling.)
- What happens when a visitor reloads on a story route? (The page renders correctly; it does not depend on prior navigation state.)
- What happens when a visitor opens a route for a story that does not exist? (A clear not-found state is shown.)

## Requirements

### Functional Requirements

- **FR-001**: The application MUST provide a Stories page presenting all stories from the content data as a collection of cards.
- **FR-001a**: The application MUST provide global navigation with links to both Bestiary (`/bestiary`) and Stories (`/stories`) pages.
- **FR-002**: Every story card MUST display the story image, title, summary, and associated monster information.
- **FR-003**: Story cards MUST be reusable and data-driven; adding a story to the dataset MUST NOT require new components or code changes.
- **FR-004**: Selecting a story MUST navigate to a route based on the story's unique ID (e.g., `/stories/striga-of-maribor`).
- **FR-005**: The Story Reader MUST display the story title, summary, hero image, and ordered sections.
- **FR-006**: Each section MUST display a section title and section content.
- **FR-007**: Sections MUST appear in the same order as defined in the story data.
- **FR-008**: The Story Reader MUST support both short stories (one section) and long stories (multiple sections) without different page implementations.
- **FR-009**: The story data model MUST be migrated from a single `content` string to an ordered `sections` structure.
- **FR-010**: Each story MUST have at least 4 sections after migration.
- **FR-011**: The Story Reader MUST display related monsters using the existing `monsterIds` relationship.
- **FR-012**: Selecting a related monster MUST navigate to `/bestiary/:id`.
- **FR-013**: The Story Reader MUST provide navigation back to the Stories page.
- **FR-014**: If a story ID does not exist, the application MUST display a clear not-found state.
- **FR-015**: The application MUST not crash with invalid or empty section data.
- **FR-016**: The page MUST work correctly with placeholder images and MUST NOT depend on specific image dimensions.
- **FR-017**: The page MUST work across desktop, tablet, and mobile widths without horizontal scrolling.
- **FR-018**: The page MUST be keyboard-accessible with visible focus states, meaningful alternative text, sufficient contrast, and reduced-motion support.
- **FR-019**: The page MUST inherit the established visual language (dark, atmospheric, cinematic).
- **FR-020**: Cinematic animations MUST be implemented (hero entrance, section reveal, atmospheric effects) while respecting reduced-motion preferences.
- **FR-021**: The feature MUST be completely driven by story data; adding a new story MUST automatically work without code changes.
- **FR-022**: Playwright E2E tests MUST cover the main user journeys: browse stories, read story, related monsters, back navigation, missing story, and responsive behavior.

### Key Entities

- **Story**: Consumed from content data (id, title, summary, image, monsterIds, sections); read-only.
- **Story Section**: Part of a story (id, title, content); ordered within the story.
- **Monster**: Consumed from Feature 1 content; referenced by stories via monsterIds.
- **Story Route**: A URL path derived from a story's unique ID, pointing at the Story Reader page.

## Success Criteria

### Measurable Outcomes

- **SC-001**: The Stories page displays all stories as cards with image, title, summary, and monster info.
- **SC-002**: A unique route exists for each story in the dataset.
- **SC-003**: The Story Reader displays title, summary, hero image, and ordered sections.
- **SC-004**: Short and long-form stories work with the same reader implementation.
- **SC-005**: Related monsters are displayed and link to their Monster Details pages.
- **SC-006**: The user can navigate back to the Stories page from the Story Reader.
- **SC-007**: Invalid story IDs produce a usable not-found state.
- **SC-008**: Each story has at least 4 sections after migration.
- **SC-009**: The page follows the established dark, atmospheric, cinematic visual language.
- **SC-010**: Cinematic animations are implemented and respect reduced-motion preferences.
- **SC-011**: The page is responsive across desktop, tablet, and mobile widths.
- **SC-012**: The page is accessible (keyboard navigation, focus states, alt text, contrast, reduced-motion).
- **SC-013**: The implementation remains data-driven; adding a story requires no code changes.
- **SC-014**: Playwright tests cover the important user journeys.

## Assumptions

- The story data structure from Feature 1 is available for migration.
- The monster data structure from Feature 1 is stable.
- The existing Bestiary Explorer and Monster Details visual language will be reused.
- The placeholder image at `/images/placeholders/missing.png` is available.
- Static hosting requires SPA fallback for react-router-dom BrowserRouter.
- Existing stories will be migrated to have at least 4 sections each.

## Out of Scope

- User-generated stories
- Story editing
- Story CMS
- User accounts
- Comments
- Likes
- Favorites
- Reading progress tracking
- Audio narration
- Backend
- Database
- AI story generation
- Publishing workflow
- Advanced story search
- Story recommendations
- Complex character/location metadata

## Definition of Done (Reference)

The feature is complete when:

- Story schema migration is complete.
- Existing stories have been migrated successfully with at least 4 sections each.
- The Stories page works.
- The Story Reader works for short and long-form stories.
- Ordered sections render correctly.
- Related monster navigation works.
- Responsive behavior works.
- Story artwork follows the established visual direction.
- Cinematic animations are implemented.
- Accessibility requirements are satisfied.
- Playwright tests pass.
- No existing application functionality is broken.
