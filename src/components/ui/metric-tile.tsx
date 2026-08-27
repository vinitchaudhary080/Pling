import type { ComponentType, ReactNode } from 'react'
import type { IconProps } from '../icons/line-icons'
import { cn } from '../../lib/cn'

type MetricTileProps = {
  icon?: ComponentType<IconProps>
  iconSlot?: ReactNode
  value: string
  label: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

/**
 * Compact "Card Vertical - Switch" from the expanded map screen (99x155).
 *
 * Smaller sibling of `StatCard`: no chart, and a large decorative ellipse
 * behind the icon instead — which is why it is its own component rather than a
 * prop on the taller tile.
 */
export const MetricTile = ({ icon: Icon, iconSlot, value, label, selected = false, onClick, className }: MetricTileProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={cn(
      'relative flex h-[155px] min-w-0 flex-1 flex-col justify-between overflow-hidden rounded-tile p-[13px] text-left shadow-tile transition-colors duration-200',
      selected ? 'bg-brand-500' : 'border border-grey-100 bg-white hover:border-grey-200',
      className,
    )}
  >
    <span className="relative block h-[76px] w-full">
      <span
        aria-hidden="true"
        className={cn(
          'absolute -left-[57px] -top-[55px] size-[131px] rounded-full',
          selected ? 'bg-white/10' : 'bg-grey-100/70',
        )}
      />
      <span className={cn('absolute -left-0.5 top-px', selected ? 'text-white' : 'text-grey-700')}>
        {iconSlot ?? (Icon ? <Icon className="size-[30px]" /> : null)}
      </span>
    </span>

    <span className="flex flex-col">
      <span className={cn('text-xl font-bold leading-[30px]', selected ? 'text-white' : 'text-grey-800')}>{value}</span>
      <span className={cn('truncate text-sm font-medium leading-5', selected ? 'text-white/90' : 'text-grey-600')}>
        {label}
      </span>
    </span>
  </button>
)
