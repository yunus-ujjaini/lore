---
title: Content validation
type: howto
sources: [S001, S003]
updated: 2026-08-14
---

# Content validation

Every dataset change is checked by an automated validator (`src/validation/`,
run via `npm run validate`). It is a build/dev-time step only — nothing ships to
the browser (constitution V). (S001)

## Rules

For each entry the validator reports the offending entry and field:

1. Duplicate IDs — including a monster and a story sharing an ID
2. Non-URL-safe IDs
3. Missing/empty required fields
4. Category not in the central list
5. Threat level outside integer range 1–5
6. Story reference to a nonexistent monster
7. Image reference to a missing local file
8. Image filename not URL-safe or extension not allowlisted
   (webp/jpg/jpeg/png)
9. Duplicate category names in the central list

## Commands

- `npm run validate` — CLI report, exit 0/1
- `npm test` — vitest suites: full-dataset checks, per-rule edge cases, schema
  tests, category/extensibility, expansion
- `npm run test:e2e` — Playwright: every content image serves 200 with an
  allowlisted content type over the real static server; placeholder reachable;
  no hotlinks

## Wiring and E2E rationale

- Validation runs on demand; there is deliberately no pre-commit gate in this
  feature (S003).
- This feature has no user-facing UI, so the Playwright E2E suite validates the
  served content pipeline over HTTP instead of a user journey; the harness is
  meant to be reused when UI features arrive (S003).
- Content is authored agent-side; the [authoring workflow](./authoring-workflow.md)
  page describes the process that produces the entries validation checks (S003).

## Notes

- The placeholder `placeholders/missing.png` is always valid (FR-023) and must
  exist (S003).
- The schema is built against the category list loaded from content data, so
  category changes are validated without code changes.
