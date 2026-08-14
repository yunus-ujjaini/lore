# Feature 4 — Stories & Story Reader

## 1. Purpose

Create the final core V1 feature for the Witcher-inspired Bestiary website.

This feature provides a dedicated story experience where users can discover stories, open a story, read short or long-form narrative content, and explore the monsters associated with that story.

The feature also evolves the existing story data model from a single `content` string into an ordered `sections` structure so stories can grow naturally without requiring another data-model redesign later.

The experience should feel like reading an illustrated dark-fantasy tale rather than a standard blog post or documentation page.

## 2. Scope

This feature includes:

- Stories landing page
- Story cards
- Story detail / reader page
- Story hero
- Story title
- Story summary
- Story image
- Long-form story content
- Ordered story sections
- Related monsters
- Navigation between stories and monsters
- Responsive design
- Cinematic visual presentation
- Story animations
- Accessibility support
- Migration of existing stories to the new schema

## 3. Existing Story Model

The current story model is:

```ts
{
  id,
  title,
  summary,
  content,
  monsterIds,
  image
}
```

The current `content` field contains a single narrative text body.

This is sufficient for short stories but becomes difficult to manage when stories become longer.

## 4. Updated Story Model

The story model must be changed so narrative content is represented as ordered sections.

Conceptual structure:

```ts
{
  id: string,
  title: string,
  summary: string,
  image: string,
  monsterIds: string[],

  sections: [
    {
      id: string,
      title: string,
      content: string
    }
  ]
}
```

Each section must have:

- Unique section ID within the story
- Title
- Narrative content

A story may contain one section for a short story or multiple sections for a longer story.

The same Story Reader must support both.

## 5. Story Schema Migration

Existing stories must be migrated from:

```ts
content: '...'
```

to:

```ts
sections: [
  {
    id: '...',
    title: '...',
    content: '...'
  }
]
```

The migration must preserve the existing story meaning and content.

A short existing story may initially become a single section.

## 6. Stories Landing Page

The Stories page should provide an attractive way to discover available stories.

It must contain:

- Page title
- Short introductory text
- Collection of story cards

The page must automatically support additional stories added to the data.

## 7. Story Cards

Each story card should display:

- Story image
- Story title
- Summary
- Associated monster information where useful

Story cards should feel consistent with the Bestiary and Monster Details visual language.

They should be:

- Illustrated
- Atmospheric
- Premium
- Interactive
- Slightly whimsical

Possible interactions include:

- Image zoom
- Subtle card movement
- Decorative animation
- Reveal of additional information
- Smooth hover transition

Avoid a generic blog-card appearance.

## 8. Story Navigation

Selecting a story must navigate to a unique story route.

Example:

```text
/stories/striga-of-maribor
```

The route must use the story ID.

## 9. Story Hero

The Story Reader must begin with a visually strong hero section.

The hero must contain:

- Story title
- Summary
- Story image

The image should be a large landscape composition.

The hero should immediately establish the atmosphere of the story before the user begins reading.

## 10. Story Artwork

Story artwork must follow the visual direction established by the rest of the website.

Images should be:

- Landscape
- Cinematic
- Dark-fantasy inspired
- Painterly/illustrated
- Atmospheric
- Consistent with Monster Details artwork

Preferred composition:

- 16:9 landscape
- Strong environmental storytelling
- Clear focal subject
- Foreground, middle-ground, and background depth
- Useful negative space for text overlays where appropriate

Current placeholder or solid-color images must continue to render correctly.

Replacing placeholder artwork later must not require changes to the Story Reader architecture.

## 11. Story Reader

The Story Reader must present the story as a comfortable long-form reading experience.

The reader must display:

- Story title
- Summary
- Hero image
- Ordered story sections

Each section must display:

- Section title
- Section content

Sections must appear in the same order as defined in the story data.

The reader must support:

- Short story: one section
- Long story: multiple sections

without requiring different page implementations.

## 12. Long-Form Content

The `content` inside each section may contain short or long-form narrative text.

The Story Reader must support content significantly longer than the current sample stories.

The layout should provide:

- Comfortable reading width
- Appropriate line length
- Readable typography
- Generous paragraph spacing
- Clear section separation
- Good vertical rhythm
- Sufficient whitespace

The reader should not require a separate CMS or publishing system.

## 13. Story Animation

Animation should be a fundamental part of the experience.

Possible behaviors include:

- Hero image entrance animation
- Title reveal
- Slow image zoom
- Subtle parallax
- Section reveal on scroll
- Decorative foliage or particles
- Atmospheric fog
- Smooth section transitions
- Animated ornamental elements
- Subtle image transitions

Animations should enhance the narrative atmosphere rather than distract from reading.

Reduced-motion preferences must be respected.

## 14. Visual Language

The Stories feature must inherit the visual language established by:

- Bestiary Explorer
- Monster Details

The visual system should maintain:

- Deep forest-green and muted charcoal backgrounds
- Warm parchment/cream content surfaces
- Restrained gold/earth accents
- Established typography
- Established border and ornamental treatment
- Established button and navigation styles
- Established animation language

The exact visual values should come from the established application design system.

Do not introduce an unrelated visual theme.

## 15. Story Personality

The experience should feel:

- Mysterious
- Atmospheric
- Cinematic
- Elegant
- Slightly playful
- Immersive

Personality should come primarily from:

- Artwork
- Composition
- Typography
- Motion
- Transitions
- Decorative details

Do not rely primarily on jokes or humorous copy.

The page should feel like an illustrated fantasy tale brought to life.

## 16. Related Monsters

The story must display the monsters associated with it using the existing `monsterIds` relationship.

Example:

```ts
monsterIds: ['striga', 'griffin']
```

The page must resolve these IDs against the existing monster data.

Each related monster should provide enough information to identify it, such as:

- Image
- Name
- Category
- Threat level

Selecting a related monster must navigate to:

```text
/bestiary/:id
```

This creates a two-way discovery flow:

```text
Monster
   ↕
Story
```

## 17. Back Navigation

The Story Reader must provide clear navigation back to the Stories page.

Navigation to related monsters must also be available.

Navigation controls must follow the established visual design.

## 18. Missing Story

If a requested story ID does not exist, the application must display a clear not-found state.

Example:

```text
This tale could not be found.
```

The user must be able to return to the Stories page.

The application must not crash.

## 19. Invalid or Empty Sections

The application should handle malformed story data safely.

If a story contains:

- Missing section title
- Empty section content
- Invalid section ID

the application should fail gracefully or report the invalid content through validation rather than rendering a broken reader.

## 20. Data-Driven Requirement

The Stories feature must be completely driven by the story data.

Adding a new story should normally require only content data changes.

Adding a new story must not require:

- A new React page
- New story-specific routing logic
- Hardcoded story content in components
- New story-specific UI components

unless future requirements introduce genuinely different story behavior.

## 21. Content Validation

Basic validation must ensure:

- Every story has a unique ID.
- Every story has a title.
- Every story has a summary.
- Every story has an image reference where expected.
- Every story has one or more sections.
- Every section has a unique ID within its story.
- Every section has a title.
- Every section has content.
- Every referenced monster ID exists.

Invalid story data should be reported clearly.

## 22. Responsive Design

The Stories landing page and Story Reader must work on:

- Desktop
- Tablet
- Mobile

The mobile experience should retain the same visual identity rather than becoming a compressed desktop layout.

Story text must remain comfortable to read.

Landscape artwork must adapt correctly to smaller screens.

No horizontal scrolling should be required.

## 23. Accessibility

The feature must provide:

- Keyboard-accessible controls
- Visible focus states
- Semantic headings
- Meaningful image alternative text
- Sufficient contrast
- Accessible navigation
- Reduced-motion behavior

Animations must not interfere with reading or navigation.

## 24. Initial Story Dataset

The existing stories should be migrated to the new section-based model.

The initial dataset should contain enough stories to exercise:

- One-section stories
- Multi-section stories
- Stories referencing one monster
- Stories referencing multiple monsters
- Different image compositions
- Short and long content

The dataset does not need to be large for the initial implementation.

## 25. Playwright Scenarios

At minimum, E2E tests should cover:

### Stories Page
- Open the Stories page.
- Verify story cards are displayed.

### Open Story
- Select a story.
- Verify navigation to `/stories/:id`.
- Verify the story title is visible.

### Story Content
- Verify summary is visible.
- Verify hero image is rendered.
- Verify section titles are visible.
- Verify section content is visible.
- Verify multiple sections appear in the correct order.

### Related Monsters
- Open a story with associated monsters.
- Verify the monsters are displayed.
- Select a related monster.
- Verify navigation to the Monster Details page.

### Back Navigation
- Return from the Story Reader to the Stories page.

### Missing Story
- Open an invalid story ID.
- Verify the not-found state.
- Verify return navigation works.

### Responsive Behavior
- Verify the Stories page and Story Reader at supported desktop and mobile viewport sizes.

## 26. Out of Scope

Do not implement:

- User-generated stories
- Story editing
- Story CMS
- User accounts
- Comments
- Likes
- Favorites
- Reading progress tracking
- Audio narration
- Backend
- Database
- AI story generation
- Publishing workflow
- Advanced story search
- Story recommendations
- Complex character/location metadata

These can be considered in future features.

## 27. Acceptance Criteria

The feature is complete when:

1. A Stories page is available.
2. Existing stories are migrated to the section-based schema.
3. Stories can contain one or multiple ordered sections.
4. Story cards are displayed using reusable components.
5. A story can be opened using its unique ID.
6. The Story Reader displays title, summary, hero image, and section content.
7. Short and long-form stories work with the same reader.
8. Section order matches the order in the data.
9. Related monsters are displayed.
10. Related monsters link to their Monster Details pages.
11. The user can navigate back to the Stories page.
12. Missing stories produce a usable not-found state.
13. Invalid content does not crash the application.
14. Placeholder images do not break the layout.
15. Story artwork follows the established 16:9 visual direction.
16. The page maintains the established Bestiary visual language.
17. Meaningful cinematic animations are implemented.
18. Reduced-motion behavior is supported.
19. The experience works on desktop and mobile.
20. Accessibility requirements are satisfied.
21. Playwright tests cover the important user journeys.
22. Existing Bestiary and Monster Details functionality remains intact.

## 28. Definition of Done

The feature is complete when:

- Story schema migration is complete.
- Existing stories have been migrated successfully.
- The Stories page works.
- The Story Reader works for short and long-form stories.
- Ordered sections render correctly.
- Related monster navigation works.
- Responsive behavior works.
- Story artwork follows the established visual direction.
- Cinematic animations are implemented.
- Accessibility requirements are satisfied.
- Playwright tests pass.
- No existing application functionality is broken.
- Important schema, design, and implementation decisions are recorded in the project Wiki.

## 29. Future Story Evolution

The section-based schema is intentionally simple but extensible.

Future versions may add:

- Additional illustrations between sections
- Rich text/Markdown content
- Story types
- Sources
- Authors
- Reading time
- Chapter navigation
- Audio narration
- User-generated stories

The current feature must not implement these capabilities prematurely.
