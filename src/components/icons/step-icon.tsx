import type { SVGProps } from 'react'

/**
 * The running-shoe glyph, lifted out of the Figma export.
 *
 * The export is 56 kB for a 25px icon and hard-codes Grey 600, so the paths are
 * inlined here on `currentColor` — the dark header needs the shoe in green, the
 * activity tiles in white or grey.
 *
 * Figma draws the shoe body as an inside stroke: a mask holding the silhouette,
 * plus a huge self-intersecting path that fills through it. Stroking the mask's
 * own path gives the same thin outline, and keeps the icon's weight in line
 * with the stroked glyphs it sits beside.
 */
export const StepIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 25 25" fill="none" aria-hidden="true" focusable="false" {...props}>
    {/* Shoe silhouette — Figma draws this as an inside stroke via a mask. */}
    <path
      d="M6.25005 13.0209L8.57659 7.90234C8.74562 7.53046 9.11611 7.29232 9.52308 7.2571C10.367 7.18405 11.7932 6.95684 12.5 6.25004C13.1238 5.62625 13.9343 4.06859 14.4843 2.91922C14.7969 2.26588 15.6624 2.08982 16.189 2.58714L23.7257 9.70513C24.1424 10.0987 24.1649 10.7522 23.7713 11.1689C21.291 13.7948 13.0825 22.3959 11.9791 22.3959C10.677 22.3959 6.24977 22.3959 3.1249 22.3959C3.21865e-05 22.3959 0.520712 16.6667 2.0833 14.5834C3.6459 12.5 6.25005 13.0209 6.25005 13.0209Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3541 8.85413L11.2423 18.9657C11.047 19.161 10.7845 19.2708 10.5083 19.2708H2.08301"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.229 20.3125L23.4373 20.3125"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.354 17.7084L23.4373 17.7084"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.2915 9.375L10.4165 10.4167"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.25 11.4584L9.375 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
