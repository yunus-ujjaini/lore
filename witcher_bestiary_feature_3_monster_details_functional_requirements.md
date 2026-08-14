# Feature 3 — Monster Details

## 1. Purpose

Create the Monster Details page for the Witcher-inspired Bestiary website.

The page should allow users to select a monster from the Bestiary and explore its information in a more immersive and cinematic experience.

The page must continue the visual language established by the Bestiary Explorer while allowing the Monster Details experience to become more dramatic and atmospheric.

---

## 2. Scope

This feature includes:

- Monster details route
- Large monster hero section
- Monster name
- Monster category
- Threat level
- Monster description
- Back navigation to the Bestiary
- Related stories
- Responsive layout
- Cinematic animations and transitions
- Missing-monster state
- Accessibility support

---

## 3. Existing Monster Data

The page must consume the existing monster data from the Content Foundation.

Current monster structure:

```ts
{
  id: 'leshen',
  name: 'Leshen',
  category: 'Relicts',
  threatLevel: 5,
  description:
    'An ancient creature associated with forests...',
  image: 'leshen.png',
}
```

The implementation must not duplicate monster information inside the page.

The page should automatically work for additional monsters added to the content data.

---

## 4. Route

Each monster must have its own route based on its unique ID.

Example:

```text
/bestiary/leshen
/bestiary/griffin
```

The route should load the corresponding monster from the existing monster data.

---

## 5. Monster Hero

The top section of the page should be visually dominant.

It must display:

- Monster name
- Category
- Threat level
- Description
- Monster image
- Back navigation to the Bestiary

The monster image should have enough visual space to become the main focal point of the page.

The hero should feel more cinematic than the Bestiary Explorer.

---

## 6. Hero Interaction and Animation

The Monster Details hero should use meaningful motion.

Possible behaviors include:

- Slow image zoom
- Subtle parallax movement
- Text reveal
- Fade/slide entrance
- Floating decorative elements
- Atmospheric fog or particles
- Subtle movement of ornamental elements
- Scroll-based transition into the information section

Animations should feel elegant and immersive rather than flashy.

The page should feel alive when viewed without requiring the user to interact with it.

Animations must respect reduced-motion preferences.

---

## 7. Visual Design

The Monster Details page must inherit the visual language established by the Bestiary Explorer.

The visual system should remain consistent in:

- Background colors
- Typography
- Accent colors
- Borders
- Decorative elements
- Threat-level presentation
- Button styling
- Spacing
- Card treatment
- Animation language

The established visual palette should continue to use:

- Dark forest-green
- Muted charcoal/dark green
- Warm parchment/cream surfaces
- Restrained gold/earth accents

The exact values should follow the existing application's design system rather than introducing a completely new palette.

---

## 8. Visual Character

The Monster Details page should feel like opening an illustrated page from a mysterious monster field guide.

It should be:

- Dark
- Atmospheric
- Premium
- Illustrated
- Slightly whimsical
- Cinematic
- Immersive

It should not feel like:

- A dashboard
- A database record
- A generic product-details page
- A plain wiki article

The design should prioritize large imagery, whitespace, typography, and visual storytelling.

---

## 9. Monster Information Section

Below the hero, display the monster's available description in a dedicated information section.

The section should visually contrast with the hero while remaining part of the same design system.

A warm parchment/cream section may be used to create the feeling of turning to another page of an illustrated field guide.

The existing monster description must be displayed without duplicating it in another data source.

---

## 10. Threat Level

The existing numeric threat level must be displayed in a visually expressive way.

The underlying value remains:

```text
1–5
```

The presentation may use:

- Symbols
- Stars
- Runes
- Marks
- Illustrated indicators

The exact visual representation should follow the application's established design language.

---

## 11. Related Stories

The page should display stories associated with the current monster.

A story is related when the monster ID appears in its `monsterIds` array.

For example:

```ts
{
  id: 'the-giant-of-the-pass',
  title: 'The Giant of the Pass',
  monsterIds: ['griffin', 'leshen']
}
```

The story should therefore be available on both the Griffin and Leshen detail pages.

Each related story should display:

- Story title
- Summary
- Story image where available

Selecting a story may navigate to its story page.

The full story reader is outside the scope of this feature unless already implemented.

---

## 12. Navigation

The page must provide a clear way to return to the Bestiary.

Example:

```text
← Back to Bestiary
```

Navigation should feel integrated with the visual design rather than appearing as a generic browser-style control.

---

## 13. Missing Monster

If the requested monster ID does not exist, the application must display a clear not-found state.

Example:

```text
This creature could not be found in the Bestiary.
```

The user must be able to return to the Bestiary.

The application must not crash when an invalid monster ID is requested.

---

## 14. Image Handling

Current monster images may be placeholder or solid-color images.

The page must work correctly with these current images.

The image area should be designed so that real artwork can be introduced later without requiring changes to the page architecture.

The implementation must not depend on a specific image dimension.

---

## 15. Responsive Design

The Monster Details page must work across:

- Desktop
- Tablet
- Mobile

The mobile layout should remain immersive rather than simply shrinking the desktop layout.

The hero should adapt its composition for smaller screens.

Text must remain readable and important information must remain easy to discover.

No horizontal scrolling should be required.

---

## 16. Accessibility

The page must provide:

- Keyboard-accessible navigation
- Visible focus states
- Meaningful alternative text for meaningful images
- Appropriate semantic headings
- Sufficient contrast
- Reduced-motion behavior

Animations must never prevent users from accessing the content.

---

## 17. Data-Driven Requirement

The page must be completely driven by the existing monster data.

Adding a new monster should automatically allow the same Monster Details page to display it.

A new monster must not require:

- A new React page
- A new component
- New hardcoded content
- New routing logic

unless a future requirement introduces genuinely different behavior.

---

## 18. Existing Data Limitations

The current monster model contains only:

- ID
- Name
- Category
- Threat level
- Description
- Image

Do not introduce new monster attributes such as:

- Abilities
- Weaknesses
- Habitat
- Combat information
- Loot
- Oils
- Bombs
- Potions

as required fields in this feature.

Those can be introduced in a future content-model change when there is a clear product requirement.

---

## 19. Playwright Scenarios

At minimum, E2E coverage should verify:

### Open Monster

- Open the Bestiary.
- Select a monster.
- Verify navigation to `/bestiary/:id`.
- Verify monster name and category are visible.

### Monster Information

- Verify threat level is visible.
- Verify description is visible.
- Verify monster image is rendered.

### Back Navigation

- Select "Back to Bestiary".
- Verify the Bestiary page is displayed.

### Related Story

- Open a monster that is referenced by a story.
- Verify the related story appears.

### Missing Monster

- Navigate to an invalid monster ID.
- Verify the not-found state.
- Verify the user can return to the Bestiary.

### Responsive

- Verify the page renders correctly at supported desktop and mobile viewport sizes.

---

## 20. Out of Scope

Do not implement:

- Full story reader
- Monster editing
- User accounts
- Favorites
- Comments
- Interactive map
- Backend
- Database
- Advanced monster statistics
- Combat simulator
- AI-generated content
- Full production artwork

These belong to future features.

---

## 21. Acceptance Criteria

The feature is complete when:

1. A monster can be opened from the Bestiary.
2. A unique route exists for each monster.
3. The hero displays the monster image, name, category, threat level, and description.
4. The page follows the existing Bestiary visual language.
5. The hero is more cinematic and immersive than the Bestiary Explorer.
6. Meaningful animations are implemented.
7. Reduced-motion behavior is supported.
8. Related stories are displayed when the current monster is referenced by them.
9. The user can return to the Bestiary.
10. Invalid monster IDs produce a usable not-found state.
11. Placeholder images work correctly.
12. The page is responsive.
13. The page is accessible.
14. The implementation remains data-driven.
15. Playwright tests cover the important user journeys.

---

## 22. Definition of Done

The feature is complete when:

- The approved wireframe is implemented.
- Monster detail pages work for the existing content dataset.
- Hero and page animations are implemented.
- Related stories work using the existing story data.
- Responsive behavior works.
- Accessibility requirements are satisfied.
- Playwright tests pass.
- No existing Bestiary functionality is broken.
- The implementation preserves the established visual identity.
- Important design and implementation decisions are recorded in the project Wiki.
