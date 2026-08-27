import { cn } from '../../lib/cn'
import type { Step } from './types'

type StepRailProps = {
  steps: Step[]
  current: number
  /** Highest step reached, so earlier ones can be marked complete. */
  furthest: number
  onSelect: (index: number) => void
}

/**
 * Vertical step list for the desktop layout.
 *
 * On a phone the horizontal progress bar is the right call — there is no room
 * for anything else. On a wide viewport it leaves the column almost empty and
 * tells the user nothing about what is coming, so the same state is rendered as
 * a full rail: every question named, answered ones checked and revisitable.
 */
export const StepRail = ({ steps, current, furthest, onSelect }: StepRailProps) => (
  <nav aria-label="Onboarding progress" className="hidden lg:block">
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const isCurrent = index === current
        const isDone = index < current || (index <= furthest && index !== current)
        const isReachable = index <= furthest

        return (
          <li key={step.id} className="relative flex gap-3.5 pb-6 last:pb-0">
            {/* Connector between markers, stopping at the last one. */}
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute left-[11px] top-6 h-[calc(100%-1.5rem)] w-0.5 rounded-full',
                  isDone ? 'bg-brand-500/40' : 'bg-grey-150',
                )}
              />
            ) : null}

            <button
              type="button"
              disabled={!isReachable}
              onClick={() => onSelect(index)}
              aria-current={isCurrent ? 'step' : undefined}
              className="group relative z-10 flex items-start gap-3.5 text-left disabled:cursor-default"
            >
              <span
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  isCurrent && 'border-brand-500 bg-white',
                  isDone && 'border-brand-500 bg-brand-500',
                  !isCurrent && !isDone && 'border-grey-200 bg-white',
                )}
              >
                {isDone ? (
                  <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
                    <path d="M3.5 8.4 6.4 11.3 12.5 5.2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className={cn('block size-2 rounded-full', isCurrent ? 'bg-brand-500' : 'bg-grey-200')} />
                )}
              </span>

              <span className="flex flex-col gap-0.5 pt-0.5">
                <span
                  className={cn(
                    'text-sm font-semibold leading-5 transition-colors',
                    isCurrent ? 'text-grey-800' : isReachable ? 'text-grey-600 group-hover:text-grey-800' : 'text-grey-400',
                  )}
                >
                  {step.shortLabel}
                </span>
                <span className="text-xs font-medium leading-4 text-grey-500">{step.label}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  </nav>
)
