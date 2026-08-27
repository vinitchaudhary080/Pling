import { cn } from '../../lib/cn'

type ProgressBarProps = {
  /** Fill fraction, 0-1. */
  value: number
  /** 1-based step index, for assistive tech. */
  step: number
  total: number
  className?: string
}

/**
 * 4px track with an amber fill (Figma: Yellow/Yellow 500 on Grey/Grey 150).
 *
 * The visual fill comes from Figma's own per-step widths, while the ARIA
 * values describe the real position in the flow — so the bar looks identical
 * to the design without lying to a screen reader.
 */
export const ProgressBar = ({ value, step, total, className }: ProgressBarProps) => (
  <div
    role="progressbar"
    aria-valuenow={step}
    aria-valuemin={1}
    aria-valuemax={total}
    aria-valuetext={`Question ${step} of ${total}`}
    className={cn('h-1 w-full overflow-hidden rounded-pill bg-grey-150', className)}
  >
    <div
      className="h-full rounded-pill bg-accent-500 transition-[width] duration-500 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }}
    />
  </div>
)
