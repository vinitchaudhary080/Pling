import { cn } from '../../lib/cn'

/**
 * Pling wordmark. The Figma frames have no app chrome — they are phone screens —
 * so this exists only from `lg:` up, where the layout becomes a web page and
 * needs something to identify it.
 */
export const BrandMark = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2.5', className)}>
    <span className="flex size-9 items-center justify-center rounded-[10px] bg-brand-500" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="size-5">
        <path
          d="M9 22c1.6-3.4 3.4-6.2 5.4-8.4 2-2.2 4.2-3.6 6.6-4.2-.6 3.4-2 6.3-4.2 8.7-2.2 2.4-4.8 3.7-7.8 3.9Z"
          fill="#FFC542"
        />
        <circle cx="12.5" cy="19.5" r="2.2" fill="#fff" />
      </svg>
    </span>
    <span className="text-lg font-bold leading-6 tracking-[-0.01em] text-grey-800">Pling</span>
  </div>
)
