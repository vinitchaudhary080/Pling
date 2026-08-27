import { useSearchParams } from 'react-router-dom'
import { CalendarIcon, ChevronDownIcon } from '../../components/icons/line-icons'
import { AppShell } from '../../components/layout/app-shell'
import { TrackingHeader } from '../../components/layout/tracking-header'
import { ActivityStats } from './activity-stats'
import { RouteMap } from './route-map'

const SPORTS = ['Running', 'Cycling', 'Yoga', 'Hiking'] as const
type Sport = (typeof SPORTS)[number]

const isSport = (value: string | null): value is Sport => SPORTS.includes(value as Sport)

/**
 * Activity tracking screen.
 *
 * The sport comes from the query string, so the tiles on the dashboard each
 * open this screen for their own activity rather than all landing on Running.
 *
 * Mobile stacks the map over the metric rail exactly as designed; on desktop
 * the two sit side by side inside the app shell so the map gets real height.
 */
export const ActivityPage = () => {
  const [params] = useSearchParams()
  const raw = params.get('sport')
  const sport: Sport = isSport(raw) ? raw : 'Running'

  return (
    <AppShell
      title="Activity tracking"
      subtitle="Today, 5 March 2023"
      topBarAction={
        <span className="shrink-0 rounded-[10px] bg-[#E6F3D8] px-3 py-1 text-xs font-bold leading-4 text-[#5B892A]">
          {sport}
        </span>
      }
      mobileHeader={<TrackingHeader status={sport} />}
    >
      <div className="mx-auto grid w-full max-w-frame gap-6 px-gutter md:max-w-3xl md:py-6 lg:h-full lg:max-w-[1180px] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start lg:gap-10 lg:px-0 lg:py-0">
        <section className="flex min-w-0 flex-col gap-3 lg:h-full">
          <h2 className="text-xl font-bold leading-[30px] text-grey-800 lg:hidden">
            Enjoy your {sport.toLowerCase()} routine
          </h2>

          <button
            type="button"
            aria-label="Change the date"
            className="flex items-center gap-2.5 self-start lg:hidden"
          >
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="size-5 text-grey-700" />
              <span className="text-sm font-medium leading-5 text-grey-700">Today, 5 March 2023</span>
            </span>
            <ChevronDownIcon className="size-5 text-grey-700" />
          </button>

          <RouteMap />
        </section>

        <div className="min-w-0">
          <ActivityStats />
        </div>
      </div>
    </AppShell>
  )
}
