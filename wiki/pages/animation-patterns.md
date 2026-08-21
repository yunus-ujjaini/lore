---
title: Animation patterns
type: decision
sources: [S005, S006]
updated: 2026-08-17
---

# Animation patterns

Cinematic animations are a core part of the Monster Details and Story Reader
experiences, using Framer Motion for scroll-triggered effects, page transitions,
and ambient atmosphere. (S005, S006)

## Decisions

- **Framer Motion for animations** — chosen over CSS-only (limited), GSAP (heavy),
  React Spring (less docs); provides declarative API with scroll-triggered variants (S005).
- **Scroll-triggered effects** — use `useInView` and `useScroll` hooks for parallax,
  text reveal, and atmospheric effects triggered by scroll position (S005).
- **Reduced-motion support** — use `useReducedMotion` hook to conditionally disable
  animations; Framer Motion automatically respects `prefers-reduced-motion` (S005).
- **useScroll + useSpring for progress bar** — GPU-accelerated scroll tracking via
  ScrollTimeline API; no JS scroll listener needed (S006).
- **CSS-only particles** — 50+ particles use CSS `@keyframes` instead of Framer Motion
  to avoid unnecessary JS re-renders; CSS runs on compositor thread (S006).
- **CSS gradient fog transitions** — `linearGradient` overlays between sections instead
  of solid color blocks; GPU-accelerated, no Framer Motion overhead (S006).
- **Reduced-motion for particles** — `useReducedMotion()` returns null when active,
  preventing particle rendering entirely (S006).

## Animation Types

- **Slow image zoom**: `scale` animation on hero image based on scroll
- **Parallax**: `y` transform on hero based on scroll position
- **Text reveal**: `opacity` and `y` transforms on text elements
- **Atmospheric effects**: CSS-only particles in hero, gradient fog between sections
- **Page transitions**: `AnimatePresence` for smooth navigation between pages
- **Progress bar**: `scaleX` transform driven by `useScroll` + `useSpring`

## Implementation Patterns

- Use `motion.div` for animated containers
- Use `whileInView` for scroll-triggered animations
- Use `useScroll` + `useTransform` for parallax effects
- Use `useScroll` + `useSpring` for GPU-accelerated progress bars (S006)
- Use `AnimatePresence` for page transitions
- Use `useReducedMotion` for accessibility
- Use CSS `@keyframes` for high-count particle animations (S006)
- Use CSS `linearGradient` for fog/transition overlays (S006)

## Performance Considerations

- Use `will-change: transform` sparingly
- Prefer CSS transforms over layout properties
- Use IntersectionObserver for scroll detection
- Debounce scroll handlers
- Target 60fps for all animations
- CSS particles avoid JS re-render overhead for 50+ elements (S006)
- `useScroll` uses ScrollTimeline for GPU-accelerated tracking (S006)

Related: [tech-stack](./tech-stack.md), [story-reader-component](./story-reader-component.md).
