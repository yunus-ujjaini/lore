# Implementation Plan: Story Details Experience Enhancements

**Branch**: `005-story-details-experience` | **Date**: 2026-08-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-story-details-experience/spec.md`

## Summary

Enhance the existing Story Reader page with cinematic presentation: improved typography, progress bar, section transitions with Roman numeral watermarks and ornamental dividers, drop caps, ambient particles, related monsters section, "Next Tale" navigation, and responsive/accessibility support. TDD approach — tests first, then implementation.

## Technical Context

**Language/Version**: TypeScript 5.7+ (strict mode)
**Primary Dependencies**: React 19, Framer Motion (motion/react), react-router-dom 7
**Storage**: N/A (static content, no runtime data)
**Testing**: Vitest (unit/component), Playwright (E2E)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge), mobile 375px+
**Project Type**: Static-first SPA (Vite + React)
**Performance Goals**: 60fps scrolling, <100ms progress bar updates, no layout shifts
**Constraints**: No new runtime dependencies, existing data schema unchanged, static-first architecture
**Scale/Scope**: 1 page (StoryReaderPage), ~15 CSS rulesets, ~5 new/modified components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Specification-First | ✅ | Spec exists, wireframe signed off |
| II. Visual-First UX | ✅ | Wireframe constrains layout, dark theme |
| III. Component Reuse | ✅ | New components (ProgressBar, DropCap, NextTale, FogTransition); existing RelatedMonsters enhanced |
| IV. Data-Driven Content | ✅ | No schema changes, existing data consumed |
| V. Static-First | ✅ | All animations CSS/Framer Motion (build-time bundled), no runtime fetch |
| VI. Accessibility | ✅ | reduced-motion, keyboard nav, alt text, focus states |
| VII. Performance | ✅ | CSS particles, useScroll GPU-accelerated, lazy loading |
| VIII. Automated Quality | ✅ | TDD: Vitest unit tests + Playwright E2E |
| IX. Safe Change | ✅ | Existing tests pass, incremental changes |
| X. Project Knowledge | ✅ | Decisions documented in spec Clarifications |
| XI. No Silent Guessing | ✅ | All ambiguities resolved in Grill session |
| XII. Governance | ✅ | No new dependencies needed |

**Gate result**: PASS

## Project Structure

### Documentation (this feature)

```text
specs/005-story-details-experience/
├── spec.md              # Feature specification (signed off)
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/
│   └── requirements.md  # Quality checklist
└── wireframes/
    └── 01-story-reader.svg  # Signed-off wireframe (dark theme)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── StoryReaderPage.tsx      # MODIFY — main page, restructure layout
│   ├── ReadingProgressBar.tsx   # NEW — thin progress bar component
│   ├── DropCap.tsx              # NEW — drop cap wrapper component
│   ├── NextTaleCard.tsx         # NEW — random story continuation card
│   ├── FogTransition.tsx        # NEW — gradient transition between sections
│   ├── SectionHeader.tsx        # NEW — Roman numeral + title + divider
│   ├── RelatedMonsters.tsx      # MODIFY — add heading, wrap in section
│   └── StoryEnding.tsx          # NEW — ornamental ending divider
├── styles/
│   └── stories.css              # MODIFY — new styles for all components
├── hooks/
│   └── useStoryData.ts          # EXISTING — add getNextStory()
└── content-loader.ts            # EXISTING — no changes

tests/
├── e2e/
│   ├── story-reader.spec.ts     # NEW — Playwright E2E tests
│   └── stories.spec.ts          # EXISTING — must remain passing
└── unit/
    └── components/
        ├── ReadingProgressBar.test.tsx   # NEW
        ├── DropCap.test.tsx              # NEW
        ├── NextTaleCard.test.tsx         # NEW
        ├── SectionHeader.test.tsx        # NEW
        └── StoryEnding.test.tsx          # NEW
```

**Structure Decision**: Extends existing component structure. New components follow existing BEM CSS and Framer Motion patterns. No new directories needed under `src/`.

## TDD Approach

Tests are written **before** implementation for each component:

1. **Write failing test** → defines expected behavior
2. **Implement component** → makes test pass
3. **Refactor** → clean up while keeping tests green
4. **E2E test** → validates full user journey in browser

Test order follows user story priority (P1 → P2 → P3).

## Complexity Tracking

*No constitution violations — no complexity tracking needed.*
