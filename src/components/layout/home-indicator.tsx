import { cn } from '../../lib/cn'

/** iOS home indicator pill (375x34 frame, 134x5 pill). Phone widths only. */
export const HomeIndicator = ({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) => (
  <div aria-hidden="true" className={cn('flex h-[34px] w-full shrink-0 items-end justify-center pb-2 md:hidden', className)}>
    <span className={cn('h-[5px] w-[134px] rounded-pill', tone === 'dark' ? 'bg-ink' : 'bg-white/80')} />
  </div>
)
