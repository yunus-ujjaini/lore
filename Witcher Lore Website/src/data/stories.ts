export interface Chapter {
  title: string;
  content: string;
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  chapters: Chapter[];
  relatedMonsters: string[];
}

export const STORIES: Story[] = [
  {
    id: "the-curse-of-wyzima",
    title: "The Curse of Wyzima",
    summary: "A witcher is called to King Foltest's court to lift a terrible curse that has transformed the king's illegitimate daughter into a nocturnal predator.",
    relatedMonsters: ["striga"],
    chapters: [
      {
        title: "The King's Shame",
        content: "The summons arrived by royal courier, pressed with Foltest's personal seal — a lion rampant on a field of blue. Geralt of Rivia read it twice before pocketing the parchment. Kings rarely sent for witchers with good news.\n\nWyzima's gates stood open despite the hour, but the usual bustle of commerce was absent. Guards watched the witcher's white horse with poorly concealed fear. Someone had died recently — he could smell it still.\n\n'The cathedral,' said the captain at the gate, not meeting his eyes. 'His Majesty expects you.' The man's hands were shaking.\n\nFoltest received him in the nave, away from court. The king was older than rumors had painted him — the gossip said a vigorous man in his prime, but grief had added a decade to his face. He stood before a sealed crypt door thick with iron bars and claw marks gouged into the stone.\n\n'She was my daughter,' Foltest said without preamble. 'Adda the White. Her mother laid a curse before she died — or someone did it for her. I've had priests, mages, even a herbalist who claimed he could break it.' He touched the claw marks. 'None of them understood what they were dealing with.'"
      },
      {
        title: "What Waits in the Dark",
        content: "Geralt spent the day in the city archives, reading everything the scribes had on the curse. Little of it was useful. The theoretical literature on strigas was thin — they were rare enough that most scholars worked from secondhand accounts, and those accounts invariably conflated strigas with nekkers, ghouls, and common spectral hauntings.\n\nThe practical literature was more helpful. Strigas slept during the day. They were supernaturally fast and strong, resistant to most forms of damage. The only reliable way to break the curse was to survive the creature's attack until dawn — keep it occupied, keep moving, don't die.\n\nSimple, as these things went.\n\nHe entered the cathedral at midnight when the moon was high. The crypt reeked of old blood and something else beneath it — the ghost of childhood, he thought, the particular scent of someone who had never had the chance to grow up. He felt the cold air before he saw her. She came out of the dark fast, too fast, screaming something that might have once been a name."
      },
      {
        title: "Until the Third Crow of the Cock",
        content: "Three times she drove him into the crypt wall. Twice he nearly lost his sword. The striga was not simply strong — she was cunning, feinting before her real strikes, reading his defenses and adapting. Whatever curse had made her had not touched her mind.\n\nThe sky outside the cathedral's high windows began to grey. First light.\n\nShe faltered. For just a moment, the screaming thing looked at him with something other than hunger — confusion, perhaps. Recognition. He pressed himself against the far wall and did not move.\n\nThe cock crowed.\n\nThe striga collapsed.\n\nIn the grey dawn light, Foltest's daughter lay on the cold stone — a girl, perhaps fourteen in appearance, her body carrying none of the monstrous signs that had defined the previous hours. She breathed.\n\nGeralt sat down beside her and waited for the guards to come. He was paid the agreed sum. He left Wyzima before noon, heading south. He never asked what became of her."
      }
    ]
  },
  {
    id: "blood-in-the-pontar",
    title: "Blood in the Pontar",
    summary: "A series of gruesome deaths along the Pontar river draws a witcher into a tangled conflict between drowners, a higher vampire, and the smugglers who accidentally invited catastrophe.",
    relatedMonsters: ["drowner", "higher-vampire"],
    chapters: [
      {
        title: "Flotsam and Bodies",
        content: "The bodies had been coming downriver for three days before anyone thought to send for a witcher. By then there were nine of them, or what was left of nine of them — drowners fed messily, and the river had done the rest.\n\nThe village elder of Flotsam met Geralt at the dock with the expression of a man who has seen too much and slept too little. 'Started upriver,' he said, pointing north. 'Near the old mill crossing. Nobody goes there after dark anymore.'\n\n'Nobody went there before?' Geralt asked.\n\nThe elder hesitated. 'Smugglers used it. But even they've stopped.'\n\nThe investigation along the northern Pontar took most of the morning. Drowner sign was everywhere — the characteristic wet footprints, the scale deposits, the marks where they'd dragged something heavy through the shallows. But there was something else mixed in. Bootprints, human, that went everywhere the drowners had been. Someone was moving among them without fear."
      },
      {
        title: "The River's Patron",
        content: "His name was Emiel Regis — no, that wasn't right, that was someone else. This one called himself Arnaud, and he had been living in the ruins of the mill for forty years by his own account, watching the smugglers come and go, taking a modest tithe.\n\n'They knew I was here,' he said pleasantly, pouring wine from a bottle that had not existed a moment ago. 'The arrangement suited everyone. I kept other things away. Then they brought something worse.'\n\nHe was well-dressed for a mill ruin. His hands were elegant. He hadn't aged since the last miller had seen him, forty years prior.\n\n'The drowners,' Geralt said.\n\n'They were always here. I managed them.' The man who called himself Arnaud smiled, and it did not quite reach his eyes. 'The last smugglers brought something through the river that the drowners consumed. It made them... more. Faster. Coordinated. I find I can no longer simply manage them.'\n\n'And the bodies?'\n\n'Not mine. I am not ungrateful for your interest.'"
      },
      {
        title: "Agreements and Endings",
        content: "The nest was beneath the mill's flood wheel — a chamber that should not have existed, packed with drowners in a density that made no ecological sense. Whatever the smugglers had transported through the crossing had acted like concentrated feeding stimulus, and the drowners had gorged and multiplied.\n\nGeralt worked for two hours. Igni, silver, Necrophage oil, Quen when they swarmed. The nest's floor was flooded knee-deep when he finished.\n\nHe found the contraband in a waterproofed chest wedged into the wheel housing — alchemical components of significant value and dubious legality. The smugglers had been transporting what looked like raw vampire essence, a black-market reagent used in certain forbidden rituals.\n\nArnaud was waiting when he emerged. 'You found it,' he said, looking at the chest.\n\n'You knew what it was.'\n\n'I suspected. I didn't know what it would do.' He paused. 'Will you be reporting this?'\n\nGeralt looked at the man who was not a man, in his mill that was not his mill, with his wine that had not existed. He thought about the bodies coming downriver. He thought about what lived in the Pontar without this particular occupant's management.\n\n'The drowners are dealt with,' he said. 'The chest stays with you to dispose of properly. That's the agreement.'\n\nArnaud nodded, and the ghost of real gratitude crossed his ancient face. 'As you say, witcher.'"
      }
    ]
  },
  {
    id: "the-woodland-spirit",
    title: "The Woodland Spirit",
    summary: "A village on the edge of a great forest has worshipped its protector spirit for generations — but the spirit's demands have grown increasingly dark, and the missing children cannot be ignored.",
    relatedMonsters: ["leshen"],
    chapters: [
      {
        title: "The Shape of Worship",
        content: "Lurtch had no inn. The village headman put Geralt up in his own barn with apologies that were genuine — the man clearly wished the witcher had not come.\n\n'The spirit protects us,' he said, more to the hay than to his guest. 'Has for sixty years. Since my grandfather's time. We leave offerings, we observe the rites, we don't go past the marker stones.' He wrung his hands. 'Or we didn't.'\n\n'The children,' Geralt said.\n\n'Three in the past month. But the forest gives back — more deer, more mushrooms. The old ones say it's a fair trade.' He finally looked up. 'I don't think it's a fair trade.'\n\nThe marker stones were carved with interlocking branch-work, worn almost smooth by decades of ritual touching. The crows watching from the treeline were too still, too attentive. Geralt felt the boundary between village and forest as a physical pressure — something vast and old pressing outward from the dark between the trunks."
      },
      {
        title: "The Price of Sanctuary",
        content: "The ancient village elder, a woman of ninety who remembered the spirit's arrival, received the witcher without surprise. 'You're not the first to come with troubled eyes,' she said. 'But the others went into the forest and didn't return.'\n\n'What did the spirit want, at first?'\n\n'Food. Cattle, sometimes. Grain. Nothing we couldn't spare.' She stared at the fire. 'It changed slowly. First it wanted someone to speak for it in the village. Then it wanted someone to live in the forest. Then it wanted —' She stopped.\n\n'Children,' Geralt said.\n\n'The forest gives and takes,' she said, the phrase so rote it had lost all meaning. 'That's what we told ourselves. That's how the rites work.'\n\nThe truth, as he pieced it together from the elder, the scared headman, and the symbols carved into the marker stones, was this: the leshen had accepted the village's worship and genuinely protected them for decades. But protection, to a leshen, meant control — and what it controlled, it ultimately consumed."
      },
      {
        title: "Into the Dark Cathedral",
        content: "The leshen's tree was ancient beyond any natural age — its trunk wider than two men's arm-spans, its roots above the ground like a cage, its bark carved with nesting symbols in a language older than any spoken on the Continent.\n\nGeralt came prepared. Relict oil, Dimeritium bombs, Igni. The wolves came first — three of them, silent and coordinated, flanking without command. Ravens dove from the canopy. The forest itself seemed to close in, branches shifting to block retreat.\n\nThe leshen emerged from the tree.\n\nIt was not a monster in the way a ghoul was a monster — it was something prior to that category, something that pre-existed the moral framework that made 'monster' a meaningful word. It observed him with its skull-like face and then it moved, with terrible grace, between the trees.\n\nThe fight was not clean. It was never clean with a leshen. But when the ancient tree burned and the wolves scattered and the ravens broke from their unnatural stillness, Geralt sat in the clearing for a long time before walking back toward Lurtch.\n\nThe village would need to renegotiate its relationship with the forest. That was outside a witcher's contract. But the children would not continue to disappear."
      }
    ]
  },
  {
    id: "wings-over-vizima",
    title: "Wings Over Vizima",
    summary: "A griffin terrorizes the trade road north of Vizima after hunters killed its mate. A witcher must end the threat — and reckon with the grief that drives it.",
    relatedMonsters: ["griffin"],
    chapters: [
      {
        title: "The Merchant's Complaint",
        content: "The merchant guild of Vizima was losing money at a rate that alarmed even their accounting department, which had elevated alarm to a professional art form. Six caravans in two months. Four dead, the rest fled. The northern trade road, the most lucrative in the region, effectively closed.\n\nGeralt listened to the guild factor's presentation with the polite attention he reserved for people who were about to pay him well. The description was clear enough: something large, aerial, attacking without warning, destroying wagons and killing horses. The survivors who'd seen it disagreed on specifics — one said a dragon, two said eagles of unnatural size, one simply said death with wings.\n\n'Griffin,' Geralt said, when the factor paused.\n\n'You can tell from the description?'\n\n'And the season. Griffins are most aggressive in mating season and when they're grieving. Given the attack pattern — daylight, bold, almost reckless — I'd say it's the latter.'"
      },
      {
        title: "The Nest and the Memory",
        content: "The nest was in a rocky outcrop two miles east of the road, in a cleft that offered a commanding view of the valley below. Geralt approached from the upwind side and stopped well short of the defensive perimeter.\n\nOne griffin. Female. The nest showed recent damage — not weather damage, the deliberate kind. Hunters had been here. There were crossbow bolts embedded in the nest material and blood, old now, on the rocks below. A kill site.\n\nThe male's bones were twenty meters away, picked clean by the scavengers that inevitably followed a griffin kill. Someone had taken the trophy parts — the head crest, the primary flight feathers. The rest had been left.\n\nGeralt sat with this information for a moment.\n\nThe female had not attacked the road before the hunters came. He'd confirmed this with the guild factor's records — the incidents began the week after a hunting party had reportedly killed a 'wild eagle of remarkable size' in the same general area. The road passed directly beneath the female's primary hunting range.\n\nShe was not attacking randomly. She was attacking anything that moved through her territory because everything that moved had become the enemy."
      },
      {
        title: "Mercy and Its Costs",
        content: "He could not save her. He'd understood this before he left Vizima. A griffin in this state — territory-focused, grief-maddened, too old to relocate — had no future that didn't involve more bodies on the road. The guild would send hunters eventually if he didn't, and hunters would do it worse.\n\nHe set the bait where the road wound closest to the outcrop and waited. The grapeshot bombs he'd positioned in the road dust. The crossbow with Hybrid oil-treated bolts was resting against his knee.\n\nShe came at dusk, magnificent even diminished by grief, her shadow crossing the road like a passing eclipse.\n\nIt was over quickly. He was good at his work.\n\nAfterward, he cut no trophies. He left her where she fell, at the edge of the road, and walked back to Vizima with only the documentation the guild required. The road reopened the following week. Trade resumed.\n\nHe did not tell the guild factor about the male's bones, or the hunters, or what it meant that both griffins were dead now and the nest was empty. Some information helped nobody, and some grief needed no audience."
      }
    ]
  },
  {
    id: "what-the-night-brings",
    title: "What the Night Brings",
    summary: "A farmstead outside Novigrad is plagued by visitations each night — something that calls out in voices of the dead, something that leaves no trace come morning.",
    relatedMonsters: ["specter", "nightwraith"],
    chapters: [
      {
        title: "The Voices",
        content: "The farmer's name was Bram, and he had not slept in six days.\n\n'It sounds like my wife,' he said, his hands wrapped around a cup he wasn't drinking from. 'Exactly like her. Calling from outside. And our boy Piotr — he almost went out the first night. I had to hold him.'\n\nHis wife had died four months ago. Fever. Quickly.\n\nGeralt walked the perimeter of the farmstead at dusk, finding the signs he expected: cold spots, areas where animals refused to walk, the characteristic spiral distortion that Yrden signs left in natural energy fields when a wraith had been regularly passing through. Near the old well, he found something he hadn't expected — candle stubs arranged in a pattern that was either amateur ritual or amateur accident. He wasn't sure which was worse.\n\n'Did anyone do anything unusual after your wife died?' he asked Bram when he returned to the house. 'Any ceremonies? Anything a wise woman or a priest suggested?'\n\nBram's eyes went to the boy."
      },
      {
        title: "The Anchor",
        content: "The boy was eight. He had gone to the wise woman in the village two weeks after his mother died, carrying a coin and a handful of his mother's hair. The wise woman — not malicious, just poorly educated in the relevant theory — had performed a calling ritual meant to let the family say goodbye.\n\nShe had said goodbye. She had also said come back.\n\nThe specter that manifested from that invitation was not the boy's mother. It was something that wore her voice and her face as a mask over something older and colder — an opportunistic entity that had found the invitation too useful to pass up. When it realized the family wouldn't come outside, it evolved. It learned what the boy remembered of his mother and rendered it with increasing accuracy.\n\nThat was the specter. The nightwraith was something different — the original anchor of whatever grief had charged this place, predating the boy's ritual by years. It would not leave with the specter.\n\nGeralt explained this to Bram with the minimum necessary detail. 'Two problems,' he said. 'One easier than the other.'"
      },
      {
        title: "The Work of Cold Hours",
        content: "The specter dispersed with Yrden and silver on the first night — it was relatively young and had no anchor of its own beyond the ritual the boy had performed, which Geralt carefully reversed.\n\nThe nightwraith was different. It had been here long before the family — the farmland had been something else before the farm, and whatever had happened in that previous incarnation had left a wound that hadn't healed.\n\nGeralt worked the problem in sections. He found the anchor — a sealed well beneath the barn floor, not the visible one. He understood the story from the objects inside: two people, a locked space, a long time. He performed the only ritual available to him, which was imprecise and unlikely to fully work on the first attempt.\n\nIt worked on the third.\n\nThe farmstead was quiet after that in the way that places are quiet when something has finally been heard.\n\nBram paid the full fee without comment. His boy was already asleep, deeply, for the first time in weeks. Geralt rode back toward Novigrad while the sky turned grey, thinking about grief and what it became when it had nowhere to go."
      }
    ]
  },
  {
    id: "the-scarlet-sin",
    title: "The Scarlet Sin",
    summary: "A series of deaths in a wealthy Novigrad neighborhood are dismissed as natural until a witcher notices the pattern — and the trail leads to a vampire that has been hiding in plain sight for thirty years.",
    relatedMonsters: ["katakan"],
    chapters: [
      {
        title: "Quality Deaths",
        content: "The dead were all wealthy. That was the first thing Geralt noticed. Not exclusively wealthy — one victim had been a servant, another a clerk — but the core of the deaths clustered in the merchant quarter, among people with servants and private physicians who certified natural causes.\n\nThe city guard had no interest in a witcher's opinion. The physician's guild had less. It was the coroner — a meticulous woman named Vanda who had grown quietly furious over three months of unexplained deaths — who sent for him with her own coin.\n\n'They all had the same euphoric presentation,' she said, spreading her notes across the table with the precision of someone who'd organized them carefully for this moment. 'Elevated heart rate, dilated pupils, reported feeling of great well-being in the final days. Then simply: heart failure.' She looked at him steadily. 'Eight times.'\n\n'Any bites?'\n\n'Nothing visible. I looked specifically.' She paused. 'There is one thing. On the backs of the necks, hairline punctures, barely visible without magnification. The private physicians wouldn't have found them.'"
      },
      {
        title: "Thirty Years of Careful Work",
        content: "The katakan had been a wine merchant for thirty years. Geralt established this through the method of drawing a circle around the deaths on a city map and asking who operated throughout that circle — who had access to all these households, who had been in the city long enough to predate all eight deaths.\n\nOsric Vane had the most recommended cellar in the merchant quarter. His appearance matched accounts from thirty years ago almost exactly; he explained this, when Geralt finally arrived at his shop after business hours, with the practiced ease of long preparation.\n\n'I am well-preserved,' Osric said pleasantly. He didn't run. He offered wine.\n\n'The eight people,' Geralt said, not taking the glass.\n\n'Eight in thirty years. Do you know how many people in this quarter drink themselves to death in thirty years? How many from overwork, from disease, from accidents that a physician certified as natural because the family paid for that certification?' He set down his own glass. 'I am not defending what I've done. I'm contextualizing it. I suspect you know the difference.'\n\nGeralt did know the difference. It didn't help as much as Osric seemed to think it would."
      },
      {
        title: "The Negotiation",
        content: "The problem with katakans, as opposed to the lower vampire classes, was that killing them was architecturally complicated. Katakans could phase between locations, create distracting copies, and had the social intelligence to immediately make a scene in a way that would bring guards.\n\nOsric had chosen his ground well: a public cellar with several exits, within earshot of a market that would fill in two hours.\n\n'I'll leave Novigrad,' Osric said. 'Permanently. You have my word.'\n\n'The word of a katakan is worth what?'\n\n'Considerably more than the word of most humans. We keep our agreements because we live long enough to care about our reputations.' He tilted his head. 'Kill me here and you'll have an awkward morning with the city guard. Let me go and eight people who would otherwise be dead continue living. Not indefinitely — I feed slowly, I feed safely, I don't kill — but the eight who've already paid won't be joined by others.'\n\nIt was the argument Geralt had known was coming since he first mapped the deaths.\n\nOsric was gone from Novigrad the following morning. Geralt reported the deaths as solved — natural causes, he told Vanda, with an expression that told her it was anything but. She filed the paperwork. He rode south.\n\nHe spent considerable time over the following months wondering if he'd done the right thing. He never reached a conclusion that satisfied him."
      }
    ]
  },
  {
    id: "children-of-the-forest",
    title: "Children of the Forest",
    summary: "When endrega warriors begin attacking logging camps with unusual coordination, a witcher investigating the cause finds something living beneath the oldest grove in the Mahakam foothills.",
    relatedMonsters: ["endrega-warrior"],
    chapters: [
      {
        title: "The Loggers' Problem",
        content: "The Mahakam logging contracts specified delivery windows that made no allowance for monster infestations. The foreman — a practical woman named Szura who had been running timber operations in these hills for fifteen years — showed Geralt the damage with professional detachment: three destroyed work sites, seven dead, equipment dragged into the forest and not recovered.\n\n'We've had endrega before,' Szura said. 'Workers learn to watch for nests. You find a nest, you burn it, you move on. But this —' She gestured at the torn equipment. 'This isn't nesting behavior. They're not defending a site. They're coming to us.'\n\n'You've moved into new growth recently?'\n\nShe pointed at the map. 'The old grove. The workers didn't want to go in — local superstition about the old trees. I overruled them.' She paused. 'I shouldn't have overruled them.'"
      },
      {
        title: "What the Grove Kept",
        content: "The oldest grove in the foothills was not simply old trees. Geralt understood this within fifty paces of entering: the undergrowth pattern was wrong, too deliberate, with clear thoroughfares between the massive trunks that no natural growth would produce. Something had cultivated this place.\n\nThe queen's chamber was fifty meters below the root system — a geothermal cavity, heated by deep rock, floored with the biological material that endrega queens used to build nursery environments. But this one was different. This one was immense.\n\nHe counted the egg casings by estimate. Three hundred. Four hundred. More than any endrega colony he'd encountered in the literature.\n\nThe queen herself was the size of a large horse.\n\nShe had been here, Geralt estimated from the calcification patterns in the chamber walls, for approximately sixty years. The workers' logging had been felt through the root system as vibration — something the colony had adapted to ignore. The new logging reached the grove's boundary and triggered something older in the warrior caste's programming: defense at threshold, without limit."
      },
      {
        title: "A Decision Underground",
        content: "He had the materials to destroy the colony. He also had, laid out in the cold logic of what he'd observed, the understanding that this colony had been in this grove for sixty years without attacking anyone.\n\nSzura's operations were profitable. The old grove was not on the original contract boundary — it had been added in the third revision after the initial survey turned up marketable timber.\n\nGeralt climbed out of the chamber. The warriors that had followed him down were dead. He found Szura at the edge of the treeline.\n\n'The colony is sixty years old,' he said. 'It's the largest one I've ever encountered. Destroying it is possible but it will take more resources than you've contracted for, and there are risks associated with an aroused colony of this size that I won't accept solo.'\n\n'Then what do you suggest?'\n\n'Move the operations boundary back to the original survey line. The old grove isn't worth it.' He looked at her directly. 'It's also, professionally speaking, not a fight I'd take in your shoes.'\n\nSzura looked at the map for a long moment. Then she nodded.\n\nThe workers never found out what was beneath the grove they'd been afraid to enter. Some local knowledge, Geralt thought, earned its superstition honestly."
      }
    ]
  },
  {
    id: "salt-and-bone",
    title: "Salt and Bone",
    summary: "The marshes south of Velen have become impassable as autumn floods bring new horrors to the trading paths. Two witchers take a contract, discover three problems, and must choose which to solve.",
    relatedMonsters: ["ghoul", "water-hag"],
    chapters: [
      {
        title: "Double Contract",
        content: "Geralt met Lambert at the waystone south of Midcopse purely by accident — they'd both followed the same notice board posting to the same conclusion. Lambert's expression when he saw the white horse suggested he'd been hoping for different company.\n\n'Three coin or two?' Lambert said, which was his version of a greeting.\n\n'Split,' Geralt said.\n\nThey rode south together in companionable silence, which was the closest Lambert managed to warmth. The marsh began gradually, the road softening underfoot before becoming indistinguishable from the surrounding wetland. The villagers who'd posted the notice had described 'things in the water, dead things, and something worse.' This was, in Geralt's experience, a maximally useful description.\n\nThe dead things were ghouls — a large pack, drawn by a recent battle in the marsh. Three weeks ago, judging by the decomposition stage of the bodies they were feeding on. The ghouls were a problem but a categorically normal one.\n\nThe 'something worse' materialized within twenty minutes of their arrival."
      },
      {
        title: "The Voice That Wasn't",
        content: "It called from the water in Lambert's mother's voice. He'd described his mother once, briefly and without sentimentality — a woman who'd disappeared when he was three, who he didn't remember. He stopped mid-stride at the sound of her, which told Geralt everything he needed to know about how much he claimed not to care.\n\n'Don't,' Geralt said.\n\nLambert blinked. The water's surface was unbroken, but the reeds on the far bank moved against the wind.\n\nWater hags were, technically, necrophages — but they operated at the cognitive upper limit of the category. They didn't just feed; they hunted with social intelligence, and an intelligent hunter in a marsh had every advantage. The voice trick wasn't instinct. It was strategy.\n\nThey separated: Lambert to draw it out, Geralt to come around the flank through chest-deep water that smelled of old death. The ghouls, drawn by the commotion, complicated things considerably."
      },
      {
        title: "Accounting",
        content: "When it was finished, Lambert counted bodies with the detachment of someone performing arithmetic. 'Seven ghouls. One water hag. And three human ones that the ghouls hadn't gotten to yet.' He paused. 'Contract was for the ghouls.'\n\n'Contract was for whatever was making the marsh impassable,' Geralt said.\n\n'Technically accurate.' Lambert wrung marsh water from his jacket with a grimace. 'The voice thing. That was specific.'\n\n'They learn. They listen long enough near a settlement, they pick up on what works.'\n\n'It didn't know her voice. It knew what I'd react to.' Lambert said this flatly, without apparent affect. 'A voice I'd react to. That's what it was doing.'\n\nGeralt said nothing, which was the appropriate response.\n\nThey split the payment at the waystone where they'd met. Lambert rode north without another word. Geralt watched him go and thought about all the ways a witcher's Trial of the Grasses was supposed to remove sentiment and how spectacularly it had failed in every case he could document."
      }
    ]
  },
  {
    id: "the-beast-of-white-orchard",
    title: "The Beast of White Orchard",
    summary: "After a harsh winter, a village near White Orchard faces a threat from multiple directions — a dire wolf pack and something else, something that kills wolves and men alike.",
    relatedMonsters: ["dire-wolf", "werewolf"],
    chapters: [
      {
        title: "Two Kinds of Tracks",
        content: "The snow around White Orchard held two kinds of tracks, and only one kind was wolf.\n\nThe other kind was almost wolf. Almost. Geralt crouched over them in the early morning while the village elder waited at a diplomatically distant remove. The stride length was wrong — too long for any wolf that genetics had produced. The depth was wrong — too heavy. And in one spot, where the creature had pivoted sharply, the toe marks were wrong in a way that no wolf's ever were.\n\n'How many livestock?' he asked.\n\n'Six sheep, two goats, one cow.' The elder paused. 'And Old Marek, who goes out early for his mill. We found enough of him.'\n\n'The wolves attacked separately from whatever this is,' Geralt said, indicating the two track sets.\n\n'You can tell them apart?'\n\n'Yes.' He stood. 'Tell me about anyone in the village who's acted strangely in the past month. Erratic sleep. Unexplained injuries. Unusually aggressive.'"
      },
      {
        title: "The Miller's Brother",
        content: "The trail to the werewolf was not subtle once you knew to look. Jakub Brandt, the deceased miller's younger brother, had three unexplained absences during the previous full moon period and had recently developed a habit of sleeping through morning mass that his wife found out of character.\n\nGeralt found him at the edge of the village, splitting wood with a mechanical intensity that suggested he hadn't slept.\n\n'You know,' Geralt said.\n\nJakub brought the axe down once more, then set it aside. 'Since autumn,' he said. 'I didn't know what it was at first. Then I did.'\n\n'The wolves — they follow you?'\n\n'When I change.' He stared at his hands. 'Something about the way I smell, I think. They follow. I can't control them.'\n\n'Old Marek.'\n\n'I don't remember. I never remember.' He finally looked up, and his eyes held the specific horror of someone who has pieced together what they've done from evidence they couldn't dispute. 'I'm not asking for mercy. I'm asking you to make sure my wife doesn't —' He stopped."
      },
      {
        title: "The Witcher's Choice",
        content: "There was a cure. Geralt had administered it twice before — a combination of specific reagents, a ritual timed to the new moon, and a degree of danger to the administrator that made it a choice rather than a simple solution.\n\nHe gathered the materials over three days. White Orchard's apothecary had two of the four components. The third he found in an abandoned cottage east of the village. The fourth he rode two hours north to acquire from a herbalist who didn't ask questions.\n\nJakub underwent the ritual on the new moon with the composure of someone who had accepted that he might not survive it and had made his peace accordingly. His wife held one of the candles with rigid steadiness throughout.\n\nThe ritual worked. These things did, when you followed the procedure correctly and the curse hadn't calcified past the ten-year mark.\n\nThe dire wolves were another matter — three nights of careful work along the eastern treeline, tracking them to their den, making the decision that was simply part of the job. It was less interesting, philosophically, than the werewolf. But it was necessary.\n\nHe left White Orchard on the fifth day, paid for both problems though he'd solved one that hadn't appeared in the contract. The elder shook his hand. Jakub and his wife watched from their doorway.\n\nGeralt rode east, toward whatever the next notice board held."
      }
    ]
  },
  {
    id: "embers-and-ash",
    title: "Embers and Ash",
    summary: "A mage's tower on the Skellige coast has been burning for three days without consuming itself. Inside, a fire elemental waits, created by a ritual that went catastrophically wrong.",
    relatedMonsters: ["fire-elemental"],
    chapters: [
      {
        title: "The Eternal Fire",
        content: "The tower should have been rubble. It had been burning for seventy hours by the time Geralt arrived, which was forty-five hours longer than wood-and-stone construction of its type could sustain. Yet it stood, wreathed in fire that moved with a deliberateness that wind alone couldn't account for, visible from the sea as a beacon.\n\nThe fishermen of the nearest village gave it a wide berth. Three boats had already capsized from the wake of panicked oarsmen who'd seen something move in the fire. Geralt examined what the tide had brought in: scorch marks on the dock pilings, glass beads fused from sand by extreme heat, and the characteristic metallic smell of Elementa activity.\n\n'The mage,' he said to the harbormaster. 'When did anyone last see her?'\n\n'Before it started. She'd been getting supplies for something big — everyone in the market noticed. The kind of quantities you'd want for a major working.'\n\n'What did the supplies suggest?'\n\nThe harbormaster, to her credit, had made inquiries. 'Summoning,' she said. 'Something to do with summoning.'"
      },
      {
        title: "Architecture of a Mistake",
        content: "The mage's journal was in the tower's exterior office — she'd been careful enough to keep her notes outside the ritual space, apparently not careful enough to survive whatever happened within it.\n\nGeralt read quickly. The working was ambitious: a bounded fire elemental, contained within a prepared circle, to be used as a heat source for an experimental distillation process. The theory was sound. The preparation notes were meticulous. The error was on the last page, in handwriting that had become increasingly hurried.\n\nThe binding sigil had a transcription error — a single stroke, reversed. It wouldn't have been visible to anyone not specifically looking for it. The elemental had exploited the gap in the containment within minutes of summoning, consuming the mage and the ritual space. The tower's stone was absorbing and reflecting the elemental's energy, creating a feedback loop that prevented the fire from dying and prevented the elemental from dispersing.\n\nIt was trapped, in a manner of speaking. Angry and trapped and looking for anything that entered its environment to express that anger on."
      },
      {
        title: "Into the Heart of It",
        content: "Geralt had Elementa oil, Dimeritium bombs, and the Aard sign. He also had, on the basis of a theory he hadn't had time to test, a modified containment circle drawn on a fireproof surface that he intended to slide across the tower floor between him and the elemental.\n\nThe theory was this: if the original binding sigil could be correctly redrawn in the elemental's presence, the incomplete binding that was keeping it chaotically active might resolve into a complete one. A fully bound elemental would eventually disperse when its energy expenditure exceeded the feedback loop's input.\n\nThe practical problem was that he needed to be within ten meters of the elemental to draw the circle, and the elemental was not interested in waiting while he drew.\n\nHe used six Dimeritium bombs in the process. The Aard sign twice to disrupt the elemental's coherence and buy seconds. He had burns on both hands by the time he completed the sigil.\n\nThe binding resolved. The fire began, slowly, to subside.\n\nGeralt walked out of the tower into the cold sea air and submerged his hands in the nearest water trough. The tower would finish cooling over the next few days. Whatever remained of the mage was inside.\n\nHe filed a report with the local Mage Guild chapter and sent them the journal. What they chose to do with the information about their colleague's final mistake was their business."
      }
    ]
  },
  {
    id: "the-last-witcher",
    title: "The Last Witcher",
    summary: "An aging witcher takes one final contract in a village that has suffered under the combined attention of a striga, a leshen, and something older still — a story of last things and the weight of a life spent at the edge.",
    relatedMonsters: ["striga", "leshen", "higher-vampire"],
    chapters: [
      {
        title: "The Old School",
        content: "His name was Hieronymus, School of the Viper, and he was sixty-three years old, which was an age that witchers rarely reached not because they died young but because the Trial of the Grasses and the mutations that followed did not tend toward longevity. He was, by any reasonable standard, already living on borrowed time.\n\nThe village of Klukva had been sending notices for two years. He'd read them from a distance — the timing was bad, the pay inadequate, the problem complex. Now, with winter coming on and his joints telling him things he would rather not hear, he found himself reading them again with different eyes.\n\nTwo years of notices. Nobody else had come.\n\nHe rode toward Klukva on a horse that was also elderly and thought, not for the first time, that he would very much like to meet whoever had decided that witchers should face the worst things in the world alone."
      },
      {
        title: "The Inventory of Horrors",
        content: "The village's problems had compounded in the way that village problems did when left unaddressed: each one attracting the next, the monsters drawing on each other's presence to grow bolder.\n\nThe striga had been in the old manor since before anyone in Klukva was born. The leshen had claimed the surrounding forest sometime in the intervening decades, drawn by the striga's lingering curse energy. The higher vampire — Hieronymus didn't know what to make of the higher vampire, except that it was old and had been watching the situation with what could only be described as anthropological interest.\n\nHe met the vampire on the second night, in the village's single tavern. It looked like a middle-aged scholar. It had been in Klukva for thirty years. It hadn't killed anyone.\n\n'Why?' Hieronymus asked, genuinely curious.\n\n'Observation,' the vampire said. 'I have never watched a village adapt to being simultaneously between a leshen's territory and a striga's lair. The sociology is remarkable.' It paused. 'You are going to try to solve it.'\n\n'I was hired to solve it.'\n\n'You are also very old, for your kind.'"
      },
      {
        title: "The Last Accounting",
        content: "He could not solve all three problems. He understood this clearly on the third day, with his joints worse and his silver supply limited and the Viper School's technique — which emphasized poison and precision over strength — still perfectly functional but dependent on speed he no longer fully possessed.\n\nThe vampire helped. He hadn't expected that.\n\nNot in combat — it simply watched, and twice called warnings when his back was turned, and on one occasion distracted the leshen's ravens long enough for him to land the decisive blow. After the leshen was gone and the striga's curse broken and the girl in the crypt sleeping in the grey dawn, the vampire sat across from him in the tavern and they shared the last of the tavern keeper's wine.\n\n'Will you stay?' Hieronymus asked.\n\n'For a while. The village needs something to watch over it.' The vampire looked at his wine. 'You are not going back to the Path.'\n\n'No.'\n\n'What will you do?'\n\nHieronymus thought about it honestly. 'Sleep,' he said finally. 'I believe I would like to sleep somewhere that is not moving. For quite a long time.' He finished his wine. 'And you? After the observation is complete?'\n\n'I'll find another village,' the vampire said. 'There is always another village.' It said this without malice, and without irony, in the tone of someone for whom time has ceased to be a meaningful constraint. 'The world makes them faster than anything destroys them. I find that admirable.'\n\nHieronymus nodded slowly. It was, he supposed, a reasonable thing to admire.\n\nThe village of Klukva paid him the agreed sum plus a bonus, which the headman pressed into his hands with both of hers, saying nothing. He rode out slowly. The forest on either side of the road was simply forest now — the particular pressure of a leshen's presence gone, the trees returned to their own quiet business.\n\nHe did not look back."
      }
    ]
  },
  {
    id: "a-coin-for-the-devil",
    title: "A Coin for the Devil",
    summary: "In the slums of a great city, people are dying in states of bliss — smiling, peaceful, unmistakably dead. The higher vampire responsible is not hiding. He is waiting to be understood.",
    relatedMonsters: ["higher-vampire"],
    chapters: [
      {
        title: "The Beautiful Dead",
        content: "The dead of the Bits — Novigrad's worst district — rarely attracted attention. They died of cold, drink, violence, and disease, and the city buried them in common graves with minimal ceremony. So the three who died smiling, in apparent comfort, in their own beds, with no visible cause of death, were an anomaly significant enough that even the Bits' jaded residents noticed.\n\nGeralt noticed something else: the deaths were in a pattern. Not geographic — the Bits was too densely packed for geography to mean much — but social. The three dead people had each been, within the past month, engaged in acts of significant cruelty. The first had beaten a dog to death. The second had informed on neighbors to the city guard for a finder's fee. The third had, according to the people who'd known her, driven her sister out of their shared housing in winter with nowhere to go.\n\nHe was not dealing with something that killed randomly."
      },
      {
        title: "The Principles of the Thing",
        content: "The vampire received him in a room above a pawnbroker's shop that was more comfortable than its exterior suggested. He was perhaps forty in appearance, carefully dressed, with the kind of stillness that very old things develop when they have stopped needing to perform humanity convincingly.\n\n'You came to question me,' he said. 'Not to kill me.'\n\n'You're not hiding,' Geralt said. 'You wanted to be found.'\n\n'I wanted to be understood, which is different.' He gestured at a chair, which Geralt did not take. 'The three who died had something in common — you know this already. They caused suffering to others casually, without consideration. I am old enough that this pattern becomes visible to me the way it is not visible to those who live shorter lives. The pattern bothers me.'\n\n'So you killed them.'\n\n'I fed on them. At their end — which was pleasant, for them, I want that understood — they experienced genuine peace. Whether this is a mercy or an indignity is a question I have been examining for two centuries and have not resolved.'"
      },
      {
        title: "Old Arguments",
        content: "They talked for two hours, which surprised Geralt and seemed to please the vampire.\n\nThe argument the vampire presented was coherent, internally consistent, and deeply unsatisfying: that it had been maintaining a kind of culling function in various cities for two hundred years, targeting the casually cruel rather than the innocent, that the deaths it caused were more merciful than the deaths these individuals would otherwise have, that the net effect on every community it had inhabited was marginally positive.\n\nThe counter-argument was simpler: it was not authorized to make these decisions. Moral arithmetic of this kind, even if the arithmetic was sound, required authorization that no one had given and that Geralt was not in a position to provide.\n\n'Will you kill me?' the vampire asked, at the end.\n\n'If I find another body, yes,' Geralt said. 'Or if you leave the Bits and start making your judgments in the rest of the city. Stay here, kill no one, feed from those who consent. Those are the terms.'\n\n'And if I disagree with the terms?'\n\n'Then we have a different conversation.'\n\nThe vampire nodded, slowly. 'You know you can't enforce this.'\n\n'No,' Geralt agreed. 'I can't.' He stood. 'Neither can you enforce your principles. That's the situation we're both in.'\n\nHe left without looking back, which was becoming a habit, and walked back through the Bits in the grey morning, where the living went about their business without knowing what had been decided about their neighborhood, and whether the decision was correct, and whether the one who made it had any right to."
      }
    ]
  },
  {
    id: "the-velen-marshes",
    title: "The Velen Marshes",
    summary: "After Nilfgaard's advance through Velen, the battlefields have become monster breeding grounds. A witcher systematically clears the marsh paths so refugees can move south.",
    relatedMonsters: ["drowner", "water-hag", "ghoul"],
    chapters: [
      {
        title: "The Economy of War",
        content: "War was good business for some trades. Witchers were not among them — the chaos of military campaigns disrupted the infrastructure of contracts, scattered the populations who knew to hire them, and tended to produce monster infestations that paid nothing because there was nobody left to pay.\n\nThe Velen marshes were a textbook example. Three months after the Nilfgaardian advance, the battlefields had produced a thriving ecosystem of necrophages and aquatic horrors that made the refugee paths southward functionally impassable. Geralt had ridden into Velen on his own initiative, which was not something he could explain economically but which he found he could not not do.\n\nThe first path took three days to clear. Ghouls in such density that it took Necrophage oil and continuous Igni use to prevent being overwhelmed. Drowners at every water crossing. And threading between the groups, avoiding both, a water hag that had claimed the path's midpoint as prime hunting territory."
      },
      {
        title: "The Work",
        content: "He developed a system over the following weeks. Each path required a survey, a prioritization of threats, and a clearance sequence that accounted for how each monster population would react to disturbance.\n\nThe ghouls, disrupted from their feast, would scatter to adjacent areas and regroup. He had to return to each cleared section twice to manage the reformation.\n\nThe drowners were more consistent — disrupt the upstream nest and the downstream population destabilized within forty-eight hours. He found three nests in the first week and seven more in the second.\n\nThe water hags were the most time-consuming. Each one had established a territory that overlapped with refugee paths in ways that seemed almost deliberate. Geralt began to suspect, without evidence he could cite academically, that water hags understood roads the way wolves understood game trails — as concentration points for prey."
      },
      {
        title: "The Passage",
        content: "By the end of the fourth week, the southern paths were passable. Not safe — nothing in Velen was safe — but passable. Refugee groups with a minimal escort could reach the Temerian border in two days rather than the impossible five that the monster-choked paths had imposed.\n\nGeralt watched the first group pass from a hill above the first cleared section. Forty people: families, some soldiers who'd turned in the wrong direction, a handful of Velen locals who'd lost everything to the advance. They moved without looking at the marsh around them, with the focused forward attention of people who had decided not to notice anything that wasn't their destination.\n\nHe had not been paid. He had no expectation of being paid.\n\nHe rode north, back into the marsh, to begin on the next section. There were two more paths that needed clearing, and the ghoul populations were already reforming where he'd worked in the first week, which meant the work was cyclical, which meant it would not be truly finished until the war ended and the bodies were finally buried.\n\nThat would take years. He had time."
      }
    ]
  },
  {
    id: "stone-cold",
    title: "Stone Cold",
    summary: "A rock troll living under a bridge has been eating travelers — or so the village believes. The truth is more complicated, and the troll is more interesting.",
    relatedMonsters: ["rock-troll"],
    chapters: [
      {
        title: "Under the Bridge",
        content: "The bridge over the Rudling stream had served the village of Pell for a hundred years without incident. The troll that moved in under it had been there, by local account, for three months, and had eaten four people in that time. This was the contract: remove the troll, restore the bridge, four marks.\n\nGeralt arrived at the bridge in the early morning and spent fifteen minutes looking at the area under it before speaking. The troll was there — an old male, larger than average, with the particular grey-green coloration of long geological exposure. It watched him watching it with small, intelligent eyes.\n\n'The four people,' Geralt said.\n\n'Dead,' said the troll. Its voice was like gravel finding its resting angle. 'Was dead. Already dead. I eat. Good eat.'\n\nGeralt crouched to the troll's eye level. 'They were already dead when you found them?'\n\n'Three dead.' A pause, with the slowness of something that processes time differently. 'One not dead yet. One fall in water. I pull out.' The troll seemed to feel this distinction was important. 'I pull out. She walk to village. But she scared. She say I eat people.'\n\nGeralt sat down on the bank and considered this."
      },
      {
        title: "Testimony",
        content: "He found the woman who had almost drowned — a merchant named Lotte who had a bad history with horses and river crossings. She confirmed the troll's account with the reluctance of someone who had made a significant claim to multiple witnesses and now faced revising it.\n\n'It pulled me out,' she admitted. 'I thought it was attacking me. I was panicking. I ran.'\n\n'The other three?'\n\n'I didn't know about any others.' She paused. 'I did see bodies near the bridge once, upstream. I thought the troll... but they could have been washed down.'\n\nA survey of the area upstream of the bridge found the kind of evidence that explained everything and implicated no one conveniently: a rocky ford used by travelers unwilling to wait for the bridge, where four people in the past year had apparently misjudged the current. The troll was downstream. The troll ate what the current brought.\n\nThe ecology of the situation was neither pleasant nor a crime."
      },
      {
        title: "The Resolution",
        content: "Geralt returned to Pell with a report that satisfied no one. The troll had not eaten travelers. The troll had, in the technical sense, eaten people — but those people had already been dead. The troll had also saved at least one person from drowning, which the village's framing of events had not included.\n\n'So we just leave it there?' the contract-poster asked.\n\n'Consider what the bridge has been like for a hundred years without it,' Geralt said. 'You've had four accidental drownings in the past year at that ford. While the troll has been under the bridge, traffic has been using the bridge instead of the ford. Your ford deaths are down.' He let this sit for a moment. 'The troll also seems genuinely uninterested in living people. It eats what dies. It pulled your merchant out of the water.'\n\nThere was a long discussion. Geralt waited it out with the patience of someone who had learned that village councils needed to reach conclusions in their own time.\n\nThe contract was marked satisfied, with a reduced payment that the village elder described as a 'processing fee' and Geralt recognized as face-saving. The troll remained under the bridge.\n\nAs Geralt rode away, he saw it watching him from the bank with its small, careful eyes. He lifted a hand in what he hoped conveyed professional respect. The troll lifted a massive hand back.\n\nThe ford drownings stopped entirely over the following year. Nobody connected this to the troll's presence loudly enough for it to change any official accounts. Some useful things were best left quietly appreciated."
      }
    ]
  },
  {
    id: "wings-of-sorrow",
    title: "Wings of Sorrow",
    summary: "A mountain village is caught between a nesting wyvern claiming the high pass and a griffin displaced from its territory, with a trade route and a deadline caught in the middle.",
    relatedMonsters: ["wyvern", "griffin"],
    chapters: [
      {
        title: "The Trade Window",
        content: "The mountain pass above Larvik opened for eight weeks per year, between the last spring snow and the first autumn freeze. Miss that window and the eastern merchants who supplied three villages with winter goods missed the season. The wyvern that had nested in the pass's narrows had arrived with the spring thaw and shown no interest in leaving.\n\nGeralt arrived with this constraint clearly established and was immediately presented with a second: the griffin that had normally used the high slopes above the pass as its winter hunting ground had returned to find the wyvern occupying its approach routes. The two animals had been conducting aerial engagements for two weeks, neither capable of landing a decisive blow but both generating sufficient chaos to make the pass actively dangerous for reasons entirely independent of their respective contracts.\n\nOne monster or two: that was the first question. The second was which to address first."
      },
      {
        title: "Aerial Warfare",
        content: "He made the decision based on nesting status: the wyvern had eggs in the narrows, which meant it was defending rather than simply territorial, which meant it would not move even under significant pressure. The griffin had not nested yet — it was still in the territorial phase, which meant it was more responsive to the kind of disruption that might redirect it without requiring a kill.\n\nThree days of careful positioning, signal fires at points he'd identified as natural deterrents, and the strategic destruction of the griffin's preferred perching sites in the approach route achieved the desired effect. The griffin moved its territory north by two miles — not ideal for the griffin, but survivable, and it left the pass approach clear.\n\nThe wyvern required a different approach. Eggs meant a nest he couldn't simply destroy without ethical problems he wasn't prepared to take on, and a wyvern guarding eggs was significantly more dangerous than one in standard territorial mode. He identified the nest's access point, studied the wyvern's flight pattern for four days, and hit the problem at the specific three-hour window when she flew the longer hunting circuit."
      },
      {
        title: "The Window Opens",
        content: "The wyvern was dead by the end of the week. The eggs had not yet developed to the point of viability — he confirmed this before acting, which was a distinction he kept private because explaining it to merchants tended to confuse the issue.\n\nThe pass opened twelve days after his arrival. The first merchant caravan went through with an escort that was technically unnecessary by then but which reassured everyone sufficiently that the goods moved without incident.\n\nGeralt watched the caravan from the ridge above the narrows, where the wyvern's nest was now empty and the griffin's territory was re-establishing itself two miles to the north in a way that would probably generate a new contract in three or four seasons.\n\nThe mountains didn't care about trade windows. They continued their own business on their own timescale, which was geological and admitted no appeals.\n\nHe collected his fee in Larvik and rode south before the weather changed his options."
      }
    ]
  },
  {
    id: "the-moonlit-curse",
    title: "The Moonlit Curse",
    summary: "A noblewoman hires a witcher to kill the werewolf terrorizing her estate. The investigation reveals the werewolf is her own son — and she has known for months.",
    relatedMonsters: ["werewolf"],
    chapters: [
      {
        title: "A Mother's Commission",
        content: "Lady Calla Vorn received Geralt in a parlor that was too warm and too formally arranged for a genuine emergency — everything placed with the care of someone who has rehearsed the meeting. She was a woman of fifty who had clearly been beautiful and was not yet old, and she described the attacks on her estate's livestock and one servant with precise, controlled language.\n\nGeralt listened. He asked his questions. The answers were too complete — a witness's account has gaps, because events have gaps, and the account Lady Vorn gave had none.\n\n'Your son,' he said, partway through. 'Where is he?'\n\nThe pause was a fraction of a second too long. 'At his studies, in Oxenfurt.'\n\n'Has he visited recently?'\n\nAnother fractional pause. 'Last autumn.'\n\nGeralt examined the estate's records with her permission — she granted it too readily, which was its own information — and found the servant's account of the attack. The description of the creature's size and movement was inconsistent with any wolf species but consistent with lycanthropy. The timing of the attacks matched the lunar calendar exactly."
      },
      {
        title: "The Son's Return",
        content: "He found Branko Vorn in the hunting cottage on the estate's eastern edge, which his mother had clearly arranged — the food left there, the lamp oil, the locked door that gave the moment he knocked.\n\nThe young man was twenty-two and not, in his human form, frightening at all. He was pale and visibly exhausted and he looked at Geralt with the specific expression of someone who has been waiting for this conversation and is not sure if they want it or dread it.\n\n'She hired you to kill me,' he said.\n\n'She hired me to kill the werewolf. She may not have drawn the connection explicitly,' Geralt said. 'Or she may have and found it easier not to think about.'\n\n'She knows.' No heat in it — he had clearly processed this. 'She knew before she sent the notice. I think she hoped the problem would resolve itself without her having to make a decision.'\n\nGeralt thought about this for a moment. 'The servant who was attacked.'\n\n'I know. I know.' Branko pressed his hands flat on the table. 'She survived. I —' He stopped. 'There's a cure, isn't there? I've read about it.'"
      },
      {
        title: "Decisions and Their Costs",
        content: "He administered the cure over three days — Branko was young enough and the curse recent enough that the procedure was straightforward by the relevant standards, which meant only moderately dangerous and requiring only one night of conditions that Geralt spent largely restraining a very strong young man with silver chains while explaining that this was temporary and the pain would pass.\n\nIt passed.\n\nGeralt presented himself to Lady Vorn on the fourth morning with the report that the werewolf problem had been resolved and would not recur. He did not specify the method. He accepted the contracted payment.\n\n'Will you tell me —' she began.\n\n'No,' he said.\n\nShe nodded. She did not ask again. Whatever she made of the subsequent days — her son returning from the cottage looking better than he'd looked in months, the attacks ending, the livestock losses stopping — she said nothing that reached Geralt's ears.\n\nSome families managed their configurations of knowledge and silence with great delicacy. He had learned not to disturb that kind of delicacy when it was doing its job.\n\nThe invoice was marked paid. He rode north, into whatever came next."
      }
    ]
  },
  {
    id: "beneath-the-ice",
    title: "Beneath the Ice",
    summary: "A Skellige expedition to chart the northern fjords discovers something sealed in the ice for centuries — and begins to thaw.",
    relatedMonsters: ["ice-elemental"],
    chapters: [
      {
        title: "The Deep Survey",
        content: "The expedition had been commissioned by a Clan Dimun jarl with academic interests that his warriors found baffling. Four boats, twelve men, a scholar from the mainland who'd never sailed before, and a witcher hired specifically because the scholar had read enough to know the northern territories sometimes contained things that required specialized handling.\n\nThey found the fjord on the third week out, choked with ice that was wrong in the specific way that magically-originating ice is wrong: too regular, too blue, and emanating a cold that instruments registered but the body felt as something other than temperature.\n\nThe scholar set up his measurement equipment on the ice surface while the warriors looked at the landscape with the expression of people who have seen enough strange things to reserve judgment. Geralt walked the perimeter, reading the ice.\n\nIt had been sealed for two hundred years. The seal was a binding circle, visible through the clarity of the ice — a mage's work, professional and thorough. Whatever was inside had not been accidentally frozen. It had been deliberately contained."
      },
      {
        title: "The Thaw",
        content: "The scholar's instruments, as it turned out, included something that emitted heat as a byproduct of its operation. This became relevant when a crack appeared in the binding circle on the second day of survey.\n\nThe elemental that emerged was not immediately aggressive — it was, in fact, initially dormant, reforming from the ice crystals with the slow deliberateness of something recovering from a very long sleep. Geralt had twenty minutes to gather everyone on the boats before it became fully coherent.\n\nHe did not manage twenty minutes. He managed eleven.\n\nThe elemental engaged the expedition at the fjord entrance — a bottleneck, which was the only piece of luck that kept the losses to three instead of more. Ice formations exploded, the water around the boats froze and cracked, and the temperature dropped to the point where the scholar's instruments stopped functioning.\n\nGeralt worked with Igni and Elementa oil and the educated understanding that ice elementals, unlike their fire counterparts, could be disrupted by extreme directional heat — not enough heat to damage them fundamentally, but enough to disrupt their crystalline coherence temporarily."
      },
      {
        title: "What the Mage Knew",
        content: "The scholar found the answer in the mage's logbook, which had been left in a waterproofed case at the fjord entrance — a dead drop for whoever eventually arrived to deal with the consequences.\n\nThe elemental had been created by accident during an experimental working in the northern fjords two centuries prior. The mage had managed to contain it but lacked the resources to destroy it, and had sealed it with the expectation that a subsequent generation of better-equipped practitioners would handle the problem.\n\nThis was, Geralt reflected while working the third hour of a fight that had already claimed more resources than he liked, an optimistic estimate of subsequent generations.\n\nThe elemental finally dispersed when the Igni bombardment, sustained for forty continuous minutes with Thunderbolt potions maintaining the necessary intensity, disrupted the coherence past the reformation threshold. It did not die so much as become structurally unable to maintain itself against the entropy he was applying.\n\nThe fjord returned to normal temperature over the following hours. The ice that remained was simply ice.\n\nGeralt sat in the bow of the lead boat while the survivors rowed south and the scholar, with the determination of someone who has nearly died for his research, took careful notes.\n\n'The logbook says there were three others like it,' the scholar said, looking up from his reading with the expression of academic discovery that coexists easily with personal terror. 'Three other sites. Northern fjords. The mage left coordinates.'\n\nGeralt looked at the water. 'Send them to the Brotherhood.'\n\n'Of course.' The scholar paused. 'Will you —'\n\n'No,' Geralt said. 'Absolutely not.'"
      }
    ]
  },
  {
    id: "the-weeping-woman",
    title: "The Weeping Woman",
    summary: "A village on the edge of a bog has been haunted for twenty years by a nightwraith. Everyone knows the story of how she died. No one has told the truth of it — until now.",
    relatedMonsters: ["nightwraith"],
    chapters: [
      {
        title: "Twenty Years of Weeping",
        content: "The wraith had appeared the night after the wedding. Twenty years ago, in a village that had kept its collective shame so consistently that even the children knew the official story without being told directly: Marta Brenn had drowned herself on her wedding night, overcome by grief for a previous love. The current village elder — the groom, now forty-three and prosperous — had organized commemorative prayers annually.\n\nThe wraith wept. It did not attack. It appeared at the lake's edge and wept and called a name, and the sound of it drove people indoors and prevented sleep and had produced, over twenty years, a generation of children who grew up knowing the lake was forbidden after dark.\n\nGeralt arrived and spent the first day walking the shore and listening to what people said without invitation. The official story was too smooth, he decided. Twenty years of telling had removed every rough edge."
      },
      {
        title: "The Name She Calls",
        content: "The name the wraith called was not the groom's name. That was the first inconsistency. The second was that Marta Brenn had been, according to the midwife who delivered half the village and kept meticulous records, a strong swimmer who had grown up on the lake.\n\nThe third was the elder's behavior when Geralt mentioned, casually, that he'd heard the wraith calling a name.\n\n'It calls many things,' the elder said, too quickly. 'Grief makes the dead irrational.'\n\n'The dead aren't irrational,' Geralt said. 'They're extremely specific.'\n\nThe name the wraith called was Piotr — a common name, but one that the elder's hands had tightened at. Piotr had been Marta's brother, who had moved away from the village three months after her death and not returned.\n\nGeralt sent a letter. He received a reply that changed the shape of everything he'd understood."
      },
      {
        title: "The Truth and Its Weight",
        content: "Marta Brenn had not drowned herself. She had been drowned — held under the water in a moment of rage by a husband she had refused on their wedding night, who had told everyone a story that the village had found easier to accept than the alternative.\n\nPiotr knew. He had found evidence and confronted his brother-in-law and been given a choice between silence and consequences. He had chosen silence out of fear and spent twenty years carrying it.\n\nThe wraith was not calling for Piotr in accusation. She was calling for him in the way the dying call for those they love — she wanted a witness, someone who had known and loved her, to finally say what had happened.\n\nGeralt explained this to Piotr in a letter exchange that took two weeks. Piotr returned to the village.\n\nWhat happened in the village after that was between the village and its legal structures and its conscience, and Geralt had left before most of it concluded. But he had stayed long enough to stand at the lake's edge on the night Piotr returned and to watch the wraith look at her brother — really look, with something that in a living face would have been recognition and relief — and then dissolve into the water's surface like breath on cold air.\n\nThe lake was quiet after that. The elder left the village three weeks later, under circumstances that the new headman described as voluntary and which Geralt took to mean the villagers had arrived at their own conclusions.\n\nHe was not paid for this contract. There had been no contract. He filed no report.\n\nHe rode east, into the grey morning, and thought for several miles about what twenty years of a single lie costs, and whether the calculation ever comes out clean."
      }
    ]
  },
  {
    id: "blood-debts",
    title: "Blood Debts",
    summary: "Two vampires with ancient grievances draw a witcher into a conflict neither will explain — and in which killing either one will start a war.",
    relatedMonsters: ["katakan", "higher-vampire"],
    chapters: [
      {
        title: "The Warning",
        content: "The message arrived through a channel Geralt associated with people who understood how witchers operated: a sealed note, no return address, specific and professional.\n\nIt read: 'A katakan named Sera has entered Beauclair. She should not be here. You should know before someone gets hurt.'\n\nThe message was signed with a blood seal he'd seen before — the mark of a higher vampire he'd dealt with two years ago in a matter he'd agreed to keep confidential. Dettlaff was old, selective about his communications, and did not send warnings about other vampires without reason.\n\nGeralt arrived in Beauclair in three days and found Sera without difficulty — she was a katakan, not a higher vampire, and katakans did not have the centuries of practice at concealment that made their superiors effectively invisible. She was also, clearly, frightened."
      },
      {
        title: "Ancient Architecture",
        content: "The grievance was two hundred years old. This was the thing about vampire conflicts: they accumulated interest at the same rate as the principals did, which was to say indefinitely.\n\nSera had killed a human two centuries ago who had been under Dettlaff's specific protection — a human he'd saved from another vampire's territory in a complicated accord that had broader implications in the vampire social structure. The killing had been accidental, in the sense that she hadn't known about the protection. The debt had been acknowledged and not paid, in the sense that two hundred years had passed and Dettlaff had neither collected it nor forgiven it.\n\nNow he knew where she was.\n\n'I came to pay it,' Sera said, with a directness that Geralt found unexpectedly straightforward. 'Not to run. But I need a intermediary who he'll trust. If I walk to him directly he'll read it as aggression.'\n\n'And you found me,' Geralt said.\n\n'You've dealt with him before. He respects the relationship.'"
      },
      {
        title: "Mediation",
        content: "Three conversations over two nights. Geralt sitting across from entities with two hundred years of accumulated grievance, trying to find the exact language that allowed a debt to be acknowledged, a payment to be accepted, and an accord to be reached without anyone's pride requiring violence.\n\nDettlaff was, as always, more human in his affect than his nature warranted. He grieved for old things with a vividness that suggested the centuries had not, in fact, dulled anything. He also had the patience of something that had watched entire dynasties rise and fall, which made him willing to take the conversation at whatever pace was needed.\n\nThe settlement took the form of a service — Sera agreed to a specific assistance with a specific problem Dettlaff had been unable to address directly due to its nature. The details were their own business.\n\nGeralt collected no fee. He had been a resource, not a contractor. This was a distinction vampires understood and most humans didn't, and which he'd learned to treat as simply a characteristic of working in certain circles.\n\n'Thank you,' Dettlaff said, on the third night. 'This was handled as I hoped it would be.'\n\n'The two of you could have handled it without me,' Geralt said.\n\n'No.' Dettlaff said this with certainty. 'We could not. There are situations that require someone who is neither party to stand in the space between, so that both parties can speak through them rather than at each other.' He paused. 'I believe this function is, historically, called witness. It is older than most institutions and more necessary.'\n\nGeralt thought about this on the ride back. He thought the vampire was probably right, and that knowing something was old and necessary and right didn't make it feel any less strange."
      }
    ]
  },
  {
    id: "the-hunger-below",
    title: "The Hunger Below",
    summary: "Miners in the Mahakam foothills break through into a cavern system that has been sealed since before the mines were dug — and release something that had been waiting.",
    relatedMonsters: ["arachas"],
    chapters: [
      {
        title: "The Breach",
        content: "The Mahakam foreman's report was succinct: twelve meters of new tunnel in section seven, a wall collapse, four men missing, no bodies recovered, work suspended.\n\nGeralt arrived at the mine entrance in the late afternoon. The surviving miners — seven of them, out of the twenty who'd been in section seven — were still at the surface, which told him the danger persisted underground. People who could safely go back for their missing colleagues did so.\n\nThe section seven access tunnel was intact for the first eight meters. The collapsed wall the foreman described was evident at ten meters — or rather, the passage through it was evident. Something had broken through from the other side. The breach was not a collapse. It was an opening, and the edges of it were coated with the distinctive organic resin that arachases used to stabilize their webbing structures."
      },
      {
        title: "The Sealed Place",
        content: "Beyond the breach was a cavern system that had no business being where it was — the surveys had not predicted a void of this scale, which meant it had either formed recently (impossible for a chamber this old) or had been deliberately excluded from the original mine surveys.\n\nThe latter, he confirmed from the mine's oldest records, was exactly what had happened. A surveyor's note from the founding of the mine, two hundred years prior: 'Void system detected, sealed by prior inhabitants, left sealed on advice of the elder consulted.'\n\nThe elder had not written down the advice. The reasoning was lost. The seal had been left alone for two centuries until a tunnel crew hit it at the wrong angle.\n\nThe arachases inside the sealed system were not a colony that had formed here — they were too old, their webbing too calcified, their egg casings in geological layers that indicated multiple generations across decades. They had been sealed in with their prey population, which had been sufficient for some time and was now, apparently, exhausted.\n\nThey were not aggressive because they were territorial. They were aggressive because they were starving."
      },
      {
        title: "The Clearance",
        content: "Four dead miners, none recoverable at this stage. Geralt confirmed this with the detachment required to make the necessary subsequent decisions, which were: how to clear the arachas population from the system, how to do it before they found the breach and emerged into the mine proper, and how to do it alone.\n\nThe answer involved significant quantities of Samum bombs, Insectoid oil, and the structural knowledge that arachases, like most prey-specialists, did not adapt well to fire in enclosed spaces — their webbing, which was their primary defensive resource, was catastrophically flammable.\n\nHe worked for six hours. The tunnel crews heard the sounds without being able to interpret them. The foreman had the wisdom to keep everyone at the surface.\n\nThe system was clear. The breach was sealable with existing mine materials. The four dead miners were, at minimum, no longer in danger of anything further.\n\nGeralt emerged from the mine at midnight, assessed his Insectoid oil reserves as critically depleted, and told the foreman what had happened with the specificity required for the official report and no more.\n\n'The survey note,' he said, as he was leaving. 'From the founding. Someone tell whoever expands the mine to look for similar notes in the historical records before they excavate new sections.'\n\nThe foreman wrote this down. Whether it was followed was out of Geralt's hands. He had given the advice. What people did with advice was their own accounting."
      }
    ]
  },
  {
    id: "ancient-pact",
    title: "Ancient Pact",
    summary: "A relict and a leshen have maintained a territorial boundary for centuries. When the leshen dies, the boundary fails — and the fiend that fills the void is bound by no old agreements.",
    relatedMonsters: ["fiend", "leshen"],
    chapters: [
      {
        title: "The Empty Territory",
        content: "The village of Grassy Hill sat exactly on the old boundary line, which was why it still existed. For three hundred years, the leshen's western territory and the fiend's eastern range had met at a marker stone on the hill's southern edge, and the village had been permitted to exist in the buffer because neither entity considered it worth a conflict.\n\nThe leshen died in early spring — not by anyone's hand, apparently simply of age, which was not something anyone had considered possible for a being of its type. Geralt learned this from a traveling merchant and made the immediate inference: if the western territory was empty, the boundary was negotiated, not geographic.\n\nHe arrived in Grassy Hill to find it had been attacked three times in a week."
      },
      {
        title: "The Fiend's Expansion",
        content: "The fiend had moved west the moment the leshen's presence dissipated — not slowly, not cautiously, but with the immediate confidence of something that had been waiting for this specific moment for a very long time.\n\nGeralt read this from the territorial signs: the fiend's scent markers were freshly placed all the way to the village's western edge, and several of them were over existing leshen marks that had not yet faded. The fiend was not simply filling a vacuum. It was making a point.\n\nThe hypnotic eye made it particularly difficult. He'd read extensively about fiend combat before taking this contract and had drilled the practical element into his preparation: never look directly at the third eye, read the creature's movements through peripheral vision, use Dimeritium bombs to disrupt the hypnotic field before engaging directly.\n\nThe theory was correct. The practice was considerably harder than the theory at every step."
      },
      {
        title: "The New Boundary",
        content: "The fight lasted from late afternoon to after dark, which was too long and left him with injuries that needed professional attention. The fiend was dead.\n\nGeralt sat at the old marker stone afterward and thought about what he'd actually solved. The territorial buffer existed because two apex relicts had negotiated it. One was dead. The other was dead by his hand.\n\nThe village was safe for now. But whatever had kept it safe — whatever elaborate arrangement of ancient territorial instinct had drawn a boundary around those particular houses — was gone. The space would fill again, with something, over some span of time he couldn't predict.\n\nHe wrote this in his report to the mayor with the specific precision required for the mayor to take it seriously: this was a temporary solution. The village would need either a permanent supernatural deterrent, which was the kind of thing mages charged enormously for, or to relocate to within a larger settlement's protection radius, or to accept that whatever settled in the empty territory next would be its own problem to solve.\n\nThe mayor thanked him, paid him, and commissioned a local sculptor to place a commemorative stone at the boundary marker.\n\nGeralt rode east. The things people commemorated when they wanted to feel that permanence had been achieved always struck him as touching, and somewhat melancholy, and entirely human in the way that perhaps only a witcher — living at the edge of what humans chose not to know about the world — could fully appreciate."
      }
    ]
  },
  {
    id: "the-mountain-pass",
    title: "The Mountain Pass",
    summary: "A diplomatic envoy traveling through the Kestrel mountains disappears. The witcher hired to find them discovers they chose the wrong route — and woke two things that should have stayed asleep.",
    relatedMonsters: ["cyclops", "wyvern"],
    chapters: [
      {
        title: "The Missing Ambassador",
        content: "Ambassador Henryk van Brugge had taken the Kestrel high pass against the explicit advice of every mountain guide in Yaruga, because the low pass added three days to his journey and he had a treaty signing to attend. His party of twelve had not been seen in two weeks.\n\nGeralt took the contract from a frantic aide who had been sent ahead specifically to hire help. He took it partly because the money was generous and partly because the high pass in early autumn was the kind of challenge that, professionally speaking, he occasionally needed to remind himself he was still capable of handling.\n\nThe first sign of the party was at the pass entrance: a horse, dead of cold, still in its harness. The second sign was a wyvern's nest site twenty meters off the path, recently disturbed, with scales and blood in a distribution that told a clear enough story about where the first members of the party had ended up."
      },
      {
        title: "Two Problems, One Pass",
        content: "The wyvern was manageable — angry from the disturbed nest, but a known quantity. Geralt dealt with it in the pass's narrow section, where its wingspan became a disadvantage, over the course of a cold and technically demanding hour.\n\nThe cyclops was unexpected. The survey maps for the Kestrel pass had not included any historical cyclops sightings, which meant either the surveys were old or the cyclops had moved in recently. Judging from the evidence of habitation — a cave system stocked with winter provisions, a pile of bones representing several seasons of hunting — it had been here for at least two years without attracting documentation.\n\nSurviving members of the ambassador's party were in the cave. Alive — cyclopes ate fresh and had apparently been managing the humans as a food reserve with a patience that Geralt found grimly practical."
      },
      {
        title: "The Ambassador's Education",
        content: "He had not come prepared for a cyclops extraction — the contract was a search and recovery, not an elimination job. He had Ogroid oil and preparation for wyvern, not for a fight in a confined space with something that weighed as much as four horses.\n\nHe did it with positioning and Quen and the specific advantage that cyclopes, despite their intelligence, have a blind spot on the right side created by their single eye's placement. He also had the ambassador and two surviving guards, who he armed with torches and instructed to stay to the cyclops's right and make noise while he worked the left.\n\nThe cyclops was not dead. It was driven out of the cave, which was a different thing. Driven animals came back.\n\n'Move now,' he told the ambassador, who had shown a remarkable ability to receive instructions clearly in crisis situations. 'Down to the low pass junction. Don't stop.'\n\nThey moved. The cyclops returned to find its cave empty and its winter provisions gone — Geralt's party had taken everything they could carry that was actually food rather than bone.\n\nThe ambassador arrived at the treaty signing four days late, which apparently fell within the diplomatic margin of error for mountain crossings. He told Geralt, at the base of the pass, that he would recommend him specifically.\n\n'Use the low pass,' Geralt said instead of thank you.\n\nThe ambassador considered this. 'Yes,' he said. 'I believe I will.'"
      }
    ]
  },
  {
    id: "silk-and-steel",
    title: "Silk and Steel",
    summary: "A Nilfgaardian noblewoman contracts a witcher to protect her from an unknown threat. The threat turns out to be something that cannot be killed — only negotiated with.",
    relatedMonsters: ["katakan"],
    chapters: [
      {
        title: "The Noblewoman's Fear",
        content: "Countess Mira Valchis paid premium rates and asked that Geralt not publicize the engagement, which was standard for clients who wanted to avoid the implication that they required supernatural protection. She told him she was being followed.\n\n'By what?' he asked.\n\n'I don't know.' She was a composed woman who had learned to manage fear as a professional liability, and the fact that she couldn't name what followed her seemed to disturb her more than the following itself. 'I know only that it has been with me for two years. That it is not human. That I have seen it twice, briefly, and that it is' — she paused — 'beautiful, in a way that things that are not quite right are sometimes beautiful.'\n\nGeralt spent three days in her household without detecting anything, which was itself informative. A monster that could be in a wealthy household for two years without casualties was a monster with extraordinary self-control."
      },
      {
        title: "The Nature of the Interest",
        content: "He found it on the fourth night, in the garden — a katakan, female, seated on a stone bench with the particular stillness of something that has been caught and is deciding how to respond.\n\n'You know what I am,' she said.\n\n'Yes.'\n\n'You came to kill me.'\n\n'I came to find out what you are and why you're here.' He didn't move toward her. 'Two years is a long time to follow someone without feeding. That's what I want to understand.'\n\nThe explanation, delivered with a precision that suggested she'd rehearsed it for exactly this eventuality, was this: Mira Valchis had, two years prior, saved the katakan's life indirectly — she'd commissioned a civic improvement to a district that had included the demolition of a building the katakan used as a daytime shelter. In the demolition, a cavity had been exposed, and Mira had ordered workers to avoid it and hire specialists to assess the 'structural anomaly' rather than simply destroying it.\n\nThe katakan had escaped the exposure with minutes to spare.\n\n'I owe her a debt,' the katakan said simply. 'I have been watching to ensure she is safe. This is what I know how to give.'"
      },
      {
        title: "An Unusual Resolution",
        content: "He brought Mira into the garden. He explained, with as little editorializing as possible, what she was dealing with and why.\n\nMira sat with this information for a long moment. Then she looked at the katakan with the expression of someone recalibrating a situation entirely.\n\n'Two years,' she said.\n\n'Yes,' the katakan said.\n\n'Have you fed?'\n\n'Sparingly. Away from here. Nothing that —' She paused. 'Nothing unforgivable.'\n\nMira looked at Geralt. 'Is this something that can be resolved?'\n\n'The debt can be acknowledged and released,' Geralt said. 'If both parties agree that the debt has been discharged.'\n\nWhat followed was the strangest negotiation Geralt had sat through in recent memory — a Nilfgaardian noblewoman and a centuries-old vampire working out the terms under which a debt of honor could be considered settled. It took two hours and arrived, eventually, at a mutual agreement that the debt was discharged and both parties were free.\n\nThe katakan left. Mira poured three glasses of wine without being asked and handed one to Geralt.\n\n'I would have liked to know it was there,' she said.\n\n'Would you?'\n\nShe considered this honestly. 'No. I suppose not.' She drank. 'What do I owe you?'\n\n'The contracted rate,' he said.\n\nShe paid the contracted rate plus a significant gratuity, and told him he would receive a personal recommendation from her whenever and to wherever he might find it useful. In Nilfgaard, personal recommendations from countesses were a currency with favorable exchange rates.\n\nHe put the letter of reference in his saddlebag and forgot about it for eighteen months, which was also typical."
      }
    ]
  },
  {
    id: "the-burning-oak",
    title: "The Burning Oak",
    summary: "A fire elemental has merged with an ancient tree in a leshen's territory. Both are now something neither was alone — and killing either one requires understanding both.",
    relatedMonsters: ["fire-elemental", "leshen"],
    chapters: [
      {
        title: "The Impossible Tree",
        content: "The tree had been burning for eleven days without consuming itself, which was impossible in the same way that fire elementals were impossible — in the technical sense that it required forces outside normal physical law.\n\nThe forest around it had not burned. This was the detail that required explanation: a fire this intense, in a dry autumn forest, should have produced a catastrophe. Instead there was a ring of undamaged trees around the burning oak, and within that ring, the fire burned contained and apparently eternal.\n\nGeralt recognized both signatures simultaneously when he walked the perimeter: the elemental's specific heat pattern, which he'd studied after the Skellige incident, and the leshen's territorial boundary markers, which he'd learned to read over years of contracts in old forests. The two were coexisting in a single organism."
      },
      {
        title: "The Merger",
        content: "His theory, assembled from available evidence, was this: the fire elemental had been summoned or had drifted into the forest and had immediately come into conflict with the leshen. The leshen, unable to destroy the elemental in direct engagement, had done something unprecedented — it had incorporated the elemental into the forest itself, using its ability to control and commune with vegetation to bind the fire into the oak's living structure.\n\nThe binding had worked. Both entities survived. The cost was that neither could act independently — the leshen was partially immobilized, committed to maintaining the binding, and the elemental was contained to the tree's structure, unable to move or grow.\n\nThey had been this way for eleven days.\n\nThe question was what happened if the binding failed — either because the leshen was destroyed or simply exhausted. The answer, based on the elemental's intensity and the eleven days of compressed energy, was that the resulting release would be significant enough to destroy several hundred meters of forest in all directions."
      },
      {
        title: "The Surgery",
        content: "He needed to extract the elemental from the binding without allowing the uncontrolled release. This required simultaneous Aard disruption of the elemental's coherence and a specific counter-ritual to the leshen's binding that would collapse the containment gradually rather than catastrophically.\n\nThe counter-ritual he adapted from memory, from a passage in a scholar's text he'd read seven years ago in Oxenfurt's restricted library, which was not an ideal foundation for a high-stakes working but was what he had.\n\nThe leshen was aware of his presence throughout. It could not stop him — it was entirely committed to the binding — but the ravens it sent were aggressive enough that he worked with one eye constantly upward. The wolves circled but did not engage; even they apparently understood that the situation required a delicacy that violence would ruin.\n\nThe elemental dispersed over forty-five minutes of sustained Aard. The binding collapsed gradually rather than catastrophically. The burning oak went dark.\n\nThe leshen, freed, regarded him for a long moment from the treeline. Geralt stood still.\n\nIt did not attack. It turned and walked into the deep forest and was gone.\n\nHe sat with the dead oak for a while, thinking about the eleven days this ancient thing had held something that could have killed the entire forest, and whether that constituted a kind of virtue, and whether applying the word 'virtue' to a leshen was a category error or a reasonable extension of the concept.\n\nHe decided it was both, and rode south."
      }
    ]
  },
  {
    id: "dead-mans-gulch",
    title: "Dead Man's Gulch",
    summary: "A haunted mountain pass has been closed for a decade. A merchant consortium needs it open. A witcher discovers the haunting is not one thing but many — the accumulated dead of a battle no one remembers.",
    relatedMonsters: ["ghoul", "specter"],
    chapters: [
      {
        title: "The Closed Pass",
        content: "The pass through the Mahakam foothills had been on trade maps for fifty years and closed for ten. The closure notice attributed it to 'structural instability,' which was the kind of official language that meant 'something terrible that we have not successfully dealt with.'\n\nThe merchant consortium that wanted it reopened had done their research: the pass was structurally sound. The problem was supernatural, which was why they'd hired a witcher.\n\nGeralt arrived at the pass entrance on a clear autumn morning and found it had been a battlefield. Not recently — ten years ago, based on the state of what the ghouls hadn't finished — but thoroughly. The battle had involved several hundred combatants and had not gone well for at least one side. The bodies had never been properly buried.\n\nGhouls were everywhere. The specters were subtler — he sensed them before he saw them, the specific pressure of multiple restless dead in close proximity, each one a knot of unresolved violence."
      },
      {
        title: "The Battle's Accounting",
        content: "He spent two days on the ghouls — systematic, section by section, working through the pass from entrance to exit. The ghoul population was dense enough to require Necrophage oil and careful management of engagement sizes; fighting more than four simultaneously in the confined pass was inadvisable.\n\nThe specters required different work. Each one was anchored to its death site — the location where it had fallen — and had to be addressed at that location with the appropriate rites. Geralt knew three different protocols for specter dissolution and applied them in order of efficiency: the simple release first, then the binding rite, then the more complex invocation that he reserved for specters that resisted the first two.\n\nHe worked through thirty-seven specters over four days. Not all of them accepted dissolution on the first attempt. Several required him to understand, approximately, what they had been — which meant reading the remains of their equipment, their military insignia, their apparent side in an engagement that had no historical record he could find."
      },
      {
        title: "The Unmarked Battle",
        content: "He pieced the story together from the evidence: a skirmish between a small defensive force and a much larger raiding party, perhaps fifteen years ago, perhaps earlier. The defensive force had lost. No one had come to bury them or mark the site, which suggested that no one with claim to the victory wanted to acknowledge it.\n\nThe last specter he dealt with was the commander of the defensive force — he knew this from the insignia and the positioning of the remains, at the highest point of the pass where a rear guard would have made a final stand. This one was clear enough in its specifics that he could reconstruct the man's last moments from the physical evidence.\n\nHe performed the release at the man's death site, using the full version of the invocation, which included an acknowledgment of the circumstances. He didn't know the man's name. He used the rank and the unit's insignia instead.\n\nThe pass was clear by the end of the fifth day.\n\nGeralt filed his report with the merchant consortium with a note attached: the pass had been closed because of a battle, and the battle should be historically documented, and the names of the dead should be researched and the site marked. This was outside his contract and outside his competence and he expected it would be ignored in favor of the reopening.\n\nHe was correct. The pass reopened. The merchants resumed trading.\n\nSomeone, eventually, found the historical record of the engagement in a regional archive. They placed a small stone marker at the pass entrance. It was not commensurate with the dead it commemorated, but it was something.\n\nGeralt never saw the marker. He had already moved on."
      }
    ]
  },
  {
    id: "the-rivers-toll",
    title: "The River's Toll",
    summary: "A peaceful town's crossing is terrorized by drowners — but the witcher who takes the job discovers the problem is not the drowners themselves but the thing that commands them.",
    relatedMonsters: ["drowner"],
    chapters: [
      {
        title: "The Missing Ferryman",
        content: "The ferryman had been the most respected man in Crayfish Crossing for thirty years. His daughter reported him missing after three days, which was two days longer than she'd waited before admitting to herself that the river had taken him the same way it had taken the others.\n\nFive disappearances in two months. The river crossing was the only ford for twenty miles, and the town could not simply stop using it. People had begun crossing at night, in groups, with torches — which was marginally better than crossing alone but had not, as the ferryman's disappearance demonstrated, achieved meaningful protection.\n\nGeralt found the first drowner signs within an hour of the ford survey: scale deposits, the characteristic wetland smell, webbed-foot prints in the mud of the eastern bank. Nothing unusual about drowners in a crossing this size.\n\nWhat was unusual was the organization. The print pattern showed coordinated behavior — multiple drowners moving in formation, which was not normal drowner pack behavior. Drowners cooperated opportunistically; they didn't execute plans."
      },
      {
        title: "The Orchestration",
        content: "He watched the ford from the western bank for two nights. The drowners emerged, seventeen of them on the first night, in a pattern that confirmed his suspicion: they were being directed. They spread across the ford in a line before any prey appeared on the bank, cutting off retreat routes before the engagement began.\n\nSomething was teaching them.\n\nOn the third night he crossed upstream and came at the nest from the back. Standard nest — geothermal opening, the biological material, the expected density of secondary occupants. But at the center of the nest was something he hadn't expected: a young water hag, too young to have established territory of her own, who had apparently found the nest and realized its potential.\n\nShe had been training them the same way her kind learned to mimic voices: through observation and repetition, applying the social intelligence that made water hags dangerous to a population that was, individually, not intelligent at all."
      },
      {
        title: "The Root of It",
        content: "Dealing with the water hag was straightforward enough — she was young, alone, and trapped in a nest that worked against her mobility when she realized she was outmatched. The drowners without her direction reverted immediately to the disorganized scavenging behavior that made them dangerous to careless individuals but manageable in confrontation.\n\nHe worked through the nest with systematic efficiency. The ferryman's remains were not recoverable, but three of the five missing could be given something approximating documentation of what had happened, which the families received with the specific gratitude of people who needed to stop wondering.\n\nThe ford was clear by morning. Geralt spent the afternoon on the eastern bank, watching the water return to its ordinary behavior — the movement of a river that was simply a river again, the ford that was simply a ford.\n\nThe town threw him a modest celebration that evening which he attended with the polite discomfort of someone who found collective gratitude harder to process than combat. He accepted the fee and a jar of preserved fish that the ferryman's daughter pressed into his hands with both of hers.\n\nHe kept the fish. He ate it three days later, on the road north, and thought it was the best he'd had in some time."
      }
    ]
  },
  {
    id: "moonbound",
    title: "Moonbound",
    summary: "A witcher tracks what seems to be a werewolf through a provincial town but finds evidence of a nightwraith following the same prey — and must understand why before the next full moon.",
    relatedMonsters: ["werewolf", "nightwraith"],
    chapters: [
      {
        title: "Two Sets of Evidence",
        content: "The tracks were wrong for one creature.\n\nGeralt had been in Glenvale for two days before he noticed it — the livestock kills had the claw pattern of a lycanthrope, the movement pattern of a stalker, but in three locations the trail simply stopped with no indication of departure. Animals did not vanish. They went somewhere, and the somewhere left evidence.\n\nThe second type of evidence was subtler: cold spots that lingered past dawn, areas where the horses refused to walk for no visible reason, a milk-seller who reported that three mornings running she'd heard a woman crying near the east pasture and found nothing when she looked.\n\nWerewolf and nightwraith. The coincidence was statistically improbable enough that he began looking for a connection."
      },
      {
        title: "The Chase Within the Chase",
        content: "The werewolf was, as these things often were, someone local. He identified her from the behavioral pattern — the three-night absences, the morning fatigue, the specific social withdrawal that people under a monthly curse developed as management strategy.\n\nHer name was Dagna, she was twenty-eight, and she had been lycanthropic for six years following a curse she couldn't explain the origin of. She had never killed a person. The livestock was a problem she understood was unsustainable but had not yet solved.\n\nThe nightwraith was hunting her.\n\nThis was the connection: the nightwraith had been attached to Dagna for two years, following her, matching her movements. It was not attacking her directly — it was, as far as Geralt could determine, waiting for something. Waiting for the moment when the werewolf self was dominant enough that the human part couldn't process what was happening.\n\nThis was a level of patience and strategic thinking beyond what he expected from a nightwraith. It was also familiar, in the way that complicated situations involving women who died badly were sometimes familiar."
      },
      {
        title: "The Old Story",
        content: "The nightwraith had been a woman who had known Dagna's family. Specifically, who had known Dagna's grandmother, and who had died — in violence, of course — in a situation that the grandmother had been peripheral to without being innocent of.\n\nThe curse on Dagna was the wraith's doing. A delayed punishment, applied to the generation most likely to carry forward the family's better qualities and therefore most worth destroying.\n\nGeralt worked through this logic with the nightwraith directly — not through combat but through the specific rite that allowed limited communication with a wraith that had not yet reached full dissolution, which required standing in a Yrden circle in the dark for an hour while the nightwraith circled outside it and demonstrated every intention of killing him if he stepped out.\n\nThe conversation was largely one-sided. The wraith communicated in images and pressure rather than language. He pieced together enough.\n\nThe curse resolution required the wraith's dissolution, which required a resolution to the original grievance that the wraith itself would accept. This was the part that took time — researching the grandmother's story, finding what resolution meant to an entity that was no longer rational but that retained emotional memory with perfect clarity.\n\nIt involved a grave. It involved a name being spoken by the right person, which was Dagna. It involved a night that was cold and difficult and that Dagna bore without complaint, which was its own kind of courage.\n\nThe wraith accepted it.\n\nDagna woke the following morning free of the lycanthropic curse as well — the wraith, in creating the curse, had bound both together, and the dissolution took both with it.\n\nShe sat in her kitchen for a long time without speaking. Geralt sat across from her and did not hurry anything.\n\n'What do I do now?' she finally said.\n\n'Whatever you would have done,' he said. 'Without the monthly problem.'\n\nShe thought about this. Then she smiled — the specific smile of someone who has been carrying a particular weight for six years and just set it down.\n\n'Make breakfast,' she said.\n\nHe accepted the breakfast, which was excellent, and rode east in the full morning light without any of the heaviness that some contracts left behind."
      }
    ]
  },
  {
    id: "the-amber-eye",
    title: "The Amber Eye",
    summary: "A scholar studying relicts hires a witcher as protection in fiend territory. The study produces unexpected results — and a moral question neither of them is equipped to answer.",
    relatedMonsters: ["fiend"],
    chapters: [
      {
        title: "The Academic Proposition",
        content: "The scholar's name was Aldric, and he wanted to observe a fiend in its natural habitat, take measurements of the hypnotic eye effect, and document territorial marking behavior. He presented this proposal to Geralt in the methodical way of someone who had rehearsed it for a skeptical audience.\n\n'You understand you could die,' Geralt said.\n\n'I understand the risk is significant. I also understand that existing fiend documentation is based entirely on combat encounters, which produces systematically biased data about their behavior.' He spread his notes on the table. 'Everything we know about fiends is how they behave when they're trying to kill someone. This tells us almost nothing about what they're actually like.'\n\nGeralt looked at the notes. They were meticulous — the best survey of existing fiend literature he'd seen. He looked at Aldric, who had the particular fearlessness of someone who had thought about the danger so much it had become abstract.\n\n'One week,' Geralt said. 'Then we leave, regardless of what you have.'"
      },
      {
        title: "The Study of a Dangerous Thing",
        content: "The fiend became aware of them on the second day, as Geralt had expected. What he had not expected was its behavior: it did not immediately engage. It circled the camp at distance, occasionally visible between the trees, the amber third eye studying them with an attention that was clearly more than territorial assessment.\n\nAldric's instruments captured the eye's radiation at safe distance — he had designed a mechanism involving mirrors that allowed him to take measurements without direct visual exposure. He worked with the focused excitement of someone whose theory was being confirmed in real time.\n\nGeralt watched the fiend watching Aldric.\n\nOn the fourth day, the fiend came closer. Geralt had the Dimeritium bomb ready. The fiend stopped at twenty meters — outside its typical engagement range — and observed them for forty minutes before retreating.\n\n'It's curious,' Aldric said, from behind his mirror apparatus.\n\n'Don't anthropomorphize.'\n\n'I'm not anthropomorphizing. It's curious in the sense that it is investigating something unfamiliar without defaulting to threat response. That's a behavioral observation, not an emotional attribution.'"
      },
      {
        title: "The Question",
        content: "On the sixth day, the fiend made contact — not aggressive contact, but a form of investigation that involved close approach and the specific kind of stillness that Geralt associated, in animals, with assessment rather than attack.\n\nAldric, behind his mirror apparatus, documented every second.\n\nThe question came afterward, on the walk back to camp. 'Everything we know about fiends is that they're dangerous to humans. I've now documented behavior that suggests they're also curious, territorial in a non-random way, and capable of something like restraint when they choose to exercise it.' Aldric paused. 'How many fiends have you killed?'\n\n'Four.'\n\n'Were they all actively attacking someone?'\n\nGeralt considered the honest answer. 'Three yes. One was a contract for preemptive territory clearance.'\n\n'Do you ever think about whether the contracts are —'\n\n'Yes,' Geralt said, which was true and was all he was going to say.\n\nThey rode out on the seventh day, as agreed. Aldric had enough data for a monograph that would, he said, change the way the scholarly community understood relicts.\n\nGeralt thought about the fiend watching them from the treeline as they left — the amber eye tracking them until they were gone — and about the four he'd killed, and about the three that had been actively killing people and the one that hadn't, and about what that accounting meant or didn't mean.\n\nHe hadn't come to a conclusion by the time he reached the next town. He suspected he wouldn't.\n\nThe question was easier to live with when you didn't examine it directly. He had learned, over years, to keep it in peripheral vision — where it couldn't catch you quite as fully in its eye."
      }
    ]
  },
  {
    id: "carapace",
    title: "Carapace",
    summary: "An endrega nest beneath a newly built road threatens to collapse it — and the only way to destroy it requires going deeper than any survey has documented.",
    relatedMonsters: ["arachas", "endrega-warrior"],
    chapters: [
      {
        title: "The Engineering Problem",
        content: "The road engineer's report was precise and honest: twenty meters of new road over a subsurface cavity of unknown depth, with structural integrity declining at approximately two percent per week. At current rate, collapse in twelve to fifteen weeks — less if a loaded cargo wagon crossed the weak section.\n\nThe Mahakam engineering bureau sent a copy of the report to the witcher network with a contract attached. The contract was specific: assess and neutralize whatever was creating the cavity, preserve road integrity where possible.\n\nGeralt assessed the surface signs first. The soil subsidence pattern was organic — not water erosion, not geological settling. Something beneath the road was moving material, creating space. The Insectoid organic smell was faint at the surface but present.\n\nThe question was depth. The engineering survey had reached three meters before the probe met resistance that wasn't geological."
      },
      {
        title: "The Layered Colony",
        content: "He descended through the access shaft the engineers had drilled with the specific preparation of someone who had read everything available on arachas and endrega cohabitation and found exactly two useful pages.\n\nThe colony extended in layers: endrega workers at the five to eight meter level, engaged in the tunneling that was causing the surface problem. Warriors at the eight to twelve meter level, the defensive perimeter. And deeper, in a section his survey lamp reached only partially, the web-structure that indicated an arachas presence.\n\nThe two species were not competing. They were coexisting in a division of labor that Geralt found architecturally fascinating and practically catastrophic: the endrega dug, the arachas maintained the structural stability of the deeper chambers using web reinforcement, and the combined colony was significantly more capable than either species would be alone.\n\nThis was not documented behavior. He made careful notes while simultaneously deciding that documenting it was secondary to dealing with it."
      },
      {
        title: "The Demolition",
        content: "Destroying a hybrid colony of this type required two things simultaneously: disruption of the web structures that held the deeper chambers stable, and fire in the upper tunnels to prevent the warrior response from reaching him while he worked below.\n\nHe set the Samum bombs on a delay mechanism — improvised, using components he'd collected specifically for problems requiring him to be in two places. The Igni work in the upper tunnels he did himself, moving fast through familiar geometry.\n\nThe collapse was controlled: the chambers fell inward rather than outward, the road above settling by centimeters rather than giving way. Not elegant, but sufficient.\n\nGeralt emerged from the access shaft with burns on his left arm and a comprehensive understanding of why documentation on arachas-endrega cohabitation was sparse.\n\nThe engineering team assessed the road above. Minor settling, structurally sound with a repair to the surface layer. They shook his hand and offered a bonus for the preservation work.\n\nHe wrote up the cohabitation behavior in a report for the witcher network with the recommendation that it be forwarded to any relevant academic institutions. He never found out if it reached them.\n\nThe road continued to carry cargo across the Mahakam foothills. The colony beneath it was gone. Beneath it, in the recovered space, seasonal water began to move through the chambers, gradually returning the ground to the state it had been in before something had chosen it for a home.\n\nThis was how most things ended: not with resolution but with replacement, the world filling in behind what had been removed with whatever was available, without ceremony or particular meaning.\n\nGeralt was already three miles east by the time the engineers finished their repair work. The road was open. The next delivery would be on time.\n\nThat was enough."
      }
    ]
  },
];

export function getStory(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

export function getRelatedStories(storyId: string, count: number = 3): Story[] {
  const others = STORIES.filter((s) => s.id !== storyId);
  const shuffled = [...others].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
