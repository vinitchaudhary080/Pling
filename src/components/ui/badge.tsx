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
 *
 * Figma puts a 2px backdrop blur on this pill, which is dropped here. The card
 * behind it is a flat fill, so the blur has nothing to soften and renders
 * identically without it — but on iOS Safari a `backdrop-filter` layer does not
 * repaint when its backdrop changes without a scroll. Selecting a card flips
 * that backdrop from white to amber, so the pill kept painting the stale white
 * one until the page happened to scroll.
 */
export const Badge = ({ children, tone = 'default', className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex shrink-0 items-center justify-center gap-[5px] whitespace-nowrap rounded-lg border px-[7px] py-0.5',
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
