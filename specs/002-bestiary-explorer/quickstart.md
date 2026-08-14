# Quickstart: Bestiary Explorer

**Branch**: `002-bestiary-explorer` | **Date**: 2026-08-14

## Prerequisites

- Node.js 24+
- npm 11+
- Feature 1 content data (`content/monsters/*.ts`, `content/categories.ts`)
- Monster images in `public/images/monsters/`

## Setup

```bash
# Install dependencies (from repo root)
npm install

# Start development server
npm run dev
```

The Bestiary page will be available at `http://localhost:5173/bestiary`.

## Validation Scenarios

### 1. Browse Monsters (FR-001, FR-002, FR-003)

**Steps**:
1. Open `http://localhost:5173/bestiary`
2. Verify all 10 monsters appear as cards
3. Verify each card shows: image, name, category, threat level, description

**Expected**: Grid of monster cards with all required elements.

**Automated**: `tests/e2e/bestiary.spec.ts` — "displays all monsters"

---

### 2. Search by Name (FR-004, FR-005)

**Steps**:
1. Type "leshen" in search field
2. Verify only Leshen is shown
3. Type "griff"
4. Verify only Griffin is shown (partial match)
5. Clear search
6. Verify all monsters return

**Expected**: Real-time filtering with case-insensitive partial matching.

**Automated**: `tests/e2e/bestiary.spec.ts` — "filters by search query"

---

### 3. Filter by Category (FR-006)

**Steps**:
1. Click "Relicts" category pill
2. Verify only Relict monsters are shown
3. Click "All"
4. Verify all monsters return

**Expected**: Category filter shows only matching monsters.

**Automated**: `tests/e2e/bestiary.spec.ts` — "filters by category"

---

### 4. Filter by Threat Level (FR-007)

**Steps**:
1. Click threat level "4" pill
2. Verify only monsters with threat level 4 are shown
3. Click "All"
4. Verify all monsters return

**Expected**: Exact-level threat filtering.

**Automated**: `tests/e2e/bestiary.spec.ts` — "filters by threat level"

---

### 5. Combined Filters (FR-008, FR-009, FR-010)

**Steps**:
1. Search for "ka" (partial match for Katakan)
2. Select "Vampires" category
3. Select threat level "4"
4. Verify only Katakan is shown (satisfies all three filters)
5. Clear category filter
6. Verify search and threat filters remain

**Expected**: Filters compose correctly; clearing one preserves others.

**Automated**: `tests/e2e/bestiary.spec.ts` — "combines filters"

---

### 6. Empty State (FR-010)

**Steps**:
1. Search for "xyznonexistent"
2. Verify "No monsters found" message appears
3. Verify reset button is visible
4. Click reset
5. Verify all monsters return

**Expected**: Clear empty state with reset control.

**Automated**: `tests/e2e/bestiary.spec.ts` — "shows empty state"

---

### 7. Navigation (FR-011)

**Steps**:
1. Click on Leshen card
2. Verify navigation to `/bestiary/leshen`
3. Verify placeholder page shows monster name
4. Navigate back to Bestiary
5. Verify all monsters still displayed

**Expected**: Card click navigates to placeholder route; back returns to list.

**Automated**: `tests/e2e/bestiary.spec.ts` — "navigates to monster detail"

---

### 8. Responsive Layout (FR-012)

**Steps**:
1. View at 1280px width (desktop)
2. Verify 3-column grid
3. Resize to 768px (tablet)
4. Verify 2-column grid
5. Resize to 375px (mobile)
6. Verify 1-column grid
7. Verify no horizontal scrolling at any width

**Expected**: Grid adapts; no horizontal scroll.

**Automated**: `tests/e2e/bestiary.spec.ts` — "responsive layout"

---

### 9. Keyboard Accessibility (FR-015)

**Steps**:
1. Press Tab to navigate through search, filters, and cards
2. Verify visible focus states on all interactive elements
3. Press Enter on a card
4. Verify navigation occurs
5. Press Escape or Tab to reset focus

**Expected**: Full keyboard navigation with visible focus.

**Automated**: `tests/e2e/bestiary.spec.ts` — "keyboard accessible"

---

### 10. Filter Persistence (FR-020)

**Steps**:
1. Apply search + category + threat filters
2. Click on a monster card (navigate away)
3. Click back button (return to Bestiary)
4. Verify filters are still applied
5. Reload page
6. Verify filters are reset

**Expected**: Filters persist across navigation; reset on reload.

**Automated**: `tests/components/useMonsterFilter.test.ts`

---

## Running Tests

```bash
# Unit tests (Vitest)
npm test

# E2E tests (Playwright)
npm run test:e2e

# Validate content
npm run validate
```

## Build for Production

```bash
npm run build
```

Output in `dist/` directory. Serve with any static file server.

**Note**: For SPA routing in production, configure server to serve `index.html` for all routes (SPA fallback).
