# Feature Specification: Monster Details

**Feature Branch**: `003-monster-details`

**Created**: 2026-08-14

**Status**: Draft

**Input**: User description: "@witcher_bestiary_feature_3_monster_details_functional_requirements.md" — Feature 3, Monster Details, the immersive detail experience for individual monsters.

## Clarifications

### Session 2026-08-14

- Q: What should the hero section contain and how should it be laid out? → A: Full-width image with overlaid text. The monster image fills the hero area with text (name, category, threat, description) overlaid on the image for maximum visual impact and cinematic feel.
- Q: What specific animations should be used in the hero? → A: Slow image zoom, subtle parallax on scroll, text reveal (fade/slide entrance), and atmospheric effects (particles/fog) triggered by scroll interaction.
- Q: How should the information section below the hero be designed? → A: Keep it dark — no cream/parchment background. The entire page maintains the dark, atmospheric look consistently.
- Q: How should related stories be displayed? → A: Horizontal scrollable cards. Compact layout showing story image, title, and summary. Horizontal scroll on mobile.

## User Scenarios & Testing

### User Story 1 - View Monster Details (Priority: P1)

A visitor can select a monster from the Bestiary and view its full details on a dedicated page. The page displays the monster's image, name, category, threat level, and description in a cinematic, immersive layout with a full-width hero image and overlaid text that feels like opening an illustrated page from a mysterious monster field guide.

**Why this priority**: Viewing monster details is the core experience; navigation, related stories, and other interactions build on this.

**Independent Test**: Click a monster card in the Bestiary, verify navigation to `/bestiary/:id`, and confirm all monster information is displayed.

**Acceptance Scenarios**:

1. **Given** the Bestiary page, **When** a visitor clicks a monster card, **Then** the visitor is taken to the route for that monster's ID.
2. **Given** the Monster Details page, **When** it loads, **Then** the hero displays the monster's image, name, category, threat level, and description.
3. **Given** the Monster Details page, **When** it loads, **Then** the page follows the existing Bestiary visual language (dark, atmospheric, medieval/fantasy, premium).
4. **Given** the Monster Details page, **When** it loads, **Then** the hero is more cinematic and immersive than the Bestiary Explorer.
5. **Given** the Monster Details page, **When** it loads, **Then** meaningful animations are implemented (page entrance, image effects, text reveal).
6. **Given** the Monster Details page, **When** it loads, **Then** the page works correctly with placeholder images and does not depend on specific image dimensions.

---

### User Story 2 - View Related Stories (Priority: P1)

A visitor can see stories associated with the current monster displayed on the details page. A story is related when the monster ID appears in its `monsterIds` array. Each related story shows its title, summary, and image where available.

**Why this priority**: Related stories provide context and depth to the monster, enriching the experience.

**Independent Test**: Open a monster that is referenced by a story, verify the related story appears with title, summary, and image.

**Acceptance Scenarios**:

1. **Given** a monster that is referenced by a story, **When** the Monster Details page loads, **Then** the related story is displayed.
2. **Given** a related story, **When** it is displayed, **Then** it shows the story title, summary, and image (where available).
3. **Given** a monster that is not referenced by any story, **When** the Monster Details page loads, **Then** no related stories section is shown.
4. **Given** multiple stories referencing the same monster, **When** the Monster Details page loads, **Then** all related stories are displayed.

---

### User Story 3 - Navigate Back to Bestiary (Priority: P1)

A visitor can return to the Bestiary from the Monster Details page via a back navigation control that feels integrated with the visual design.

**Why this priority**: Navigation closes the loop and allows users to continue exploring.

**Independent Test**: Click "Back to Bestiary" on the Monster Details page, verify the Bestiary page is displayed.

**Acceptance Scenarios**:

1. **Given** the Monster Details page, **When** the visitor clicks "Back to Bestiary", **Then** the Bestiary page is displayed.
2. **Given** the Monster Details page, **When** the back navigation is displayed, **Then** it feels integrated with the visual design rather than appearing as a generic browser-style control.

---

### User Story 4 - Handle Missing Monster (Priority: P1)

If a visitor navigates to a route for a monster that does not exist, the application displays a clear not-found state with a message and a way to return to the Bestiary.

**Why this priority**: Error handling prevents broken experiences and dead ends.

**Independent Test**: Navigate to `/bestiary/nonexistent-monster`, verify the not-found state and ability to return to the Bestiary.

**Acceptance Scenarios**:

1. **Given** a route for a monster that does not exist, **When** the page loads, **Then** a clear not-found message is displayed.
2. **Given** the not-found state, **When** the visitor activates the return control, **Then** the Bestiary page is displayed.
3. **Given** an invalid monster ID, **When** the page loads, **Then** the application does not crash.

---

### User Story 5 - Responsive Monster Details (Priority: P2)

The Monster Details page works across desktop, tablet, and mobile. The hero adapts its composition for smaller screens while remaining immersive. Text remains readable and important information remains easy to discover.

**Why this priority**: Responsive design ensures the experience is accessible on all devices.

**Independent Test**: Resize the viewport across desktop, tablet, and mobile widths; verify the page remains usable without horizontal scrolling.

**Acceptance Scenarios**:

1. **Given** the Monster Details page, **When** it is viewed on mobile, **Then** the hero adapts its composition for the smaller screen.
2. **Given** the Monster Details page, **When** it is viewed on desktop, **Then** the hero uses the available space effectively.
3. **Given** the Monster Details page, **When** it is viewed at any width, **Then** no horizontal scrolling is required.

---

### User Story 6 - Accessible Monster Details (Priority: P2)

The Monster Details page supports keyboard navigation, visible focus states, meaningful alternative text for images, appropriate semantic headings, sufficient contrast, and reduced-motion behavior. Animations never prevent users from accessing the content.

**Why this priority**: Accessibility is a constitution requirement for all user-facing functionality.

**Independent Test**: Operate the page with keyboard only; verify visible focus states and reduced-motion preferences are respected.

**Acceptance Scenarios**:

1. **Given** the Monster Details page, **When** it is operated with a keyboard, **Then** all interactive elements are reachable and usable.
2. **Given** meaningful monster images, **When** they are inspected, **Then** they have alternative text.
3. **Given** the user prefers reduced motion, **When** the page is rendered, **Then** animations are reduced or removed.

---

### Edge Cases

- What happens when the dataset is empty or fails to load? (A clear error message is shown rather than a broken page.)
- What happens when a monster has a placeholder or solid-color image? (The hero reserves a consistent image area and the layout does not depend on image dimensions. The dark information section remains readable.)
- What happens when the visitor reloads on a monster route? (The page renders correctly; it does not depend on prior navigation state.)
- What happens when the visitor opens a route for a monster that does not exist? (A clear not-found state is shown, not a broken page.)
- What happens when a monster has no related stories? (The related stories section is not shown.)
- What happens when a monster name or description is longer than expected? (Text truncates gracefully or wraps appropriately within the overlaid hero text.)
- What happens when atmospheric effects are triggered on low-performance devices? (Animations should gracefully degrade or be disabled via reduced-motion preferences.)

## Requirements

### Functional Requirements

- **FR-001**: The application MUST provide a Monster Details page for each monster, accessible via a route based on the monster's unique ID (e.g., `/bestiary/leshen`).
- **FR-002**: The Monster Details hero MUST display the monster's image, name, category, threat level, and description.
- **FR-003**: The Monster Details page MUST inherit the visual language established by the Bestiary Explorer (dark, atmospheric, medieval/fantasy, premium).
- **FR-004**: The Monster Details hero MUST be more cinematic and immersive than the Bestiary Explorer, using a full-width image with overlaid text for maximum visual impact.
- **FR-005**: The page MUST implement meaningful animations (slow image zoom, parallax on scroll, text reveal, atmospheric effects triggered by scroll) that respect reduced-motion preferences.
- **FR-006**: The page MUST display related stories when the current monster is referenced by them (via the `monsterIds` array in story data).
- **FR-007**: Each related story MUST display its title, summary, and image (where available).
- **FR-008**: The page MUST provide a back navigation control to return to the Bestiary, integrated with the visual design.
- **FR-009**: If the requested monster ID does not exist, the application MUST display a clear not-found state with a way to return to the Bestiary.
- **FR-010**: The application MUST not crash when an invalid monster ID is requested.
- **FR-011**: The page MUST work correctly with placeholder images and MUST NOT depend on specific image dimensions.
- **FR-012**: The page MUST work across desktop, tablet, and mobile widths without horizontal scrolling.
- **FR-013**: The mobile layout MUST remain immersive rather than simply shrinking the desktop layout.
- **FR-014**: The page MUST be keyboard-accessible with visible focus states, meaningful alternative text, appropriate semantic headings, sufficient contrast, and reduced-motion support.
- **FR-015**: Animations MUST never prevent users from accessing the content.
- **FR-016**: The page MUST be completely driven by the existing monster data; adding a new monster MUST automatically work without code changes.
- **FR-017**: The page MUST NOT introduce new monster attributes (abilities, weaknesses, habitat, etc.) as required fields.
- **FR-018**: Playwright E2E tests MUST cover the main user journeys: open monster, view information, back navigation, related stories, missing monster, and responsive behavior.

### Key Entities

- **Monster**: Consumed from Feature 1 content (id, name, category, threat level, description, image); read-only.
- **Story**: Consumed from Feature 1 content (id, title, summary, content, monsterIds, image); read-only.
- **Monster Route**: A URL path derived from a monster's unique ID, pointing at the Monster Details page.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A monster can be opened from the Bestiary and its details are displayed correctly.
- **SC-002**: A unique route exists for each monster in the dataset.
- **SC-003**: The hero displays the monster image, name, category, threat level, and description.
- **SC-004**: The page follows the existing Bestiary visual language consistently.
- **SC-005**: The hero uses a full-width image with overlaid text, creating a more cinematic and immersive experience than the Bestiary Explorer.
- **SC-006**: Animations include slow image zoom, parallax on scroll, text reveal, and atmospheric effects triggered by scroll interaction, all respecting reduced-motion preferences.
- **SC-007**: Related stories are displayed when the current monster is referenced by them.
- **SC-008**: The user can return to the Bestiary from the Monster Details page.
- **SC-009**: Invalid monster IDs produce a usable not-found state.
- **SC-010**: Placeholder images work correctly and the page does not depend on image dimensions.
- **SC-011**: The page is responsive across desktop, tablet, and mobile widths.
- **SC-012**: The page is accessible (keyboard navigation, focus states, alt text, contrast, reduced-motion).
- **SC-013**: The implementation remains data-driven; adding a monster requires no code changes.
- **SC-014**: Playwright tests cover the important user journeys.

## Assumptions

- The monster data structure from Feature 1 is stable and will not change in this feature.
- The story data structure from Feature 1 is stable and will not change in this feature.
- The existing Bestiary Explorer's visual language and animation patterns will be reused and extended.
- The placeholder image at `/images/placeholders/missing.png` is available.
- The current dataset of ~10 monsters and ~3 stories is sufficient for testing.
- Static hosting requires SPA fallback for react-router-dom BrowserRouter (same as Feature 2).

## Out of Scope

- Full story reader (Feature 4 or later)
- Monster editing
- User accounts
- Favorites
- Comments
- Interactive map
- Backend
- Database
- Advanced monster statistics
- Combat simulator
- AI-generated content
- Full production artwork

## Definition of Done (Reference)

The feature is complete when:

- The approved wireframe is implemented.
- Monster detail pages work for the existing content dataset.
- Hero and page animations are implemented.
- Related stories work using the existing story data.
- Responsive behavior works.
- Accessibility requirements are satisfied.
- Playwright tests pass.
- No existing Bestiary functionality is broken.
- The implementation preserves the established visual identity.
- Important design and implementation decisions are recorded in the project Wiki.
