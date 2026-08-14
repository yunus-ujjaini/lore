# Research: Bestiary Explorer

**Branch**: `002-bestiary-explorer` | **Date**: 2026-08-14

## Technical Decisions

### 1. Content Loading Strategy

**Decision**: Use Vite's `import.meta.glob` with `{ eager: true }` to load monster data at build time.

**Rationale**:
- The existing `content/index.ts` uses Node's `fs` module and cannot run in the browser
- `import.meta.glob` is Vite's native mechanism for build-time code splitting and bundling
- Eager loading ensures all monster data is available immediately (no async loading states needed)
- New monsters added to `content/monsters/` are automatically picked up by the glob pattern

**Alternatives Considered**:
- **Fetch API**: Would require a JSON endpoint or static file. Adds network latency and complexity. Rejected per constitution V (static-first).
- **Dynamic imports**: Would require async loading states and error handling. Overkill for ~10 monsters.
- **Manual imports**: Would require code changes when adding monsters. Violates FR-003.

### 2. Routing Approach

**Decision**: `react-router-dom` with `BrowserRouter`.

**Rationale**:
- Standard React routing solution with excellent documentation and community support
- `BrowserRouter` provides clean URLs (`/bestiary/leshen`) without hash fragments
- Vite dev server handles routing during development
- Production deployment requires SPA fallback (serving `index.html` for unknown paths)

**Alternatives Considered**:
- **HashRouter**: Ugly URLs (`/#/bestiary/leshen`). Not chosen because spec shows clean paths.
- **wouter**: Lighter alternative but less ecosystem support. React Router is more standard.
- **Manual router**: Would require custom implementation. Reinventing the wheel.

### 3. Styling Approach

**Decision**: Plain CSS with CSS custom properties (variables).

**Rationale**:
- No additional dependencies
- CSS custom properties enable easy theming (dark palette)
- Co-located `.css` files keep styles close to components
- Performance: no runtime CSS-in-JS overhead

**Alternatives Considered**:
- **CSS Modules**: Good for isolation but adds build complexity. Not needed at this scale.
- **Tailwind CSS**: Utility-first approach. Adds dependency and build step. Not aligned with "plain CSS" preference.
- **Styled Components / Emotion**: CSS-in-JS. Runtime overhead, violates static-first philosophy.

### 4. Filter State Management

**Decision**: React state with `sessionStorage` persistence.

**Rationale**:
- Client-side only (no URL persistence per clarification)
- `sessionStorage` survives navigation within session but resets on reload
- Simple implementation: `useState` + `useEffect` to sync with `sessionStorage`
- No external state management library needed

**Alternatives Considered**:
- **URL search params**: User clarified this is not desired.
- **localStorage**: Persists across sessions. Too persistent for filter state.
- **Context API**: Would still need persistence layer. Adds complexity.
- **Redux/Zustand**: Overkill for this feature's state complexity.

### 5. Animation Strategy

**Decision**: CSS transitions/animations for base effects, JavaScript for complex sequences.

**Rationale**:
- CSS animations are GPU-accelerated and performant (60fps target)
- JavaScript needed for: staggered card entrance, filter transitions, particle systems
- `requestAnimationFrame` for performance budgets
- `prefers-reduced-motion` media query for accessibility

**Alternatives Considered**:
- **Framer Motion**: Popular but adds bundle size. Not justified for this feature's needs.
- **GSAP**: Powerful but overkill. Adds dependency.
- **CSS-only**: Cannot handle complex sequences like staggered entrance.

### 6. Testing Strategy

**Decision**: Vitest + React Testing Library for units, Playwright for E2E.

**Rationale**:
- Vitest shares Vite config (zero extra setup)
- RTL provides ergonomic component testing
- Playwright explicitly required by constitution VIII for user-facing features
- E2E tests cover all primary user journeys per FR-019

**Alternatives Considered**:
- **Jest**: Requires separate config. Vitest is better integrated with Vite.
- **Cypress**: E2E alternative. Playwright chosen per constitution.
- **React Testing Library only**: Insufficient for full user journey testing.

## Best Practices Research

### React 19 Patterns
- Use `use` hook for data loading (if async needed)
- Prefer `useMemo` for expensive computations (filter logic)
- Use `useCallback` for event handlers passed to child components
- Leverage React Compiler (automatic memoization) when available

### Vite Configuration
- `@vitejs/plugin-react` for JSX transform and Fast Refresh
- `import.meta.glob` patterns for content loading
- Build-time code splitting for route-based lazy loading (future)

### Accessibility (WCAG 2.1 AA)
- Keyboard navigation: Tab order, Enter/Space for activation
- Focus management: Visible focus rings, logical focus flow
- ARIA labels: Meaningful labels for interactive elements
- Color contrast: Minimum 4.5:1 for normal text
- Reduced motion: `prefers-reduced-motion` media query

### Performance
- Target 60fps for all animations
- Lazy load images (future enhancement)
- Minimize bundle size (no heavy libraries)
- Use `will-change` sparingly for animated properties
