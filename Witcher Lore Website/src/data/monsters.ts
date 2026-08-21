export type MonsterCategory =
  | "Beasts"
  | "Vampires"
  | "Necrophages"
  | "Wraiths"
  | "Cursed Ones"
  | "Hybrids"
  | "Elementa"
  | "Insectoids"
  | "Ogroids"
  | "Relicts";

export interface Monster {
  id: string;
  name: string;
  category: MonsterCategory;
  threatLevel: 1 | 2 | 3 | 4 | 5;
  description: string;
  lore: string;
  weaknesses: string[];
  relatedStories: string[];
  accentColor: string;
}

export const MONSTERS: Monster[] = [
  {
    id: "striga",
    name: "Striga",
    category: "Cursed Ones",
    threatLevel: 4,
    description:
      "A human transformed by a curse laid upon them before or shortly after birth. Strigas retain none of their former humanity — they are feral killing machines that hunt by night and sleep in a sarcophagus by day.",
    lore:
      "The curse of the striga is among the most terrible afflictions known to scholars of the occult. Unlike most monsters, a striga was once human — a child doomed before their first breath by hatred, jealousy, or dark sorcery. Only by surviving the creature's assault until the third crow of the cock can the curse be broken.",
    weaknesses: ["Silver", "Specter Oil", "Morning Light"],
    relatedStories: ["the-curse-of-wyzima", "the-last-witcher"],
    accentColor: "#6b1515",
  },
  {
    id: "leshen",
    name: "Leshen",
    category: "Relicts",
    threatLevel: 5,
    description:
      "Ancient forest spirits that have inhabited the deep woods since before men settled the Continent. Leshens claim territories and enslave the woodland creatures within them, bending wolves and ravens to their will.",
    lore:
      "No witcher takes a contract on a leshen lightly. These primordial beings are older than most civilizations and possess a cunning that belies their monstrous form. A leshen that has been worshipped by a village can fuse with it — becoming a so-called Woodland Spirit — and grows exponentially more powerful.",
    weaknesses: ["Axii", "Igni", "Relict Oil", "Dimeritium Bombs"],
    relatedStories: ["the-woodland-spirit", "the-last-witcher", "the-burning-oak", "ancient-pact"],
    accentColor: "#1a3a0f",
  },
  {
    id: "griffin",
    name: "Griffin",
    category: "Hybrids",
    threatLevel: 3,
    description:
      "Part eagle, part lion — the griffin is a magnificent and deadly predator of mountain and highland regions. They are highly territorial and fiercely protective of their nesting grounds.",
    lore:
      "Griffins pair for life, and the death of one mate drives the survivor to extraordinary aggression. Many a foolhardy knight has mistaken a grieving griffin for a simple beast, only to discover too late that they faced a creature of keen intelligence and devastating power.",
    weaknesses: ["Grapeshot", "Hybrid Oil", "Crossbow"],
    relatedStories: ["wings-over-vizima", "wings-of-sorrow"],
    accentColor: "#4a3a08",
  },
  {
    id: "endrega-warrior",
    name: "Endrega Warrior",
    category: "Insectoids",
    threatLevel: 2,
    description:
      "The soldier caste of endrega colonies, distinguished by their hardened carapace and razor mandibles. Warriors are far more aggressive than workers and will pursue threats far beyond the colony perimeter.",
    lore:
      "Endrega warriors serve a queen and will die defending her without hesitation. Destroying the queen before engaging the swarm is considered basic tactical wisdom among experienced witchers — otherwise the warriors become suicidally aggressive.",
    weaknesses: ["Insectoid Oil", "Igni", "Samum Bombs"],
    relatedStories: ["children-of-the-forest", "carapace"],
    accentColor: "#2a4a0a",
  },
  {
    id: "drowner",
    name: "Drowner",
    category: "Necrophages",
    threatLevel: 1,
    description:
      "Humanoid necrophages that congregate near bodies of water. Drowners feed on corpses and the occasional careless traveler who ventures too close to riverbanks or shorelines at dusk.",
    lore:
      "Common wisdom holds that drowners are the reanimated dead of those who drowned — a belief with some scholarly support, as they are most frequently encountered near sites of mass drowning. Alone they pose little threat; in groups near water, they can overwhelm even seasoned travelers.",
    weaknesses: ["Necrophage Oil", "Quen", "Igni"],
    relatedStories: ["blood-in-the-pontar", "the-velen-marshes", "the-rivers-toll"],
    accentColor: "#0a2a3a",
  },
  {
    id: "higher-vampire",
    name: "Higher Vampire",
    category: "Vampires",
    threatLevel: 5,
    description:
      "The apex predators of the vampire hierarchy. Higher vampires are ancient, intelligent beings capable of passing as human for decades. They can regenerate from virtually any wound and possess powers far beyond common understanding.",
    lore:
      "Most people who encounter a higher vampire never know it. They do not feed nightly, do not burn in sunlight, and have no need to avoid garlic or mirrors. What sets them apart is their near-immortality and the catastrophic power they can unleash when pushed. Killing one permanently requires methods unknown even to most witchers.",
    weaknesses: ["Vampire Oil", "Positioning", "Patience"],
    relatedStories: ["a-coin-for-the-devil", "blood-in-the-pontar", "blood-debts", "the-last-witcher"],
    accentColor: "#4a0a2a",
  },
  {
    id: "specter",
    name: "Specter",
    category: "Wraiths",
    threatLevel: 3,
    description:
      "The restless spirit of one who died violently or with powerful unfinished business. Specters are ethereal and difficult to harm with mundane means, phasing in and out of corporeality to strike.",
    lore:
      "Specters are bound to the location or person connected to their death. They rarely act with coherent intent — their behavior is more like an echo of their final moments, repeated endlessly until the underlying cause is resolved. Destroying the physical anchor often dispels the specter permanently.",
    weaknesses: ["Silver", "Specter Oil", "Yrden"],
    relatedStories: ["what-the-night-brings", "dead-mans-gulch"],
    accentColor: "#1a1a3a",
  },
  {
    id: "rock-troll",
    name: "Rock Troll",
    category: "Ogroids",
    threatLevel: 2,
    description:
      "Massive ogroid creatures that make their homes in mountainous terrain. Rock trolls are not inherently aggressive and some have developed rudimentary language, though their reasoning remains limited.",
    lore:
      "Rock trolls have an unusual relationship with humans — they are occasionally employed as bridge or road builders, tasks they perform with surprising competence. Their aggression is usually defensive rather than predatory, and a witcher who understands troll psychology can often resolve a contract without bloodshed.",
    weaknesses: ["Ogroid Oil", "Quen", "Thunderbolt Potion"],
    relatedStories: ["stone-cold"],
    accentColor: "#3a2a1a",
  },
  {
    id: "fire-elemental",
    name: "Fire Elemental",
    category: "Elementa",
    threatLevel: 4,
    description:
      "Beings of pure elemental fire conjured or summoned through powerful magic. Fire elementals are immune to flame and heat, instead drawing strength from it while incinerating everything in their path.",
    lore:
      "Fire elementals are not native to this world — they are summoned, usually by reckless mages, and invariably break free of whatever containment was intended. Once loose, they burn until something stops them. Witchers who face them rely on Elementa oils and Aard to disrupt their coherence.",
    weaknesses: ["Elementa Oil", "Aard", "Dimeritium Bombs"],
    relatedStories: ["embers-and-ash", "the-burning-oak"],
    accentColor: "#5a2a00",
  },
  {
    id: "dire-wolf",
    name: "Dire Wolf",
    category: "Beasts",
    threatLevel: 1,
    description:
      "Larger and more aggressive variants of common wolves. Dire wolves hunt in coordinated packs and have been known to stalk and ambush prey with disturbing strategic intelligence.",
    lore:
      "Where a common wolf is wary of man, a dire wolf treats humans as prey of no particular distinction. Their pack tactics involve flanking maneuvers that seem almost deliberate — leading scholars to debate whether dire wolves possess more intelligence than their taxonomy suggests.",
    weaknesses: ["Beast Oil", "Igni", "Aard"],
    relatedStories: ["the-beast-of-white-orchard"],
    accentColor: "#2a2a2a",
  },
  {
    id: "wyvern",
    name: "Wyvern",
    category: "Hybrids",
    threatLevel: 3,
    description:
      "Two-legged winged reptiles, distinct from true dragons by their lack of forelegs. Wyverns are aggressive opportunists that prey on livestock and occasionally attack larger settlements during lean seasons.",
    lore:
      "Wyverns are frequently confused with drakes by the uninitiated. The distinction matters enormously — wyverns are more numerous, more territorial, and possess a venomous tail stinger that can paralyze a horse. Their nesting sites are identifiable by the characteristic circular burn patterns they leave when landing.",
    weaknesses: ["Hybrid Oil", "Draconid Oil", "Crossbow"],
    relatedStories: ["wings-of-sorrow", "the-mountain-pass"],
    accentColor: "#3a1a2a",
  },
  {
    id: "ghoul",
    name: "Ghoul",
    category: "Necrophages",
    threatLevel: 1,
    description:
      "Common necrophages that congregate wherever corpses are left unburied. Ghouls are opportunistic scavengers but become emboldened in numbers, attacking the living when prey is scarce.",
    lore:
      "Ghouls are among the most common monsters encountered by traveling witchers — battlefields, plague villages, and mass graves inevitably draw them. Their apparent cowardice is calculated: they test opponents carefully and retreat when the odds turn against them. The truly dangerous ones are those that have fed enough to grow to alghoul size.",
    weaknesses: ["Necrophage Oil", "Igni", "Axii"],
    relatedStories: ["salt-and-bone", "the-velen-marshes", "dead-mans-gulch"],
    accentColor: "#1a2a0a",
  },
  {
    id: "nightwraith",
    name: "Nightwraith",
    category: "Wraiths",
    threatLevel: 4,
    description:
      "The most powerful class of wraith, nightwraiths appear only after dark and are capable of creating phantom duplicates of themselves that can deliver real harm. Their touch causes paralysis.",
    lore:
      "Nightwraiths form from women who met violent ends — murdered brides, scorned lovers, mothers who died in childbirth. Their grief transforms into supernatural rage that makes them exponentially more dangerous than common specters. The illusions they create are indistinguishable from the true entity without a Witcher's trained senses.",
    weaknesses: ["Specter Oil", "Yrden", "Silver", "Candles at Midnight"],
    relatedStories: ["what-the-night-brings", "the-weeping-woman", "moonbound"],
    accentColor: "#2a0a3a",
  },
  {
    id: "katakan",
    name: "Katakan",
    category: "Vampires",
    threatLevel: 4,
    description:
      "A higher-tier vampire that hunts by intoxicating victims with saliva, inducing euphoria before feeding. Katakans are intelligent enough to maintain human disguises for short periods.",
    lore:
      "Katakans are the social predators of the vampire world — they prefer populated areas where prey is abundant and they can blend in. Unlike the lowest vampire classes, a katakan will not randomly kill: it manages its hunting grounds carefully to avoid attracting attention. This patience makes them particularly dangerous over time.",
    weaknesses: ["Vampire Oil", "Yrden", "Silver", "Moon Dust Bombs"],
    relatedStories: ["the-scarlet-sin", "blood-debts", "silk-and-steel"],
    accentColor: "#3a0a1a",
  },
  {
    id: "werewolf",
    name: "Werewolf",
    category: "Cursed Ones",
    threatLevel: 3,
    description:
      "A human afflicted with the curse of lycanthropy, transforming involuntarily under a full moon into a powerful wolf-like creature with enhanced strength and regeneration.",
    lore:
      "Unlike strigas, werewolves retain their human consciousness during transformation — they remember what they do. This dual nature makes contracts involving werewolves among the most morally complicated a witcher faces. Breaking the curse is possible but requires rare ingredients, and some werewolves choose not to be cured.",
    weaknesses: ["Cursed Oil", "Silver", "Nightshade", "Full Moon timing"],
    relatedStories: ["the-beast-of-white-orchard", "the-moonlit-curse", "moonbound"],
    accentColor: "#2a1a0a",
  },
  {
    id: "water-hag",
    name: "Water Hag",
    category: "Necrophages",
    threatLevel: 2,
    description:
      "Grotesque necrophages that inhabit swampy wetlands and riverbanks. Water hags ambush victims from beneath the surface and are disturbingly capable of mimicking human voices.",
    lore:
      "Water hags have been mistaken for eccentric hermits or displaced old women — a misidentification that is invariably fatal. They lure travelers with cries for help or by mimicking the voices of loved ones. Their connection to drowners is disputed among scholars; some believe water hags are simply evolved drowners with greater cunning.",
    weaknesses: ["Necrophage Oil", "Igni", "Yrden"],
    relatedStories: ["salt-and-bone", "the-velen-marshes"],
    accentColor: "#0a1a2a",
  },
  {
    id: "fiend",
    name: "Fiend",
    category: "Relicts",
    threatLevel: 4,
    description:
      "Enormous three-eyed relicts of immense strength. The third eye atop a fiend's head emits a hypnotic glow that confuses prey before the creature closes in for the kill.",
    lore:
      "Fiends are solitary and territorial, claiming large swaths of forest or highland as their domain. Their hypnotic eye has been the subject of much scholarly debate — it appears to affect the prey's perception of direction, causing them to run directly toward the fiend rather than away. Witchers who have trained themselves to look away consistently report greater survival rates.",
    weaknesses: ["Relict Oil", "Dimeritium Bombs", "Axii (briefly)"],
    relatedStories: ["the-amber-eye", "ancient-pact"],
    accentColor: "#2a1a3a",
  },
  {
    id: "cyclops",
    name: "Cyclops",
    category: "Ogroids",
    threatLevel: 3,
    description:
      "Single-eyed ogroids of tremendous size and strength. Cyclopes are more intelligent than their brutish appearance suggests and have been known to use crude tools and construct rudimentary shelters.",
    lore:
      "Cyclopes appear frequently in old tales as moronic brutes, an image that has cost many overconfident fighters their lives. A cyclops that has occupied a territory for years knows its terrain intimately and will use geography as a weapon — driving prey toward cliffs, bottlenecks, or into ambushes from pack-hunting creatures it has tacitly allied with.",
    weaknesses: ["Ogroid Oil", "Quen", "Heavy Attacks"],
    relatedStories: ["the-mountain-pass"],
    accentColor: "#3a2a10",
  },
  {
    id: "ice-elemental",
    name: "Ice Elemental",
    category: "Elementa",
    threatLevel: 3,
    description:
      "Elemental beings formed from concentrated cold and magical energy. Ice elementals absorb frost and cold attacks, growing larger with each failed attempt to freeze them.",
    lore:
      "Ice elementals are typically found in high-altitude regions or places where powerful frost magic has been cast. Unlike their fire counterparts, ice elementals display a strange stillness — they do not pursue aggressively but rather wait, drawing opponents in before erupting in devastating ice storms.",
    weaknesses: ["Elementa Oil", "Igni", "Dimeritium Bombs"],
    relatedStories: ["beneath-the-ice"],
    accentColor: "#0a2a3a",
  },
  {
    id: "arachas",
    name: "Arachas",
    category: "Insectoids",
    threatLevel: 3,
    description:
      "Large spider-like insectoids that ensnare prey in webs of extraordinary strength. The arachas is a patient predator, building elaborate trap networks before retreating to wait.",
    lore:
      "Arachases construct their lairs in caverns and deep forest hollows where vibrations travel well through the substrate. They feel movement in their web network from remarkable distances — a witcher who steps into an arachas den without detecting the web first is already at a severe disadvantage. Their venom causes rapid paralysis.",
    weaknesses: ["Insectoid Oil", "Igni", "Aard"],
    relatedStories: ["the-hunger-below", "carapace"],
    accentColor: "#1a0a2a",
  },
];

export const CATEGORIES: MonsterCategory[] = [
  "Beasts",
  "Vampires",
  "Necrophages",
  "Wraiths",
  "Cursed Ones",
  "Hybrids",
  "Elementa",
  "Insectoids",
  "Ogroids",
  "Relicts",
];

export function getMonster(id: string): Monster | undefined {
  return MONSTERS.find((m) => m.id === id);
}
