---
title: Tech stack
type: decision
sources: [S003, S004, S005]
updated: 2026-08-14
---

# Tech stack

The project is a static-first TypeScript web app with no framework and no
runtime dependencies. (S003)

## Decisions

- **Vite 7 + TypeScript (strict), Node 24 tooling** — chosen over Astro, Next.js
  and plain `tsc` because the repo was greenfield and a content foundation needs
  no framework; Vite provides the TS pipeline and a future dev server (S003).
- **Zod** — runtime validation with error paths (entry + field); derives
  TypeScript types from schemas so the contract and dataset cannot drift (S003).
- **Vitest** — shares the Vite config, native TS, table-driven tests; chosen
  over `node:test` (manual TS wiring) and Jest (legacy ESM handling) (S003).
- **Playwright** — E2E over the served content pipeline; constitution VIII names
  Playwright for E2E (S003).
- **No framework** — a content foundation ships no runtime framework; UI
  features can adopt one later without rework (S003).
- **React 19 + React DOM** — UI library for first user-facing feature; established
  as the project's UI approach (S004).
- **react-router-dom** — client-side routing with BrowserRouter; clean URLs
  without hash fragments; requires SPA fallback for static hosting (S004).
- **@vitejs/plugin-react** — Vite React Fast Refresh and JSX transform (S004).
- **Plain CSS with custom properties** — no CSS-in-JS; theming via CSS variables;
  co-located styles for components (S004).
- **Vitest + React Testing Library** — component and hook testing for UI features (S004).
- **Framer Motion (^11.0)** — animation library for cinematic effects (parallax, scroll-triggered, text reveal); chosen over CSS-only (limited), GSAP (heavy), React Spring (less docs) (S005).

## Constraints

- Static-first (constitution V): validation runs at build/dev time only and is
  never shipped to the browser; dependencies are devDependencies (S003).
- Content is plain TS modules under `content/`; images are local files under
  `public/images/`; validation lives in `src/validation/` (S003).
- UI consumes content via build-time `import.meta.glob` (not runtime fetch) (S004).
- Static hosting requires SPA fallback for react-router-dom BrowserRouter (S004).

Related: [content-model](./content-model.md), [content-validation](./content-validation.md),
[browser-safe-content-loader](./browser-safe-content-loader.md).
