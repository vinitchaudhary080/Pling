# Asset pipeline

One-off tools used to prepare the Figma exports that ship in `src/assets`. They
have already run; they live here so the assets' provenance is traceable and can
be regenerated if the design changes.

| Script | What it does |
| --- | --- |
| `gen-icons.cjs` | Turns the SVGs in `figma-icons/` into `src/components/icons/line-icons.tsx`, normalising their hard-coded strokes to `currentColor`. Run with `node scripts/gen-icons.cjs`. |
| `extract-balls.py` | Cuts the ball artwork out of the exported sport cards. Figma flattens PNG exports against their background, so the rings and card ground come baked in; keeping only the ball lets the rings be drawn in CSS and re-tinted for the selected state. |
| `trim-assets.py` | Strips the transparent bleed Figma adds around exported shape nodes, and downsizes the pin avatar from its 1624px original. |

`figma-icons/` holds the raw SVG exports. They are inputs to `gen-icons.cjs`,
not application assets, which is why they sit here rather than in `src/assets` —
nothing under `src/assets` is unused.
