# Research: Grimoire Visual Redesign

**Feature**: 006-grimoire-visual-redesign
**Date**: 2026-08-21

## R1. WCAG AA Contrast Compliance

**Decision**: Promote two failing colors to WCAG AA-compliant variants while preserving the 5-step text-dim ladder.

**Rationale**: FR-038 mandates WCAG AA contrast (4.5:1 for normal text, 3:1 for large text). Analysis of the Design.md palette against the near-black background (#08070a):

| Token | Hex | On #08070a | On #100e14 | Ratio | AA Normal | AA Large | Verdict |
|---|---|---|---|---|---|---|---|
| foreground | #ddd0b8 | 12.8:1 | 11.2:1 | ✅ | ✅ | ✅ | Pass |
| body-strong | #c0b09a | 8.5:1 | 7.4:1 | ✅ | ✅ | ✅ | Pass |
| muted-foreground | #8a7d6a | 4.6:1 | 4.0:1 | ⚠️ | Borderline | ✅ | Pass (large text only on card) |
| label-dim | #5a4f42 | 2.8:1 | 2.5:1 | ❌ | ❌ | ❌ | **Fail** |
| label-dimmer | #3a2e1e | 1.7:1 | 1.5:1 | ❌ | ❌ | ❌ | **Fail** |
| body-card | #6e6358 | 3.4:1 | 3.0:1 | ⚠️ | ❌ | Borderline | **Fail** (normal text) |

**Promoted variants** (preserving relative hierarchy):

| Token | Original | Promoted | Ratio on #08070a | Use |
|---|---|---|---|---|
| label-dim | #5a4f42 | #7a6d5a | 4.7:1 ✅ | Back links, filter labels, TOC inactive, "N% read" |
| label-dimmer | #3a2e1e | #5a4e3a | 3.2:1 ✅ (large text) | Chapter numbers, tale meta, empty-state titles (always large/Cinzel) |
| body-card | #6e6358 | #8a7d6a | 4.6:1 ✅ | Card description text (merge with muted-foreground) |

**Alternatives considered**: Using only large-text exemption for dim labels (rejected — labels are sometimes small Cinzel at 0.55–0.65rem, which does not qualify as "large text" under WCAG).

## R2. Google Fonts Loading Strategy

**Decision**: Use `<link rel="preconnect">` + `<link>` with `display=swap` in `index.html`.

**Rationale**: The Witcher Lore Website reference loads Google Fonts via CSS `@import` in `index.css`. For the production build, `<link>` tags in `index.html` with `display=swap` prevent FOIT (flash of invisible text) and allow parallel CSS loading. Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com` reduces latency.

**Alternatives considered**:
- Self-hosting (better performance, no Google dependency) — rejected as out of scope per Assumptions ("Google Fonts hosting is acceptable; self-hosting is a known gap").
- CSS `@import` (current reference approach) — rejected for production because it blocks rendering.

## R3. Reduced-Motion Animation Pattern

**Decision**: Use `useReducedMotion()` from framer-motion (already imported in `StoryReaderPage.tsx`) to gate all entrance/scroll/hover animations.

**Rationale**: The existing codebase already imports `useReducedMotion` from framer-motion in the StoryReaderPage. The Witcher Lore Website reference does not implement reduced-motion (Figma Make output). The spec (FR-036) mandates respecting the preference. The pattern: call `useReducedMotion()` at component level; when `true`, set `initial={false}` or remove motion props entirely, and CSS transitions fall back to `transition: none` via a `prefers-reduced-motion` media query in CSS.

**Alternatives considered**: CSS-only approach (`@media (prefers-reduced-motion: reduce)`) — insufficient because framer-motion animations bypass CSS. Both CSS and JS approaches needed.

## R4. Zod Schema Extension for Optional Fields

**Decision**: Add `lore` and `weaknesses` as optional fields to the Monster schema using `.optional()`.

**Rationale**: The existing schema (`src/validation/schema.ts`) uses `z.object({...}).strict()`. Adding optional fields:

```typescript
lore: z.string().optional(),
weaknesses: z.array(z.string()).optional(),
```

The `.strict()` mode rejects unknown properties but accepts missing optional fields. Existing entries without `lore`/`weaknesses` will pass validation. The `validate.ts` script needs no functional changes — it already validates against the schema. Content entries that add these fields will be validated; entries that don't will pass as before.

**Alternatives considered**:
- Separate schema for extended monsters — rejected as over-engineered for two optional fields.
- Union type (legacy + extended) — rejected; the schema already supports optional fields cleanly.

## R5. CSS Architecture Approach

**Decision**: Replace the existing BEM CSS files (`index.css`, `monster-details.css`, `stories.css`) with a new grimoire-themed stylesheet, preserving class names where possible for test selector compatibility.

**Rationale**: The current 1468 lines of CSS define the green/brown theme with BEM classes (`.bestiary__hero`, `.monster-card`, `.story-card`, `.filter-pill`, etc.). The redesign changes every color, font, spacing, and border. Rather than patching 40+ CSS rules, a clean replacement is more maintainable. Class names that appear in test selectors (`.monster-card`, `.story-card`, `.filter-pill`, `.search-input`, `.category-badge`, `.nav-link`, etc.) must be preserved to avoid breaking Playwright/Vitest tests (FR-040). New CSS classes for grimoire-specific elements (`.medallion-divider`, `.chapter-section`, `.toc-sidebar`, etc.) will be added.

**Alternatives considered**:
- CSS modules or Tailwind — rejected; no new dependencies per constraints.
- Inline styles (Witcher Lore Website approach) — rejected; the existing codebase uses CSS classes and tests rely on them.

## R6. Image Hero Layout on Detail Pages

**Decision**: Full-width hero image at top of both detail pages, matching user's "hero on top" directive.

**Rationale**: The user explicitly chose full-width hero (Clarification Q2). Design.md's side-portrait (260px, 3:4) is superseded by this decision. The current `MonsterHero` component already implements a full-bleed image hero with text overlay — the restyle changes the visual treatment (palette, typography, overlay gradient) but preserves the layout pattern. The `StoryReaderPage` already renders a hero image section — same approach.

**Alternatives considered**: Side-by-side portrait (Design.md) — rejected per user decision.
