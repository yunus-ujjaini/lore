# Quickstart: Content Foundation & Content Pipeline

**Branch**: `001-content-foundation` | **Date**: 2026-08-14 | **Spec**: [spec.md](./spec.md)

This guide proves the feature works end-to-end. It is a validation/run guide — implementation details live in the plan and tasks.

## Prerequisites

- Node 24+ and npm (verified: node v24.12.0, npm 11.6.2)
- Dependencies installed: `npm install`

## Setup

```bash
npm install          # installs Vite, Zod, Vitest
```

## Validating the dataset

```bash
npm run validate     # full-dataset validation (vitest suite)
```

**Expected**: exit code 0, all validation assertions pass, report shows `content: VALID — N monsters, M stories, K categories`.

## Testing

```bash
npm test             # all suites: content-validation + edge cases
npm run test:e2e     # Playwright E2E over the served content pipeline
```

**Expected (`npm test`)**: all tests pass. The edge-case suite covers every class in FR-011 — duplicate IDs (incl. monster/story collision), non-URL-safe IDs, missing required fields, invalid category, out-of-range threat level, broken story reference, missing image file — each with a report identifying the entry and field.

**Expected (`npm run test:e2e`)**: all Playwright tests pass. The suite starts a static preview server and verifies end-to-end that every image referenced by content serves HTTP 200 with an allowlisted content type, the placeholder (`/images/placeholders/missing.png`) is reachable, and no content references remote/hotlinked images (FR-022).

## Authoring content (AI-assisted, on demand — FR-019)

1. **Monster**: create `content/monsters/<id>.ts` exporting the `Monster` shape — see [content-schema.md](./contracts/content-schema.md). Example: `content/monsters/leshen.ts` → `{ id: "leshen", name: "Leshen", category: "Relicts", threatLevel: 5, description: "...", image: "leshen.png" }`.
2. **Story**: create `content/stories/<id>.ts` exporting the `Story` shape; `monsterIds` references existing monsters.
3. **Image**: download the image to `public/images/monsters/<id>.png` (or `public/images/stories/`); if retrieval fails, reference `placeholders/missing.png` instead.
4. **Category**: to add a category, edit `content/categories.ts` — no code change required (FR-005).

**Bulk authoring**: a request such as "10 new monsters in this category" is fulfilled by the authoring agent creating the entries and images directly in the folders above; afterwards the user reviews the created folders and runs `npm run validate`.

## Verification scenarios (map to spec acceptance criteria)

| Scenario | Command / action | Expected result |
|----------|------------------|-----------------|
| Initial dataset meets targets (US5, SC-003) | `npm run validate` + inspect `content/` | ≥10 monsters, ~3 stories, ≥4 categories, ≥3 threat levels, zero validation failures |
| Valid entry accepted (US1) | Author complete monster; `npm run validate` | Passes |
| Missing required field rejected (US1) | Remove a field; `npm run validate` | Fails; report names entry and field |
| Invalid category rejected (US1) | Set category to "Spirits"; validate | Fails; invalid category reported |
| Out-of-range threat rejected (US1) | Set threatLevel 6; validate | Fails; violation reported |
| Duplicate ID rejected (US3) | Copy an ID into a second entry; validate | Fails; duplicate reported with both entries |
| Broken story reference rejected (US2/US3) | Reference nonexistent monster; validate | Fails; broken reference reported |
| Missing image rejected (US3) | Point image at nonexistent file; validate | Fails; missing file reported |
| Placeholder accepted (FR-023) | Use `placeholders/missing.png` | Passes |
| Content extensible without code changes (US6, SC-006) | Add one new valid monster; `npm run validate` | Passes; no application code changed |
| Central category list (US4, SC-004) | Inspect `content/categories.ts` | Exactly the 10 initial categories; adding one is a data edit |
| Served images reachable (E2E) | `npm run test:e2e` | Every content image URL returns 200 with allowlisted content type; placeholder reachable; no hotlinks |

## Out of scope (do not verify here)

UI rendering, consumption in the browser, backend, database, search, filters. Live consumption of this data is verified by future UI features (spec decision, session 2026-08-14).
