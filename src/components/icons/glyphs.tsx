import type { SVGProps } from 'react'

/**
 * Multi-colour glyphs that must keep their exact Figma fills, i.e. the ones
 * that are not tinted by the context they sit in.
 */

/**
 * Bullet inside the "N available practices" badge.
 *
 * Figma ships two variants: Blue 500 on the resting card, and Yellow 700 on a
 * white disc once the card is selected and the ground turns amber.
 */
export const BulletIcon = ({ tone = 'default', ...props }: SVGProps<SVGSVGElement> & { tone?: 'default' | 'onAccent' }) => {
  const [fill, ink] = tone === 'onAccent' ? ['white', '#E6B13B'] : ['#DCF0FF', '#1B85F3']

  return (
    <svg viewBox="0 0 13 13" fill="none" aria-hidden="true" focusable="false" {...props}>
      <rect x="0.25" y="0.25" width="12.5" height="12.5" rx="6.25" fill={fill} />
      <rect x="0.25" y="0.25" width="12.5" height="12.5" rx="6.25" stroke={ink} strokeWidth="0.5" />
      <circle cx="6.5" cy="6.5" r="3.5" fill={ink} />
    </svg>
  )
}

/** White check on the selected (amber) diet card. */
export const CheckCircledIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false" {...props}>
    <path
      d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
      fill="white"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5.83333 10.4167L8.33333 12.9167L14.1667 7.08333" stroke="#F5BA41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Checked state of the Step 8 benefit-card checkbox. */
export const CheckboxCheckedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
    <rect width="16" height="16" rx="4" fill="#1B85F3" />
    <path d="M4.25 8.25L6.75 10.75L11.75 5.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
