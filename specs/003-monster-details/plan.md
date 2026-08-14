# Implementation Plan: Monster Details

**Branch**: `003-monster-details` | **Date**: 2026-08-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/003-monster-details/spec.md`

## Summary

Build the Monster Details page for the Witcher Bestiary: an immersive, cinematic detail experience for individual monsters. The page displays a full-width hero image with overlaid text (monster name, category, threat level, description), related stories in horizontal scrollable cards, and back navigation. The visual language continues the dark, atmospheric, medieval/fantasy aesthetic established by the Bestiary Explorer, with enhanced cinematic animations including slow image zoom, parallax on scroll, text reveal, and atmospheric effects triggered by scroll interaction.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode); JSX via React 19; tooling runs on Node 24

**Primary Dependencies**:
- **React 19 + React DOM** — UI library (same as Feature 2).
- **react-router-dom** — client-side routing for `/bestiary/:id` routes (same as Feature 2).
- **@vitejs/plugin-react** — Vite React Fast Refresh and JSX transform (same as Feature 2).
- **Framer Motion (^11.0)** — animation library for cinematic effects (parallax, scroll-triggered animations, text reveal). Justification: complex scroll-based animations and page transitions are difficult to achieve with CSS alone; Framer Motion provides performant, declarative animation API. Peer dependency: react >=18.
- **Vitest** + **@testing-library/react** — component testing.
- **Playwright (@playwright/test)** — E2E tests for all primary user journeys.

**Styling**: Plain CSS with CSS custom properties (same as Feature 2). The dark palette continues from the Bestiary Explorer.

**Storage**: Content consumed from `content/` (TypeScript modules) and `public/images/` (static assets) — same as Feature 1 and 2. The UI does not store content; it references it.

**Testing**:
- Vitest + RTL: unit tests for story filtering, navigation, error states.
- Playwright E2E: open monster, view information, back navigation, related stories, missing monster, responsive behavior (per FR-018 and SC-014).

**Target Platform**: Browser (desktop, tablet, mobile). Static web project.

**Project Type**: Static web (frontend-only SPA).

**Performance Goals**:
- Animations maintain 60fps (SC-006).
- Page loads without perceivable delay for the current dataset size.
- Scroll-triggered effects should not cause jank.

**Constraints**:
- Static-first per constitution V: no runtime backend; content is bundled at build time.
- Content MUST NOT be duplicated in UI components (FR-017, constitution IV); UI consumes `content/` via build-time imports.
- The existing `content/index.ts` uses Node's `fs` module and cannot run in the browser. A browser-safe loader using `import.meta.glob` is required (same as Feature 2).
- Accessibility: keyboard navigation, visible focus, meaningful labels, alt text, reduced-motion support (FR-014, constitution II).
- Responsive: no horizontal scrolling for normal use at any breakpoint (FR-012).
- Animations must respect `prefers-reduced-motion` (FR-015).
- The page MUST NOT introduce new monster attributes as required fields (FR-017).

**Scale/Scope**: ~10 monsters, ~3 stories. The implementation must remain efficient and usable when the dataset grows.

## Constitution Check

| Principle | Assessment |
|-----------|------------|
| I. Specification-First | Pass — this plan implements [spec.md](./spec.md); all design decisions trace to it. |
| II. Deliberate Visual Language | Pass — visual direction continues from Bestiary Explorer (dark, atmospheric, medieval/fantasy, premium); hero is more cinematic (FR-004). |
| III. Progressive Disclosure | Pass — hero shows summary (image, name, category, threat, description); related stories provide depth. |
| IV. Data-Driven Content | Pass — monster and story data consumed from Feature 1 content layer (FR-016); adding a monster requires no UI code changes. |
| V. Static-First Architecture | Pass — content bundled at build time via `import.meta.glob`; no runtime backend or API calls. |
| VI. Performance Budget | Pass — animations target 60fps (SC-006); no heavy libraries beyond Framer Motion. |
| VII. No Premature Complexity | Pass — related stories are simple cards; no advanced features like editing or favorites. |
| VIII. Automated Quality | Pass — Vitest + RTL for component tests; Playwright E2E for all primary user journeys (FR-018). |
| IX. Safe Change & Backward Compatibility | Pass — Feature 1 and 2 content layer remains unchanged; this feature extends the UI. |
| X. Project Knowledge & Traceability | Pass — decisions recorded here; visual reference and animation approach documented. |
| XI. No Silent Guessing | Pass — animation library choice (Framer Motion) justified; routing and content loading approaches documented. |
| XII. Governance & Compliance | Pass — Framer Motion is a standard, well-maintained dependency; justified above. |

No gate violations.

## Complexity Tracking

No constitution violations — table intentionally empty.

## Project Structure

### Documentation (this feature)

```text
specs/003-monster-details/
├── spec.md                        # Feature specification (clarified)
├── plan.md                        # This file (/speckit.plan output)
├── checklists/
│   └── requirements.md            # Spec quality checklist
└── wireframes/
    └── 01-monster-details.svg     # Wireframe reference (dark theme)
```

### Source Code (repository root — additions and changes)

```text
package.json                       # MODIFIED: Add framer-motion

src/
├── pages/
│   └── MonsterDetailsPage.tsx     # NEW: Monster Details page with hero, info, stories
├── components/
│   ├── MonsterHero.tsx            # NEW: Full-width hero with overlaid text
│   ├── MonsterInfo.tsx            # NEW: Information section below hero
│   ├── RelatedStories.tsx         # NEW: Horizontal scrollable story cards
│   ├── StoryCard.tsx              # NEW: Individual story card
│   ├── BackNavigation.tsx         # NEW: Back to Bestiary link
│   └── NotFoundMonster.tsx        # NEW: Not-found state for invalid IDs
├── hooks/
│   └── useScrollAnimation.ts      # NEW: Custom hook for scroll-triggered animations
└── styles/
    └── monster-details.css        # NEW: Styles for Monster Details page

tests/
├── components/
│   ├── MonsterHero.test.tsx       # NEW: Hero renders all monster info
│   ├── RelatedStories.test.tsx    # NEW: Stories display correctly
│   ├── StoryCard.test.tsx         # NEW: Story card renders title, summary, image
│   ├── BackNavigation.test.tsx    # NEW: Back link navigates to Bestiary
│   └── NotFoundMonster.test.tsx   # NEW: Not-found state displays correctly
└── e2e/
    └── monster-details.spec.ts    # NEW: Playwright E2E for all user journeys
```

**Content Loading Decision**: Same as Feature 2 — `import.meta.glob` for browser-safe monster and story loading.

**Routing Decision**: Same as Feature 2 — `react-router-dom` with `BrowserRouter`.

**Animation Decision**: Framer Motion for cinematic effects (parallax, scroll-triggered animations, text reveal, page transitions). CSS transitions for simpler effects.

**Related Stories Decision**: Filter stories by checking if monster ID appears in the `monsterIds` array. Display in horizontal scrollable container with overflow-x: auto.

**Not-Found Decision**: Render NotFoundMonster component when monster ID doesn't match any entry in the content loader.

## Implementation Strategy

### MVP First (US1 + US3 + US4)

1. Implement MonsterDetailsPage with hero, back navigation, and not-found state
2. Verify basic monster details display correctly
3. Add responsive layout
4. Add accessibility

### Incremental Delivery

1. US1 + US3 + US4 → Monster details page with hero and navigation
2. US2 → Related stories section
3. US5 → Responsive polish
4. US6 → Accessibility polish
5. Polish → Animations and final refinements
