# Feature Specification: Add 20 New Monsters with 2 Stories Each

**Feature Branch**: `007-add-monsters-stories`

**Created**: 2026-08-21

**Status**: Draft

**Input**: User description: "Add 20 new monsters with 2 stories each for all monsters following the story guidelines"

## Clarifications

### Session 2026-08-21

- Q: Which 20 monsters should be added? → A: The authoring agent selects 20 canonical Witcher creatures, approximately 2 per category across the 10 central categories, consistent with the existing canonical roster.
- Q: Should each new story reference exactly one new monster or may stories feature multiple monsters? → A: Each new story centers exactly one new monster and may additionally co-feature existing monsters (never two new monsters), keeping every new monster at exactly 2 stories while matching the current two-monster story style.

## User Scenarios & Testing

### User Story 1 - Expand the Bestiary with 20 New Monsters (Priority: P1)

A visitor to the Bestiary can browse 20 additional monsters beyond the current catalog, each represented as structured data with a unique ID, name, one category from the central list, a threat level from 1 to 5, a description, an image reference, and the lore and weaknesses fields every existing entry includes. The new monsters appear automatically in every existing view (Bestiary Explorer, Monster Details) because the content layer aggregates data dynamically.

**Why this priority**: The new monster entries are the primary deliverable; every story, detail page, and discovery flow depends on them.

**Independent Test**: Count the monster entries in the content layer — exactly 20 new monsters are present (30 total) — and run automated validation; it passes with zero failures.

**Acceptance Scenarios**:

1. **Given** the content dataset, **When** new monster entries are added, **Then** exactly 20 additional monsters are present beyond the existing catalog.
2. **Given** a new monster entry, **When** it is inspected, **Then** it includes id, name, category, threat level, description, image reference, and the lore and weaknesses fields present in every existing monster entry.
3. **Given** a new monster entry, **When** its category is checked, **Then** it is one of the 10 central categories.
4. **Given** a new monster entry, **When** its threat level is checked, **Then** it is an integer from 1 to 5.
5. **Given** the new monsters, **When** automated validation runs, **Then** the dataset passes with zero failures.
6. **Given** the expanded dataset, **When** the existing UI consumes it, **Then** the new monsters appear without any application code changes.

---

### User Story 2 - Provide 2 Stories for Each New Monster (Priority: P1)

A visitor can read stories tied to each of the new monsters. Every new monster has 2 stories, each following the established story authoring conventions (structured sections, a summary, an image, and monster references that point to existing monsters). Existing stories remain untouched.

**Why this priority**: Stories are what give the new monsters depth; the two-per-monster pairing is the explicit ask.

**Independent Test**: For every new monster, verify exactly 2 stories reference it via their monster references, and that each story validates (unique URL-safe IDs, sections structure, resolved monster references).

**Acceptance Scenarios**:

1. **Given** a new monster, **When** stories are inspected, **Then** exactly 2 stories reference it via their monster references.
2. **Given** a new story, **When** it is inspected, **Then** it includes id, title, summary, image, monster references, and the sections structure.
3. **Given** a new story, **When** its monster references are checked, **Then** every referenced monster exists in the dataset.
4. **Given** a new story, **When** its sections are inspected, **Then** it has roughly 5–6 ordered sections (minimum 4) following the story guidelines.
5. **Given** a new story, **When** automated validation runs, **Then** it passes with zero failures.

---

### User Story 3 - Keep the Expanded Dataset Valid and Consistent (Priority: P1)

A content author or developer can run automated validation over the whole expanded dataset and receive zero failures. All new entries satisfy the content rules: unique URL-safe IDs (across monsters and stories), required fields present, categories from the central list, threat levels 1–5, story references resolving to existing monsters, and image references resolving to local files or the designated placeholder.

**Why this priority**: Validation is the safety net that keeps the dataset trustworthy as it grows, and automated validation is a project constitution requirement.

**Independent Test**: Run the dataset validation command; it reports zero failures. Introduce each class of invalid content and confirm it is rejected with a report identifying the offending entry.

**Acceptance Scenarios**:

1. **Given** the expanded dataset, **When** automated validation runs, **Then** it passes with zero failures.
2. **Given** a new monster with a duplicate, non-URL-safe, or missing ID, **When** validation runs, **Then** it is reported.
3. **Given** a new story referencing a nonexistent monster, **When** validation runs, **Then** the broken reference is reported.
4. **Given** a new entry whose image references a missing file, **When** validation runs, **Then** it is reported.
5. **Given** the placeholder image is used for an entry whose source image could not be retrieved, **When** validation runs, **Then** it still passes.

---

### User Story 4 - Preserve the Data-Driven Architecture (Priority: P1)

Adding the 20 new monsters and their stories requires no application code changes — no components, pages, styles, or logic. The content layer aggregates entries dynamically, so the new content flows into every existing view automatically.

**Why this priority**: This is the core architectural promise of the content foundation and a project constitution requirement.

**Independent Test**: Add the new content, then inspect the application — the new monsters and stories appear in the existing UI with no code modifications.

**Acceptance Scenarios**:

1. **Given** the new content is added, **When** the application is inspected, **Then** no UI component, page, style, or logic file was modified.
2. **Given** the new content, **When** existing views load, **Then** the new monsters and stories are displayed from the data layer.

---

### User Story 5 - Handle Monster and Story Imagery (Priority: P2)

A content author ensures every new monster and story references a local image file saved under the project's image directory, or the designated placeholder when a real image cannot be retrieved. Images are never hotlinked from external URLs.

**Why this priority**: Consistent local imagery keeps the site offline-safe, fast, and in line with the image convention.

**Independent Test**: For every new entry, confirm the image field references a local file (or the placeholder) and that validation's image-existence check passes.

**Acceptance Scenarios**:

1. **Given** a new monster or story, **When** its image reference is inspected, **Then** it points to a local file in the project's image directory.
2. **Given** a new monster or story, **When** its image reference is inspected, **Then** it does not hotlink an external URL.
3. **Given** an image that could not be retrieved during authoring, **When** the entry is created, **Then** it references the designated placeholder and still validates.

---

### Edge Cases

- What happens when a new monster and a new story accidentally share an ID? (Validation reports the duplicate ID across both types.)
- What happens when a new story references two new monsters? (Prevented during authoring so every new monster keeps exactly 2 stories; a second reference may only be an existing monster.)
- What happens when a new story references a monster that does not exist (yet)? (Validation reports the broken reference; references must resolve to existing monsters.)
- What happens when a new monster's category is not in the central list? (Validation rejects it; the category must be one of the 10 central categories.)
- What happens when a source image cannot be retrieved during authoring? (The entry uses the designated placeholder; validation still passes.)
- What happens when a monster entry is missing a required field? (Validation rejects it and names the missing field.)
- What happens when a story has fewer than 4 sections? (It fails the story-guidelines check and should be reworked before validation.)
- What happens when a new entry has a threat level of 0, 6, or text? (Validation rejects any value outside the numeric range 1–5.)
- What happens when the dataset is re-validated after authoring? (It passes with zero failures, confirming nothing was broken by the additions.)

## Requirements

### Functional Requirements

- **FR-001**: The dataset MUST contain exactly 20 new monster entries in addition to the existing catalog, so the bestiary grows from 10 to 30 monsters. The entries MUST be canonical Witcher creatures selected by the authoring agent, exactly 2 per category across the 10 central categories (locked in the authoring roster).
- **FR-002**: Every new monster entry MUST include all required fields: id, name, category, threat level, description, and image reference, as well as the lore and weaknesses fields that every existing monster entry includes.
- **FR-003**: Every new monster MUST belong to exactly one category from the central list of 10 categories.
- **FR-004**: Every new monster MUST have a threat level stored as an integer from 1 to 5.
- **FR-005**: Every new monster ID MUST be human-readable and URL-safe (lowercase letters, digits, hyphens) and MUST be unique across both monsters and stories.
- **FR-006**: Every new monster MUST have exactly 2 stories associated with it via the story monster-references field. This applies to the 20 new monsters only (40 new stories total); existing monsters and their stories are unchanged.
- **FR-007**: Every new story MUST include all required fields: id, title, summary, image, monster references, and the ordered sections structure.
- **FR-008**: Every new story MUST reference exactly one new monster as its subject; it MAY additionally reference existing monsters (matching the two-monster style of current stories) but MUST NOT reference a second new monster. Every reference MUST point to an existing monster in the dataset.
- **FR-009**: Every new story MUST follow the same approach as the current stories in the dataset: an ordered sections structure of roughly 5–6 sections per story (matching current stories; the validation floor is 4), a dark-fantasy cinematic narrative voice, a summary, a local image, and monster references that resolve to existing monsters.
- **FR-010**: New story IDs MUST be human-readable and URL-safe and MUST be unique across both monsters and stories.
- **FR-011**: The entire expanded dataset MUST pass automated validation with zero failures, covering duplicate IDs, non-URL-safe IDs, missing fields, invalid categories, out-of-range threat levels, broken story references, and image references to missing files.
- **FR-012**: Every new monster and story image MUST be a local file under the project's image directory; images MUST NOT be hotlinked from external URLs.
- **FR-013**: If a source image cannot be retrieved during authoring, the entry MUST reference the designated placeholder image and validation MUST NOT fail solely for that reason.
- **FR-014**: Adding the 20 new monsters and their stories MUST NOT require any application code changes (no components, pages, styles, or logic); new content MUST flow into existing views through the dynamic content layer.
- **FR-015**: The new content MUST be authored through the established on-demand authoring workflow and MUST conform to the same content structure and validation rules as all existing content.
- **FR-016**: Existing monsters and stories MUST remain unchanged; this feature only adds new content and does not modify or remove existing entries.

### Key Entities

- **Monster**: A creature entry (id, name, category, threat level 1–5, description, image reference, plus lore and weaknesses as in every existing entry). 20 new entries are added; all fields present.
- **Story**: A narrative entry (id, title, summary, image, monster references, ordered sections). 2 new stories are added per new monster, each centered on exactly one new monster and optionally co-featuring an existing monster.
- **Story Section**: An ordered part of a story (id, title, content). Roughly 5–6 sections per story matching current stories (validation floor: 4).
- **Category**: One of the 10 central classifications; new monsters reference categories from this list.
- **Image**: A local file under the project's image directory, or the designated placeholder; never a remote URL.

## Success Criteria

### Measurable Outcomes

- **SC-001**: The dataset contains exactly 20 new monsters (30 total), verified by counting entries in the content layer.
- **SC-002**: Every one of the 20 new monsters has exactly 2 stories referencing it, verified by inspecting story monster references (40 new stories total, each centered on exactly one new monster).
- **SC-003**: 100% of the expanded dataset passes automated validation with zero failures.
- **SC-004**: The 20 new monsters are canonical Witcher creatures spanning all 10 central categories (exactly 2 per category) with threat levels covering every level 1 through 5 (from wild-boar at 1 to djinn at 5).
- **SC-005**: Every story reference in the dataset resolves to an existing monster (FR-008), verified by automated validation.
- **SC-006**: Every new story has at least 4 ordered sections following the story guidelines (current stories run 5–6 sections).
- **SC-007**: Every new monster and story references a local image file or the placeholder; no remote hotlinks.
- **SC-008**: Adding the new content requires zero application code changes; existing monsters and stories are unchanged.

## Assumptions

- "The story guidelines" refers to following the same approach as the current stories in the dataset: structured ordered sections, at least 4 sections per story, a summary, a local image, and monster references to existing monsters, all in a dark-fantasy cinematic narrative voice. (Confirmed via clarification — "refer current stories and follow similar approach".)
- The "2 stories each" applies only to the 20 new monsters (40 new stories total); existing monsters, which already have 4–9 stories each, and their stories are untouched. (Confirmed via clarification — Q1: A.)
- The 20 new monsters are canonical Witcher creatures selected by the authoring agent, exactly 2 per category across the 10 central categories with threat levels spanning 1–5, so the dataset remains representative for every category. (Confirmed via clarification — Q1: A.)
- New content is authored through the established on-demand agent workflow: one content file per entry in the content layer, images saved locally under the project's image directory, post-hoc user review, and automated validation as the gate.
- This feature delivers content data only; no UI changes, backend, database, or user accounts are involved.
- This is an unofficial fan project; the user verifies lore accuracy during post-hoc review of the created content.

## Out of Scope

- UI changes (pages, components, styles, logic)
- Modifying or removing any existing monster or story
- New categories or threat-level semantics
- Backend, database, user accounts, or CMS
- Story editing, generation, or publishing tooling

## Definition of Done (Reference)

The feature is complete when:

- 20 new monster entries are added and appear in the existing bestiary views.
- Each new monster has 2 stories following the story guidelines.
- The entire expanded dataset passes automated validation with zero failures.
- No application code was modified and no existing content was changed.
- New images are local files (or placeholders), never hotlinked.
- The new content is documented/discoverable per the project wiki and knowledge principles.
