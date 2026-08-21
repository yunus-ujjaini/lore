# Data Model: Grimoire Visual Redesign

**Feature**: 006-grimoire-visual-redesign
**Date**: 2026-08-21

## Entities

### Monster (extended)

Existing entity with two optional fields added.

| Field | Type | Required | Source | Notes |
|---|---|---|---|---|
| id | string | ✅ | content/monsters/*.ts | URL-safe, unique across monsters+stories |
| name | string | ✅ | content/monsters/*.ts | Display name |
| category | Category | ✅ | content/monsters/*.ts | From categories.ts list |
| threatLevel | 1–5 | ✅ | content/monsters/*.ts | Integer, displayed as threat stars |
| description | string | ✅ | content/monsters/*.ts | Main body text (Field Description) |
| image | string | ✅ | content/monsters/*.ts | Filename or placeholders/missing.png |
| lore | string | ❌ NEW | content/monsters/*.ts | Scholar's Notes text; optional, absent = no section rendered |
| weaknesses | string[] | ❌ NEW | content/monsters/*.ts | Weakness tags; optional, absent = no section rendered |

**Validation**: Zod schema extended with `.optional()` on `lore` and `weaknesses`. Strict mode rejects unknown fields. Existing entries without these fields pass validation.

**UI mapping**:
- `description` → "Field Description" section (FR-020)
- `lore` → "Scholar's Notes" section, italic IM Fell English (FR-021); omitted if absent
- `weaknesses` → "Known Weaknesses" tag list (FR-022); omitted if absent
- `image` → full-width hero at top of detail page (FR-018)
- `category` → accent color bar, filter pill, badge (FR-007, FR-013)

### Story (unchanged)

| Field | Type | Required | Source | Notes |
|---|---|---|---|---|
| id | string | ✅ | content/stories/*.ts | URL-safe, unique |
| title | string | ✅ | content/stories/*.ts | Display title |
| summary | string | ✅ | content/stories/*.ts | Card + reader summary |
| content | string | ❌ | content/stories/*.ts | Legacy single-string format |
| sections | StorySection[] | ❌ | content/stories/*.ts | New multi-chapter format |
| monsterIds | string[] | ✅ | content/stories/*.ts | References to monster IDs |
| image | string | ✅ | content/stories/*.ts | Filename or placeholders/missing.png |

**StorySection** (sub-entity):

| Field | Type | Required | Notes |
|---|---|---|---|
| id | string | ✅ | URL-safe section ID |
| title | string | ✅ | Chapter/section title |
| content | string | ✅ | Section body text |

**UI mapping**:
- `image` → full-width hero at top of reader page (FR-028)
- `sections` (or legacy `content` wrapped as single section) → chapter rendering with progress tracking (FR-031–033)
- `monsterIds` → "Monsters Encountered" rows (FR-034)

### Category (unchanged)

Defined in `content/categories.ts` as a readonly string array. Used for:
- Monster schema validation (must be from this list)
- Filter pills on Bestiary page
- Heraldic color mapping (category → muted hue for accent bars)

## State Transitions

No new state transitions. Existing states preserved:
- **Filter state**: `{ search, category, threatLevel }` persisted to sessionStorage
- **Reading progress**: Scroll-bound, ephemeral (not persisted)
- **Active chapter**: Scroll-bound, ephemeral

## Data Volume

- 10 monsters (will be extended with lore/weaknesses)
- 30 stories (unchanged)
- 10 categories (unchanged)
- 7 story images + 10 monster images + 1 placeholder (unchanged)
