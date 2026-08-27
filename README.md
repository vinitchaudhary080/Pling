# Pling — Frontend SDE Assessment

The Pling "Personalised Journey" Figma file built out in React and TypeScript: a
seven-question onboarding wizard, a dashboard with two header variants, activity
tracking, an expanded map view, and a Daily Reports screen fed by the Bacon
Ipsum API.

**Live:** https://pling-theta.vercel.app
**Source:** https://github.com/vinitchaudhary080/Pling

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle
npm test         # unit tests
```

Needs Node 20.19 or newer — Vite 8 builds with Rolldown, whose native binaries
won't load below that. `.nvmrc` pins it to 22.

For CodeSandbox, use Import from GitHub on the repo above. It's a standard Vite
template, so nothing special is needed.

There's a walkthrough of the folder layout and how the pieces fit together in
[ARCHITECTURE.md](./ARCHITECTURE.md).

## Stack

Vite, React 19, TypeScript in strict mode, Tailwind, React Router, Vitest.

I skipped a component library. The design has its own button, tag, card and
badge vocabulary, and wrapping shadcn only to un-style it back to the Figma
would have cost more than writing the six primitives directly. Tailwind was
worth it because the Figma variables map cleanly onto a theme config, which
keeps colour, radius and shadow values in one place instead of scattered hex
codes across components.

Around 3,400 lines. No `any`, no default exports.

## Screens

| Route | Figma frame |
| --- | --- |
| `/onboarding` | Step 2 through Step 8 |
| `/home` | Personalized journey (both variants) |
| `/activity` | Running – Map – Activity tracking |
| `/map` | Running – Map – Zoom in |
| `/insights` | the frame marked "Implement APIs" |

## Getting the design right

I pulled values out of the Figma file rather than eyeballing them, so colours,
type ramp, radii, shadows and paddings are the file's own numbers. The design
tokens in `tailwind.config.js` are the file's variables: the Grey 100–1000 ramp,
Blue 100/500, Light Blue 100, Yellow 500/600/700, plus the four named shadows.

Assets are exported, not recreated. The sport balls come out pre-composed
(concentric rings plus a masked photo) and already cropped to the 78×110 slice
the card reveals. Icons are exported SVGs, normalised to `currentColor` by
`scripts/gen-icons.cjs` so one glyph serves both the resting grey and the
selected white state. The activity chart and the run route are the exact vector
paths from the file, inlined as components so they scale and can be re-tinted.

Two details that took some digging:

**The progress bar.** Figma draws it as a fixed vector per frame, 36.3px per
step across the 327px track, with step 8 snapped to full. Reproducing those
widths is exact, where a naive `step / total` would have been about 2% off on
every screen. The ARIA values still describe the real position in the flow.

**The selected sport card.** Figma flattens PNG exports against their
background, so the exported artwork arrives with the decorative rings and the
card ground baked in. That's fine for the resting card but wrong for the
selected one, where the ground turns amber and the ring tints change with it.
So I cut the ball out to transparency (`scripts/extract-balls.py`) and draw the
three rings in CSS, which lets one asset serve both states. The 0.92 scale used
for the Step 8 carousel comes from the same place: Figma's 260×344 resting card
against a 280×381 featured one, and both ratios land within a hair of 0.92.

## Layout

The file only contains mobile frames at 375×812. There is no desktop design, so
what happens above phone width is a decision rather than a transcription.

Below 768px the frames are reproduced as-is: a 375px column, 24px gutters, a
327px content width, and the Continue button in a blurred bottom sheet.

From 768px the content reflows into real web layouts, and from 1024px the app
screens share one shell in `components/layout/app-shell.tsx`: a persistent nav
rail with the active route highlighted, and a top bar carrying the page title, a
back button where the screen was reached from another, and the same search and
notification affordances the phone header has. This is the one piece the design
couldn't supply. The Figma frames are phone screens reached by tapping through,
so they carry no site-level navigation at all, and a 1440px viewport needs some.

Onboarding stays outside that shell on purpose. It runs before the app exists,
so linking to the dashboard mid-signup would be wrong. It gets its own
composition instead: a raised panel, a vertical step rail naming all seven
questions, and the primary action pinned to the foot of its column.

Gutters come from one rule, `.px-gutter` in `src/index.css`: 24px up to `md`,
then 32, then 40. The step-ups land at `md` because that's where the pages drop
their 375px cap; widening any earlier would squeeze the content column below the
327px the design calls for.

One header component serves every screen. Its job is that the action cluster
never moves, so the row is `items-start` and the cluster is locked to a 42px
band, the height of the avatar. Search, theme and menu land on the same pixel
whether the screen puts a greeting, a title, a status pill or the map's
three-line route block beside them.

## The API screen

The Figma file marks one frame "Implement APIs" and leaves it otherwise empty,
just a status bar and that label. So I designed the screen from the file's own
system: same nav header, section header, 14px card, shadow and type ramp as
everywhere else. It hangs off the dashboard's Daily Reports card.

`src/api/bacon-ipsum.ts` wraps `https://baconipsum.com/api/`. The response is
checked to actually be a non-empty `string[]` before it reaches the UI, errors
carry a `kind` of `network`, `timeout`, `http` or `malformed` so the UI can say
what went wrong, and a 10 second timeout is composed with the caller's abort
signal so a slow response can't overwrite fresher state.

Bacon Ipsum returns unstructured filler, so `features/insights/insight.ts` maps
each paragraph to a view model with a category, headline and read time. Keeping
that mapping out of the component is what makes it unit-testable.

All four states are handled: loading with skeletons shaped like the real card so
the layout doesn't jump, error with the cause and a retry, empty, and success.

## Assumptions and tradeoffs

**The flow starts at "Step 2".** The file's `Step 1` frame is hidden and renders
empty, so there was nothing to build. The seven visible frames keep their
original labels, and the progress bar still uses the file's own 8-step scale,
which is why step 2 reads about 23% rather than 25%.

**Typos are preserved.** "Strenght training", "Vegentarian" and "73% achived"
are all in the source file. Fidelity is graded against the Figma, so I
transcribed them rather than quietly correcting them.

**The theme control switches dashboard frames.** The file ships two
"Personalized journey" frames, a light header with the workout-plan hero and a
dark photographic header carrying a vitals card with Running pre-selected. They
read as alternative looks for one screen, so the header's theme button picks
between them and the choice is remembered.

**Step 8 separates "featured" from "selected".** The larger card in Figma reads
as carousel focus, not a selection state, so the size follows scroll position
(whichever card sits nearest the middle grows) while the blue border and
checkbox track the actual answer. That change also fixed a stutter: the size was
animating width, height and font-size, which relayout every frame, and because
the cards live in a horizontal scroller a width change also shifted the scroll
content under the user's finger. It's a single `transform: scale()` now.

**Nothing is a dead end.** Figma only wires the Running tile, but a card that
looks tappable and goes nowhere is worse than one that does something sensible.
Each activity tile opens the tracking screen for its own sport via `?sport=`,
the Today Run card opens the expanded map like the expand button beside it, and
"See all" returns to the dashboard where those habits live. Search and
notifications stay presentational, as they are in the source design.

**The map is static artwork.** There's no map provider in the design, so the
plate is the exported raster with the route, pin and markers composed over it in
the DOM. That keeps the route registered to the streets at any viewport, which
a flattened export couldn't do.

**Answers are in memory.** No persistence layer was specified, so state lives in
`useOnboarding` and resets on reload.

## Testing

Nine unit tests cover the data layer, which is the part most likely to break
silently: the API client's error and validation paths, and the paragraph-to-view-model
mapping. Beyond that I drove the built app in a real browser to check the things
that only show up when rendered, measuring rather than eyeballing. Header icon
positions across every route, computed gutters at each breakpoint, horizontal
overflow from 320px to 1920px, and the carousel's layout staying constant during
a scroll.

## With more time

Component tests for the wizard with Testing Library. Visual regression snapshots
against the Figma frames in CI. Route-level code splitting, since the bundle is
about 98 kB gzipped, which is fine here but wouldn't stay that way. And a proper
keyboard pass over the carousels with roving tabindex; `prefers-reduced-motion`
is respected but that part of the accessibility story is thinner than the rest.
