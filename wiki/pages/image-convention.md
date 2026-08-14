---
title: Image convention
type: decision
sources: [S001, S003]
updated: 2026-08-14
---

# Image convention

Monster and story images are local files; content never hotlinks remote URLs
(FR-022). (S001)

## Decision

- Images live in `public/images/monsters/<id>.png` and
  `public/images/stories/<id>.png`, filename derived from the entry ID, never
  from the original source filename.
- Designated placeholder: `public/images/placeholders/missing.png` — used when a
  scraped image cannot be retrieved (FR-023).
- Format: PNG (chosen during implementation — no webp encoder was available on
  the authoring machine); the extension allowlist is webp/jpg/jpeg/png (S003).
- Scraped images are copied locally; attribution/licensing is the user's
  responsibility as an unofficial fan project (S003).

## Alternatives rejected

- Hotlinking external URLs: link rot, referrer leakage, offline breaks.
- Storing raw scraped filenames: collisions, non-URL-safe characters.
- Validating field presence only (no file existence check): broken images
  silently shipped.
