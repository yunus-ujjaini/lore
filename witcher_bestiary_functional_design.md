# Feature 2 — Bestiary Explorer

## 1. Purpose

Create the first user-facing Bestiary experience.

The user should be able to open the Bestiary, browse monsters, search for a monster, filter monsters by category and threat level, and open a monster to view its basic information.

This feature consumes the monster and category data created by Feature 1.

---

## 2. Scope

This feature includes:

- Bestiary page
- Monster cards
- Monster search
- Category filtering
- Threat-level filtering
- Clear/reset filters
- Empty search/filter state
- Navigation from a monster card to its monster details page
- Responsive layout
- Basic visual animations

This feature does not include detailed monster pages. Those belong to Feature 3.

---

## 3. Existing Data

The feature must use the existing monster data structure.

Example:

```ts
{
  id: 'leshen',
  name: 'Leshen',
  category: 'Relicts',
  threatLevel: 5,
  description:
    'An ancient creature associated with forests...',
  image: 'leshen.png',
}
```

The feature must not duplicate monster information inside UI components.

---

## 4. Bestiary Page

The Bestiary page should provide a simple and visually engaging way to explore monsters.

It should contain:

- Page title
- Short introductory text
- Search input
- Category filter
- Threat-level filter
- Reset filters control
- Monster card grid

The page should work with the current sample monster dataset and automatically support additional monsters added later.

---

## 5. Monster Cards

Each monster card must display:

- Monster image
- Monster name
- Category
- Threat level
- Short description

The card should be clickable.

Selecting a card should navigate to the corresponding monster details route.

### Card interaction

The card should have a subtle hover interaction such as:

- Small scale/zoom
- Image movement or zoom
- Text transition
- Light visual emphasis

Animations must remain subtle and should not interfere with usability.

---

## 6. Search

The Bestiary must provide a search field.

Search should match the monster name.

Examples:

```text
Search: leshen
→ Leshen

Search: griff
→ Griffin
```

Search should be case-insensitive.

An empty search field should display all available monsters.

The search should update the visible results without requiring a page reload.

---

## 7. Category Filter

The user must be able to filter monsters by category.

Initial categories come from the centrally defined category data created in Feature 1.

Examples:

```text
Beasts
Cursed Ones
Draconids
Elementa
Hybrids
Insectoids
Necrophages
Relicts
Specters
Vampires
```

Selecting a category should show only matching monsters.

A clear/reset option must allow the user to return to all monsters.

---

## 8. Threat Filter

The user must be able to filter monsters by threat level.

Initial levels:

```text
1 — Low
2 — Moderate
3 — Dangerous
4 — Very Dangerous
5 — Extreme
```

The UI may display these as numbers, labels, stars, or another visual treatment.

The stored monster value must remain numeric.

---

## 9. Combined Filtering

Search, category, and threat filters must work together.

Example:

```text
Search: griffin
Category: Draconids
Threat: 4
```

The displayed results must satisfy all active filters.

Clearing one filter must preserve the others.

---

## 10. Empty State

When no monsters match the current search and filters, the Bestiary should display a clear empty state.

Example:

> No monsters found.

The page should provide an obvious way to clear the current filters/search.

---

## 11. Navigation

Selecting a monster must navigate to its monster details page.

The route should be based on the monster's unique ID.

Example:

```text
/bestiary/leshen
```

The Bestiary does not need to implement the complete details page in this feature.

A placeholder or future-ready route is sufficient if Feature 3 has not yet been implemented.

---

## 12. Responsive Behavior

The Bestiary must work on:

- Desktop
- Tablet
- Mobile

The monster grid should adapt to available screen width.

Filters and search controls must remain usable on smaller screens.

No horizontal scrolling should be required for normal use.

---

## 13. Loading and Error States

The application should handle:

### Loading

A simple loading state may be displayed while content is being prepared or loaded.

### Error

If monster data cannot be loaded or processed, the user must receive a clear error message rather than a broken page.

Because the current implementation is static, these states may be simple.

---

## 14. Images

Current monster images may be placeholder images or solid-color placeholders.

The UI must therefore:

- Render the provided image path when available.
- Continue to function when the image is visually simple.
- Reserve a consistent image area in every card.
- Avoid making the layout dependent on image dimensions.

Actual monster artwork can be replaced later without changing the Bestiary card architecture.

---

## 15. Visual Style

The Bestiary should establish the visual direction for the rest of the website.

It should feel:

- Dark
- Atmospheric
- Medieval/fantasy inspired
- Clean
- Premium
- Immersive

The first implementation should keep the design simple rather than attempting every planned cinematic effect.

Use animation to enhance the interface, not to dominate it.

---

## 16. Accessibility

The Bestiary must support:

- Keyboard-accessible search and filters
- Keyboard-accessible monster cards
- Visible focus states
- Meaningful labels for controls
- Alternative text for meaningful monster images
- Sufficient text contrast
- Reduced-motion behavior where applicable

---

## 17. Data-Driven Requirement

The UI must consume the existing monster and category data.

Adding another monster should require a data change only.

The implementation must not require:

- A new React component
- A new page
- New filtering logic
- New hardcoded UI

for each individual monster.

---

## 18. Initial Content

The feature should be tested against the monsters already available from Feature 1.

The sample data currently includes monsters such as:

- Leshen
- Griffin

Additional monsters may be added to provide better coverage for:

- Different categories
- Different threat levels
- Different description lengths
- Search behavior
- Filter combinations

---

## 19. Functional Acceptance Criteria

The feature is complete when:

1. A Bestiary page is available.
2. Existing monster data is displayed as cards.
3. Every card shows image, name, category, threat level, and description.
4. Search works by monster name.
5. Search is case-insensitive.
6. Category filtering works.
7. Threat filtering works.
8. Search and filters work together.
9. Filters can be cleared.
10. An empty-results state is shown when appropriate.
11. Monster cards navigate using the monster ID.
12. The page works on desktop and mobile.
13. Basic card animations are implemented.
14. Placeholder/solid-color images do not break the layout.
15. The UI does not contain duplicated monster data.
16. Relevant Playwright tests cover the main user journeys.

---

## 20. Playwright Scenarios

At minimum, E2E tests should cover:

### Browse

- Open Bestiary.
- Verify monster cards are visible.

### Search

- Search for "Leshen".
- Verify Leshen is shown.
- Verify unrelated monsters are hidden.

### Category filtering

- Select a category.
- Verify only matching monsters are displayed.

### Threat filtering

- Select a threat level.
- Verify only matching monsters are displayed.

### Combined filtering

- Apply multiple filters.
- Verify the results satisfy all active filters.

### Reset

- Apply filters.
- Clear them.
- Verify all available monsters return.

### Navigation

- Click a monster card.
- Verify navigation to the monster-specific route.

---

## 21. Out of Scope

Do not implement in this feature:

- Full monster detail content
- Monster abilities
- Weaknesses
- Combat information
- Loot
- Stories
- Story reader
- Map
- Favorites
- User accounts
- Backend
- Database
- Advanced animations
- Advanced sorting
- Pagination

These belong to later features if required.

---

## 22. Definition of Done

The feature is complete when:

- The Bestiary page is functional.
- Search and filters work together.
- Monster cards are reusable and data-driven.
- The layout is responsive.
- Basic animations are present.
- Placeholder images work correctly.
- Accessibility basics are covered.
- Playwright tests pass.
- The implementation follows the approved wireframe.
- No existing Feature 1 content behavior is broken.
