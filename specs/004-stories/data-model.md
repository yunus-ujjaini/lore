# Data Model: Stories & Story Reader

**Branch**: `004-stories` | **Date**: 2026-08-14

## Entities

### Story (Read-Only)

Consumed from Feature 1 content layer (after migration). The UI does not create, modify, or store stories.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| `id` | `string` | `content/stories/<id>.ts` | URL-safe identifier (lowercase letters, digits, hyphens) |
| `title` | `string` | Content data | Story title |
| `summary` | `string` | Content data | Short summary for card display |
| `image` | `string` | Content data | Filename (e.g., `the-last-wish.png`) |
| `monsterIds` | `string[]` | Content data | Array of monster IDs referenced by this story |
| `sections` | `StorySection[]` | Content data | Ordered array of story sections (migrated from `content`) |

### StorySection (Read-Only)

Part of a story, ordered within the story.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| `id` | `string` | Content data | Unique within the story (e.g., `section-1`) |
| `title` | `string` | Content data | Section heading |
| `content` | `string` | Content data | Narrative text (short or long-form) |

**Validation**: Each section must have a unique ID within its story, a title, and content.

### Monster (Read-Only)

Same as Feature 1 — consumed from content layer.

### Category (Read-Only)

Same as Feature 1 — the 10 central categories.

## Relationships

```
Story ──has_many──> StorySection (ordered by array index)
Story ──references_many──> Monster (via monsterIds array)
Monster ──referenced_by_many──> Story (via monsterIds in Story)
```

## Schema Migration

### Migration Rules

1. Each existing story's `content` string is split into a `sections` array
2. Each story MUST have at least 4 sections after migration
3. Section IDs are unique within the story (e.g., `section-1`, `section-2`)
4. No content is lost during migration
5. Original story meaning is preserved

### Migration Example

```typescript
// BEFORE (current)
{
  id: 'the-last-wish',
  title: 'The Last Wish',
  content: 'The witcher came to the dame\'s castle seeking only a bounty, but the djinn\'s final wish twisted fate itself...',
  monsterIds: ['leshen']
}

// AFTER (migrated)
{
  id: 'the-last-wish',
  title: 'The Last Wish',
  sections: [
    { id: 'section-1', title: 'The Castle', content: 'The witcher came to the dame\'s castle...' },
    { id: 'section-2', title: 'The Djinn', content: 'By the time the flames settled...' },
    { id: 'section-3', title: 'The Wish', content: 'Neither he nor the sorceress could remember...' },
    { id: 'section-4', title: 'The Binding', content: 'Only that it bound them both...' }
  ],
  monsterIds: ['leshen']
}
```

## Image Resolution

Same as Features 2 and 3:
- Story images: `/images/stories/<filename>`
- Monster images: `/images/monsters/<filename>`
- Placeholder: `/images/placeholders/missing.png`

## Filter Logic

### Related Stories (on Monster Details page)

```typescript
const relatedStories = stories.filter(story => 
  story.monsterIds.includes(monsterId)
);
```

### Related Monsters (on Story Reader page)

```typescript
const relatedMonsters = monsterIds.map(id => monsters[id]).filter(Boolean);
```

## State Transitions

### Page Load (Stories Landing)
1. Load stories via content loader
2. Display story cards with image, title, summary, related monsters

### Page Load (Story Reader)
1. Extract story ID from URL params
2. Look up story in content loader
3. If found: render hero, sections, related monsters
4. If not found: render NotFoundStory

### Navigation
- Stories → Story: Click story card → `/stories/:id`
- Story → Monster: Click related monster → `/bestiary/:id`
- Story → Stories: Click "Back to Stories" → `/stories`
- Global Nav: Links to `/bestiary` and `/stories`
