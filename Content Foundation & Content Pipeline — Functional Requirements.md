# Monster & Story Data

## 1. Purpose

Create a simple, structured content foundation for the Witcher Bestiary website.

This feature provides basic data that future UI features can consume.

---

## 2. Scope

The feature contains only:

* Monsters
* Categories
* Threat levels
* Stories

No backend or database is required.

---

## 3. Monster

Each monster must contain:

* `id`
* `name`
* `category`
* `threatLevel`
* `description`
* `image`

Example:

```text
Leshen
Category: Relicts
Threat: 5
Description: An ancient creature associated with forests.
Image: leshen.webp
```

---

## 4. Categories

The application must have a predefined list of monster categories.

Initial categories:

* Beasts
* Cursed Ones
* Draconids
* Elementa
* Hybrids
* Insectoids
* Necrophages
* Relicts
* Specters
* Vampires

The category list should be stored centrally so it can be reused by future features.

---

## 5. Threat Levels

Every monster must have a threat level from 1 to 5.

```text
1 — Low
2 — Moderate
3 — Dangerous
4 — Very Dangerous
5 — Extreme
```

The application should store the numeric value. Future UI can decide how to display it.

---

## 6. Story

Each story must contain:

* `id`
* `title`
* `summary`
* `content`
* `monsterIds`
* `image`

A story may be associated with one or more monsters.

---

## 7. Initial Content

Create a small dataset for development:

* Around 10 monsters
* Multiple categories
* Different threat levels
* Around 3 stories

The dataset should be sufficient to test future UI features.

---

## 8. Data Organization

Content should be kept separately from UI code.

Suggested structure:

```text
content/
├── categories.ts
├── monsters.ts
└── stories.ts
```

Future UI components should consume this data rather than hardcoding monster information.

---

## 9. Validation

Basic validation must ensure:

* Every monster has a unique ID.
* Every story has a unique ID.
* Every monster has a valid category.
* Every monster has a threat level from 1–5.
* Story monster references point to existing monsters.
* Required fields are present.

---

## 10. Out of Scope

The following are intentionally excluded:

* Backend
* Database
* User accounts
* Search
* Filters
* Monster detail pages
* Advanced lore information
* Source management
* Content management system
* AI content-generation system
* Interactive map
* Favorites
* Comments

These may be added in future features.

---

## 11. Acceptance Criteria

The feature is complete when:

1. Monster data can be stored in a structured format.
2. Categories are centrally defined.
3. Threat levels are standardized.
4. Stories can reference monsters.
5. Initial sample data is available.
6. Basic validation works.
7. Content is separate from UI code.
8. Future features can consume the data without changing the data structure.

---

## 12. Definition of Done

* Data structures are implemented.
* Initial monsters and stories are added.
* Validation passes.
* No backend is required.
* Data can be imported and consumed by the application.
* The project Wiki contains any important decisions made during implementation.
