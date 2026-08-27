import { cn } from '../../lib/cn'

/** Shimmering placeholder block used while remote copy is loading. */
export const Skeleton = ({ className }: { className?: string }) => (
  <span className={cn('relative block overflow-hidden rounded-lg bg-grey-150', className)} aria-hidden="true">
    <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
  </span>
)
