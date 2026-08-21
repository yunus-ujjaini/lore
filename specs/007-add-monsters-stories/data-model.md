# Data Model: Add 20 New Monsters with 2 Stories Each

**Branch**: `007-add-monsters-stories` | **Date**: 2026-08-21 | **Spec**: [spec.md](./spec.md) | **Contract**: [contracts/expansion-contract.md](./contracts/expansion-contract.md)

This feature adds data only; the schema in `src/validation/schema.ts` is unchanged (see Feature 1 contract). All entries conform to the existing schema; the tables below record the shapes as authored by this feature.

## Entities

### Monster (Read-Only)

Stored as `content/monsters/<id>.ts`, one entry per file. 20 new entries are added (10 → 30 total).

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | string | yes | URL-safe: lowercase `[a-z0-9-]`. Unique across monsters **and** stories (FR-005). |
| `name` | string | yes | Non-empty. Canonical Witcher creature name (e.g., "Werewolf"). |
| `category` | string | yes | One of the 10 central categories (FR-003); ~2 per category across the roster. |
| `threatLevel` | number (integer) | yes | Range 1–5 (FR-004); spread across the roster (bear 2 … djinn 5). |
| `description` | string | yes | Non-empty; 1–2 sentences of canonical lore. |
| `image` | string | yes | Local file `public/images/monsters/<id>.png`; placeholder allowed (FR-013). |
| `lore` | string | optional (schema) — authored for every entry | Consistent with all 10 existing monsters, which include it. |
| `weaknesses` | string[] | optional (schema) — authored for every entry | Consistent with all 10 existing monsters, which include it. |

### Story (Read-Only)

Stored as `content/stories/<id>.ts`, one entry per file. 40 new entries are added (30 → 70 total), exactly 2 per new monster (FR-006).

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | string | yes | URL-safe: lowercase `[a-z0-9-]`. Unique across monsters **and** stories (FR-010). |
| `title` | string | yes | Non-empty. |
| `summary` | string | yes | Non-empty; 1–2 sentences, matching current stories. |
| `sections` | StorySection[] | yes | 5–6 ordered sections per story (validation floor 4; matches all 30 current stories). |
| `monsterIds` | string[] | yes | Exactly one **new** monster (its subject) plus optionally one **existing** monster as co-feature; never two new monsters (FR-008). Every id must resolve to an existing monster. |
| `image` | string | yes | Local file `public/images/stories/<id>.png` or `placeholders/missing.png` (7 of 30 current stories use real images; the placeholder is valid). |

### StorySection (Read-Only)

Part of a story, ordered within it.

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | string | yes | URL-safe; unique within the story. |
| `title` | string | yes | Non-empty section heading. |
| `content` | string | yes | Non-empty; multi-paragraph narrative prose in the dark-fantasy cinematic voice. |

### Category (Read-Only)

Central list in `content/categories.ts` — unchanged. The roster uses all 10: Beasts, Cursed Ones, Draconids, Elementa, Hybrids, Insectoids, Necrophages, Relicts, Specters, Vampires (2 monsters each).

## Relationships

```
Category 1 ── 1..* Monster            (exactly 1 category per monster; 2 monsters per category in the new roster)
New Monster      1 ── exactly 2 Story (2 new stories per new monster via monsterIds)
Existing Monster 1 ── 4..* Story      (existing stories unchanged, FR-016)
Story    1 ── 1..* StorySection       (ordered 5–6 sections)
Story    1 ── 1..2 Monster            (1 new subject + optional 1 existing co-feature)
```

References are one-way: stories → monsters. Monsters do not list stories (Feature 1 decision).

## Authoring rules for this feature (FR-006/FR-008/FR-009/FR-016)

1. 20 new monsters: canonical Witcher creatures, 2 per category, no overlap with the existing 10 (see [research.md](./research.md) R1 roster).
2. Each new monster gets exactly 2 new stories centered on it; a story MAY add exactly one existing monster as co-feature and MUST NOT reference a second new monster.
3. Stories follow the current-story conventions: 5–6 sections, dark-fantasy cinematic prose, summary, local image or placeholder.
4. Existing monsters and stories are never modified or removed (FR-016).
5. No application code changes (FR-014); validation and tests consume the dataset dynamically.

## Validation rules (unchanged, applied to the expanded dataset — FR-011)

1. Duplicate IDs across monsters and stories
2. Non-URL-safe IDs
3. Missing/empty required fields
4. Invalid category (not in the central list)
5. Threat level outside integer range 1–5
6. Story references to nonexistent monsters
7. Image references to missing local files
8. Non-URL-safe or non-allowlisted image filenames (webp/jpg/jpeg/png)
9. Category list invariants (exactly 10, unique)

The "exactly 2 stories per new monster" rule is an authoring discipline, not a schema rule — the schema cannot distinguish new from existing monsters. It is verified by inspection and post-hoc review (quickstart scenario).

## State transitions

None. Static data; the dataset grows by addition only.

## Data volume

After this feature: 30 monsters, 70 stories, up to 60 new local images, 10 categories. No architectural cap; static build-time modules.