import type { ComponentType, ReactNode } from 'react'
import type { IconProps } from '../icons/line-icons'
import { Sparkline } from './sparkline'
import { cn } from '../../lib/cn'

type StatCardProps = {
  icon?: ComponentType<IconProps>
  /** Escape hatch for a glyph that needs its own markup rather than an icon component. */
  iconSlot?: ReactNode
  label: string
  value: string
  unit: string
  selected?: boolean
  onClick?: () => void
}

/**
 * Figma "Card Vertical - Switch" — 135x230 metric tile.
 *
 * Selected fills Blue 500 with white type; resting is white with the grey ramp.
 * The icon sits in a 32px translucent chip and the chart bleeds to the card
 * edges, which is why the graphic area is a positioned overflow box.
 */
export const StatCard = ({ icon: Icon, iconSlot, label, value, unit, selected = false, onClick }: StatCardProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={cn(
      'flex h-[230px] w-[135px] shrink-0 flex-col items-start gap-[5px] overflow-hidden rounded-tile p-3 text-left shadow-tile transition-colors duration-200',
      selected ? 'bg-brand-500' : 'border border-grey-100 bg-white hover:border-grey-200',
    )}
  >
    <span className="flex w-full flex-col items-start justify-center gap-1.5">
      <span
        className={cn(
          'flex items-center justify-center rounded-md p-1.5',
          selected ? 'bg-white/10 text-white' : 'bg-grey-100 text-grey-700',
        )}
      >
        {iconSlot ?? (Icon ? <Icon className="size-5" /> : null)}
      </span>
      <span className={cn('text-sm font-semibold leading-5', selected ? 'text-white' : 'text-grey-700')}>{label}</span>
    </span>

    {/* Chart bleeds past the 12px padding, exactly as in the design. */}
    <span className="relative w-full flex-1">
      <span className="absolute -inset-x-3 bottom-0 top-4 block">
        <Sparkline tone={selected ? 'light' : 'dark'} />
      </span>
    </span>

    <span className={cn('flex items-end gap-[5px]', selected ? 'text-white' : 'text-grey-800')}>
      <span className="text-xl font-bold leading-[30px]">{value}</span>
      <span className={cn('pb-1 text-sm font-medium leading-5', selected ? 'text-white' : 'text-grey-600')}>{unit}</span>
    </span>
  </button>
)
