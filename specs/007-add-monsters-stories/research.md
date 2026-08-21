# Research: Add 20 New Monsters with 2 Stories Each

**Branch**: `007-add-monsters-stories` | **Date**: 2026-08-21 | **Spec**: [spec.md](./spec.md)

Research performed: repository fact-finding (existing dataset shapes, story conventions, image status, test assertions, validation CLI), one web-research pass on canonical Witcher monster candidates, plus the clarified decisions from the spec/grill sessions.

---

## R1. Monster selection — which 20 canonical Witcher creatures

- **Decision**: 20 canonical Witcher-universe creatures, exactly 2 per category, selected by the authoring agent per clarification (Q1: A). Full roster: **Beasts** — bear, wild-boar; **Cursed Ones** — werewolf, werebear; **Draconids** — basilisk, forktail; **Elementa** — earth-elemental, djinn; **Hybrids** — harpy, siren; **Insectoids** — endrega, giant-centipede; **Necrophages** — ghoul, rotfiend; **Relicts** — fiend, chort; **Specters** — noonwraith, plague-maiden; **Vampires** — ekimmara, bruxa.
- **Rationale**: Verified against the Witcher 3 bestiary and Witcher Wiki; zero overlap with the existing 10 entries (alghoul, arachas, drowners, golem, griffin, katakan, leshen, striga, wraith, wyvern); each pick is a recognized canon creature with established lore and artwork availability; 2-per-category keeps every category represented in the expanded bestiary (SC-004). Threat levels assigned from in-game ratings where available (bear 2, wild-boar 1, werewolf 3, werebear 4, basilisk 4, forktail 3, earth-elemental 4, djinn 5, harpy 2, siren 2, endrega 2, giant-centipede 3, ghoul 2, rotfiend 3, fiend 4, chort 3, noonwraith 2, plague-maiden 3, ekimmara 3, bruxa 4), giving a spread across 1–5.
- **Alternatives considered**: User-supplied roster (rejected by clarification — agent selects); invented creatures (rejected — breaks canonical consistency); picks without artwork availability checks (rejected — image convention needs scrapable/local sources or placeholder fallback).
- **Naming cautions** (from research): W3 titles the werebear "Berserker" — `werebear` is the widely used fan name and stays unique; official spelling is "Forktail" (one word) and "Ekimmara"; "Elemental" is a family name, so `earth-elemental` avoids ambiguity; plague-maiden is also called *pesta* (synonym for lore text only, not a data field).

## R2. Story guidelines — what "follow current stories" means in practice

- **Decision**: Author the 40 new stories to match the observed conventions of the existing 30: sections-based structure with 5–6 sections (validation floor 4); dark-fantasy cinematic narrative voice; per-section titles and multi-paragraph content; a summary; a local image or placeholder; `monsterIds` referencing exactly one new monster plus optionally one existing monster (per clarification Q2: A).
- **Rationale**: Facts verified in the repo: all 30 stories have 5–6 sections; 29 of 30 reference exactly 2 monsters (only `the-last-wish` references 1); summaries run 1–2 sentences; sections use URL-safe ids and titled multi-paragraph prose. The co-reference rule (one new monster subject + optional existing co-feature) preserves the two-monster story style while keeping each new monster at exactly 2 stories (FR-006/FR-008).
- **Alternatives considered**: One-monster-only stories (diverges from established style); free two-new-monster pairing (breaks the "exactly 2 stories each" guarantee).

## R3. Story count and pairing plan

- **Decision**: 40 new stories — exactly 2 per new monster (FR-006, SC-002). Each new monster's 2 stories center on it; co-features draw from existing monsters (spread across the 10 existing entries to avoid over-using any single one, e.g., pairing with a leshen or wraith matches the current dataset's cross-linking flavor).
- **Rationale**: User clarification (Q1: A) fixed 40 new stories. Pairing each story to exactly one new subject monster makes the "exactly 2 per monster" requirement machine-checkable by inspection and by a simple authoring checklist; validation itself cannot distinguish new from existing monsters (schema has no such field), so this rule is enforced during authoring and post-hoc review.
- **Alternatives considered**: Sharing one story across two new monsters (reduces count below 40, contradicts clarification); co-referencing a second new monster (FR-008 forbids).

## R4. Images — sourcing and conventions

- **Decision**: Follow the Feature 1 image convention: scrape a relevant image for each new entry, save a local copy as `public/images/monsters/<id>.png` / `public/images/stories/<id>.png` (ID-derived filename), never hotlink; if retrieval fails, reference `placeholders/missing.png` (FR-013). PNG preferred (established authoring choice; extension allowlist webp/jpg/jpeg/png).
- **Rationale**: Facts verified in the repo: all 10 existing monsters have real local images; 7 of 30 stories have real images and 23 use the placeholder — the placeholder is an accepted, valid state. Validation checks file existence relative to `public/images/` and forbids remote URLs (FR-012/FR-022).
- **Alternatives considered**: Placeholder-only for all new entries (degraded experience vs. the monster-image precedent); hotlinking (forbidden by convention and FR-022).

## R5. Validation and testing impact — zero code/test changes required

- **Decision**: No changes to `src/validation/`, `scripts/validate.ts`, or any test file. The expansion is verified by the existing gates: `npm run validate`, `npm test`, `npm run test:e2e`.
- **Rationale**: Verified in the repo: validation aggregates the dataset dynamically via `content/index.ts` (fs scan + import), so new files are picked up with no code change; test assertions use lower bounds — `monsters.length ≥ 10`, `stories.length ≥ 3`, `categories.length === 10` (unchanged), plus category/threat-level spread checks that the 2-per-category roster only strengthens; E2E `content-serving.spec.ts` iterates all content entries and will validate the new images automatically (HTTP 200, allowlisted content type, no hotlinks).
- **Alternatives considered**: Adding a new validation rule for "exactly 2 stories per new monster" (rejected — schema cannot identify which monsters are "new"; enforcing during authoring + post-hoc review is the spec's design); updating hardcoded counts (none exist).

## R6. Lore accuracy and review

- **Decision**: The authoring agent writes lore-faithful descriptions/weaknesses and stories from canonical Witcher lore; the user performs post-hoc review of the created folders and content per the established authoring workflow, and runs the validation gates themselves.
- **Rationale**: Spec assumption and constitution governance: this is an unofficial fan project; AI-authored lore accuracy is verified by the user during review. Weaknesses per existing convention (e.g., silver, oils, signs) are written from canon where known.
- **Alternatives considered**: Pre-acceptance review gate (rejected in Feature 1 — review is post-hoc).

## R7. Data volume and performance

- **Decision**: Deliver 20 monster entries, 40 story entries, and up to 60 local images (20 monsters + 40 stories, placeholders where retrieval fails). No architectural impact.
- **Rationale**: Static build-time modules; the browser consumes data through the existing loader. 30 monsters / 70 stories is well within static hosting norms (Feature 5/6 already serve the full dataset).
- **Alternatives considered**: Chunking/delaying content (no need at this volume); reducing per-story length (contradicts the 5–6-section convention).