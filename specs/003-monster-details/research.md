# Research: Monster Details

**Branch**: `003-monster-details` | **Date**: 2026-08-14

## Technical Decisions

### 1. Animation Library

**Decision**: Use Framer Motion for cinematic effects.

**Rationale**:
- The spec requires "slow image zoom, parallax on scroll, text reveal, atmospheric effects triggered by scroll"
- These are complex scroll-based animations difficult to achieve with CSS alone
- Framer Motion provides declarative, performant animation API with scroll-triggered variants
- Supports `prefers-reduced-motion` out of the box
- Well-maintained, widely used in React ecosystem

**Alternatives Considered**:
- **CSS-only**: Cannot handle complex scroll-triggered sequences or parallax effects reliably.
- **GSAP**: More powerful but heavier; overkill for this feature's needs.
- **React Spring**: Similar to Framer Motion but less documentation and community support.

### 2. Related Stories Filtering

**Decision**: Filter stories by checking if monster ID appears in the `monsterIds` array.

**Rationale**:
- The story data structure includes `monsterIds: string[]` for exactly this purpose
- Simple array.includes() check is performant for ~3 stories
- No additional data transformation needed

**Implementation**:
```typescript
const relatedStories = stories.filter(story => 
  story.monsterIds.includes(monsterId)
);
```

### 3. Scroll-Triggered Animations

**Decision**: Use Framer Motion's `useInView` and `useScroll` hooks for scroll-triggered effects.

**Rationale**:
- `useInView` detects when elements enter the viewport
- `useScroll` provides scroll position for parallax effects
- `useTransform` maps scroll position to animation values
- Performance: uses IntersectionObserver API under the hood

**Animation Types**:
- Slow image zoom: `scale` animation on hero image based on scroll
- Parallax: `y` transform on hero based on scroll position
- Text reveal: `opacity` and `y` transforms on text elements
- Atmospheric effects: particles/fog triggered by scroll position thresholds

### 4. Not-Found State

**Decision**: Render NotFoundMonster component when monster ID doesn't match any entry.

**Rationale**:
- Simple conditional rendering based on content loader lookup
- No additional routing complexity needed
- Consistent with Feature 2's error handling approach

**Implementation**:
```typescript
const monster = monsters[id];
if (!monster) {
  return <NotFoundMonster />;
}
```

### 5. Reduced-Motion Support

**Decision**: Use Framer Motion's `useReducedMotion` hook to conditionally disable animations.

**Rationale**:
- Framer Motion automatically respects `prefers-reduced-motion` CSS media query
- `useReducedMotion()` hook returns boolean for conditional rendering
- Animations can be simplified or removed when reduced motion is preferred

## Best Practices Research

### Framer Motion Patterns
- Use `motion.div` for animated containers
- Use `whileInView` for scroll-triggered animations
- Use `useScroll` + `useTransform` for parallax effects
- Use `AnimatePresence` for page transitions
- Use `useReducedMotion` for accessibility

### Scroll Performance
- Use `will-change: transform` sparingly
- Prefer CSS transforms over layout properties
- Use IntersectionObserver for scroll detection
- Debounce scroll handlers

### Accessibility
- Use `aria-live` regions for dynamic content
- Ensure focus management during page transitions
- Provide skip links for keyboard navigation
- Test with screen readers
