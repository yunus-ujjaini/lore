---
title: Authoring workflow
type: howto
sources: [S003]
updated: 2026-08-21
---

# Authoring workflow

Dataset content is authored by the agent on request — e.g. "10 new monsters in
this category" or "20 new monsters with 2 stories each" — not through a CMS or
manual forms. (S003)

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

## Dataset expansion (feature 007, 2026-08-21)

- The dataset was expanded from 10 monsters / 30 stories to **30 monsters /
  70 stories** (20 canonical Witcher monsters, 2 per category, each with
  exactly 2 stories). Roster and story-pairing plan: `specs/007-add-monsters-stories/roster.md`.
- Authoring conventions observed during the expansion: each story centers on
  exactly one new monster and may co-feature one existing monster; stories run
  ~5 sections of dark-fantasy prose; monster images are scraped via the Fandom
  API + `static.wikia.nocookie.net` CDN (the wiki frontend is Cloudflare-blocked)
  and converted to PNG with `sips`; story images reuse the subject monster's
  art; failed retrievals use `placeholders/missing.png` (werebear, ekimmara).
- All content passes `npm run validate`; no application code changes were made
  by the content feature itself.

## Gotchas

- Every entry must pass validation before it counts; the schema is built against
  the category list loaded from content data, so category changes validate
  without code changes (S003).
- AI-authored entries must not bypass the rules: no invented categories, no
  broken references, no remote images (S003).

Related: [content-validation](./content-validation.md), [image-convention](./image-convention.md).
