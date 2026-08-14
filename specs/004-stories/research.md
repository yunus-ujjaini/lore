# Research: Stories & Story Reader

**Branch**: `004-stories` | **Date**: 2026-08-14

## Technical Decisions

### 1. Story Schema Migration

**Decision**: Migrate existing stories from `content` string to `sections` array with ≥4 sections per story.

**Rationale**:
- The current `content` field is a single string that becomes difficult to manage for longer stories
- Ordered sections enable progressive reading and better visual separation
- Existing stories can be split into meaningful sections without losing content

**Migration Strategy**:
```typescript
// BEFORE
{
  content: 'The witcher came to the dame\'s castle...'
}

// AFTER
{
  sections: [
    { id: 'section-1', title: 'The Arrival', content: '...' },
    { id: 'section-2', title: 'The Encounter', content: '...' },
    { id: 'section-3', title: 'The Wish', content: '...' },
    { id: 'section-4', title: 'The Aftermath', content: '...' }
  ]
}
```

### 2. Global Navigation

**Decision**: Add a GlobalNav component with links to Bestiary and Stories.

**Rationale**:
- Users need a way to navigate between Bestiary and Stories
- A shared navigation component provides consistency
- The navigation should be present on all pages

**Implementation**:
- Create `src/components/GlobalNav.tsx`
- Update `App.tsx` to include GlobalNav
- Style consistent with the dark, atmospheric theme

### 3. Related Stories Display

**Decision**: Filter stories by checking if monster ID appears in `monsterIds` array.

**Rationale**:
- Same pattern as Feature 3's related stories on Monster Details
- Consistent user experience across features
- Simple array.includes() check is performant

### 4. Section ID Uniqueness

**Decision**: Section IDs are unique within a story, not globally unique.

**Rationale**:
- Simpler to implement and maintain
- IDs like `section-1`, `section-2` work fine since they're scoped to the story
- No cross-story references needed

### 5. Malformed Section Handling

**Decision**: Graceful fallback for invalid sections; validation at build time catches most issues.

**Rationale**:
- Validation at build time prevents most malformed data from reaching production
- Graceful fallback ensures the app doesn't crash if invalid data slips through
- User sees a helpful message rather than a broken page

## Best Practices Research

### Story Reader Layout
- Comfortable reading width (600-700px max)
- Appropriate line height (1.6-1.8)
- Generous paragraph spacing
- Clear section separation with headings
- Good vertical rhythm

### Related Monsters
- Horizontal scrollable cards (consistent with Feature 3)
- Show image, name, category, threat level
- Click navigates to `/bestiary/:id`

### Responsive Story Reader
- Hero adapts to smaller screens
- Text remains readable
- Landscape artwork scales correctly
- No horizontal scrolling
