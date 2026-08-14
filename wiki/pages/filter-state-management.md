---
title: Filter state management
type: decision
sources: [S004]
updated: 2026-08-14
---

# Filter state management

Search and filter state is managed via React state with `sessionStorage`
persistence. Filter state is client-side only and resets on page reload. (S004)

## Decisions

- **React state + sessionStorage**: Filter state persists across navigation
  within a session but resets on reload (per functional design §6.4)
- **No URL persistence**: User clarified filters should not be reflected in
  the page URL; filtered states are not shareable
- **Debounced search**: Search input is debounced (150-300ms) to prevent
  excessive re-renders while typing

## FilterState interface

```typescript
interface FilterState {
  search: string;           // Search query
  category: Category | null; // null = "All"
  threatLevel: number | null; // null = "All"
}
```

## Filter combination

All filters combine with AND logic:
- Search matches monster name (case-insensitive, partial match)
- Category filter shows only matching category
- Threat filter shows only exact threat level
- Clearing one filter preserves the others

## Reset behavior

- Selecting "All" in each filter clears that filter
- Empty state shows a reset button
- No dedicated Reset button in the filter bar (user design decision)

Related: [tech-stack](./tech-stack.md), [browser-safe-content-loader](./browser-safe-content-loader.md).
