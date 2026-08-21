# Quickstart: Add 20 New Monsters with 2 Stories Each

**Branch**: `007-add-monsters-stories` | **Date**: 2026-08-21 | **Spec**: [spec.md](./spec.md)

This guide proves the feature works end-to-end. It is a validation/run guide — implementation details live in the plan and tasks. Authoring rules: [expansion-contract.md](./contracts/expansion-contract.md); data shapes: [data-model.md](./data-model.md); roster: [research.md](./research.md).

## Prerequisites

- Node 24+ and npm (verified: node v24.12.0)
- Dependencies installed: `npm install`
- Existing Feature 1 content layer and validation in place

## Setup

```bash
npm install
```

## Validating the expanded dataset

```bash
npm run validate
```

**Expected**: exit code 0, report shows `content: VALID — 30 monsters, 70 stories, 10 categories`.

## Testing

```bash
npm test             # all vitest suites (schema, edge cases, expansion, dataset)
npm run test:e2e     # Playwright: served content + existing UI journeys
```

**Expected**: all tests pass. Existing assertions use lower bounds (`≥10` monsters, `≥3` stories, exactly 10 categories) so the expansion is compatible; E2E automatically checks every new image serves HTTP 200 with an allowlisted content type and that no entry hotlinks remote images.

## Authoring verification scenarios (map to spec acceptance criteria)

| Scenario | Command / action | Expected result |
|----------|------------------|-----------------|
| 20 new monsters present (US1, SC-001) | `npm run validate` + inspect `content/monsters/` | 30 monster files; each has id, name, category, threatLevel 1–5, description, image, lore, weaknesses |
| Canonical roster, 2 per category (FR-001, SC-004) | Inspect `content/monsters/` | 20 canonical Witcher creatures, exactly 2 per category, no overlap with existing 10 |
| Exactly 2 stories per new monster (FR-006, SC-002) | For each new monster ID, grep `monsterIds` across `content/stories/` | Exactly 2 story files reference it (40 new story files total) |
| Co-reference rule (FR-008) | Inspect `monsterIds` of each new story | Exactly one new monster ID; second reference (if any) is an existing monster; never two new monsters |
| Story conventions (FR-009, SC-006) | Inspect a sample of new stories | 5–6 ordered sections each, per-section titles, multi-paragraph cinematic prose, summary present |
| Every reference resolves (SC-005) | `npm run validate` | Passes; no broken references |
| Existing content untouched (FR-016, SC-008) | `git status` / `git diff` | Only additions under `content/` and `public/images/`; no modifications to existing entries |
| Zero application code changes (FR-014, SC-008) | `git diff --stat` on `src/`, `tests/`, `scripts/` | Empty |
| Images local, no hotlinks (FR-012, SC-007) | `npm run test:e2e` | Every content image URL returns 200; no remote URLs in data |
| Placeholder accepted (FR-013) | Use `placeholders/missing.png` for an entry whose image retrieval failed | `npm run validate` passes |
| Whole dataset valid (FR-011, SC-003) | `npm run validate` | Zero failures |
| Existing UI shows new content (US1/US2) | `npm run dev` → browse `/bestiary` and `/stories` | New monsters and their stories appear via the data layer |

## Out of scope (do not verify here)

UI changes, backend, database, user accounts, new categories, modifying existing content. Consumption in the browser is verified through the existing features' pages as a smoke check only (per above), not as new functionality.