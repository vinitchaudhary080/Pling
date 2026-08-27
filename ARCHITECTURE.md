# How this project is put together

A map of the codebase: where things live, how a screen gets built, and where to
go when you want to change something.

## Folder layout

```
src/
  api/            bacon-ipsum.ts — the only network call in the app
  components/
    icons/        SVG glyphs as React components, on currentColor
    layout/       app shell, headers, nav rail, home indicator
    ui/           the design system: button, tag, card, badge, progress bar…
  features/
    onboarding/   the seven-question wizard
    dashboard/    both "Personalized journey" frames
    activity/     tracking screen, route map, expanded map, run timer
    insights/     the API-backed Daily Reports screen
  hooks/          use-async
  lib/            cn (class merging)
  App.tsx         route table
  main.tsx        entry point
  index.css       Tailwind layers, gutter rule, focus ring

scripts/          one-off tools that produced the assets in src/assets
```

The split is by **feature**, not by type. Everything the onboarding wizard needs
sits in `features/onboarding` — its config, its state hook, its five renderers.
Only things used by more than one feature move up into `components/`.

## How a screen is composed

Every app screen is three layers:

```
AppShell                     nav rail + top bar (desktop) / phone header (mobile)
  └─ page content            the grid for that screen
       └─ ui/ primitives     Button, Tag, StatCard, Badge…
```

`AppShell` takes a title, an optional back link, and the phone header to use
below `lg:`. It renders the sidebar and top bar only from `lg:` up, so on a
phone it's a pass-through and the screen looks exactly like its Figma frame.

`PageHeader` is the one phone header. Screens pass it their left-hand content
(a greeting, a title, a route block) and pick which actions show. The action
cluster is locked to a fixed 42px band so it never shifts between screens.

Onboarding deliberately skips `AppShell` — it runs before the app exists, so it
has no navigation.

## Where the data lives

There are only three pieces of state in the whole app.

**Onboarding answers** — `features/onboarding/use-onboarding.ts`. A reducer-ish
hook holding the current step index, the answers keyed by step, and the health
note. Single-select steps replace their answer, multi-select toggle. In memory
only; no persistence was specified.

**Dashboard appearance** — `features/dashboard/appearance.ts` plus its provider.
A React context holding `'light' | 'dark'`, which decides which of the two
Figma dashboard frames renders. Persisted to `localStorage`, read once at mount.
The theme button in the header calls its `toggle`.

**Insights data** — fetched, not stored. `hooks/use-async.ts` runs the request on
mount and on demand, aborting anything in flight so a slow response can't
overwrite a fresher one. The screen renders off its `status` field.

Everything else is props. No Redux, no Zustand, no global store, because nothing
in the design needs one.

## The onboarding wizard

The seven questions are **data, not screens**. `features/onboarding/steps.ts`
describes each one; `onboarding-page.tsx` switches on its `kind` and picks a
renderer:

| `kind` | Renderer | Used by |
| --- | --- | --- |
| `sports` | `sport-card.tsx` | Step 2 |
| `tags` | `tag-rows.tsx` | Steps 3, 4 |
| `plain` | `plain-options.tsx` | Steps 5, 6 |
| `diet` | `diet-cards.tsx` | Step 7 |
| `benefits` | `benefit-cards.tsx` | Step 8 |

The `Step` type is a discriminated union, so adding a new question kind is a
compile error until every renderer handles it. Adding a question of an existing
kind is one config entry, no new screen.

## Styling

All design values live in `tailwind.config.js`, taken from the Figma variables:
the Grey 100–1000 ramp, Blue, Light Blue, Yellow, and four named shadows
(`card`, `tile`, `sheet`, `frame`). Components reference tokens, never raw hex.

Two custom rules sit in `src/index.css`:

- `.px-gutter` / `.-mx-gutter` — the page gutter, 24px up to `md`, then 32, then
  40. One rule, so changing the gutter is a one-line edit.
- `.pt-top` — the 56px top inset for page chrome, with `env(safe-area-inset-top)`
  so it clears a notch on a real device.

Both live in `@layer components` rather than `@layer utilities` so a Tailwind
utility can still override them per element (`md:px-0` on the scroll rails).

## Routes

```
/            → redirect to /onboarding
/onboarding  the wizard; finishing goes to /home
/home        dashboard, both frames
/activity    tracking; ?sport= picks which activity
/map         expanded map, reached from /activity
/insights    Daily Reports, the API screen
*            redirect to /onboarding
```

`vercel.json` rewrites everything to `index.html` so a hard load of `/map`
doesn't 404 on the host.

## Assets

`src/assets` holds only what ships: the sport balls, the habit illustrations,
the map plates, the header photograph, the avatar.

`scripts/` holds the tools that produced them, and the raw Figma SVG exports
they read. Those SVGs are inputs to `scripts/gen-icons.cjs`, which generates
`components/icons/line-icons.tsx` — that's why they sit outside `src`. See
`scripts/README.md`.

## Where to change what

| To change… | Edit |
| --- | --- |
| a colour, radius or shadow | `tailwind.config.js` |
| the page gutter | `.px-gutter` in `src/index.css` |
| an onboarding question | `features/onboarding/steps.ts` |
| what the header actions do | `components/layout/page-header.tsx` |
| the desktop nav items | `components/layout/side-nav.tsx` |
| the API endpoint or its options | `api/bacon-ipsum.ts` |
| how API text becomes cards | `features/insights/insight.ts` |
| a route | `src/App.tsx` |

## Commands

```bash
npm run dev      # dev server
npm run build    # tsc --build, then the Vite production bundle
npm test         # vitest, once
npm run lint     # oxlint
```

`npm run build` type-checks first, so a type error fails the build rather than
shipping.

Node 20.19 or newer is required: Vite 8 builds with Rolldown, whose native
binaries won't load on older releases. `.nvmrc` pins it to 22 so CodeSandbox,
Vercel and nvm all pick the same one. The dev server also binds to every
interface (`server.host` in `vite.config.ts`), which is what lets a container
host proxy the preview.
