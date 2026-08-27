import type { ButtonHTMLAttributes, ComponentType } from 'react'
import type { IconProps } from '../icons/line-icons'
import { cn } from '../../lib/cn'

type TagProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  icon?: ComponentType<IconProps>
  selected?: boolean
  /** Stretches the tag across the row (Steps 5 and 6 use full-width tags). */
  block?: boolean
  /** `checkbox` for multi-select steps, `radio` for single-select steps. */
  role?: 'checkbox' | 'radio'
}

/**
 * Figma "Basic Tags" — the workhorse selectable chip used on Steps 3-6.
 *
 * Resting: white / Grey 200 border / Grey 600 Medium label.
 * Selected: Yellow 600 fill / Yellow 700 border / white Bold label.
 */
export const Tag = ({ label, icon: Icon, selected = false, block = false, role = 'checkbox', className, ...props }: TagProps) => (
  <button
    type="button"
    role={role}
    aria-checked={selected}
    className={cn(
      'flex items-center justify-center gap-1 rounded-card border px-[18px] py-3 text-center text-sm leading-5 transition-all duration-200',
      block ? 'w-full' : 'shrink-0',
      selected
        ? 'border-accent-700 bg-accent-600 font-bold text-white shadow-[0_4px_14px_-4px_rgba(230,177,59,0.55)]'
        : 'border-grey-200 bg-white font-medium text-grey-600 hover:border-grey-300 hover:text-grey-800',
      className,
    )}
    {...props}
  >
    {Icon ? <Icon className="size-[18px] shrink-0" /> : null}
    <span>{label}</span>
  </button>
)
