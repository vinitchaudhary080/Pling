import { useEffect, useRef, useState } from 'react'
import { TimerIcon } from '../../components/icons/line-icons'

const pad = (value: number) => String(value).padStart(2, '0')

const format = (totalSeconds: number) =>
  [Math.floor(totalSeconds / 3600), Math.floor((totalSeconds % 3600) / 60), totalSeconds % 60].map(pad).join(' : ')

/**
 * The live run timer from the expanded map screen.
 *
 * Seeded with the design's 32:12:21 so the screen matches Figma on first paint,
 * then ticks while running. The interval is torn down on pause and unmount.
 */
export const RunTimer = ({ distanceKm = '2,7' }: { distanceKm?: string }) => {
  const [seconds, setSeconds] = useState(32 * 3600 + 12 * 60 + 21)
  const [running, setRunning] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!running) return
    timer.current = window.setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => window.clearInterval(timer.current)
  }, [running])

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-1">
        <span className="flex items-center gap-1">
          <TimerIcon className="size-4 text-grey-600" />
          <span className="text-[13px] font-medium leading-[18px] text-grey-600">Timer</span>
        </span>

        <span className="flex items-center gap-2.5">
          <span
            className="text-2xl font-bold leading-[30px] text-grey-800 tabular-nums"
            aria-live="polite"
            aria-label={`Elapsed time ${format(seconds)}`}
          >
            {format(seconds)}
          </span>
          <span className="h-4 w-px shrink-0 bg-grey-200" aria-hidden="true" />
          <span className="flex items-center gap-1 text-xs font-medium leading-4 text-grey-600">
            {distanceKm} km
            <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[#82C43C]" aria-hidden="true">
              <path d="M2.5 11L6 7.5l2.5 2.5L13.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.5 5h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={() => setRunning((value) => !value)}
        aria-label={running ? 'Pause the run' : 'Resume the run'}
        className="flex size-[38px] shrink-0 items-center justify-center rounded-card bg-brand-500 text-white transition-colors hover:bg-[#1878db]"
      >
        {running ? (
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden="true">
            <rect x="3" y="2" width="3.5" height="12" rx="1.2" />
            <rect x="9.5" y="2" width="3.5" height="12" rx="1.2" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden="true">
            <path d="M4.5 2.8v10.4c0 .8.9 1.3 1.6.9l8-5.2a1 1 0 0 0 0-1.8l-8-5.2a1 1 0 0 0-1.6.9Z" />
          </svg>
        )}
      </button>
    </div>
  )
}
