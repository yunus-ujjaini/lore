# UI Contracts: Bestiary Explorer

**Branch**: `002-bestiary-explorer` | **Date**: 2026-08-14

## Component Contracts

### MonsterCard

**Purpose**: Display a single monster's summary information.

**Props**:
```typescript
interface MonsterCardProps {
  monster: Monster;          // Monster data from content layer
  onClick: (id: string) => void;  // Navigation callback
}
```

**Renders**:
- Monster image (with alt text: `<monster.name>`)
- Monster name (heading)
- Category label
- Threat level badge (colored pill)
- Short description (truncated if long)

**Behavior**:
- Clicking the card calls `onClick(monster.id)`
- Hover: scale 1.02-1.05 with shadow lift
- Focus: visible focus ring for keyboard navigation
- Reduced motion: disable hover animations

**Accessibility**:
- Card is focusable (tabindex="0")
- Enter/Space triggers onClick
- Image has descriptive alt text
- Threat badge has aria-label with level description

---

### SearchBar

**Purpose**: Text input for filtering monsters by name.

**Props**:
```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}
```

**Renders**:
- Text input with placeholder "Search for monsters..."
- Clear button (visible when value is not empty)

**Behavior**:
- Input updates trigger `onChange` (debounced 150-300ms)
- Clear button calls `onClear`
- Case-insensitive matching
- Partial matches supported

**Accessibility**:
- Input has `aria-label="Search monsters"`
- Clear button has `aria-label="Clear search"`
- Focus ring visible on input

---

### CategoryFilter

**Purpose**: Filter monsters by category.

**Props**:
```typescript
interface CategoryFilterProps {
  categories: readonly Category[];
  selected: Category | null;
  onSelect: (category: Category | null) => void;
}
```

**Renders**:
- Pill/tag buttons for each category
- "All" option (selected when `selected` is null)
- Active category has distinct visual style

**Behavior**:
- Clicking a category calls `onSelect(category)`
- Clicking "All" calls `onSelect(null)`
- Single-select only

**Accessibility**:
- Each button has `aria-label="Filter by <category>"`
- Active state indicated by `aria-pressed="true"`
- Keyboard navigation between pills

---

### ThreatFilter

**Purpose**: Filter monsters by threat level.

**Props**:
```typescript
interface ThreatFilterProps {
  selected: number | null;
  onSelect: (level: number | null) => void;
}
```

**Renders**:
- Pill/tag buttons for levels 1-5
- "All" option (selected when `selected` is null)
- Active level has distinct visual style (muted color)

**Behavior**:
- Clicking a level calls `onSelect(level)`
- Clicking "All" calls `onSelect(null)`
- Single-select only
- Exact-level matching (not minimum)

**Accessibility**:
- Each button has `aria-label="Filter by threat level <N>"`
- Active state indicated by `aria-pressed="true"`
- Keyboard navigation between pills

---

### FilterBar

**Purpose**: Container for category and threat filters with reset.

**Props**:
```typescript
interface FilterBarProps {
  categories: readonly Category[];
  filterState: FilterState;
  onSearchChange: (value: string) => void;
  onCategorySelect: (category: Category | null) => void;
  onThreatSelect: (level: number | null) => void;
  onReset: () => void;
}
```

**Renders**:
- SearchBar component
- CategoryFilter component
- ThreatFilter component
- Reset button (visible when any filter is active)

**Behavior**:
- Reset clears all filters and search
- All filter changes propagate to parent

---

### EmptyState

**Purpose**: Display when no monsters match filters.

**Props**:
```typescript
interface EmptyStateProps {
  message?: string;
  onReset: () => void;
}
```

**Renders**:
- "No monsters found" message (customizable)
- Reset button

**Behavior**:
- Reset clears all filters

---

### BestiaryPage

**Purpose**: Main Bestiary page with grid, search, and filters.

**State**:
- `filterState`: FilterState (search, category, threat)
- `filteredMonsters`: Monster[] (derived from filters)

**Renders**:
- Hero section (title, tagline, atmospheric background)
- FilterBar component
- Monster grid (responsive: 3-col desktop, 2-col tablet, 1-col mobile)
- EmptyState when no results

**Behavior**:
- Loads monsters via `useMonsterFilter` hook
- Persists filter state to `sessionStorage`
- Animations: page entrance, staggered card appearance

---

### MonsterPlaceholderPage

**Purpose**: Placeholder page for `/bestiary/:id`.

**Props**:
```typescript
// Via route params
interface MonsterPlaceholderParams {
  id: string;
}
```

**Renders**:
- Monster name (from URL param)
- "Details coming in Feature 3" message
- Back link to Bestiary

**Behavior**:
- If monster ID doesn't exist, show not-found state
- No dependency on filter state
