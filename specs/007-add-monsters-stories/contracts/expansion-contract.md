# Content Expansion Contract

**Branch**: `007-add-monsters-stories` | **Date**: 2026-08-21 | **Spec**: [spec.md](../spec.md)

This contract defines what the authoring agent MUST produce for this feature and what consumers can rely on afterward. The canonical content schema is unchanged (see [Feature 1 contract](../../001-content-foundation/contracts/content-schema.md) and `src/validation/schema.ts`); this contract adds the feature-specific authoring rules on top of it.

## 1. Deliverables

| Deliverable | Count | Location |
|-------------|-------|----------|
| Monster entries | 20 new (30 total) | `content/monsters/<id>.ts` |
| Story entries | 40 new (70 total) | `content/stories/<id>.ts` |
| Monster images | up to 20 | `public/images/monsters/<id>.png` |
| Story images | up to 40 | `public/images/stories/<id>.png` |
| Placeholder fallback | as needed | `public/images/placeholders/missing.png` (valid) |

## 2. Monster contract (new entries)

```text
Monster {
  id:          string   // URL-safe [a-z0-9-], unique across monsters and stories
  name:        string   // canonical Witcher creature name, non-empty
  category:    string   // one of the 10 central categories; exactly 2 monsters per category
  threatLevel: number   // integer 1-5
  description: string   // non-empty, 1-2 sentences of canonical lore
  image:       string   // filename in public/images/monsters/, must exist, allowlisted extension
  lore:        string   // non-empty — present in all 10 existing entries (consistent authoring)
  weaknesses:  string[] // non-empty array — present in all 10 existing entries (consistent authoring)
}
```

- Selection rule: canonical Witcher-universe creatures only, no overlap with the existing 10 (alghoul, arachas, drowners, golem, griffin, katakan, leshen, striga, wraith, wyvern). Roster in [research.md](../research.md) R1.
- No new categories; `content/categories.ts` is unchanged.

## 3. Story contract (new entries)

```text
Story {
  id:         string          // URL-safe [a-z0-9-], unique across monsters and stories
  title:      string          // non-empty
  summary:    string          // non-empty, 1-2 sentences
  sections:   StorySection[]  // 5-6 ordered sections (validation floor 4)
  monsterIds: string[]        // exactly ONE new monster (subject) + optional ONE existing monster (co-feature)
  image:      string          // filename in public/images/stories/, must exist, allowlisted extension
}

StorySection {
  id:      string   // URL-safe, unique within the story
  title:   string   // non-empty section heading
  content: string   // non-empty, multi-paragraph dark-fantasy cinematic prose
}
```

- Pairing rule: each new monster appears in exactly 2 new stories (40 stories total).
- Co-reference rule: a new story MUST NOT reference a second new monster; the optional second reference is an existing monster (FR-008).
- Conventions: 5–6 sections per story, per-section titles, multi-paragraph content, matching all 30 current stories.

## 4. Image contract

- Filenames derived from the entry ID: `public/images/monsters/<id>.png`, `public/images/stories/<id>.png`.
- Local files only; remote/hotlinked images are forbidden (FR-012).
- If retrieval fails, reference `placeholders/missing.png` (FR-013) — validation must not fail solely for that reason.
- Extension allowlist: webp | jpg | jpeg | png (PNG is the established authoring choice).

## 5. Invariants (must hold after authoring)

1. `npm run validate` exits 0: content VALID — 30 monsters, 70 stories, 10 categories.
2. Every new story's `monsterIds` contains exactly one ID from the 20 new monsters, and any second ID is from the existing 10.
3. Every new monster ID appears in exactly 2 new stories.
4. Each new story has 5–6 sections; every section has a unique-in-story ID, a title, and non-empty content.
5. No existing entry or image was modified or removed (git diff shows additions only).
6. No application code changed (git diff under `src/`, `tests/`, `scripts/` is empty).

## 6. Verification commands

| Command | Purpose |
|---------|---------|
| `npm run validate` | Dataset validation (exit 0 = valid) |
| `npm test` | All vitest suites (schema, edge cases, expansion, dataset) |
| `npm run test:e2e` | Playwright: served content images 200 + allowlisted content type + no hotlinks; existing UI journeys |
| `npm run build` | Static build sanity check |

Types and schemas are exported from `src/validation/schema.ts`; consumers import from there rather than redeclaring shapes (Feature 1 contract).