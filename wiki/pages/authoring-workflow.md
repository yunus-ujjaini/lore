---
title: Authoring workflow
type: howto
sources: [S003]
updated: 2026-08-14
---

# Authoring workflow

Dataset content is authored by the agent on request — e.g. "10 new monsters in
this category" — not through a CMS or manual forms. (S003)

## How it works

1. The authoring agent creates one TS file per entry directly in
   `content/monsters/<id>.ts` or `content/stories/<id>.ts`, conforming to the
   [content model](./content-model.md) contract (all fields required, URL-safe
   IDs, category from the central list, threat level 1–5).
2. Images are retrieved from the web and saved as local files under
   `public/images/` — never hotlinked; if retrieval fails the entry references
   `placeholders/missing.png` (see [image convention](./image-convention.md)).
3. Review is **post-hoc**: the user inspects the created folders afterwards and
   runs `npm run validate` as the gate. There is no pre-acceptance review step.
4. Expansion uses the same workflow at any time; adding or editing content never
   requires application code changes, because `content/index.ts` aggregates
   entries dynamically (S003).

## Gotchas

- Every entry must pass validation before it counts; the schema is built against
  the category list loaded from content data, so category changes validate
  without code changes (S003).
- AI-authored entries must not bypass the rules: no invented categories, no
  broken references, no remote images (S003).

Related: [content-validation](./content-validation.md), [image-convention](./image-convention.md).
