---
title: Animation patterns
type: decision
sources: [S005]
updated: 2026-08-14
---

# Animation patterns

Cinematic animations are a core part of the Monster Details experience,
using Framer Motion for scroll-triggered effects and page transitions. (S005)

## Decisions

- **Framer Motion for animations** — chosen over CSS-only (limited), GSAP (heavy),
  React Spring (less docs); provides declarative API with scroll-triggered variants (S005).
- **Scroll-triggered effects** — use `useInView` and `useScroll` hooks for parallax,
  text reveal, and atmospheric effects triggered by scroll position (S005).
- **Reduced-motion support** — use `useReducedMotion` hook to conditionally disable
  animations; Framer Motion automatically respects `prefers-reduced-motion` (S005).

## Animation Types

- **Slow image zoom**: `scale` animation on hero image based on scroll
- **Parallax**: `y` transform on hero based on scroll position
- **Text reveal**: `opacity` and `y` transforms on text elements
- **Atmospheric effects**: particles/fog triggered by scroll position thresholds
- **Page transitions**: `AnimatePresence` for smooth navigation between pages

## Implementation Patterns

- Use `motion.div` for animated containers
- Use `whileInView` for scroll-triggered animations
- Use `useScroll` + `useTransform` for parallax effects
- Use `AnimatePresence` for page transitions
- Use `useReducedMotion` for accessibility

## Performance Considerations

- Use `will-change: transform` sparingly
- Prefer CSS transforms over layout properties
- Use IntersectionObserver for scroll detection
- Debounce scroll handlers
- Target 60fps for all animations

Related: [tech-stack](./tech-stack.md).
