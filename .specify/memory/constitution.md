<!--
Sync Impact Report
- Version change: unratified template → 1.0.0 (initial ratification)
- Modified principles: none (no prior ratified content)
- Added sections: Core Principles I–XII; Section 2: Automated Quality &
  Testing Standards; Section 3: Definition of Done; Governance
- Removed sections: none
- Follow-up TODOs: none
-->

# Lore Constitution

## Core Principles

### I. Specification-First Development

Features begin with a written specification before any implementation. The
spec defines the user journey, content model, and acceptance criteria so that
implementation, testing, and review all trace back to a single agreed source
of truth.

### II. Visual-First User Experience

Visual hierarchy, spacing, typography, imagery, transitions, and motion MUST
be deliberately designed. New UI MUST preserve the established visual
language; functionality is NOT complete if the result is technically correct
but visually inconsistent with the approved design.

### III. Component & Design-System Reuse

Repeated UI patterns MUST be implemented as reusable components. Duplicated
markup is forbidden solely because two pages currently look similar. Shared
visual patterns MUST have a single source of truth.

### IV. Data-Driven Content

Monster information MUST be represented as structured data rather than
hardcoded repeatedly inside UI components. UI components MUST consume
monster/story data. Adding a new monster MUST NOT require modifying multiple
unrelated components.

### V. Static-First Architecture

The project MUST default to a static-first architecture: content is built at
build time, runtime dependencies are avoided unless they are genuinely
required, and dynamic behavior is added only where static generation cannot
satisfy the requirement.

### VI. Accessibility & Inclusive Interaction

All user-facing functionality MUST be usable with keyboard navigation where
applicable. Images MUST have meaningful alternative text unless genuinely
decorative. Interactive controls MUST have accessible names and states.
Animations MUST respect reduced-motion preferences. Color MUST NOT be the
sole means of conveying information.

### VII. Performance-Conscious Visuals

Animation and visual effects MUST enhance the experience without
unnecessarily degrading responsiveness. Large assets MUST be appropriately
optimized. Images MUST be lazy-loaded where appropriate. Expensive effects
MUST NOT be applied indiscriminately.

### VIII. Automated Quality

Every user-facing feature MUST have appropriate automated tests, with
Playwright E2E tests for critical user journeys. Tests MUST be developed
alongside the feature, not as a cleanup activity afterward. A feature is NOT
complete until its relevant automated tests pass.

### IX. Safe Change & Backward Compatibility

Existing tests MUST remain passing unless a requirement intentionally changes
existing behavior. Changes MUST be made incrementally and reversibly, with
breaking changes only under explicit, documented requirement changes.

### X. Project Knowledge & Traceability

Important architectural, UX, content-model, and technology decisions MUST be
documented and remain discoverable by future AI agents and developers. The
project Wiki MUST be treated as persistent project knowledge, not disposable
notes. Important decisions MUST NOT exist only inside chat history.

### XI. No Silent Guessing Through Ambiguity

When a requirement materially affects behavior, architecture, UX, data,
accessibility, or testing and is ambiguous, the agent MUST surface the
ambiguity rather than silently choosing a behavior.

### XII. Governance & Compliance

New dependencies require justification based on actual project need. Every
significant feature MUST include automated validation. All work MUST remain
compliant with this constitution; ambiguity about constitution scope MUST be
raised before proceeding.

## Automated Quality & Testing Standards

- Every user-facing feature MUST have appropriate automated tests.
- Playwright E2E tests MUST validate critical user journeys from the user's
  perspective.
- Tests MUST be developed alongside the feature, not as a cleanup activity
  afterward.
- Tests MUST test behavior rather than implementation details.
- Every significant feature MUST include automated validation.
- A feature is NOT complete until its relevant automated tests pass.
- Existing tests MUST remain passing unless a requirement intentionally
  changes existing behavior.

## Definition of Done

A feature is done only when ALL of the following hold:

- Spec is documented and the implementation matches it.
- Automated tests exist, were written alongside the feature, and pass
  (Playwright E2E covers critical user journeys).
- UI is visually consistent with the approved design language.
- Repeated UI patterns use shared components, not duplicated markup.
- Monster/story content comes from structured data, not hardcoded markup.
- Keyboard navigation, alt text, accessible control names/states, and
  reduced-motion preferences are satisfied.
- Assets are optimized and lazy-loaded where appropriate; no expensive
  effects applied indiscriminately.
- New dependencies, if any, are justified.
- Decisions are documented in the project Wiki and discoverable.

## Governance

This constitution supersedes all other practices and is the single source of
truth for project governance. It is binding on all agents and contributors,
including automated ones.

- **Amendment procedure**: Amendments are proposed with a written rationale
  and a sync impact report; they take effect only after this constitution
  document is updated. No informal or chat-only amendments are valid.
- **Versioning policy**: The constitution version follows semantic
  versioning. MAJOR for backward-incompatible principle removals or
  redefinitions; MINOR for new principles or materially expanded guidance;
  PATCH for clarifications, wording, and typo fixes.
- **Compliance review**: Reviews and PR checks MUST verify compliance with
  this constitution. Passing tests are the primary compliance evidence for
  behavior, accessibility, and quality requirements.
- **Ambiguity**: If a requirement conflicts with this constitution or is
  ambiguous about its scope, the ambiguity MUST be surfaced before work
  proceeds; it MUST NOT be resolved by silent guessing.

**Version**: 1.0.0 | **Ratified**: 2026-08-14 | **Last Amended**: 2026-08-14
