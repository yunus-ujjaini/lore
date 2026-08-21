---
title: Story reader component
type: component
sources: [S006]
updated: 2026-08-17
---

# Story reader component

The StoryReaderPage is the cinematic reading experience for stories, combining
hero presentation, typography, section transitions, progress tracking, and
navigation into a single cohesive page. (S006)

## Architecture

The page composes these components:

- **ReadingProgressBar** — fixed thin bar at viewport top, driven by `useScroll` + `useSpring` (S006)
- **BackNavigation** — existing component, positioned over hero
- **Hero section** — story image, title, summary, atmospheric overlay gradient (S006)
- **Particles** — CSS-only floating particles in hero, respects `useReducedMotion` (S006)
- **SectionHeader** — Roman numeral + section title + ornamental divider with centered diamond (S006)
- **DropCap** — wraps first paragraph of each section, triggers `::first-letter` CSS (S006)
- **FogTransition** — CSS gradient overlay between sections (transparent → rgba → transparent) (S006)
- **StoryEnding** — heavier ornamental divider after final section (S006)
- **RelatedMonsters** — existing component, updated with "Monsters of this Tale" heading (S006)
- **NextTaleCard** — random story link with title, summary, image (S006)
- **Navigation** — "Return to Stories" and "Explore Bestiary" links (S006)

## Key files

- `src/pages/StoryReaderPage.tsx` — main page component
- `src/components/ReadingProgressBar.tsx` — progress bar
- `src/components/DropCap.tsx` — drop cap wrapper
- `src/components/SectionHeader.tsx` — Roman numeral + divider
- `src/components/FogTransition.tsx` — gradient transition
- `src/components/StoryEnding.tsx` — ending divider
- `src/components/NextTaleCard.tsx` — continuation card
- `src/components/Particles.tsx` — CSS-only particles
- `src/styles/stories.css` — all styles (500+ lines)

## Data flow

- Story data loaded via `useStoryData(stories)` hook (S006)
- `getNextStory(currentId)` returns random story excluding current (S006)
- Related monsters resolved from `story.monsterIds` via `monsters` record (S006)
- Sections support both legacy `content` string and new `sections[]` array (S006)

## Reading progress

- Uses Framer Motion `useScroll` + `useSpring` for GPU-accelerated tracking (S006)
- `scaleX` transform on fixed-position bar at viewport top (S006)
- Respects `useReducedMotion()` — renders static div when reduced (S006)

## Reduced motion handling

- Particles: `useReducedMotion()` returns null when active (S006)
- Progress bar: renders static div without spring animation (S006)
- CSS: `@media (prefers-reduced-motion: reduce)` disables particle animations,
  section entrance animations, and hero image zoom (S006)

## Responsive design

- Hero: 70vh desktop, 60vh tablet (768px), 50vh mobile (480px) (S006)
- Title: 3rem desktop, 2rem tablet, 1.5rem mobile (S006)
- Reading column: max-width 72ch, constrained padding (S006)
- Related monsters: horizontal scroll on all viewports (S006)
- No horizontal overflow on any viewport (S006)

## Accessibility

- Progress bar: `role="progressbar"`, `aria-label="Reading progress"` (S006)
- Next Tale card: `aria-label` with story title (S006)
- Navigation: `aria-label="Story navigation"` on nav element (S006)
- All images: meaningful `alt` text (S006)
- Keyboard focus styles on all interactive elements (S006)
- Reduced-motion support via CSS media query and Framer Motion hook (S006)

## Testing

- 9 Vitest unit test files, 31 tests total (S006)
- Playwright E2E: story-reader.spec.ts, reduced-motion.spec.ts (S006)
- TDD approach: tests written before implementation (S006)

Related: [animation-patterns](./animation-patterns.md), [tech-stack](./tech-stack.md),
[content-model](./content-model.md).
