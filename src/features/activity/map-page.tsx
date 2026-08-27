import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, FlameIcon, HeartbeatIcon, TimerIcon } from '../../components/icons/line-icons'
import { AppShell } from '../../components/layout/app-shell'
import { PageHeader } from '../../components/layout/page-header'
import { StepIcon } from '../../components/icons/step-icon'
import { MetricTile } from '../../components/ui/metric-tile'
import mapCity from '../../assets/illustrations/map-city.png'
import { RouteOverlay } from './route-overlay'
import { RunTimer } from './run-timer'

const METRICS = [
  { id: 'calories', value: '310', label: 'Calories', icon: FlameIcon },
  { id: 'heart', value: '98', label: 'Heart Rate', icon: HeartbeatIcon },
  { id: 'steps', value: '2.123', label: 'Steps', icon: undefined },
] as const

/** The phone header for this screen — route name over its date and time. */
const MapHeader = () => (
  <PageHeader actions="none">
    <Link
      to="/activity"
      aria-label="Go back to activity tracking"
      className="flex size-[22px] shrink-0 items-center justify-center text-grey-600 transition-colors hover:text-grey-800"
    >
      <ArrowLeftIcon className="size-5" />
    </Link>
    <span className="h-11 w-px shrink-0 bg-grey-200" aria-hidden="true" />

    <div className="flex min-w-0 flex-col">
      <span className="text-xs font-medium leading-4 text-grey-600">My Route</span>
      <h1 className="truncate text-base font-bold leading-6 text-grey-800">Running to Hyde Park</h1>
      <span className="flex items-center gap-1.5 text-xs font-medium leading-4 text-grey-500">
        <TimerIcon className="size-3.5" />
        Mon 5
        <span className="h-3 w-px bg-grey-200" aria-hidden="true" />
        11:00 AM
      </span>
    </div>
  </PageHeader>
)

/**
 * Expanded map view.
 *
 * The map is two exported layers — the city plate and the route overlay —
 * positioned as percentages of Figma's 375x650 Map frame so the composition
 * scales as one unit. On the phone it runs edge to edge as designed; on desktop
 * it becomes a card sitting beside the metrics inside the app shell.
 */
export const MapPage = () => {
  const [selected, setSelected] = useState<string>('calories')

  return (
    <AppShell
      title="Running to Hyde Park"
      subtitle="My Route · Mon 5 · 11:00 AM"
      backTo="/activity"
      backLabel="Back to activity tracking"
      mobileHeader={<MapHeader />}
    >
      <div className="mx-auto mt-4 flex w-full max-w-frame flex-1 flex-col md:mt-0 md:max-w-2xl lg:grid lg:h-full lg:max-w-[1180px] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,400px)] lg:items-start lg:gap-8">
        <div className="relative min-h-[300px] flex-1 overflow-hidden lg:h-full lg:min-h-[460px] lg:self-stretch lg:rounded-tile lg:border lg:border-grey-100 lg:bg-white lg:shadow-card">
          {/* Figma's 375x650 Map frame. The overlay positions everything as a
              percentage of this box, so the aspect is held at every width and
              the card simply crops it — restretching would oval the markers. */}
          <div className="absolute inset-x-0 top-0 aspect-[375/650] w-full">
            <img
              src={mapCity}
              alt="Map of the route to Hyde Park"
              className="absolute left-[1.6%] top-0 h-[101.1%] w-[96.8%] max-w-none object-cover"
            />
            <RouteOverlay />
          </div>

          {/* Figma fades the map into the card deck with a tall white gradient. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface via-surface/70 to-transparent lg:hidden"
          />
        </div>

        <div className="relative z-10 flex flex-col gap-5 bg-surface px-gutter pb-2 lg:rounded-tile lg:border lg:border-grey-100 lg:bg-white lg:p-6 lg:shadow-card">
          <div className="flex items-start gap-3.5">
            {METRICS.map((metric) => (
              <MetricTile
                key={metric.id}
                value={metric.value}
                label={metric.label}
                icon={metric.icon}
                iconSlot={
                  metric.id === 'steps' ? <StepIcon className="size-[30px]" /> : undefined
                }
                selected={selected === metric.id}
                onClick={() => setSelected(metric.id)}
              />
            ))}
          </div>

          <div className="h-px w-full bg-grey-150" />

          <RunTimer />
        </div>
      </div>
    </AppShell>
  )
}
