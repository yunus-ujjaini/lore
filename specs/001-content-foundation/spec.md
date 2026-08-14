# Feature Specification: Content Foundation & Content Pipeline

**Feature Branch**: `001-content-foundation`

**Created**: 2026-08-14

**Status**: Draft

**Input**: User description: "I want to rewrite first feature" — rewrite baseline: follow "Content Foundation & Content Pipeline — Functional Requirements.md" as the source of truth (simple model, categories restored, threat levels 1–5).

## Clarifications

### Session 2026-08-14

- Q: What form should monster and story IDs take? → A: Human-readable URL-safe IDs (e.g., `leshen`, `striga-of-maribor`), unique across both monsters and stories so future URLs and references never collide.
- Q: Does this feature include the mechanism by which the application loads/consumes content? → A: No. This feature delivers data and validation only; consumption is left entirely to future UI features, which will verify the DoD item "can be imported and consumed" against this data.
- Q: Is the category list fixed at the initial 10, or may it change? → A: Extensible as content data. Adding or removing a category is a data edit that requires no application code changes (consistent with the functional design's rule that the set must not be assumed fixed).
- Q: Should validation check that image references point to existing files? → A: Yes. Validation reports image references that resolve to missing files, in addition to the doc's basic checks.
- Q: How should the dataset be authored and expanded? → A: AI creates all dataset content. The authoring agent drafts monster and story entries directly into the content folders on request — including requests that specify a category and count, e.g., "10 new monsters in this category" — and the user validates afterward by inspecting the created folders. Review is post-hoc, not a pre-acceptance gate; expansion uses the same on-demand workflow.
- Q: Where do the monster and story images come from? → A: Scraped from the web: the authoring agent retrieves relevant images online and saves local copies in the project's content image location, referenced by the image field. If retrieval fails, the entry uses a placeholder until a real image is added.

## User Scenarios & Testing

### User Story 1 - Represent a Monster as Structured Data (Priority: P1)

A content author can represent any monster in the catalog as structured data with a unique ID, name, one category from the predefined list, a threat level from 1 to 5, a description, and an image reference. Every monster entry is complete: all six fields are required so the data is ready for any future UI to render.

**Why this priority**: The monster model is the contract every future UI feature consumes. Nothing in the product works without it.

**Independent Test**: Author a monster entry with all six fields and run validation — it is accepted; author an entry with any required field missing — it is rejected.

**Acceptance Scenarios**:

1. **Given** the content model, **When** a monster entry includes id, name, category, threat level, description, and image, **Then** the entry is valid and fully representable.
2. **Given** a monster entry, **When** any required field (id, name, category, threat level, description, image) is missing, **Then** validation rejects it.
3. **Given** a monster entry, **When** its category is not in the predefined list, **Then** validation rejects it.
4. **Given** a monster entry, **When** its threat level is outside the range 1–5, **Then** validation rejects it.

---

### User Story 2 - Represent a Story Linked to Monsters (Priority: P1)

A content author can represent a story as structured data with a unique ID, title, summary, content, an image reference, and references to zero or more monsters. Every monster referenced by a story must exist in the catalog, keeping the dataset consistent.

**Why this priority**: The story model is part of the same foundation contract; its monster links are how stories connect to the catalog.

**Independent Test**: Author a story referencing existing monsters and one referencing a nonexistent monster — the first validates, the second is rejected with a clear report.

**Acceptance Scenarios**:

1. **Given** the story model, **When** a story entry includes id, title, summary, content, image, and monster references, **Then** the entry is valid.
2. **Given** a story with monster references, **When** all referenced monsters exist, **Then** validation passes.
3. **Given** a story, **When** it references a monster that does not exist, **Then** validation reports the broken reference.
4. **Given** a story with no monster references, **When** it is validated, **Then** it remains valid (references are optional).

---

### User Story 3 - Validate the Whole Dataset Automatically (Priority: P1)

A content author or developer can run validation over the entire dataset and receive clear reports for: duplicate IDs, non-URL-safe IDs, missing required fields, invalid categories, threat levels outside 1–5, story references to nonexistent monsters, and image references to missing files. Each failure identifies the offending entry so it can be located and corrected.

**Why this priority**: Validation is the safety net that keeps the dataset trustworthy as it grows, and automated validation is a project constitution requirement.

**Independent Test**: Introduce each class of invalid content (duplicate ID, missing field, invalid category, out-of-range threat level, broken reference) and confirm validation rejects each with a report identifying the entry.

**Acceptance Scenarios**:

1. **Given** two content entries sharing an ID (two monsters, two stories, or a monster and a story), **When** validation runs, **Then** each duplicate is reported with enough detail to locate and fix it.
2. **Given** an entry with a missing required field, **When** validation runs, **Then** the entry and the missing field are reported.
3. **Given** a monster with an invalid category or an out-of-range threat level, **When** validation runs, **Then** the violation is reported.
4. **Given** a story referencing a nonexistent monster, **When** validation runs, **Then** the broken reference is reported.
5. **Given** an image reference that resolves to a missing file, **When** validation runs, **Then** it is reported.
6. **Given** fully valid content, **When** validation runs, **Then** it passes with zero failures.

---

### User Story 4 - Reuse a Central Category List (Priority: P2)

The application provides a predefined list of monster categories stored centrally in one place: Beasts, Cursed Ones, Draconids, Elementa, Hybrids, Insectoids, Necrophages, Relicts, Specters, and Vampires. The list is content data and may grow or shrink over time without application code changes. Monsters reference categories from this list, and future features consume the same list instead of redefining it.

**Why this priority**: A single source of truth for categories prevents drift between features and keeps the data consistent.

**Independent Test**: Inspect the category list — it contains the 10 predefined categories; confirm a monster can only use a category from that list; add a new category as a data edit and confirm a monster can reference it without application code changes.

**Acceptance Scenarios**:

1. **Given** the central category list, **When** it is inspected, **Then** it contains the 10 predefined categories.
2. **Given** a monster entry, **When** its category is assigned, **Then** it must be one of the categories in the central list.
3. **Given** a future feature, **When** it needs category information, **Then** it consumes the central list rather than defining its own.
4. **Given** a new category added to the central list as a data edit, **When** a monster references it, **Then** the entry is valid and no application code changes are required.

---

### User Story 5 - Ship the Initial Development Dataset (Priority: P2)

The feature delivers a small dataset for development: approximately 10 monsters spread across multiple categories and different threat levels, and approximately 3 stories that reference monsters. Entries are produced through AI-assisted authoring on request, and the dataset is sufficient to exercise and test future UI features.

**Why this priority**: A small but varied dataset is the deliverable future features consume and test against.

**Independent Test**: Count the dataset (at least 10 monsters, ~3 stories); run validation over it; confirm it passes.

**Acceptance Scenarios**:

1. **Given** the initial dataset, **When** it is counted, **Then** it contains at least 10 monsters and approximately 3 stories.
2. **Given** the initial dataset, **When** its categories are checked, **Then** multiple categories are represented.
3. **Given** the initial dataset, **When** its threat levels are checked, **Then** different threat levels are represented.
4. **Given** the initial dataset, **When** validation runs, **Then** it passes with zero failures.

---

### User Story 6 - Structure Content for Future Consumption (Priority: P2)

A content author can add or edit valid content (monsters, categories, stories) without requiring any application code changes, because the content layer is structurally independent of UI code. Future UI features will consume this content through the content layer; verifying live consumption happens in those features, not here.

**Why this priority**: Content independence is the core architectural promise of the feature — it is what makes the catalog scalable and is required by the project constitution.

**Independent Test**: Add a new valid monster to the dataset; run validation; confirm the dataset remains valid and no application code change is needed.

**Acceptance Scenarios**:

1. **Given** the content layer, **When** a new valid monster is added to the dataset, **Then** validation passes and no application code changes are required.
2. **Given** the content layer, **When** the dataset is inspected, **Then** content is stored separately from UI code (no UI component contains monster data).

---

### Edge Cases

- What happens when a story references no monsters? (It remains valid; references are optional.)
- What happens when a story references a monster that does not exist? (Validation reports the broken reference; it is not silently dropped.)
- What happens when two monsters, two stories, or a monster and a story share an ID? (Validation reports the duplicate IDs.)
- What happens when a threat level is 0, 6, or text? (Validation rejects any value outside the numeric range 1–5.)
- What happens when a monster's category is misspelled or not in the list? (Validation rejects it as an invalid category.)
- What happens when a category is added or renamed? (The list is content data; categories are referenced by exact name, so renaming requires updating referencing monsters, and validation reports any monster left pointing at a removed category.)
- What happens when a required field is missing or empty? (Validation rejects the entry and names the missing field.)
- What happens when an image reference points to a missing file? (Validation reports it as a broken image reference.)
- What happens when a web image cannot be retrieved during authoring? (The entry uses a designated placeholder until a real image is added; validation still passes.)
- What happens when a description or story is very long? (Content remains valid; no truncation or corruption.)

## Requirements

### Functional Requirements

- **FR-001**: The content layer MUST provide a structured monster model with a unique identifier for every monster.
- **FR-002**: Every monster MUST include exactly these required fields: id, name, category, threat level, description, and image reference.
- **FR-003**: Monster and story IDs MUST be human-readable and URL-safe (lowercase letters, digits, and hyphens), and MUST be unique across both monsters and stories so that future URLs and references never collide.
- **FR-004**: Every monster MUST belong to exactly one category from the predefined list.
- **FR-005**: The application MUST provide a central category list, stored as a single source of truth, initialized with: Beasts, Cursed Ones, Draconids, Elementa, Hybrids, Insectoids, Necrophages, Relicts, Specters, and Vampires. The list MUST be extensible as content data: adding or removing a category is a data edit that requires no application code changes.
- **FR-006**: Future features MUST be able to consume the central category list without redefining or duplicating it.
- **FR-007**: Threat level MUST be stored as a numeric value on the range 1–5, not as free-form text; display labels (e.g., Low, Moderate, Dangerous, Very Dangerous, Extreme) are a presentation concern and MUST NOT be stored as content.
- **FR-008**: The content layer MUST provide a structured story model with a unique identifier for every story.
- **FR-009**: Every story MUST include these required fields: id, title, summary, content, image reference, and a monster-references field. The monster-references field may be empty, but every reference it contains MUST point to an existing monster.
- **FR-010**: A story MUST be able to reference one or more monsters.
- **FR-011**: Automated validation MUST detect and report: duplicate IDs (including a monster and a story sharing an ID), non-URL-safe IDs, missing required fields, invalid categories, threat levels outside 1–5, story references to nonexistent monsters, and image references that resolve to missing files.
- **FR-012**: Validation failures MUST identify the offending entry clearly enough for a content author or developer to locate and correct it.
- **FR-013**: Content MUST be kept separately from UI code, organized into three parts: categories, monsters, and stories.
- **FR-014**: The content layer MUST be structured so that future UI features can consume monsters, categories, and stories from it without hardcoding or redefining the data.
- **FR-015**: Adding or editing valid content MUST NOT require application code changes (pages, components, styling, or logic).
- **FR-016**: The initial dataset MUST contain approximately 10 monsters, spanning multiple categories and different threat levels.
- **FR-017**: The initial dataset MUST contain approximately 3 stories, with at least one story referencing more than one monster.
- **FR-018**: The initial dataset MUST be sufficient to exercise future UI features without modification.
- **FR-019**: The dataset MUST be authored with AI assistance: the authoring agent creates monster and story entries directly in the content structure on request, including requests that specify a category and a count (e.g., "10 new monsters in this category").
- **FR-020**: AI-authored entries MUST conform to the same content structure and validation rules as all other content; authoring MUST NOT bypass required fields, the category list, references, or image requirements.
- **FR-021**: The dataset MUST be expandable at any time through the same on-demand authoring workflow, with validation available to check additions; expansion MUST NOT require application code changes (per FR-015).
- **FR-022**: Monster and story images MUST be sourced from the web: the authoring agent retrieves relevant images online and saves them as local files in the project's content image location, referenced by the image field. Images MUST NOT be hotlinked or stored only as external URLs.
- **FR-023**: If a source image cannot be retrieved, the entry MUST reference a designated placeholder image until a real image is added; validation MUST NOT fail solely because a placeholder is used.

### Key Entities

- **Monster**: A creature entry with a unique, human-readable URL-safe ID (e.g., `leshen`), name, one category, a threat level from 1–5, a description, and an image reference. All fields are required.
- **Category**: One of the monster classifications (initially: Beasts, Cursed Ones, Draconids, Elementa, Hybrids, Insectoids, Necrophages, Relicts, Specters, Vampires), stored centrally as a single source of truth and extensible as content data.
- **Threat Level**: A standardized numeric scale from 1 to 5 representing danger; display labels are presentation concerns.
- **Story**: A narrative entry with a unique, human-readable URL-safe ID, title, summary, content, an image reference, and references to zero or more existing monsters.

## Success Criteria

### Measurable Outcomes

- **SC-001**: 100% of the initial dataset passes automated validation with zero failures.
- **SC-002**: Each class of invalid content (duplicate ID, non-URL-safe ID, missing required field, invalid category, out-of-range threat level, broken story reference, image reference to a missing file) is detected by validation and produces a report that identifies the offending entry.
- **SC-003**: The initial dataset contains at least 10 monsters spanning at least 4 different categories and at least 3 distinct threat levels, plus approximately 3 stories.
- **SC-004**: The central category list exists in one place and contains all 10 predefined categories.
- **SC-005**: Every story reference in the dataset resolves to an existing monster.
- **SC-006**: Adding one new valid monster beyond the initial dataset requires no application code changes.

## Assumptions

- All six monster fields are required, per the requirements document ("Each monster must contain").
- All five story fields (id, title, summary, content, image) plus the monster-references field are required; the reference list itself may be empty.
- Story–monster links are stored on the story only; monsters do not list their stories (two-way links are not required).
- Threat-level display labels (Low, Moderate, Dangerous, Very Dangerous, Extreme) are presentation concerns; only the numeric value is stored in content.
- The exact content file organization is decided during planning; the conceptual split into categories, monsters, and stories is a requirement.
- The dataset is intentionally small and representative for development, not production-sized.
- Validation runs on demand; integration into the development workflow (e.g., before commit or at build) is decided during planning.
- Image references point to files that live in the project's content image location; validation checks existence relative to that location, whose exact path is decided during planning.
- Scraped images are copied locally and referenced by filename, never hotlinked; attribution and licensing of scraped images are the user's responsibility as an unofficial fan project.
- No backend, database, user accounts, or user-facing screens are in scope.
- The dataset is authored by AI on request; the user performs post-hoc review and validation by inspecting the created content folders. This project is an unofficial fan creation, so AI-authored lore accuracy is verified by the user during that review.
- This feature delivers data and validation only; the mechanism by which the application loads or consumes content belongs to future UI features, which verify that the data is consumable.

## Out of Scope

The following are intentionally excluded and may be added in future features:

- Backend and database
- User accounts
- Search and filters
- Monster detail pages
- Advanced lore information
- Source management
- Content management system
- AI content-generation system (a user-facing generation feature; AI-assisted authoring of the dataset itself is in scope as the content-creation workflow)
- Interactive map
- Favorites and comments

## Definition of Done (Reference)

Per the requirements document, the feature is complete when: data structures are implemented; initial monsters and stories are added; validation passes; no backend is required; content is structured so it can be consumed by future features without structural changes (live consumption is verified by those future features); and important implementation decisions are recorded in the project Wiki. The project constitution's Definition of Done also applies.
