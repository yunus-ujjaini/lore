---
title: Content model
type: concept
sources: [S001, S002, S003]
updated: 2026-08-14
---

# Content model

The bestiary's content foundation is a static, data-driven layer: structured
content lives in TypeScript modules under `content/`, entirely separate from UI
code (constitution IV). (S001, S002)

## Entities

- **Monster** (`content/monsters/<id>.ts`, one entry per file): `id`, `name`,
  `category`, `threatLevel` (integer 1–5), `description`, `image`. All fields
  required.
- **Story** (`content/stories/<id>.ts`): `id`, `title`, `summary`, `content`,
  `monsterIds` (may be empty; each must resolve to an existing monster), `image`.
  References are one-way: stories → monsters.
- **Category** (`content/categories.ts`): a single central list, the single
  source of truth; extensible as a data edit with no code change.
- **Threat level**: numeric 1–5 only; display labels are presentation concerns
  and are never stored.

## Identity rules

- IDs are human-readable, URL-safe (`[a-z0-9-]`), unique across monsters AND
  stories, so future URLs cannot collide. Decision: 2026-08-14 (S003).
- Categories are referenced by exact name; renaming a category requires
  updating referencing monsters, and validation reports stragglers.

## Consumption

`content/index.ts` dynamically aggregates all monsters/stories so adding
content never requires editing code (SC-006). Browser-side consumption is
deliberately deferred to future UI features (decision: 2026-08-14) (S003).

## Layout

Content data lives in `content/` (categories, monsters/, stories/), images in
`public/images/`, and validation in `src/validation/` — the plan's structure
decision (S003).

## Authoring

Entries are produced by the agent-driven [authoring workflow](./authoring-workflow.md)
on request, with post-hoc user review and validation (S003). Stack choices are
recorded in [tech-stack](./tech-stack.md). Images follow the
[image convention](./image-convention.md).
