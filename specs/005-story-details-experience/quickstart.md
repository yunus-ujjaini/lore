# Quickstart Validation Guide: Story Details Experience

**Date**: 2026-08-17
**Feature**: 005-story-details-experience

## Prerequisites

- Node.js 24+
- npm (dependencies installed via `npm ci`)
- Playwright browsers installed (`npx playwright install`)

## Validation Scenarios

### 1. Build Validation

```bash
npm run build
```

**Expected**: Build completes without errors. `dist/` contains all assets. `dist/404.html` exists.

### 2. Type Check

```bash
npx tsc --noEmit
```

**Expected**: No TypeScript errors.

### 3. Content Validation

```bash
npm run validate
```

**Expected**: `VALID — 10 monsters, 30 stories, 10 categories`

### 4. Unit Tests (TDD)

```bash
npm test
```

**Expected**: All existing tests pass. New component tests pass:
- `ReadingProgressBar.test.tsx` — renders, updates on scroll, respects reduced-motion
- `DropCap.test.tsx` — applies first-letter styling to first paragraph
- `NextTaleCard.test.tsx` — renders with story data, links to correct route
- `SectionHeader.test.tsx` — displays Roman numeral, title, divider
- `StoryEnding.test.tsx` — renders ornamental divider

### 5. E2E Tests (Playwright)

```bash
npx playwright test tests/e2e/story-reader.spec.ts
```

**Expected scenarios**:

| Scenario | Steps | Expected |
|----------|-------|----------|
| Open story | Navigate to `/lore/stories/striga-of-maribor` | Hero visible with image, title, summary |
| Read sections | Scroll through page | All sections visible in order with Roman numerals |
| Progress bar | Scroll from top to bottom | Progress bar fills proportionally |
| Related monsters | Scroll past final section | "Monsters of this Tale" heading visible with monster cards |
| Next Tale | Scroll to end | "Next Tale" card visible with story link |
| Navigation | Click "Next Tale" | Navigates to another story page |
| Responsive | Set viewport to 375px | No horizontal overflow, hero visible, text readable |
| Reduced motion | Emulate `prefers-reduced-motion: reduce` | No parallax, no particles, no scroll animations |

### 6. Visual Regression (Manual)

Open the dev server and verify against the wireframe:

```bash
npm run dev
# Open http://localhost:5173/lore/stories/striga-of-maribor
```

**Check against** `wireframes/01-story-reader.svg`:
- [ ] Progress bar at top of viewport
- [ ] Hero with image, title, summary, atmospheric overlay
- [ ] Section content with drop cap on first paragraph
- [ ] Huge right-aligned Roman numeral watermarks
- [ ] Ornamental dividers between sections
- [ ] Fog/gradient transitions (not solid color blocks)
- [ ] Ending ornamental divider
- [ ] "Monsters of this Tale" section
- [ ] "Next Tale" card
- [ ] Navigation links
- [ ] Dark theme consistent with Lore palette
- [ ] No horizontal overflow on mobile (375px)

### 7. Regression Check

```bash
npm run build && npm run validate && npm test && npx playwright test
```

**Expected**: All existing tests pass. No regressions in Bestiary Explorer, Monster Details, or Stories page.

## Running All Checks

```bash
npm run build && npx tsc --noEmit && npm run validate && npm test && npx playwright test
```

**Expected**: All pass with exit code 0.
