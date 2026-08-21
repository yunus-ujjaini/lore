# Feature 4 — Story Details Experience Enhancements

## 1. Purpose

Enhance the existing Story Details page so it feels like a premium, cinematic dark-fantasy reading experience.

The existing story data model and section structure are already implemented and must remain unchanged.

This feature focuses only on improving the **presentation, readability, interaction, animation, and navigation experience** of the existing Story Details page.

Image generation is outside the scope of this feature. The page should consume the existing story image paths.

---

## 2. Existing Story Data

The Story Details page already receives story data containing:

```ts
{
  id: string;
  title: string;
  summary: string;
  image: string;
  monsterIds: string[];
  sections: {
    id: string;
    title: string;
    content: string;
  }[];
}
```

This feature must not change the schema.

The existing section structure must continue to be used.

---

# 3. Cinematic Hero Enhancement

The existing story hero should become the visual introduction to the story.

The hero must:

- Use the existing story image as the dominant visual.
- Occupy a substantial portion of the initial viewport.
- Display the story title prominently.
- Display the story summary as supporting text.
- Use an atmospheric overlay/gradient to preserve text readability.
- Maintain strong visual focus on the artwork.
- Work correctly with the existing placeholder images.

### Hero Animation

The hero should support subtle cinematic motion:

- Image slow zoom.
- Subtle parallax.
- Title reveal.
- Summary reveal.
- Decorative element entrance.
- Smooth transition into the reading area.

The animation should be slow and atmospheric rather than flashy.

---

# 4. Story Title Treatment

The title should feel like the title of an illustrated fantasy tale rather than a normal webpage heading.

Use:

- Strong display typography.
- Clear hierarchy between title and summary.
- Generous spacing.
- Subtle entrance animation.
- Optional small eyebrow/label such as `TALE`, `FIELD NOTE`, or equivalent established Lore terminology.

Do not introduce a completely new typography system.

---

# 5. Reading Experience

The story body should be optimized for long-form reading.

The existing content must remain the same unless separately edited as content.

The reading experience should provide:

- Comfortable reading width.
- Larger, highly readable body typography.
- Generous line height.
- Clear paragraph spacing.
- Strong contrast.
- Generous vertical whitespace.
- Clear separation between sections.

The page must not present a long story as a dense wall of text.

The reading column should be centered and constrained to a comfortable maximum width.

---

# 6. Reading Surface

The Story Details page should not use one flat background for the entire experience.

Use visual layering consistent with the Lore design language.

Suggested structure:

```text
Dark atmospheric hero
        ↓
Warm / lighter reading surface
        ↓
Section transition
        ↓
Reading surface
        ↓
Dark story ending
```

The exact colors must remain consistent with the existing Lore palette:

- Deep forest green
- Muted charcoal
- Warm parchment/cream
- Restrained gold/earth accents

Avoid introducing a completely new color theme.

---

# 7. Section Presentation

The existing story sections must remain the primary narrative structure.

Each section should have strong visual hierarchy.

Each section should display:

- Section title.
- Section content.

Additionally, the presentation may include:

- Section number.
- Decorative divider.
- Small fantasy ornament.
- Increased top/bottom spacing.
- Subtle entrance animation.

Sections should feel like deliberate movements in a story rather than ordinary article headings.

---

# 8. Opening Paragraph Treatment

The first paragraph of each story, or optionally the first paragraph of each major section, may receive a subtle editorial treatment.

Possible treatments include:

- Slightly larger opening text.
- Drop cap.
- Slightly brighter text.
- Increased spacing above and below.

The effect should remain restrained and must not harm readability.

---

# 9. Reading Progress

The Story Details page should provide a lightweight reading-progress indicator.

Possible implementations include:

- Thin progress bar at the top.
- Subtle vertical progress line.
- Section progress indicator.
- Another unobtrusive indicator consistent with the Lore visual language.

Requirements:

- Progress should update as the user scrolls.
- It should not obscure story content.
- It should remain subtle.
- On mobile, the indicator should be simplified.

---

# 10. Scroll Experience

The page should feel continuous and cinematic while the user reads.

Use subtle scroll-based behavior for:

- Hero image movement.
- Section entrance.
- Decorative elements.
- Progress indicator.
- Background transitions.

Avoid excessive animation.

The user should remain focused on the story.

---

# 11. Ambient Animation

Where appropriate, add very subtle atmospheric motion such as:

- Fog.
- Dust.
- Small particles.
- Faint light movement.
- Slow decorative movement.

Ambient animation should be barely noticeable and should reinforce the fantasy atmosphere.

Do not make the page visually noisy.

---

# 12. Story Section Transitions

Transitions between sections should create visual breathing room.

Possible treatments:

```text
Section content
      ↓
ornamental divider
      ↓
section number
      ↓
next title
      ↓
next section
```

Transitions may also use a subtle surface or background shift.

Avoid abrupt jumps between very long sections.

---

# 13. Story Ending

The page must have a deliberate visual ending.

After the final section, provide:

- A subtle ending marker such as `THE END` or an equivalent visual treatment.
- Ornamental divider.
- Closing whitespace.

Do not leave a large unexplained empty area after the final paragraph.

---

# 14. Related Monsters

Use the existing `monsterIds` relationship.

At the end of the story, display the monsters associated with the story.

For example:

```ts
monsterIds: ['alghoul', 'wraith']
```

The related-monster area should contain:

- Monster image where available.
- Monster name.
- Category.
- Threat level.

Each related monster must link to its existing Monster Details page.

This section should visually feel like a natural continuation of the story rather than an unrelated footer.

---

# 15. Continue Exploring

At the end of the story, provide a clear continuation path.

The page should offer:

- Return to Stories.
- Continue exploring the Bestiary.
- Optionally open another story.

Where a next story is available, a visually prominent `Next Tale` or equivalent action may be shown.

The end of the story should therefore feel like:

```text
Story ends
   ↓
Related monsters
   ↓
Next tale / continue exploring
```

rather than:

```text
Story ends
   ↓
Large empty page
```

---

# 16. Responsive Experience

The enhanced Story Details page must work on:

- Desktop.
- Tablet.
- Mobile.

Mobile must preserve the same visual identity rather than simply shrinking the desktop page.

Mobile requirements:

- Hero remains visually impactful.
- Title remains readable.
- Story text remains comfortable to read.
- Section spacing remains generous.
- Progress indicator becomes simpler.
- Decorative animation is reduced where appropriate.
- Related monsters remain easy to navigate.

No horizontal scrolling should be required.

---

# 17. Accessibility

The Story Details page must support:

- Keyboard navigation.
- Visible focus states.
- Semantic heading hierarchy.
- Meaningful image alternative text.
- Sufficient contrast.
- Accessible navigation.
- Reduced-motion preferences.

Animations must not be required to understand or navigate the story.

---

# 18. Image Handling

Image generation is not part of this feature.

The page must use the existing story `image` value.

The implementation must:

- Render the supplied image correctly.
- Support current placeholder/solid-color images.
- Preserve layout if image dimensions vary.
- Use a stable hero aspect/composition.
- Avoid breaking when the final artwork is replaced later.

The feature must not introduce an image-generation pipeline.

---

# 19. Visual Consistency

The Story Details page must extend the established Lore visual language.

It must remain consistent with the existing:

- Bestiary Explorer.
- Monster Details page.
- Colors.
- Typography.
- Button styling.
- Ornamental language.
- Navigation patterns.
- Animation principles.

The Story Details page may be more cinematic than other pages, but it must still feel like the same product.

It must not look like a generic blog, article reader, dashboard, or documentation site.

---

# 20. Performance

Animations and visual effects must remain performance-conscious.

Requirements:

- Avoid unnecessary continuous animations.
- Prefer lightweight transforms and opacity transitions.
- Avoid expensive effects on large portions of the page.
- Preserve smooth scrolling.
- Avoid loading unnecessary assets.
- Do not allow decorative effects to dominate CPU/GPU usage.

Reduced-motion users should receive a simpler experience.

---

# 21. Playwright Scenarios

At minimum, add or maintain E2E coverage for:

### Open story

- Open a story.
- Verify hero image, title, and summary.

### Read story

- Verify section titles appear.
- Verify section content appears.
- Verify multiple sections appear in the correct order.

### Reading progress

- Scroll through the page.
- Verify the reading-progress indicator updates.

### Related monsters

- Verify related monsters appear.
- Click a related monster.
- Verify navigation to the Monster Details page.

### End of story

- Scroll to the end.
- Verify the ending treatment appears.
- Verify continuation/navigation options appear.

### Responsive

- Verify desktop layout.
- Verify mobile layout.
- Verify no horizontal overflow.

### Accessibility

- Verify keyboard navigation for interactive controls.
- Verify important images have meaningful alternative text.

---

# 22. Visual Acceptance Criteria

The feature is not complete based only on functional correctness.

The Story Details page must also satisfy:

- The hero feels cinematic rather than like a shallow banner.
- The story is comfortable to read.
- Body text is not excessively small.
- Long sections do not look like walls of text.
- Sections have clear visual hierarchy.
- The page has intentional visual rhythm.
- There is no large unexplained empty region after the story.
- Animations enhance the story without distracting from reading.
- Related monsters feel integrated into the experience.
- The final navigation feels like part of the story experience.
- The page belongs to the established Lore visual universe.

---

# 23. Out of Scope

This feature does not include:

- Changes to the story data schema.
- Creation of new story sections.
- Story content generation.
- Story editing tools.
- Image generation.
- Image-generation automation.
- New monster data fields.
- User accounts.
- Favorites.
- Comments.
- Backend.
- Database.
- Audio narration.
- AI story generation.

---

# 24. Acceptance Criteria

The feature is complete when:

1. The existing Story Details page is visually enhanced.
2. The existing story schema remains unchanged.
3. The existing sections are displayed without changing their data structure.
4. The hero becomes a strong cinematic introduction.
5. Story typography is comfortable for long-form reading.
6. Story sections have strong visual hierarchy.
7. Section transitions provide visual breathing room.
8. Reading progress is available.
9. Scroll-based and ambient animation are implemented appropriately.
10. Reduced-motion behavior is supported.
11. Related monsters are displayed and linked.
12. The story ending has deliberate visual treatment.
13. Continue-exploring/navigation options are available.
14. Placeholder and final story images both work correctly.
15. The page remains responsive.
16. Accessibility requirements are satisfied.
17. Playwright tests pass.
18. Existing Bestiary, Monster Details, and story functionality remains intact.

---

# 25. Definition of Done

The Story Details page is considered complete when:

- The current story content and section structure continue to work.
- The hero is cinematic.
- The reading experience is comfortable.
- Sections are visually distinct.
- Progress and scroll behavior work.
- Animations are smooth and purposeful.
- Related monsters work.
- The ending and continuation navigation work.
- Mobile remains usable and visually consistent.
- Accessibility requirements pass.
- Playwright tests pass.
- No image-generation work is required as part of this feature.
