# Implementation Quality Checklist: Bestiary Explorer

**Purpose**: Validate implementation completeness and quality before convergence
**Created**: 2026-08-14
**Feature**: [plan.md](../plan.md) | [spec.md](../spec.md)

## Implementation Completeness

- [ ] FR-001: Bestiary page renders all monsters as cards
- [ ] FR-002: Every card displays image, name, category, threat level, and short description
- [ ] FR-003: Adding a new monster to `content/monsters/` appears automatically without code changes
- [ ] FR-004: Search field filters by name (case-insensitive, partial match)
- [ ] FR-005: Search updates without page reload; empty search shows all
- [ ] FR-006: Category filter options come from `content/categories.ts`; active selection visually obvious
- [ ] FR-007: Threat filter uses exact-level matching (1–5)
- [ ] FR-008: Combined filters work together; clearing one preserves others
- [ ] FR-009: Reset control clears all filters and search
- [ ] FR-010: Empty state shown when no monsters match, with reset option
- [ ] FR-011: Clicking card navigates to `/bestiary/:id`; placeholder page renders
- [ ] FR-012: Responsive layout (desktop/tablet/mobile) without horizontal scrolling
- [ ] FR-013: Card image area is consistent regardless of image dimensions or placeholder
- [ ] FR-014: Error/loading state for missing or broken content data
- [ ] FR-015: Keyboard accessible with visible focus; meaningful labels; alt text; reduced-motion support
- [ ] FR-016: Animations are subtle and respect `prefers-reduced-motion`
- [ ] FR-017: No monster data duplicated in UI components; consumes content layer
- [ ] FR-018: Visual direction follows reference image (dark, atmospheric, medieval/fantasy, clean, premium)
- [ ] FR-019: Playwright E2E covers browse, search, category, threat, combined, reset, navigation
- [ ] FR-020: Filter state preserved across navigation (sessionStorage); resets on reload

## Test Coverage

- [ ] Vitest + RTL: `MonsterCard` renders all required elements
- [ ] Vitest + RTL: `SearchBar` filters case-insensitively and supports partial matches
- [ ] Vitest + RTL: `CategoryFilter` renders all categories and handles selection
- [ ] Vitest + RTL: `ThreatFilter` renders all levels and handles selection
- [ ] Vitest + RTL: `useMonsterFilter` hook correctly combines filters and preserves session state
- [ ] Vitest + RTL: `EmptyState` renders message and reset triggers callback
- [ ] Vitest + RTL: `FilterBar` reset clears all active filters
- [ ] Playwright E2E: Browse — all monsters visible as cards
- [ ] Playwright E2E: Search — typing filters results correctly
- [ ] Playwright E2E: Category filter — selecting category shows only matching monsters
- [ ] Playwright E2E: Threat filter — selecting level shows only exact matches
- [ ] Playwright E2E: Combined filters — all three work together
- [ ] Playwright E2E: Reset — restores full list from any filter state
- [ ] Playwright E2E: Navigation — clicking card goes to `/bestiary/:id`
- [ ] Playwright E2E: Responsive — layout adapts across breakpoints
- [ ] Playwright E2E: Accessibility — keyboard navigation and focus visible

## Code Quality

- [ ] No hardcoded monster/category/threat data in UI code
- [ ] Content consumed via browser-safe loader (`import.meta.glob`)
- [ ] TypeScript strict mode passes (`tsc --noEmit`)
- [ ] No console errors or warnings during dev or tests
- [ ] CSS custom properties used for theme values (colors, spacing, breakpoints)
- [ ] Component file structure follows plan.md
- [ ] Monster route handles unknown IDs gracefully (not-found state)

## Accessibility & Responsiveness

- [ ] All interactive elements reachable via keyboard
- [ ] Visible focus states on search, filters, and cards
- [ ] Search and filter controls have meaningful labels/ARIA attributes
- [ ] Monster images have descriptive `alt` text (name or description)
- [ ] Color contrast sufficient for text against backgrounds
- [ ] `prefers-reduced-motion` respected (no animations or minimal)
- [ ] Layout usable without horizontal scrolling at 320px, 768px, and 1280px+
- [ ] Touch targets are adequate size on mobile

## Notes

- This checklist is validated during `/speckit.converge`.
- All items must pass before the feature is considered complete.
