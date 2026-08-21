# Research: Story Details Experience Enhancements

**Date**: 2026-08-17
**Feature**: 005-story-details-experience

## R1: Scroll Progress Bar Implementation

**Decision**: Use Framer Motion `useScroll` hook with `useSpring`

**Rationale**: `useScroll` leverages the `ScrollTimeline` API for GPU-accelerated scroll tracking. No JavaScript scroll listener needed. Composable with `useTransform`/`useSpring` for smooth animations. Already in project dependencies.

**Alternatives considered**:
- Native `scroll` event: Requires manual `requestAnimationFrame` throttling, more boilerplate
- CSS `animation-timeline`: Limited browser support, no React integration

**Implementation pattern**:
```tsx
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
```

## R2: Ambient Particles

**Decision**: CSS-only animation (no Framer Motion for particles)

**Rationale**: 50+ particles each as Framer Motion elements would create unnecessary JS re-renders and state management. CSS `@keyframes` animations run on the compositor thread with zero JS overhead.

**Alternatives considered**:
- Canvas-based: More complex, no React DOM integration
- Framer Motion: Good for <10 interactive particles, wasteful for 50+

**Implementation pattern**: Generate particle divs with randomized CSS custom properties, animate via `@keyframes float`.

## R3: Reduced Motion Handling

**Decision**: Wrap app in `<MotionConfig reducedMotion="user">` + per-component `useReducedMotion()` checks

**Rationale**: `MotionConfig` automatically disables transform/layout animations while preserving opacity. `useReducedMotion()` hook provides fine-grained control for CSS-dependent effects (particles, fog transitions).

**Alternatives considered**:
- CSS-only `prefers-reduced-motion`: Works for CSS animations but not Framer Motion
- Manual per-component checks: Verbose, easy to miss

## R4: Drop Cap Implementation

**Decision**: CSS `::first-letter` pseudo-element on section content's first `<p>`

**Rationale**: Cross-browser since 2015, no JavaScript needed, works with the existing Georgia serif font. Target `article p:first-of-type::first-letter` for multi-paragraph sections.

**Gotchas**:
- Only works on block containers (`p`, `div`)
- Punctuation preceding the first letter is included
- Use double-colon `::first-letter`

## R5: Playwright Scroll Testing

**Decision**: Use `page.mouse.wheel()` for scroll simulation + `scrollIntoViewIfNeeded()` for element visibility

**Rationale**: Direct scroll events are more reliable than programmatic `scrollTop` for testing real user interactions. `scrollIntoViewIfNeeded()` handles lazy-loaded content.

## R6: Vitest Component Testing

**Decision**: Mock `IntersectionObserver` and `window.scrollY` for unit tests; use Playwright for scroll-dependent visual tests

**Rationale**: Vitest runs in jsdom (no real layout/scroll). Unit tests should verify component logic (e.g., "progress bar renders with correct width"). Visual scroll behavior belongs in E2E tests.

## R7: "Next Story" Random Selection

**Decision**: Use `Math.random()` with `useMemo` to select a random story on mount

**Rationale**: Simple, no external dependency needed. The random selection is per-session (not persisted). Using `useMemo` with the stories array as dependency ensures stable selection across re-renders.

**Alternatives considered**:
- Sequential next story: Predictable but less exploratory
- Algorithmic recommendation: Over-engineered for current scope

## R8: Section Background Transitions

**Decision**: CSS `linearGradient` overlays between sections (not solid color blocks)

**Rationale**: Gradient transitions create the "fog" effect without visible color boundaries. Uses CSS gradients (GPU-accelerated) rather than Framer Motion opacity animations.

**Implementation pattern**:
```css
.fog-transition {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(26,36,25,0.4) 50%,
    transparent 100%
  );
  height: 40px;
}
```
