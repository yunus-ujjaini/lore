# Data Model: Bestiary Explorer

**Branch**: `002-bestiary-explorer` | **Date**: 2026-08-14

## Entities

### Monster (Read-Only)

Consumed from Feature 1 content layer. The UI does not create, modify, or store monsters.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| `id` | `string` | `content/monsters/<id>.ts` | URL-safe identifier (lowercase letters, digits, hyphens) |
| `name` | `string` | Content data | Display name (e.g., "Leshen") |
| `category` | `Category` | Content data | One of the 10 central categories |
| `threatLevel` | `1-5` | Content data | Numeric threat level |
| `description` | `string` | Content data | Short description for card display |
| `image` | `string` | Content data | Filename (e.g., `leshen.png`) |

**Validation**: Inherited from Feature 1's `MonsterSchema` (Zod). The UI consumes pre-validated data.

**Image Resolution**: The UI resolves `image` fields to paths:
- Monsters: `/images/monsters/<filename>`
- Placeholder: `/images/placeholders/missing.png`

### Category (Read-Only)

Consumed from Feature 1's central category list.

| Value | Display Name |
|-------|--------------|
| `Beasts` | Beasts |
| `Cursed Ones` | Cursed Ones |
| `Draconids` | Draconids |
| `Elementa` | Elementa |
| `Hybrids` | Hybrids |
| `Insectoids` | Insectoids |
| `Necrophages` | Necrophages |
| `Relicts` | Relicts |
| `Specters` | Specters |
| `Vampires` | Vampires |

**Extensibility**: Adding a category to `content/categories.ts` automatically adds it to the filter (FR-006).

### Threat Level

Numeric value 1–5 stored in monster data.

| Level | Label (Optional) | Muted Color |
|-------|------------------|-------------|
| 1 | Low | `#4a5a4a` (muted green) |
| 2 | Moderate | `#5a5a3a` (muted yellow-green) |
| 3 | Dangerous | `#5a5a3a` (muted yellow) |
| 4 | Very Dangerous | `#6a5a3a` (muted orange) |
| 5 | Extreme | `#6a4a4a` (muted red) |

**Filter Semantics**: Exact-level matching (selecting 4 shows only monsters with threat level exactly 4).

### FilterState (Client-Side)

Managed by the `useMonsterFilter` hook. Persisted to `sessionStorage`.

```typescript
interface FilterState {
  search: string;           // Search query (debounced 150-300ms)
  category: Category | null; // null = "All"
  threatLevel: number | null; // null = "All"
}
```

**Reset Behavior**: Clearing all filters restores the default state (empty search, null category, null threat level).

**Persistence**: Stored in `sessionStorage` under key `bestiary-filters`. Resets on page reload.

## Relationships

```
Monster ──belongs_to──> Category (many-to-one)
Monster ──has──> ThreatLevel (1-5)
Category ──drives──> CategoryFilter (options)
ThreatLevel ──drives──> ThreatFilter (options)
FilterState ──filters──> Monster[] (derived)
```

## Data Flow

```
content/monsters/*.ts
        │
        ▼
import.meta.glob (build-time)
        │
        ▼
src/content-loader.ts
        │
        ▼
useMonsterFilter hook
        │
        ├──► Filtered monsters
        ├──► Category filter options
        └──► Threat filter options
                │
                ▼
        BestiaryPage component
                │
                ▼
        MonsterCard components
```

## State Transitions

### Filter State Machine

```
IDLE ──[user types]──> DEBOUNCING ──[150-300ms]──> FILTERED
  │                        │
  │                        └──[user types again]──> DEBOUNCING
  │
  ├──[user selects category]──> FILTERED
  ├──[user selects threat]──> FILTERED
  └──[user clicks reset]──> IDLE
```

### Navigation State

```
BESTIARY_LIST ──[click card]──> MONSTER_DETAIL (placeholder)
       ▲                              │
       └────────[back button]─────────┘
```
