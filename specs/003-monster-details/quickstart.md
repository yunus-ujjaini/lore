# Quickstart: Monster Details

**Branch**: `003-monster-details` | **Date**: 2026-08-14

## Prerequisites

- Node.js 24+
- npm 11+
- Feature 1 content data (monsters, stories, categories)
- Monster images in `public/images/monsters/`
- Story images in `public/images/stories/`
- Feature 2 (Bestiary Explorer) implemented

## Setup

```bash
# Install dependencies (from repo root)
npm install

# Start development server
npm run dev
```

The Bestiary page will be available at `http://localhost:5173/bestiary`.

## Validation Scenarios

### 1. Open Monster Details (FR-001, FR-002)

**Steps**:
1. Open `http://localhost:5173/bestiary`
2. Click on the "Leshen" monster card
3. Verify navigation to `/bestiary/leshen`
4. Verify the hero displays monster image, name, category, threat level, and description

**Expected**: Full-width hero with overlaid text showing all monster information.

---

### 2. View Related Stories (FR-006, FR-007)

**Steps**:
1. Open a monster that is referenced by a story (e.g., Leshen or Griffin)
2. Scroll down to the "Related Stories" section
3. Verify related stories are displayed with title, summary, and image

**Expected**: Horizontal scrollable cards showing related stories.

---

### 3. Navigate Back to Bestiary (FR-008)

**Steps**:
1. Open any monster details page
2. Click "Back to Bestiary" link
3. Verify navigation back to `/bestiary`

**Expected**: Bestiary page is displayed with all monsters.

---

### 4. Handle Missing Monster (FR-009, FR-010)

**Steps**:
1. Navigate to `http://localhost:5173/bestiary/nonexistent-monster`
2. Verify not-found message is displayed
3. Verify "Back to Bestiary" link is available
4. Click the link and verify navigation to `/bestiary`

**Expected**: Clear not-found state with ability to return to Bestiary.

---

### 5. Responsive Layout (FR-012, FR-013)

**Steps**:
1. Open monster details page on desktop (1280px+)
2. Verify hero uses full width with overlaid text
3. Resize to tablet (768px)
4. Verify hero adapts composition
5. Resize to mobile (375px)
6. Verify hero remains immersive, no horizontal scrolling

**Expected**: Layout adapts across all screen sizes.

---

### 6. Keyboard Accessibility (FR-014)

**Steps**:
1. Navigate to monster details page using only keyboard
2. Tab through all interactive elements
3. Verify visible focus states
4. Verify all elements have meaningful labels
5. Verify images have alt text

**Expected**: Full keyboard accessibility with visible focus.

---

### 7. Animations (FR-005, SC-006)

**Steps**:
1. Open monster details page
2. Observe page entrance animation
3. Scroll down slowly
4. Observe parallax effect on hero image
5. Observe text reveal animation
6. Observe atmospheric effects triggered by scroll
7. Verify `prefers-reduced-motion` is respected

**Expected**: Smooth, cinematic animations that enhance the experience.

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
