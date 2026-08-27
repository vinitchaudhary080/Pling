import { Link } from 'react-router-dom'
import { ChevronRightIcon, TimerIcon } from '../../components/icons/line-icons'
import { MiniRoute } from '../../components/icons/mini-route'

type TimerCardProps = {
  distanceKm: string
  duration: string
  /** Where the card opens. Its chevron implies a destination, so it has one. */
  to: string
}

/**
 * The translucent summary card that floats over the map: route glyph, "Today
 * Run", then distance and elapsed time separated by a hairline rule.
 *
 * The chevron on its right makes it read as tappable, so the whole card is the
 * link — the same destination as the expand button in the map's corner.
 */
export const TimerCard = ({ distanceKm, duration, to }: TimerCardProps) => (
  <Link
    to={to}
    aria-label={`Open the expanded map — ${distanceKm} km in ${duration}`}
    className="absolute bottom-3 left-3 right-3 flex items-center overflow-hidden rounded-tile bg-white/90 py-3.5 pl-3 pr-1 text-left shadow-[0px_0px_5px_0px_rgba(12,26,75,0.04),0px_4px_20px_-2px_rgba(50,50,71,0.02)] backdrop-blur-[2.5px] transition-colors hover:bg-white"
  >
    <span className="flex min-w-0 flex-1 items-center justify-between">
      <span className="flex min-w-0 items-center gap-2">
        <MiniRoute className="h-[50px] w-8 shrink-0" />

        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="flex items-center gap-1">
            <TimerIcon className="size-4 shrink-0 text-grey-600" />
            <span className="text-[13px] font-semibold leading-[18px] text-grey-600">Today Run</span>
          </span>

          <span className="flex items-center gap-2.5">
            <span className="flex items-end gap-1">
              <span className="text-xl font-bold leading-[30px] text-grey-800">{distanceKm}</span>
              <span className="pb-1 text-xs font-medium leading-4 text-grey-600">km</span>
            </span>

            <span className="h-4 w-px shrink-0 bg-grey-200" aria-hidden="true" />

            <span className="flex items-end gap-1">
              <span className="text-xl font-bold leading-[30px] text-grey-800">{duration}</span>
              <span className="pb-1 text-xs font-medium leading-4 text-grey-600">time</span>
            </span>
          </span>
        </span>
      </span>

      <span className="flex shrink-0 items-center justify-center rounded-card p-[9px] text-grey-600">
        <ChevronRightIcon className="size-5" />
      </span>
    </span>
  </Link>
)
