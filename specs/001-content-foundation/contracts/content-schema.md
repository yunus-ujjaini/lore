# Content Schema Contract

**Branch**: `001-content-foundation` | **Date**: 2026-08-14 | **Spec**: [spec.md](../spec.md)

This contract defines the content interface future features consume. Future UI features import types and (optionally) schemas from the content layer; they MUST NOT redefine or hardcode this data (FR-006/FR-014). The contract is versioned by the schema in `src/validation/schema.ts`; changes require a documented, intentional spec change (constitution IX).

## 1. Category list

Source: `content/categories.ts` — exports the central list:

```text
categories: readonly string[]
```

- Initial values: `Beasts`, `Cursed Ones`, `Draconids`, `Elementa`, `Hybrids`, `Insectoids`, `Necrophages`, `Relicts`, `Specters`, `Vampires`
- Extensible as data (FR-005); names unique; referenced by exact name.
- Consumed as a single source of truth; never redefined by consumers (FR-006).

## 2. Monster

Source: `content/monsters/<id>.ts` — each file exports one `Monster` object.

```text
Monster {
  id:          string   // URL-safe [a-z0-9-], unique across monsters and stories
  name:        string   // non-empty
  category:    string   // must exist in the central category list
  threatLevel: number   // integer 1-5
  description: string   // non-empty
  image:       string   // filename in public/images/monsters/, must exist, allowlisted extension
}
```

All fields are required; no optional fields exist in this version.

## 3. Story

Source: `content/stories/<id>.ts` — each file exports one `Story` object.

```text
Story {
  id:         string     // URL-safe [a-z0-9-], unique across monsters and stories
  title:      string     // non-empty
  summary:    string     // non-empty
  content:    string     // non-empty
  monsterIds: string[]   // may be empty; every id must exist in monsters
  image:      string     // filename in public/images/stories/, must exist, allowlisted extension
}
```

All fields are required; the `monsterIds` array itself may be empty. References are one-way (story → monsters); monsters do not list stories.

## 4. Image files

- Location: `public/images/monsters/<id>.<ext>` and `public/images/stories/<id>.<ext>`
- Filenames: derived from the entry ID (slug-derived), lowercase, URL-safe, extension allowlist `webp | jpg | jpeg | png`
- Placeholder: `public/images/placeholders/missing.png` — valid when a scraped image could not be retrieved (FR-023); validation must not fail solely because a placeholder is used
- Remote/hotlinked images are forbidden (FR-022)

## 5. Validation contract

Run: `npm run validate` (Node) — validates the entire dataset against the rules below. Exit code 0 = valid; non-zero = invalid.

Reported classes (each identifies the offending entry, and field where applicable):

| # | Rule | Source |
|---|------|--------|
| 1 | Duplicate IDs across monsters and stories | FR-011 |
| 2 | Non-URL-safe IDs | FR-011 |
| 3 | Missing/empty required fields | FR-011 |
| 4 | Invalid category (not in central list) | FR-011 |
| 5 | Threat level outside integer range 1–5 | FR-011 |
| 6 | Story references to nonexistent monsters | FR-011 |
| 7 | Image reference to a missing local file | FR-011 (user decision) |
| 8 | Image filename non-URL-safe or non-allowlisted extension | FR-003/FR-022 (design) |
| 9 | Category list: duplicate names, or (at delivery) missing initial categories | FR-005 (design) |

Types and schemas are exported from `src/validation/schema.ts`; consumers import from there rather than redeclaring shapes.
