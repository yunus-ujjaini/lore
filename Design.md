---
version: alpha
name: witcher-lore-design-analysis
description: A medieval-grimoire fantasy site for The Witcher — a bestiary of monsters and the tales that surround them. The base canvas is **near-black** (`#08070a`) holding aged-parchment cream display type (`#ddd0b8`). Two brand voltages: **medallion gold** (`#b8852a`) and **blood red** (`#8b1a1a`). Type is a four-face serif system — Cinzel Decorative (display), Cinzel (headings/labels), Crimson Text (body), IM Fell English (lore/quotes) — evoking a scholar's ledger. Depth comes from hairlines, 1px-gap grid seams, thin category-color accent bars, and **required entry imagery**, not drop shadows. Every monster and every story carries its own image, displayed on the monster detail and story detail pages; a designated placeholder covers missing assets. Ornament is typographic: uppercase micro-labels with wide tracking, ✦ glyphs, and medallion dividers.

colors:
  background: "#08070a"
  foreground: "#ddd0b8"
  card: "#100e14"
  card-foreground: "#ddd0b8"
  primary: "#8b1a1a"
  primary-foreground: "#f0e8d8"
  secondary: "#1a2415"
  secondary-foreground: "#a8c49a"
  muted: "#1c1820"
  muted-foreground: "#8a7d6a"
  accent: "#b8852a"
  accent-foreground: "#08070a"
  border: "#2e2530"
  ring: "#8b1a1a"
  hairline-inset: "#1c1820"
  label-dim: "#5a4f42"
  label-dimmer: "#3a2e1e"
  body-card: "#6e6358"
  body-strong: "#c0b09a"

  category-beasts: "#5a4a3a"
  category-vampires: "#5a1a3a"
  category-necrophages: "#3a5a1a"
  category-wraiths: "#1a2a5a"
  category-cursed-ones: "#5a2a1a"
  category-hybrids: "#4a3a5a"
  category-elementa: "#5a4a1a"
  category-insectoids: "#2a4a1a"
  category-ogroids: "#4a3a1a"
  category-relicts: "#2a1a4a"

typography:
  display-hero:
    fontFamily: "'Cinzel Decorative', serif"
    fontSize: clamp(2rem, 5vw, 3.5rem)
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: 0.08em
  display-title:
    fontFamily: "'Cinzel Decorative', serif"
    fontSize: clamp(1.6rem, 3.5vw, 3rem)
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0.05em
  eyebrow:
    fontFamily: "'Cinzel', serif"
    fontSize: 0.7rem
    fontWeight: 400
    letterSpacing: 0.35em
    textTransform: uppercase
  section-label:
    fontFamily: "'Cinzel', serif"
    fontSize: 0.65rem
    fontWeight: 400
    letterSpacing: 0.25em
    textTransform: uppercase
  card-title:
    fontFamily: "'Cinzel', serif"
    fontSize: 1.05rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.04em
  nav-link:
    fontFamily: "'Cinzel', serif"
    fontSize: 0.8rem
    letterSpacing: 0.15em
    textTransform: uppercase
  label-small:
    fontFamily: "'Cinzel', serif"
    fontSize: 0.55rem
    letterSpacing: 0.15em
    textTransform: uppercase
  body:
    fontFamily: "'Crimson Text', Georgia, serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
  body-card:
    fontFamily: "'Crimson Text', Georgia, serif"
    fontSize: 0.9rem
    lineHeight: 1.6
  body-strong:
    fontFamily: "'Crimson Text', Georgia, serif"
    fontSize: 1.1rem
    lineHeight: 1.8
  lore:
    fontFamily: "'IM Fell English', serif"
    fontStyle: italic
    fontSize: 1.1rem
    lineHeight: 1.9
  tagline:
    fontFamily: "'IM Fell English', serif"
    fontStyle: italic
    fontSize: 1.1rem
    lineHeight: 1.7
  wordmark:
    fontFamily: "'Cinzel Decorative', serif"
    fontSize: 0.9rem
    fontWeight: 700
    letterSpacing: 0.2em

rounded:
  none: 0px
  xs: 2px
  sm: 4px

spacing:
  hairline: 1px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 64px

components:
  top-nav:
    backgroundColor: linear-gradient(180deg, rgba(8,7,10,0.98), rgba(8,7,10,0.92))
    textColor: "{colors.foreground}"
    typography: "{typography.nav-link}"
    height: 64px
    borderBottom: 1px "{colors.border}"
    backdropFilter: blur(8px)
  wordmark:
    fontFamily: "'Cinzel Decorative', serif"
    fontSize: 0.9rem
    fontWeight: 700
    letterSpacing: 0.2em
    color: "{colors.foreground}"
  medallion-divider:
    color: "{colors.accent}"
    line: linear-gradient(90deg, transparent, "{colors.accent}", transparent)
    height: 1px
  hero-band:
    padding: 5rem 2rem 4rem
    textAlign: center
    glow: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,26,26,0.12) 0%, transparent 70%)
  filter-panel:
    backgroundColor: "{colors.card}"
    border: 1px "{colors.border}"
    padding: 1.5rem
  filter-pill:
    fontFamily: "'Cinzel', serif"
    fontSize: 0.7rem
    letterSpacing: 0.1em
    textTransform: uppercase
    border: 1px "{colors.border}"
    color: "{colors.muted-foreground}"
    padding: 0.35rem 0.9rem
    rounded: "{rounded.xs}"
    active: backgroundColor "{colors.primary}", borderColor "{colors.primary}", color "{colors.primary-foreground}"
  search-input:
    backgroundColor: "{colors.muted}"
    border: 1px "{colors.border}"
    color: "{colors.foreground}"
    fontFamily: "'Cinzel', serif"
    fontSize: 0.8rem
    letterSpacing: 0.05em
    padding: 0.6rem 1rem
    rounded: "{rounded.xs}"
    placeholder: italic "{colors.muted-foreground}"
    focus: borderColor "{colors.accent}"
  category-badge:
    fontFamily: "'Cinzel', serif"
    fontSize: 0.65rem
    letterSpacing: 0.12em
    textTransform: uppercase
    border: 1px currentColor
    padding: 0.2rem 0.6rem
    rounded: "{rounded.xs}"
  monster-card:
    backgroundColor: "{colors.background}"
    border: 1px "{colors.border}"
    hover: borderColor "{colors.accent}", translateY(-2px), box-shadow 0 8px 32px rgba(0,0,0,0.6) + 0 0 0 1px rgba(184,133,42,0.2)
    topBar: 3px gradient category color → transparent
  story-card:
    backgroundColor: "{colors.card}"
    border: 1px "{colors.border}"
    hover: borderColor "{colors.primary}", translateY(-2px), box-shadow 0 8px 32px rgba(0,0,0,0.6) + 0 0 0 1px rgba(139,26,26,0.2)
  threat-stars:
    filled: "{colors.accent}"
    empty: stroke "{colors.label-dimmer}"
  grid-seam:
    backgroundColor: "{colors.border}"
    gap: 1px
  detail-header:
    borderLeft: 4px category color
    paddingLeft: 1.5rem
  entry-details-card:
    backgroundColor: "{colors.card}"
    border: 1px "{colors.border}"
    padding: 1.5rem
  lore-quote:
    borderLeft: 2px "{colors.border}"
    paddingLeft: 1.25rem
  weakness-tag:
    fontFamily: "'Cinzel', serif"
    fontSize: 0.65rem
    letterSpacing: 0.1em
    textTransform: uppercase
    border: 1px "{colors.border}"
    padding: 0.25rem 0.7rem
    rounded: "{rounded.none}"
  progress-bar:
    height: 3px
    background: linear-gradient(90deg, "{colors.primary}", "{colors.accent}")
  chapter-section:
    borderLeft: 2px "{colors.border}"
    paddingLeft: 2rem
    marginLeft: 1rem
    active: borderLeftColor "{colors.accent}"
  toc-sidebar:
    backgroundColor: "{colors.card}"
    border: 1px "{colors.border}"
    padding: 1.25rem
    stickyTop: 84px
  next-tale-card:
    backgroundColor: "{colors.card}"
    border: 1px "{colors.border}"
    padding: 2rem
    hover: borderColor "{colors.primary}"
  monster-portrait:
    backgroundColor: "{colors.card}"
    border: 1px "{colors.border}"
    maxWidth: 260px
    aspectRatio: 3/4
    objectFit: cover
    required: every monster entry must reference an image
  story-illustration:
    backgroundColor: "{colors.card}"
    border: 1px "{colors.border}"
    maxWidth: 260px
    aspectRatio: 16/9
    objectFit: cover
    required: every story entry must reference an image
  placeholder-image:
    path: placeholders/missing.png
    backgroundColor: "{colors.muted}"
    note: designated fallback when an asset is missing; never an acceptable permanent entry image
  outline-button:
    backgroundColor: transparent
    color: "{colors.accent}"
    border: 1px "{colors.accent}"
    fontFamily: "'Cinzel', serif"
    fontSize: 0.7rem
    letterSpacing: 0.15em
    textTransform: uppercase
    padding: 0.5rem 1.5rem
    rounded: "{rounded.none}"
  back-navigation:
    fontFamily: "'Cinzel', serif"
    fontSize: 0.65rem
    letterSpacing: 0.2em
    textTransform: uppercase
    color: "{colors.label-dim}"
---

## Overview

The Witcher Lore Website renders as a **medieval grimoire** — a scholar's bestiary of monsters and the tales recorded about them. The base canvas is **near-black** (`{colors.background}` — #08070a) holding aged-parchment cream type (`{colors.foreground}` — #ddd0b8). Two brand voltages carry the whole system: **medallion gold** (`{colors.accent}` — #b8852a) for emphasis, ornament, and threat ratings; **blood red** (`{colors.primary}` — #8b1a1a) for primary states (active filters, story hover, progress gradients).

Depth is built from **typography, color, hairlines, and entry imagery**. Surfaces sit on a brightness ladder (background → card → muted), and cards are divided by **1px seam grids** (gap: 1px on a border-colored parent). The signature decorative device is the **medallion divider** — a ✦ glyph flanked by gradient hairlines — used under heroes and before closing sections.

**Entry imagery is mandatory.** Every monster and every story must carry an image, rendered on its detail page: a 3:4 portrait on the monster detail page and a 16:9 illustration on the story detail page. A designated placeholder (`placeholders/missing.png`) is the only permitted fallback when an asset is unavailable, and it must never ship as a permanent entry image — an entry without a real image is a data defect.

**Key Characteristics:**
- Two accent voltages: `{colors.accent}` gold (emphasis, stars, hover on monster cards) and `{colors.primary}` red (active states, story hover, reading progress).
- Four serif faces with strict roles: Cinzel Decorative (display), Cinzel (headings + labels), Crimson Text (body), IM Fell English (lore/quotes).
- Everything is uppercase and wide-tracked except body and lore copy — micro-labels at 0.1–0.35em tracking.
- Sharp geometry: `{rounded.none}` (0px) on buttons and weakness tags, `{rounded.xs}` (2px) on badges/pills/inputs, `{rounded.sm}` (4px) global radius token.
- Hairline-everywhere structure: 1px borders, 1px seam grids, 1px divider lines, 2–4px left rules.
- Per-category heraldic colors appear only as thin accent bars (3px card top bar, 4px detail left rule).
- Mandatory entry imagery: every monster and story ships an image shown on its detail page, with a designated placeholder fallback.
- Session-persistent bestiary filters (search + category + threat).

## Colors

### Brand & Accent
- **Medallion Gold** (`{colors.accent}` — #b8852a): The witcher's medallion. Hero eyebrows, section labels, threat stars, link hovers, ornament glyphs, outline buttons, category top-bars on hover. The dominant emphasis color.
- **Blood Red** (`{colors.primary}` — #8b1a1a): The secondary voltage. Active filter pills, story-card hover borders, "Read →" affordances, reading-progress gradients, focus ring (`{colors.ring}`).
- **Primary Foreground** (`{colors.primary-foreground}` — #f0e8d8): Cream text on red fills.
- **Secondary** (`{colors.secondary}` — #1a2415) + **Secondary Foreground** (`{colors.secondary-foreground}` — #a8c49a): Dark-forest green pair used on the Stories hero glow (`rgba(26,36,21,0.5)` radial) — the tales section's tint, mirroring the bestiary's red glow.

### Surface
- **Background** (`{colors.background}` — #08070a): Near-black page floor — not pure black, a cold charcoal.
- **Card** (`{colors.card}` — #100e14): Raised surfaces — filter panel, entry-details sidebar, progress strip, TOC sidebar, next-tale card, story cards.
- **Muted** (`{colors.muted}` — #1c1820): Search input fill, card-internal hairlines (`{colors.hairline-inset}`), progress track.
- **Border** (`{colors.border}` — #2e2530): The universal 1px hairline — nav bottom edge, card outlines, seam-grid color, empty-star strokes' siblings, weak tag borders.

### Text
- **Foreground** (`{colors.foreground}` — #ddd0b8): Aged-parchment cream. Headings, card titles, primary body emphasis.
- **Body Strong** (`{colors.body-strong}` — #c0b09a): Long-form reading copy (field descriptions, chapter paragraphs).
- **Muted Foreground** (`{colors.muted-foreground}` — #8a7d6a): Lore/quotes, secondary text, italic taglines.
- **Body Card** (`{colors.body-card}` — #6e6358): Card description text (3-line clamped).
- **Label Dim** (`{colors.label-dim}` — #5a4f42): Back links, filter group labels, story summaries, TOC inactive entries, "N% read".
- **Label Dimmer** (`{colors.label-dimmer}` — #3a2e1e): Empty threat-star strokes, chapter numbers, story-card meta ("Tale 01", "N chapters"), disabled empty-state titles.

### Category Heraldic Colors
Each monster category owns a muted heraldic hue, used only as thin accent bars and left rules — never as fills or text:

| Category | Color | Notes |
|---|---|---|
| Beasts | #5a4a3a | Dun brown |
| Vampires | #5a1a3a | Wine |
| Necrophages | #3a5a1a | Olive |
| Wraiths | #1a2a5a | Deep blue |
| Cursed Ones | #5a2a1a | Rust |
| Hybrids | #4a3a5a | Grey violet |
| Elementa | #5a4a1a | Ochre |
| Insectoids | #2a4a1a | Deep green |
| Ogroids | #4a3a1a | Umber |
| Relicts | #2a1a4a | Indigo |

## Typography

### Font Families
Four Google Fonts faces with strict role separation — no sans-serif anywhere:

| Family | Role |
|---|---|
| **Cinzel Decorative** | Display only — hero H1s, page titles, wordmark |
| **Cinzel** | Headings, card titles, every label (eyebrows, section labels, badges, pills, nav, buttons, meta) |
| **Crimson Text** | Body copy — cards, descriptions, chapters, metadata values |
| **IM Fell English** | Lore voice — taglines, Scholar's Notes, story summaries (always italic) |

### Hierarchy

| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `{typography.display-hero}` | clamp(2rem–3.5rem) | 900 | 0.08em | Page heroes (BESTIARY, THE TALES) |
| `{typography.display-title}` | clamp(1.6–3rem) | 700 | 0.05em | Monster/tale titles |
| `{typography.eyebrow}` | 0.7rem | 400 | 0.35em, uppercase | Hero pre-title ("A Witcher's Field Guide") |
| `{typography.section-label}` | 0.65rem | 400 | 0.2–0.25em, uppercase | "Field Description", "Entry Details", "Chapters" |
| `{typography.card-title}` | 1.05–1.1rem | 600 | 0.04em | Monster/story card titles |
| `{typography.nav-link}` | 0.8rem | 400 | 0.15em, uppercase | Nav items |
| `{typography.label-small}` | 0.55–0.65rem | 400 | 0.1–0.3em, uppercase | Badges, meta, tale numbers, chapter numbers |
| `{typography.body}` | 18px | 400 | 0 | Global body default (line-height 1.7) |
| `{typography.body-strong}` | 1.1–1.15rem | 400 | 0 | Long-form copy, line-height 1.8–1.85, 2em paragraph indents |
| `{typography.lore}` | 1.05–1.1rem | 400 italic | 0 | Quotes, Scholar's Notes, summaries |
| `{typography.tagline}` | 1.1rem | 400 italic | 0 | Hero taglines |

### Principles
- **Uppercase + tracking IS the label system.** Every label is Cinzel, uppercase, with 0.1–0.35em tracking — the closer to a hero, the wider the tracking.
- **Display copy is letter-spaced, not negative-tracked.** Cinzel Decorative heroes carry 0.05–0.08em positive spacing (opposite of modern sans display practice — fits the grimoire voice).
- **Body never competes with labels.** All long-form copy is Crimson Text or IM Fell English at 0.9–1.15rem; visual hierarchy is carried by size and color (foreground → body-strong → muted-foreground → label-dim → label-dimmer), not weight.
- **Dimmer text still works.** The 5-step text-dim ladder (foreground → #c0b09a → #8a7d6a → #5a4f42 → #3a2e1e) gives captions and meta without new weights.

## Layout

### Spacing System
- **Base unit:** 4px (0.25rem).
- **Observed ladder:** 1px hairlines · 4px · 8px · 12px · 16px · 24px · 32px · 48px · 64px (sections).
- **Card padding:** 1.5rem (24px) standard; 1.75rem story cards; 2rem next-tale card.
- **Section rhythm:** 2.5rem between sections on detail pages; 3.5rem between chapters; 4–5rem closing whitespace blocks.

### Grid & Container
- Max content width: **1200px** (bestiary/stories), **900px** (monster detail), **1100px** (story reader).
- Page padding: `0 2rem` at all breakpoints.
- Card grids: `repeat(auto-fill, minmax(280px, 1fr))` for monsters, `minmax(320px, 1fr)` for stories, rendered as **seam grids** — 1px gap on a border-colored parent so every card edge reads as a hairline.
- Monster detail: two-column `1fr minmax(0, 260px)` — content + sticky entry-details card.
- Story reader: two-column `1fr 220px` — chapters + sticky TOC sidebar (top: 84px, below the 64px nav).
- Nav: fixed full-width, inner container 1200px, height 64px, `backdrop-filter: blur(8px)`.

### Whitespace Philosophy
Heroes are generous (5rem top / 4rem bottom, centered), bodies are comfortable and columnar, and every page closes with a 4–5rem empty block. Cards breathe at 1.5rem+ padding; the seam grid provides the density contrast.

## Elevation & Depth

The system is **flat with brightness steps and hairlines** — the only shadows are card-hover shadows, and the only gradients are decorative.

| Level | Treatment | Use |
|---|---|---|
| Floor | `{colors.background}` (#08070a) | Page background, monster-card base |
| Card | `{colors.card}` (#100e14) | Panels, story cards |
| Input | `{colors.muted}` (#1c1820) | Search field, progress track |
| Hairline | 1px `{colors.border}` (#2e2530) | Every edge: nav, cards, panels, seams |
| Inset hairline | 1px `{colors.hairline-inset}` (#1c1820) | Card-internal dividers (meta footers, dl headers) |
| Hover shadow | `0 8px 32px rgba(0,0,0,0.6)` + 1px colored ring | Monster/story card hover |

### Decorative Depth (typographic + chromatic + entry imagery)
- **Entry imagery**: a required 3:4 portrait (monsters) and 16:9 illustration (stories), framed by a 1px `{colors.border}` edge on a `{colors.card}` plate. The designated placeholder (`placeholders/missing.png`) substitutes only when an asset is missing — a real image is required for every entry.
- **Hero glow**: radial gradient (`rgba(139,26,26,0.12)` for Bestiary, `rgba(26,36,21,0.5)` for Stories) blooming from the top center behind the hero content.
- **Nav gradient**: `linear-gradient(180deg, rgba(8,7,10,0.98), rgba(8,7,10,0.92))` over a 1px border, blurred.
- **Category color bars**: 3px gradient (`category-color → transparent`) at the top of monster cards; 4px solid left rule on the monster-detail header.
- **Progress gradient**: `linear-gradient(90deg, #8b1a1a, #b8852a)` for the fixed top bar and in-panel meters.
- **Medallion divider lines**: `linear-gradient(90deg, transparent, gold, transparent)`.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Buttons, weakness tags, cards, panels — dominant |
| `{rounded.xs}` | 2px | Badges, filter pills, search input, chapter-progress track |
| `{rounded.sm}` | 4px | Global `--radius` token |

Sharp corners are the default; the 2px radius is reserved for small interactive chips (pills, badges, inputs). Pills are NOT rounded — "pill" means the bordered Cinzel chip. The only circular geometry in the system is the wolf-medallion SVG in the nav.

## Components

### Top Navigation
**`top-nav`** — Fixed, 64px, full-width, gradient near-black with `backdrop-filter: blur(8px)`, 1px `{colors.border}` bottom edge. Inner container 1200px. Left: wolf-medallion SVG (gold stroke circle + wolf-glyph paths, gold fills at 0.9/0.6 opacity) + **wordmark** "THE WITCHER" in Cinzel Decorative 0.9rem / 700 / 0.2em. Right: nav links (Cinzel 0.8rem / 0.15em / uppercase) separated by a ✦ glyph. Links carry a gold 1px underline that scales in on hover/active; inactive color `{colors.muted-foreground}`, active `{colors.foreground}`.

### Hero Band
**`hero-band`** — Centered, `5rem 2rem 4rem` padding, `{colors.background}` floor with a radial glow tint (red = Bestiary, green = Stories). Stack: eyebrow (gold, 0.35em tracking) → H1 in `{typography.display-hero}` (Cinzel Decorative 900) → medallion divider → italic `{typography.tagline}` lore line (max-width 600px).

### Medallion Divider
**`medallion-divider`** — Flex row: two 1px gradient hairlines (`transparent → gold → transparent`) flanking a gold ✦ glyph. Used under heroes and above "Featured in Tales", "End of Tale" labels.

### Filter Panel (Bestiary)
**`filter-panel`** — `{colors.card}` with 1px border, 1.5rem padding, sits directly under the hero. Contains:
- **`search-input`** — `{colors.muted}` fill, 1px border, Cinzel 0.8rem / 0.05em, italic placeholder in `{colors.muted-foreground}`, 2px radius, gold border on focus.
- **Filter groups** — uppercase Cinzel 0.65rem / 0.2em group labels ("Category", "Threat Level").
- **`filter-pill`** — bordered Cinzel chip (0.7rem / 0.1em / uppercase, `{rounded.xs}`). Inactive: `{colors.muted-foreground}` on transparent; hover: gold border + gold text; **active: `{colors.primary}` red fill with cream text**. Threat pills embed `ThreatStars` at 11px.
- Results row: "N entries found" (uppercase Cinzel 0.7rem) + underlined gold "Reset filters" link-button.

### Threat Stars
**`threat-stars`** — Row of 5 SVG star glyphs (14px default, 2px gap). Filled: `{colors.accent}` gold fill + gold stroke. Empty: transparent fill with `{colors.label-dimmer}` stroke. Used on cards, headers, threat filter pills, sidebar metadata.

### Monster Card
**`monster-card`** — `{colors.background}` base inside the seam grid. 3px category-color gradient top bar. Body (1.5rem padding): Cinzel card-title + ThreatStars row → `category-badge` → Crimson Text description clamped at 3 lines (`{colors.body-card}`) → hairline-inset footer with "N tales" (label-dimmer) + gold "Read Entry →". Hover: gold border, −2px translate, deep shadow + 1px gold ring, top bar brightens.

### Story Card
**`story-card`** — `{colors.card}` base in a 320px seam grid. 1.75rem padding: "Tale 01" number (label-dimmer, 0.25em) → Cinzel title → 3-line clamped Crimson summary → hairline-inset footer with monster-name tags (bordered Cinzel micro-labels) + "N chapters" meta. Hover: `{colors.primary}` red border, −2px translate, red-ring shadow.

### Category Badge & Weakness Tags
**`category-badge`** — Cinzel 0.65rem / 0.12em uppercase, 1px `currentColor` border (`{colors.muted-foreground}` text, `{colors.border}` edge), 2px radius, 0.2rem × 0.6rem padding. **Weakness tags** on the detail page: same voice at `{rounded.none}`, 0.1em tracking, 0.25rem × 0.7rem padding.

### Monster Detail
- **`monster-portrait` (required)** — Every monster detail page renders the entry's image as a 3:4 portrait, `{colors.card}` plate with 1px `{colors.border}` edge, max-width 260px, `object-fit: cover`. If the asset fails to load, the designated placeholder (`placeholders/missing.png`) substitutes — a missing image is a content defect, not a layout state. The portrait leads the page alongside the header.
- **`detail-header`** — 4px solid category-color left rule with 1.5rem padding-left: category-badge → Cinzel Decorative name → ThreatStars + "Threat Level N" label.
- **Gold divider** — 1px `linear-gradient(90deg, gold, transparent)` line beneath the header.
- **Field Description** — `{typography.section-label}` gold heading + `{typography.body-strong}` Crimson Text (1.1rem / 1.8).
- **Scholar's Notes** — IM Fell English italic, `{colors.muted-foreground}`, 2px `{colors.border}` left rule, 1.25rem padding-left, line-height 1.9.
- **Entry Details sidebar** — `{colors.card}` panel, 1px border, 1.5rem padding. Header uppercase Cinzel with hairline-inset bottom border. `dl` rows: `dt` in label-dimmer Cinzel 0.6rem, `dd` in Crimson Text 1rem foreground (classification, threat stars, recorded tales count).
- **Featured in Tales** — medallion divider label + seam-grid rows (story-card variant): title + 2-line clamped summary + red "Read →".

### Story Reader
- **`story-illustration` (required)** — Every story detail page renders the story's image as a 16:9 illustration above the title block, `{colors.card}` plate with 1px `{colors.border}` edge, max-width 260px, `object-fit: cover`. On load failure the designated placeholder (`placeholders/missing.png`) substitutes — a missing image is a content defect, not a layout state.
- **`progress-bar`** — Fixed 3px bar at top of viewport (below nav at 64px), `linear-gradient(90deg, red, gold)`, width bound to scroll percentage.
- **Chapter strip** — Card panel below the title: 2px track + gradient fill + "N% read" label.
- **`chapter-section`** — 2px `{colors.border}` left rule, 2rem padding-left, 1rem margin-left. Header: "Chapter N" label (gold when active, label-dimmer otherwise) + Cinzel chapter title (foreground when active, muted otherwise). Body: Crimson Text paragraphs (1.15rem / 1.85, `{colors.body-strong}`), paragraphs after the first indented 2em. Active chapter border turns gold.
- **`toc-sidebar`** — Sticky card (top 84px), "Chapters" header with inset hairline. Rows: index number (label-dimmer) + chapter title (Cinzel 0.7rem); active row is gold with a 2px gold left rule. Clicking smooth-scrolls to the chapter. Below: bordered "Progress" meter — label + percentage + 3px gradient track.
- **End of Tale** — medallion divider with "✦ End of Tale ✦".
- **Monsters Encountered** — rows (card bg, 1px border): monster name (Cinzel 0.9rem) + category label + ThreatStars + red "Bestiary →". Hover border → gold.
- **`next-tale-card`** — Card panel, 2rem padding: "Next Tale" label → Cinzel title → 2-line clamped summary → red "Continue Reading →". Hover border → `{colors.primary}`.

### Empty / Error States
Centered block with 1px border: Cinzel Decorative title in `{colors.label-dimmer}` ("No Entries Found" / "Entry Not Found" / "Tale Not Found"), italic IM Fell English sub-line ("Even the most thorough bestiary has its limits."), then an **`outline-button`** — transparent, gold 1px border, Cinzel 0.7rem / 0.15em uppercase, sharp corners.

### Back Navigation
**`back-navigation`** — Plain uppercase Cinzel 0.65rem / 0.2em button, `{colors.label-dim}`, "← Bestiary" / "← The Tales". No border, no fill.

## Do's and Don'ts

### Do
- Use `{colors.accent}` gold for emphasis and `{colors.primary}` red for active/primary states — the two-voltage rule.
- Render every label uppercase in Cinzel with 0.1–0.35em tracking.
- Keep Cinzel Decorative for display, Cinzel for labels, Crimson Text for body, IM Fell English for lore — never mix roles.
- Build card grids as seam grids (1px gap on a border-colored parent).
- Use category colors only as 3–4px accent bars and left rules.
- Indent body paragraphs 2em in long-form reading.
- Pair every empty/error state with an italic lore line + gold outline button.
- Ship an image with every monster and story entry; render it on the detail page (3:4 portrait / 16:9 illustration) inside a bordered card plate.
- Fall back to `placeholders/missing.png` on load failure, and treat any entry still showing the placeholder as a content defect to be fixed.
- Persist bestiary filters to sessionStorage.

### Don't
- Don't use sans-serif type anywhere.
- Don't use negative letter-spacing on display copy — positive 0.05–0.08em is the voice.
- Don't introduce a third accent color; gold + red are the system.
- Don't round cards or buttons — `{rounded.none}` is dominant, 2px only on chips/inputs.
- Don't add drop-shadow tiers — hairlines + brightness steps carry elevation; the single hover shadow is the exception.
- Don't use category colors as fills or text.
- Don't let an entry ship without its image — the placeholder is a fallback, never a permanent asset.
- Don't treat images as optional decoration; they are required content on both detail pages.
- Don't break the 5-step text-dim ladder for extra hierarchy; use spacing instead.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 640px | Hero type scales via clamp (2rem floor); grids go single-column via `auto-fill minmax`; monster detail `1fr 260px` collapses to single column; story reader TOC sidebar hides (main column only). |
| Tablet | 640–1024px | Two-column card grids; detail pages keep 2-col where width allows. |
| Desktop | 1024px+ | Full 1200px containers; 280px/320px auto-fill grids reach 3–4 columns; sticky TOC sidebar active. |

### Behavior Notes
- Nav is fixed and non-collapsing; content pads 64px to clear it.
- Sticky elements: TOC sidebar at `top: 84px`.
- Cards are click-through containers (whole card navigates); keyboard focus relies on anchor/button semantics in the app implementation.
- All type scales with `clamp()` — no discrete typographic breakpoints.

## Iteration Guide

1. Work component by component; each lives as an entry under `components:`.
2. Labels default to Cinzel + uppercase + tracking; body to Crimson Text; lore to italic IM Fell English.
3. New surfaces must fit the brightness ladder (background → card → muted) and carry a 1px `{colors.border}` edge.
4. Use `{token.refs}` everywhere — never inline hex; category colors are data, not tokens.
5. Gold = emphasis, red = primary/active, greens = the Stories section's tint.
6. Depth = hairlines, seam grids, 1px rules, the two decorative gradients (hero glow, progress), and the required entry images.
7. Ornament = ✦ glyphs and medallion dividers, used sparingly at section boundaries.
8. Keep the 4-face typographic system closed — no new families without an explicit role.
9. Every monster and story needs its image on the detail page before it counts as done — placeholder does not ship.

## Known Gaps

- Cinzel/Cinzel Decorative/Crimson Text/IM Fell English are loaded from Google Fonts at runtime; a self-hosted build is not set up.
- Hover states (shadows, ring glows, nav underline) are documented but rely on CSS classes in `index.css`; the app also carries inline `onMouseEnter/onMouseLeave` border swaps on detail/story-reader rows.
- Filter pill active state uses the red fill; no distinct pressed/focus-visible styles are captured.
- Focus-visible rings (`{colors.ring}`) are declared but not visibly styled in components.
- The Stories page has no search/filter tooling (Bestiary only).
- Breakpoint behavior is inferred from fluid grids; no captured breakpoint-specific layouts beyond clamp() type and auto-fill grids.
- Entry imagery is required (3:4 portrait on monster detail, 16:9 illustration on story detail) but the Figma capture predates the image assets; the placeholder (`placeholders/missing.png`) must be replaced per-entry before release.