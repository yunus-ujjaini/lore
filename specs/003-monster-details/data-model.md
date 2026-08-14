# Data Model: Monster Details

**Branch**: `003-monster-details` | **Date**: 2026-08-14

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

### Story (Read-Only)

Consumed from Feature 1 content layer. The UI does not create, modify, or store stories.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| `id` | `string` | `content/stories/<id>.ts` | URL-safe identifier |
| `title` | `string` | Content data | Story title |
| `summary` | `string` | Content data | Short summary for card display |
| `content` | `string` | Content data | Full story content (not used in this feature) |
| `monsterIds` | `string[]` | Content data | Array of monster IDs referenced by this story |
| `image` | `string` | Content data | Filename (e.g., `the-last-wish.png`) |

### Category

Same as Feature 1 — the 10 central categories (Beasts, Cursed Ones, Draconids, etc.).

### Threat Level

Same as Feature 1 — numeric 1–5 stored in monster data; display is a presentation choice.

## Relationships

```
Monster ──has_many──> Story (via monsterIds array in Story)
Story ──references──> Monster (via monsterIds array)
```

A story is related to a monster when the monster's ID appears in the story's `monsterIds` array. A story can reference multiple monsters, and a monster can have multiple related stories.

## Filter Logic

### Related Stories

```typescript
const relatedStories = stories.filter(story => 
  story.monsterIds.includes(monsterId)
);
```

- Simple array.includes() check
- Performant for ~3 stories
- No additional data transformation needed

## Image Resolution

Same as Feature 2:
- Monster images: `/images/monsters/<filename>`
- Story images: `/images/stories/<filename>`
- Placeholder: `/images/placeholders/missing.png`

## State Transitions

### Page Load
1. Extract monster ID from URL params
2. Look up monster in content loader
3. If found: render MonsterDetailsPage with hero, info, related stories
4. If not found: render NotFoundMonster

### Scroll Interaction
1. User scrolls down the page
2. Scroll position triggers parallax effect on hero image
3. Scroll position triggers text reveal animation
4. Scroll position triggers atmospheric effects (particles/fog)
5. Scroll position triggers related stories section entrance
