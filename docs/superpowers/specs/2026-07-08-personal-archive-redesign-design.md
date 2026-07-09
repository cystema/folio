# Personal Archive Redesign Design

## Context

This site is hosted on Vercel and should stay on Next.js for now. The current site reads like an old portfolio with separate Projects, Design, and Tools surfaces. That no longer matches the desired positioning.

The redesign should present Shubham Mazumder as a serious, high-agency engineer building production AI systems. The primary audiences are hiring managers, founders, and technical peers. They should quickly understand that Shubham works on real AI systems beyond demos, and that he has the judgment and execution taste to be worth talking to.

The saved design context is in `.impeccable.md`.

## Direction

The site becomes a dark-only personal archive with notes infrastructure.

The chosen visual direction is Personal Archive / Charcoal Paper:

- Warm near-black background.
- Parchment-toned foreground text.
- Thin muted dividers.
- Quiet two-column archive structure.
- No neon, gradients, glass, glows, project cards, tech-stack grids, or generic AI/SaaS landing-page motifs.

The page should feel indexed, restrained, and text-first. It should not feel like a marketing hero or a developer portfolio.

Anti-slop guardrails:

- No large centered headline.
- No CTA button row.
- No metrics strip.
- No gradient text.
- No glowing borders.
- No generic "selected projects" card grid.
- No repeated icon-plus-heading feature blocks.

## Information Architecture

Public routes:

- `/` - main archive page.
- `/notes` - notes index.
- `/notes/[slug]` - individual note pages once content exists.
- `/rss.xml` - RSS feed generated from published notes.

Legacy routes:

- `/projects` redirects to `/`.
- `/design` redirects to `/`.
- `/tools` redirects to `/`.

Removed from the primary experience:

- Projects navigation.
- Design navigation.
- Tools navigation.
- Tech-stack grid.
- Project-card grid.
- Command palette.
- Home-page state switching between pseudo-pages.

## Homepage

The first viewport is a masthead, not a hero.

Desktop layout:

- Left rail:
  - Small FaceTracker signature, 64-80px.
  - Name: `Shubham Mazumder`.
  - Role/domain labels: product engineering, production AI systems.
  - Links: Email, GitHub, LinkedIn, RSS.
- Main column:
  - Thesis: `Founding engineer focused on the operational layer of AI products.`
  - Supporting copy: `I work on the services, checks, boundaries, and feedback loops that make agentic systems reliable after the demo.`
  - Field Notes section.

The masthead should fit within the first viewport on common desktop sizes, but it should not vertically center like a landing page. It should feel placed, indexed, and available.

Mobile layout:

- Stack the rail above the thesis.
- Keep FaceTracker small.
- Preserve the archive feeling through spacing and dividers, not through cards.

Field Notes:

- If no published notes exist, show the restrained empty state: `No public notes yet.`
- Do not show fake post titles.

## Notes

Notes are local content files under `content/notes/*.mdx`.

Each note should support:

- `title`
- `slug`
- `date`
- `summary`
- `published`
- optional `tags`

`/notes` behavior:

- With published notes: list notes in reverse chronological order.
- With no published notes: show `No public notes yet.`

`/notes/[slug]` behavior:

- Render MDX note content.
- Only published notes should be routable in production.
- Missing or unpublished notes should render a 404.

`/rss.xml` behavior:

- Return a valid RSS feed.
- Include only published notes.
- If there are no published notes, return a valid feed with no items.

## Visual System

Theme:

- Dark-only.
- Charcoal Paper palette.
- Avoid pure black and pure white; use warm near-black and parchment-toned foregrounds.
- Prefer OKLCH tokens for perceptual consistency.

Initial semantic color tokens:

- `--archive-bg: oklch(15% 0.012 70)` - warm charcoal page background.
- `--archive-surface: oklch(18% 0.014 70)` - subtle elevated surface only if needed.
- `--archive-text: oklch(88% 0.03 82)` - parchment primary text.
- `--archive-muted: oklch(68% 0.03 78)` - metadata and secondary copy.
- `--archive-dim: oklch(52% 0.025 76)` - tertiary labels.
- `--archive-border: oklch(28% 0.018 72)` - dividers and FaceTracker frame.
- `--archive-link: oklch(84% 0.04 86)` - links; close to primary text, not a bright accent.
- `--archive-focus: oklch(78% 0.07 80)` - focus ring only.

Color should communicate hierarchy through contrast and restraint, not through accents. Links may be slightly brighter than body text but should not become a separate brand color.

Typography:

- Use Fraunces for the masthead thesis and expressive editorial moments.
- Use Instrument Sans for supporting copy, metadata, links, and interface text.
- Do not use IBM Plex Mono as the primary type direction. If introduced later, limit it to small metadata accents only after review.
- Load only the weights used: Fraunces 400 and 600; Instrument Sans 400, 500, and 600.
- Use `font-display: swap` via Next font loading.
- Body text must be at least `1rem`.
- Thesis: `clamp(1.65rem, 3vw, 2.5rem)`, `line-height: 1.12`, target max width `17ch`, acceptable range `16-18ch`.
- Supporting copy: `1rem`, `line-height: 1.7`, max width `58ch`.
- Rail text and links: `0.875rem`, `line-height: 1.55`.
- Metadata labels: `0.75rem`, uppercase only where useful, letter spacing `0.08em`.
- Avoid negative letter spacing. The site should feel set, not compressed.

Spacing and layout:

- Use a 4pt spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Page padding should use `clamp(1.25rem, 5vw, 4rem)`.
- Desktop masthead grid should use `grid-template-columns: minmax(11rem, 16rem) minmax(0, 1fr)`.
- Main content should not exceed `68rem`.
- Use dividers and alignment for grouping, not cards.
- The Field Notes section should be separated by one quiet top divider and generous vertical space.

Interaction:

- Links should behave like archive links, not buttons.
- Hover states should be subtle.
- FaceTracker provides the primary dynamic detail.
- No broad page animation is required.
- Respect reduced-motion preferences.
- Link hit targets should be comfortable on mobile even if the visual text is small.
- Focus states should be visible and warm, using `--archive-focus`.
- The RSS link should point to `/rss.xml`.
- The notes index can be reachable through the Field Notes heading or empty-state context, but the masthead should not grow into a nav bar.

## Components And Modules

Implementation units:

- `app/page.tsx`: archive homepage.
- `app/notes/page.tsx`: notes index.
- `app/notes/[slug]/page.tsx`: note detail route.
- `app/rss.xml/route.ts`: feed route.
- `lib/notes.ts`: note discovery, metadata parsing, sorting, and published filtering.
- `components/FaceTracker.jsx`: preserved and reused as masthead rail signature.
- `app/globals.css`: visual tokens and layout styles.

The current component surface can be reduced after implementation:

- Keep reusable UI primitives only if they remain used.
- Remove or leave unused old portfolio sections only after checking imports and route behavior.

## Accessibility

- Body text must remain readable on the dark background.
- Links need visible focus states.
- FaceTracker must have appropriate alternate text or be marked decorative if it does not convey information.
- The site must work with reduced motion.
- Touch targets for links should be comfortable on mobile.
- Verify text contrast against the final OKLCH tokens before completion.
- Verify the FaceTracker still works when JavaScript loads slowly; the layout should not collapse while images initialize.
- Do not disable user zoom.

## Testing And Verification

Run:

- `pnpm exec tsc --noEmit`
- `pnpm build`

Browser verification with Playwright:

- `/` renders the masthead and FaceTracker rail signature.
- `/notes` renders either notes or the empty state.
- `/rss.xml` returns valid feed XML.
- `/projects`, `/design`, and `/tools` redirect to `/`.
- Desktop and mobile screenshots confirm the masthead reads as an archive, not a landing-page hero.
- Screenshot review at widths 390px, 768px, and 1280px.
- Check that the first viewport has one clear reading path: rail identity, thesis, supporting copy, Field Notes.
- Check that no text line in the supporting copy exceeds 75 characters.

## Success Criteria

- The first viewport feels like a personal archive.
- A founder or hiring manager can quickly understand what Shubham does.
- A technical peer sees restraint and engineering taste.
- There is a clear place for future notes without fake content.
- No visible trace of the old project-card portfolio IA remains in the primary experience.
