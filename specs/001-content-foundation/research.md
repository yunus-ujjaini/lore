# Research: Content Foundation & Content Pipeline

**Branch**: `001-content-foundation` | **Date**: 2026-08-14 | **Spec**: [spec.md](./spec.md)

Research performed: environment verification (repo root), review of the requirements doc and functional design, one research agent pass on validation/testing/data-format/image best practices, plus one user decision on the tech stack.

---

## R1. Tech stack

- **Decision**: Vite + TypeScript (strict), Node 24 tooling, no framework.
- **Rationale**: Repo is greenfield (verified: no package.json/tsconfig/framework config). The requirements doc suggests TypeScript content files; the constitution mandates static-first. Vite provides the TS pipeline and future dev server without committing to a framework; a content foundation needs no runtime framework. Node 24.12 + npm 11.6.2 verified available.
- **Alternatives considered**: Astro (more structure than a data-only feature needs), Next.js (heavy for a foundation), plain `tsc` (no build pipeline; future UI will need one anyway).

## R2. Content validation library

- **Decision**: Zod.
- **Rationale**: FR-011 requires validation reports identifying the offending entry and field — Zod's error paths (`error.issues[].path`, e.g. `monsters[3].image`) deliver this directly. Zod derives TypeScript types from schemas, so one definition drives both compile-time types and runtime validation with zero drift. Two small, pure, purpose-built dependencies (Zod + Vitest) are justifiable under constitution XII.
- **Alternatives considered**: JSON Schema + ajv (no TS type derivation, noisier error paths), hand-rolled validators (zero deps but reimplemented path tracking; false economy once the schema grows beyond ~8 fields).

## R3. Test runner

- **Decision**: Vitest.
- **Rationale**: Shares Vite config and TS pipeline with zero extra setup; native TS; watch mode; table-driven tests (`it.each`) fit rule-per-case validation testing. `npm run validate` runs the full-dataset validation suite.
- **Alternatives considered**: `node:test` (zero-dep but manual TS wiring, no watch niceties), Jest (legacy TS transform/ESM pain on Node 24).

## R4. Content data format

- **Decision**: TypeScript modules — `content/categories.ts`, `content/monsters/<id>.ts`, `content/stories/<id>.ts` (one entry per file).
- **Rationale**: Matches the requirements doc's suggested structure; schema errors surface at compile time; types act as an in-editor spec for AI-assisted authoring; one-file-per-entry keeps git diffs and post-hoc review atomic. Filesystem storage = the "no database" constraint.
- **Alternatives considered**: JSON (untyped, no comments, awkward hand-editing), YAML (extra parser dependency, indentation fragility), MDX (wrong tool for pure data; defer until UI exists).

## R5. Image handling

- **Decision**: Local files at `public/images/monsters/<id>.png` and `public/images/stories/<id>.png`, filename derived from the entry ID (slug), never from the scraped URL filename. Designated placeholder at `public/images/placeholders/missing.png` (FR-023). Validation asserts file existence and allowlisted extensions (webp/jpg/jpeg/png).
- **Rationale**: Slug-derived names are deterministic and deduplicated; scraped URLs contain query strings, unicode, and duplicate basenames. Local copies satisfy FR-022 (no hotlinks). Existence checking (user decision) catches broken references with the offending entry identified. Extension allowlist + lowercase enforcement avoids case-sensitivity breakage (macOS is case-insensitive, Linux/hosting is not).
- **Alternatives considered**: Referencing scraped URLs directly (rejected: hotlink ban, link rot, referrer leakage, offline breaks), storing raw scraped filenames (rejected: collisions, non-URL-safe characters).

## R6. Validation workflow wiring

- **Decision**: Validation runs as a vitest suite (`npm run validate` = full-dataset content validation; `npm test` = all suites). No pre-commit gate in this feature; the spec defers workflow wiring to planning, and on-demand execution satisfies the requirements.
- **Rationale**: Zero extra dependencies, deterministic CI-ready exit codes, and the same entry-level failure reporting requirement (FR-012) via test failures/messages.
- **Alternatives considered**: Dedicated CLI script with a validation runner (extra tooling, no benefit at this scale), pre-commit hooks (deferred, can be added later without redesign).

## R7. Dataset authoring (FR-019)

- **Decision**: Agent-driven authoring. Entries are created directly in `content/` on request (e.g., "10 new monsters in this category"), each conforming to the schema; images downloaded into `public/images/` at authoring time; user validates post-hoc from the created folders.
- **Rationale**: User decision recorded in spec Clarifications; TS modules + one-file-per-entry make AI authoring and human review both tractable.
- **Alternatives considered**: Authoring checklist + deferred content (rejected by user), pre-acceptance human review gate (rejected by user — review is post-hoc).

## R8. E2E testing (Playwright)

- **Decision**: Playwright (@playwright/test) with a `content-serving.spec.ts` suite. `npm run test:e2e` starts a static preview server (playwright `webServer` over the `public/` directory) and asserts, for every content entry: the image URL returns HTTP 200 with an allowlisted content type, the designated placeholder is reachable, and no image value is a remote URL (hotlink ban, FR-022). Browser-level (HTTP) validation of the dataset through the real serving path.
- **Rationale**: User request ("also use e2e tests playwright") and constitution VIII, which explicitly names Playwright for E2E. This feature has no user-facing UI (spec decision), so E2E targets the served content pipeline — catching real deployment failures (case sensitivity, path/extension mismatches, missing files, content types) that unit tests cannot. Full user-journey E2E arrives with future UI features, which will reuse this harness.
- **Alternatives considered**: Skipping E2E until UI exists (rejected — user requested Playwright now; constitution names Playwright E2E), re-testing the same checks in Vitest only (redundant with the validation suite and provides no browser/serving-path value), adding a smoke UI page to have a "user journey" (rejected — would violate the spec's no-UI scope).
