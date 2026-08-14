# Implementation Plan: Bestiary Explorer

**Branch**: `002-bestiary-explorer` | **Date**: 2026-08-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-bestiary-explorer/spec.md`

## Summary

Build the first user-facing UI for the Witcher Bestiary: a responsive, accessible Bestiary page with a searchable, filterable grid of monster cards. Each card displays the monster's image, name, category, threat level, and description. The page supports real-time search, category filtering, and exact-level threat filtering (all combinable), with a reset control and a clear empty state. Clicking a card navigates to a placeholder monster detail route. The UI is built with React on the existing Vite toolchain, consuming Feature 1's content layer via Vite's build-time glob imports. Visual direction follows the reference image (`image.png`): dark, atmospheric, medieval/fantasy-inspired, clean, and premium.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode); JSX via React 19; tooling runs on Node 24

**Primary Dependencies**:
- **React 19 + React DOM** — UI library. Justification: clarified on 2026-08-14 as the project's UI approach; first user-facing feature establishes the pattern.
- **react-router-dom** — client-side routing for `/bestiary` and `/bestiary/:id` routes. Justification: standard React routing; enables deep-linking to monster placeholder pages. Note: static hosting requires SPA fallback configuration (serving `index.html` for unknown paths).
- **@vitejs/plugin-react** — Vite React Fast Refresh and JSX transform. Justification: required for React with Vite.
- **Zod** — already present; can reuse schemas for runtime type safety if content is loaded dynamically.
- **Vitest** + **@testing-library/react** + **jsdom** — component and hook testing. Justification: constitution VIII (automated quality); RTL provides ergonomic component tests for filter logic, empty states, and accessibility.
- **Playwright (@playwright/test)** — already present; E2E tests for all primary user journeys. Justification: constitution VIII explicitly names Playwright for E2E on user-facing features.

**No additional runtime dependencies**. No backend, database, or CSS-in-JS library. Styling uses plain CSS with CSS custom properties (variables) for the dark theme.

**Storage**: Content consumed from `content/` (TypeScript modules) and `public/images/` (static assets) — same as Feature 1. The UI does not store content; it references it.

**Testing**:
- Vitest + RTL: unit tests for filter logic (search, category, threat, combined), card rendering, empty state, and reset behavior.
- Playwright E2E: browse, search, category filter, threat filter, combined filters, reset, navigation, responsive layout, and keyboard accessibility (per FR-019 and SC-007).

**Target Platform**: Browser (desktop, tablet, mobile). Static web project.

**Project Type**: Static web (frontend-only SPA).

**Performance Goals**:
- Filter interactions respond without perceivable delay for the current dataset size (~10 monsters).
- Initial page load: the monster dataset is bundled at build time (no fetch latency); only images load over the network.
- Bundle size: minimal; no heavy animation or charting libraries.

**Constraints**:
- Static-first per constitution V: no runtime backend; content is bundled at build time.
- Content MUST NOT be duplicated in UI components (FR-017, constitution IV); UI consumes `content/` via build-time imports.
- The current `content/index.ts` uses Node's `fs` module and cannot run in the browser. A browser-safe loader using `import.meta.glob` is required.
- Accessibility: keyboard navigation, visible focus, meaningful labels, alt text, reduced-motion support (FR-015, constitution II).
- Responsive: no horizontal scrolling for normal use at any breakpoint (FR-012).
- Card images MUST reserve a consistent area and not break layout if dimensions vary or placeholder is used (FR-013).

**Scale/Scope**: ~10 monsters, 10 categories, threat levels 1–5. The implementation must remain efficient and usable when the dataset grows (tens of monsters, not hundreds).

## Constitution Check

| Principle | Assessment |
|-----------|------------|
| I. Specification-First | Pass — this plan implements [spec.md](./spec.md); all design decisions trace to it. |
| II. Deliberate Visual Language | Pass — visual direction established from the reference image (`image.png`): dark, atmospheric, medieval/fantasy, clean, premium (FR-018). |
| III. Progressive Disclosure | Pass — cards show summary (image, name, category, threat, short description); full details deferred to Feature 3. |
| IV. Data-Driven Content | Pass — monster and category data consumed from Feature 1 content layer (FR-017); adding a monster requires no UI code changes. |
| V. Static-First Architecture | Pass — content bundled at build time via `import.meta.glob`; no runtime backend or API calls. |
| VI. Performance Budget | Pass — no heavy libraries; filters are client-side over a small dataset; images are the primary network load. |
| VII. No Premature Complexity | Pass — placeholder detail page; no advanced animations, sorting, or pagination. |
| VIII. Automated Quality | Pass — Vitest + RTL for component/filter logic; Playwright E2E for all primary user journeys (browse, search, filters, reset, navigation). |
| IX. Safe Change & Backward Compatibility | Pass — Feature 1 content layer remains unchanged; UI is a new consumer. |
| X. Project Knowledge & Traceability | Pass — decisions recorded here; visual reference and routing approach documented. |
| XI. No Silent Guessing | Pass — routing library and browser-safe content loader choices justified above; UI stack confirmed with user. |
| XII. Governance & Compliance | Pass — React and react-router-dom are standard, well-maintained dependencies; justified above. |

No gate violations.

## Complexity Tracking

No constitution violations — table intentionally empty.

## Project Structure

### Documentation (this feature)

```text
specs/002-bestiary-explorer/
├── spec.md                        # Feature specification (clarified)
├── plan.md                        # This file (/speckit.plan output)
├── checklists/
│   ├── requirements.md            # Spec quality checklist
│   └── implementation.md          # Implementation quality checklist (created during /speckit.tasks)
└── wireframes/
    └── 01-bestiary-grid.svg       # Wireframe reference
```

### Source Code (repository root — additions and changes)

```text
index.html                         # NEW: App entry point (Vite serves this; mounts React root)

package.json                       # MODIFIED: Add React, React DOM, react-router-dom,
                                   # @vitejs/plugin-react, @types/react, @types/react-dom,
                                   # @testing-library/react, jsdom

vite.config.ts                     # MODIFIED: Add @vitejs/plugin-react; keep Vitest config

tsconfig.json                      # MODIFIED: Add JSX settings ("jsx": "react-jsx",
                                   # "types": ["@testing-library/jest-dom"] if needed)

public/images/                     # UNCHANGED: Feature 1 assets (monsters/, stories/, placeholders/)

content/                           # UNCHANGED: Feature 1 content (consumed via new loader)

src/
├── main.tsx                       # NEW: React root mount, BrowserRouter setup
├── App.tsx                        # NEW: Route definitions (/bestiary, /bestiary/:id)
├── index.css                      # NEW: Global CSS variables (dark theme), base styles,
│                                   # reduced-motion support
├── content-loader.ts              # NEW: Browser-safe content loader using import.meta.glob
│                                   # to aggregate monsters and categories for the UI
├── pages/
│   ├── BestiaryPage.tsx           # NEW: Bestiary grid page with search + filters
│   └── MonsterPlaceholderPage.tsx # NEW: Placeholder detail page for /bestiary/:id
├── components/
│   ├── MonsterCard.tsx            # NEW: Individual monster card (image, name, category,
│   │                               # threat, description); consistent image area reservation
│   ├── SearchBar.tsx              # NEW: Search input with clear control
│   ├── CategoryFilter.tsx         # NEW: Category filter buttons/dropdown
│   ├── ThreatFilter.tsx           # NEW: Threat level filter buttons/dropdown
│   ├── FilterBar.tsx              # NEW: Combines CategoryFilter + ThreatFilter + reset
│   └── EmptyState.tsx             # NEW: "No monsters found" message + reset button
├── hooks/
│   └── useMonsterFilter.ts        # NEW: Custom hook encapsulating search + category + threat
│                                   # filter logic with session persistence (FR-020)
└── types/
    └── ui.ts                      # NEW: UI-specific types (e.g., FilterState) if needed

tests/
├── components/
│   ├── MonsterCard.test.tsx       # NEW: Card renders all five elements; alt text; link
│   ├── SearchBar.test.tsx         # NEW: Input updates; clear button; case-insensitive
│   ├── CategoryFilter.test.tsx    # NEW: Renders all categories; selection state
│   ├── ThreatFilter.test.tsx      # NEW: Renders levels 1–5; selection state
│   ├── FilterBar.test.tsx         # NEW: Reset clears all filters
│   ├── EmptyState.test.tsx        # NEW: Message renders; reset triggers callback
│   └── useMonsterFilter.test.ts   # NEW: Filter combination logic; session persistence
└── e2e/
    └── bestiary.spec.ts           # NEW: Playwright E2E for all user journeys
```

**Content Loading Decision**: The existing `content/index.ts` uses Node's `fs` and cannot run in the browser. A new `src/content-loader.ts` uses Vite's `import.meta.glob('../../content/monsters/*.ts', { eager: true })` to load all monster modules at build time. This is static-first (bundled, not fetched), keeps the content layer unchanged, and requires zero code changes when new monsters are added (glob picks them up automatically).

**Routing Decision**: `react-router-dom` with `BrowserRouter` (standard URL paths like `/bestiary/leshen`). The Vite dev server handles this during development. For production static hosting, an SPA fallback (serving `index.html` for all routes) is required; this is documented as a deployment constraint.

**Styling Decision**: Plain CSS with custom properties for theming. No CSS-in-JS library. A single `index.css` establishes the dark palette (forest greens, stone/parchment tones, muted accents), and component-level styles live in co-located `.css` files or CSS Modules if naming collision becomes an issue.

**Filter State Decision**: Session persistence via `sessionStorage` (FR-020). Filter state is client-side only and resets on page reload (per 2026-08-14 clarification). Navigating away and back preserves filters until explicitly cleared.

**Image Path Resolution**: Monster `image` fields in content data store filenames (e.g., `leshen.png`). The UI resolves these to `/images/monsters/<filename>` (served from `public/images/monsters/`). The placeholder path is `/images/placeholders/missing.png`.
