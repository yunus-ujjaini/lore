# Authoring Roster: 20 New Monsters + 40 Stories

**Feature**: 007-add-monsters-stories | **Date**: 2026-08-21 | **Source**: [research.md](./research.md) R1/R3, [expansion-contract.md](./contracts/expansion-contract.md)

This roster locks every ID used during authoring. Story IDs and co-feature pairings are assigned here so all 60 files reference consistent IDs (FR-005/FR-010).

## Monsters (2 per category, canonical Witcher creatures)

| # | ID | Name | Category | Threat | Notes |
|---|----|------|----------|--------|-------|
| 1 | `bear` | Bear | Beasts | 2 | Forest predator; steel, not silver |
| 2 | `wild-boar` | Wild Boar | Beasts | 1 | Regular-animal Beasts entry |
| 3 | `werewolf` | Werewolf | Cursed Ones | 3 | Full-moon curse |
| 4 | `werebear` | Werebear | Cursed Ones | 4 | Skellige vildkarls; W3 title "Berserker" |
| 5 | `basilisk` | Basilisk | Draconids | 4 | Dragon-kin of ruins |
| 6 | `forktail` | Forktail | Draconids | 3 | Twin tail-spikes; one word |
| 7 | `earth-elemental` | Earth Elemental | Elementa | 4 | Bound stone colossus |
| 8 | `djinn` | Djinn | Elementa | 5 | Air genie; wish-granter |
| 9 | `harpy` | Harpy | Hybrids | 2 | Cliff-nesting flocks |
| 10 | `siren` | Siren | Hybrids | 2 | Sea lure; Skellige coasts |
| 11 | `endrega` | Endrega | Insectoids | 2 | Caste-based colonies |
| 12 | `giant-centipede` | Giant Centipede | Insectoids | 3 | Toussaint burrower |
| 13 | `ghoul` | Ghoul | Necrophages | 2 | Battlefield carrion-eater |
| 14 | `rotfiend` | Rotfiend | Necrophages | 3 | Bursts into toxic gore |
| 15 | `fiend` | Fiend | Relicts | 4 | Horned forest giant |
| 16 | `chort` | Chort | Relicts | 3 | Fiend's smaller kin |
| 17 | `noonwraith` | Noonwraith | Specters | 2 | Midday sun death |
| 18 | `plague-maiden` | Plague Maiden | Specters | 3 | Also called *pesta* |
| 19 | `ekimmara` | Ekimmara | Vampires | 3 | Bat-headed lesser vampire |
| 20 | `bruxa` | Bruxa | Vampires | 4 | Screaming vampiric womanoid |

Threat coverage: 1 (wild-boar), 2 (5×), 3 (7×), 4 (6×), 5 (djinn) — spans 1–5 (SC-004).

## Stories (2 per new monster; exactly one new monster as subject, optional co-feature from existing 10)

Existing monsters available as co-features: `alghoul`, `arachas`, `drowners`, `golem`, `griffin`, `katakan`, `leshen`, `striga`, `wraith`, `wyvern`.

| New monster | Story ID 1 | Co-feature | Story ID 2 | Co-feature |
|-------------|-----------|------------|-----------|------------|
| `bear` | `the-winter-bear` | `wyvern` | `the-slavering-maw` | — |
| `wild-boar` | `the-boars-ridge` | `drowners` | `the-tusked-fury` | — |
| `werewolf` | `the-moonlit-hunt` | `wraith` | `the-cursed-fur` | `striga` |
| `werebear` | `the-berserkers-curse` | `griffin` | `the-skellige-bloodrage` | — |
| `basilisk` | `the-ruined-spire` | `golem` | `the-petrifying-gaze` | — |
| `forktail` | `the-forked-tail` | `drowners` | `the-herdsmans-lament` | `alghoul` |
| `earth-elemental` | `the-stone-wake` | `golem` | `the-bound-colossus` | — |
| `djinn` | `the-djinns-bargain` | `leshen` | `the-stormbound-wish` | `katakan` |
| `harpy` | `the-clifftop-shriek` | `griffin` | `the-trinket-hoard` | — |
| `siren` | `the-sirens-call` | `wyvern` | `the-coastal-widow` | `drowners` |
| `endrega` | `the-nest-war` | `arachas` | `the-queens-brood` | — |
| `giant-centipede` | `the-toussaint-tunnel` | `griffin` | `the-chitinous-eruption` | `wraith` |
| `ghoul` | `the-battlefield-feast` | `alghoul` | `the-gravediggers-dilemma` | `drowners` |
| `rotfiend` | `the-bloated-one` | `wraith` | `the-pox-cart` | `katakan` |
| `fiend` | `the-horned-watch` | `leshen` | `the-still-gaze` | `golem` |
| `chort` | `the-farmsteads-end` | `drowners` | `the-cabbage-thief` | `wraith` |
| `noonwraith` | `the-midday-death` | `striga` | `the-harvest-field-ghost` | `griffin` |
| `plague-maiden` | `the-pestas-path` | `katakan` | `the-rotting-veil` | `wraith` |
| `ekimmara` | `the-invisible-feast` | `wraith` | `the-bat-faced-vengeance` | `striga` |
| `bruxa` | `the-bruxas-lullaby` | `leshen` | `the-immortal-maiden` | `griffin` |

Co-feature spread across existing 10: alghoul 3, arachas 1, drowners 5, golem 4, griffin 5, katakan 3, leshen 3, striga 3, wraith 5, wyvern 2 — balanced, no single monster overused.

Rules enforced (FR-006/FR-008): each new monster appears in exactly 2 stories; every story's `monsterIds` = [its new monster] + optional [one existing co-feature]; never two new monsters in one story.

## Images

- Monster images: `public/images/monsters/<id>.png` (scrape + save locally; placeholder on failure).
- Story images: `public/images/stories/<story-id>.png` (scrape + save locally; placeholder on failure — current dataset precedent: 23 of 30 stories use placeholders).