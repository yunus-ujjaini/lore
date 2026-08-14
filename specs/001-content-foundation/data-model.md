# Data Model: Content Foundation

**Branch**: `001-content-foundation` | **Date**: 2026-08-14 | **Spec**: [spec.md](./spec.md) | **Contract**: [contracts/content-schema.md](./contracts/content-schema.md)

## Entities

### Monster

A creature entry in the catalog. Stored as `content/monsters/<id>.ts`, one entry per file.

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | string | yes | URL-safe: lowercase `[a-z0-9-]`. Unique across monsters **and** stories (FR-003). |
| `name` | string | yes | Non-empty. Display name. |
| `category` | string | yes | Must be one of the central category list (FR-004). Referenced by exact name. |
| `threatLevel` | number (integer) | yes | Range 1–5 inclusive (FR-007). Numeric only; labels are presentation. |
| `description` | string | yes | Non-empty. |
| `image` | string | yes | Filename referencing an existing local file under `public/images/monsters/`. URL-safe, allowlisted extension (webp/jpg/jpeg/png). Placeholder allowed (FR-023). |

### Story

A narrative entry linked to zero or more monsters. Stored as `content/stories/<id>.ts`, one entry per file.

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | string | yes | URL-safe: lowercase `[a-z0-9-]`. Unique across monsters **and** stories (FR-003). |
| `title` | string | yes | Non-empty. |
| `summary` | string | yes | Non-empty. |
| `content` | string | yes | Non-empty; no length cap, no truncation. |
| `monsterIds` | string[] | yes (may be empty) | Every reference must resolve to an existing monster (FR-009/FR-010). References are stored on the story only — one-way (assumption). |
| `image` | string | yes | Filename referencing an existing local file under `public/images/stories/`. Same rules as Monster.image. |

### Category

The central classification list. Stored as `content/categories.ts` — a single list, the single source of truth (FR-005).

| Aspect | Rule |
|--------|------|
| Initial content | Exactly these 10: `Beasts`, `Cursed Ones`, `Draconids`, `Elementa`, `Hybrids`, `Insectoids`, `Necrophages`, `Relicts`, `Specters`, `Vampires` |
| Extensibility | Plain data; adding/removing a name is a data edit, no code change (FR-005). Renaming requires updating referencing monsters — validation reports any monster left pointing at a removed category. |
| Uniqueness | Category names are unique within the list (no duplicates). |

### Threat Level

A standardized numeric scale 1–5 (Low → Extreme). Stored as the integer on Monster.threatLevel only. Display labels are presentation concerns and are NOT stored (FR-007).

## Relationships

```
Category 1 ── 1..* Monster   (every monster belongs to exactly one category)
Monster  1 ── 0..* Story     (stories reference monsters via monsterIds; references are one-way)
```

## Validation rules (from FR-011)

For each class, validation reports the offending entry (and field where applicable):

1. Duplicate IDs — two monsters, two stories, or a monster and a story sharing an ID
2. Non-URL-safe IDs (not lowercase `[a-z0-9-]`)
3. Missing/empty required fields (entry + field named)
4. Invalid category — not in the central list
5. Threat level outside 1–5 (or non-integer/non-numeric)
6. Story references to nonexistent monsters
7. Image references to missing files (checked relative to `public/images/<monsters|stories>/`)
8. Non-URL-safe or non-allowlisted image filenames
9. Category list invariants: exactly the initial 10 present at delivery; names unique

## State transitions

None. Content is static data; no lifecycle states. Dataset grows by addition of entries (FR-019/FR-021); additions never require application code changes (FR-015).

## Data volume

Initial: ~10 monsters, ~3 stories (FR-016/FR-017). Grows on demand; no architectural cap. Dataset intentionally small and representative for development.
