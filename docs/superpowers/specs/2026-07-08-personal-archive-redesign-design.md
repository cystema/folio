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
  - Small FaceTracker signature, roughly 64-80px.
  - Name: `Shubham Mazumder`.
  - Role/domain labels: product engineering, production AI systems.
  - Links: Email, GitHub, LinkedIn, RSS.
- Main column:
  - Thesis: `Founding engineer focused on the operational layer of AI products.`
  - Supporting copy about production AI systems, reliability, agent workflows, and the unglamorous layer after the demo.
  - Field Notes section.

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

Typography:

- Use Fraunces for the masthead thesis and expressive editorial moments.
- Use Instrument Sans for supporting copy, metadata, links, and interface text.
- Do not use IBM Plex Mono as the primary type direction. If introduced later, limit it to small metadata accents only after review.

Interaction:

- Links should behave like archive links, not buttons.
- Hover states should be subtle.
- FaceTracker provides the primary dynamic detail.
- No broad page animation is required.
- Respect reduced-motion preferences.

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

## Success Criteria

- The first viewport feels like a personal archive.
- A founder or hiring manager can quickly understand what Shubham does.
- A technical peer sees restraint and engineering taste.
- There is a clear place for future notes without fake content.
- No visible trace of the old project-card portfolio IA remains in the primary experience.
