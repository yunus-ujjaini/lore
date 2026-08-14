# Quickstart: Stories & Story Reader

**Branch**: `004-stories` | **Date**: 2026-08-14

## Prerequisites

- Node.js 24+
- npm 11+
- Feature 1 content data (stories, monsters, categories)
- Story images in `public/images/stories/`
- Monster images in `public/images/monsters/`
- Features 2 and 3 implemented (Bestiary Explorer, Monster Details)

## Setup

```bash
# Install dependencies (from repo root)
npm install

# Start development server
npm run dev
```

The Stories page will be available at `http://localhost:5173/stories`.

## Validation Scenarios

### 1. Browse Stories (FR-001, FR-002, FR-003)

**Steps**:
1. Open `http://localhost:5173/stories`
2. Verify all stories appear as cards
3. Verify each card shows image, title, summary, and related monsters

**Expected**: Grid of story cards with all required elements.

---

### 2. Read a Story (FR-004, FR-005, FR-006, FR-007, FR-008)

**Steps**:
1. Click on "The Last Wish" story card
2. Verify navigation to `/stories/the-last-wish`
3. Verify hero shows title, summary, and image
4. Scroll down to see ordered sections
5. Verify all 4 sections appear in order

**Expected**: Story Reader with hero and ordered sections.

---

### 3. Related Monsters (FR-011, FR-012)

**Steps**:
1. Open a story with associated monsters (e.g., The Last Wish → Leshen)
2. Scroll to Related Monsters section
3. Verify Leshen card is displayed
4. Click on Leshen card
5. Verify navigation to `/bestiary/leshen`

**Expected**: Two-way discovery between stories and monsters.

---

### 4. Back Navigation (FR-013)

**Steps**:
1. Open any story
2. Click "Back to Stories"
3. Verify navigation to `/stories`

**Expected**: Returns to Stories landing page.

---

### 5. Missing Story (FR-014)

**Steps**:
1. Navigate to `http://localhost:5173/stories/nonexistent-story`
2. Verify not-found message is displayed
3. Verify "Back to Stories" link works

**Expected**: Clear not-found state with return navigation.

---

### 6. Responsive (FR-017)

**Steps**:
1. View Stories page on desktop (1280px+)
2. Resize to tablet (768px)
3. Resize to mobile (375px)
4. Verify no horizontal scrolling at any width

**Expected**: Layout adapts; content remains readable.

---

### 7. Global Navigation (FR-001a)

**Steps**:
1. Verify "Stories" link is visible in navigation
2. Click "Stories" link
3. Verify navigation to `/stories`
4. Click "Bestiary" link
5. Verify navigation to `/bestiary`

**Expected**: Global navigation works across features.

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

**Note**: For SPA routing in production, configure server to serve `index.html` for all routes.
