import type { SVGProps } from 'react'

/** Glyphs the Figma file has no equivalent for — desktop navigation only. */

export const ChartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false" {...props}>
    <path d="M3 17h14M6 17V9M10 17V4M14 17v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const BellIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false" {...props}>
    <path
      d="M10 2.5a5 5 0 0 0-5 5v2.6l-1.2 2.4a.6.6 0 0 0 .5.9h11.4a.6.6 0 0 0 .5-.9L15 10.1V7.5a5 5 0 0 0-5-5ZM8.2 16a1.9 1.9 0 0 0 3.6 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
