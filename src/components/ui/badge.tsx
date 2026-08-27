import { BulletIcon } from '../icons/glyphs'
import { cn } from '../../lib/cn'

type BadgeProps = {
  children: string
  /** `onAccent` is the variant used once the card behind it turns amber. */
  tone?: 'default' | 'onAccent'
  className?: string
}

/**
 * Figma "Badge with Bullet and Text" — the "N available practices" pill on the
 * sport cards. 13px text, 8px radius, hairline border.
 */
export const Badge = ({ children, tone = 'default', className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex shrink-0 items-center justify-center gap-[5px] whitespace-nowrap rounded-lg border px-[7px] py-0.5 backdrop-blur-[2px]',
      tone === 'onAccent' ? 'border-accent-100' : 'border-grey-150',
      className,
    )}
  >
    <BulletIcon tone={tone} className="size-[13px] shrink-0" />
    <span className={cn('text-[13px] font-medium leading-[18px]', tone === 'onAccent' ? 'text-white' : 'text-grey-600')}>
      {children}
    </span>
  </span>
)
