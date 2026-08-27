import { Badge } from '../../components/ui/badge'
import { cn } from '../../lib/cn'
import type { SportOption } from './types'

type SportCardProps = {
  option: SportOption
  selected: boolean
  onToggle: () => void
}

/**
 * The three concentric rings behind the ball.
 *
 * Figma sizes them off a 141x140 container that starts 15px above the card and
 * runs past its right edge; the card's own clipping is what turns them into the
 * arcs you see. Drawing them in CSS — rather than baking them into the exported
 * artwork — is what lets the whole card recolour on selection from one asset.
 */
const RINGS = [
  { style: { left: 0, top: -15, width: 141, height: 140.007 }, rest: 'bg-grey-500/[0.07]', on: 'bg-accent-900/[0.12]' },
  { style: { left: 9.93, top: -5.07, width: 121.141, height: 120.148 }, rest: 'bg-grey-700/[0.04]', on: 'bg-accent-900/[0.1]' },
  { style: { left: 24.03, top: 7.43, width: 93.338, height: 95.324 }, rest: 'bg-grey-900/[0.02]', on: 'bg-brand-500/[0.02]' },
]

/**
 * Figma "Card Horizontal Long" — 327x110, 14px radius.
 *
 * Resting: white card, Grey 100 hairline, Grey 800 title, blue badge bullet.
 * Selected: the whole card fills Yellow 600 with a 2px Yellow 700 border, the
 * type flips to white and the badge switches to its on-accent variant.
 */
export const SportCard = ({ option, selected, onToggle }: SportCardProps) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={selected}
    onClick={onToggle}
    className={cn(
      'relative flex h-[110px] w-full items-center justify-between overflow-hidden rounded-card py-4 pl-5 text-left shadow-card transition-colors duration-200',
      // The ball art is pinned to the right edge, so the copy reserves its width
      // instead of running underneath it when the card grows on wide viewports.
      'pr-[86px]',
      selected
        ? 'border-2 border-accent-700 bg-accent-600 pl-[19px] shadow-[0_6px_20px_-6px_rgba(230,177,59,0.5)]'
        : 'border border-grey-100 bg-white hover:border-grey-200',
    )}
  >
    <span className="relative z-10 flex flex-col items-start gap-2.5">
      <span className={cn('text-base font-semibold leading-6', selected ? 'text-white' : 'text-grey-800')}>
        {option.name}
      </span>
      <Badge tone={selected ? 'onAccent' : 'default'}>{`${option.practices} available practices`}</Badge>
    </span>

    {/* 78x110 is exactly the slice of the ball container the card reveals. */}
    <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 block h-[110px] w-[78px]">
      {RINGS.map((ring, index) => (
        <span
          key={index}
          className={cn('absolute rounded-full', selected ? ring.on : ring.rest)}
          style={ring.style}
        />
      ))}
      <img src={option.image} alt="" className="absolute inset-0 size-full select-none object-cover" />
    </span>
  </button>
)
