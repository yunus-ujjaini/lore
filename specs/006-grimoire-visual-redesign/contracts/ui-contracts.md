# UI Contracts: Grimoire Visual Redesign

**Feature**: 006-grimoire-visual-redesign
**Date**: 2026-08-21

This project is a client-side SPA with no external API contracts. The contracts below define the UI component interfaces — the data each page/component consumes and the interactions it exposes.

## Page Contracts

### BestiaryPage (`/bestiary`)

**Consumes**: `monsters` (Record<string, Monster>), `categories` (readonly string[])
**Exposes**: Navigation to `/bestiary/:id` on card click
**State**: Filter state persisted to sessionStorage via `useMonsterFilter`

| Slot | Content | Behavior |
|---|---|---|
| Hero | Eyebrow, display title, medallion divider, lore tagline | Static, centered |
| Filter panel | Search input, category pills, threat pills | Interactive: search debounced 200ms, pills toggle, combined filtering |
| Results row | "N entries found", reset link | Updates on filter change |
| Card grid | MonsterCard per filtered result | Click navigates to detail |
| Empty state | Ornate title, lore line, reset button | Shown when zero results |

### MonsterDetailsPage (`/bestiary/:id`)

**Consumes**: `monsters[id]`, `stories` (filtered by monsterIds)
**Exposes**: Navigation to `/stories/:id` on tale click, back to `/bestiary`

| Slot | Content | Behavior |
|---|---|---|
| Image hero | Full-width monster image | Fallback to placeholder on error |
| Detail header | Category badge, name, threat stars, threat label | Category-color left rule |
| Field Description | Section label + description body | Static |
| Scholar's Notes | Section label + lore text (italic) | Omitted if no lore field |
| Known Weaknesses | Section label + weakness tags | Omitted if no weaknesses field |
| Entry Details sidebar | Classification, threat, tales count | Sticky on desktop |
| Featured in Tales | Tale rows with title, summary, "Read →" | Click navigates to story |

### StoriesPage (`/stories`)

**Consumes**: `stories` (Record<string, Story>)
**Exposes**: Navigation to `/stories/:id` on card click

| Slot | Content | Behavior |
|---|---|---|
| Hero | Eyebrow, display title, medallion divider, lore tagline | Static, centered, green glow |
| Count line | "N tales recorded" | Static |
| Card grid | StoryCard per story | Click navigates to reader |

### StoryReaderPage (`/stories/:id`)

**Consumes**: `stories[id]`, `monsters` (for related)
**Exposes**: Navigation to `/bestiary/:id` on monster click, back to `/stories`

| Slot | Content | Behavior |
|---|---|---|
| Progress bar | Fixed 3px gradient bar | Scroll-bound |
| Image hero | Full-width story image | Fallback to placeholder on error |
| Title block | Eyebrow, title, summary | Static |
| Progress strip | Gradient track + "N% read" | Scroll-bound |
| Chapter sections | Sections with left rule, active highlight | Scroll-bound active state |
| TOC sidebar | Numbered chapter rows, progress meter | Sticky, click-to-scroll |
| Monsters Encountered | Monster rows with stars and link | Click navigates to bestiary |
| End of Tale | Medallion divider | Static |
| Next Tale | Card with title, summary, "Continue Reading →" | Click navigates to random other story |
| Navigation links | Return to Stories, Explore Bestiary | Static links |

## Shared Component Contracts

### GlobalNav

**Consumes**: Current route location
**Exposes**: Navigation to `/bestiary` and `/stories`

| Slot | Content | Behavior |
|---|---|---|
| Medallion | SVG wolf mark | Static, decorative |
| Wordmark | "THE WITCHER" text | Static, links to /bestiary |
| Nav links | Bestiary, Stories | Active state = gold underline |

### ThreatStars

**Props**: `level: number`, `max?: number` (default 5), `size?: number` (default 14)
**Renders**: Row of SVG star glyphs, gold filled / dark outline

### FilterBar (Bestiary)

**Props**: `categories`, `filterState`, `searchInput`, callbacks
**Renders**: Search input + category pills + threat pills + results row

### MedallionDivider

**Props**: None (or optional label text)
**Renders**: ✦ glyph flanked by gradient hairlines
