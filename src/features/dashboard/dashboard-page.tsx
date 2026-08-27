import { AppShell } from '../../components/layout/app-shell'
import { NavHeader } from '../../components/layout/nav-header'
import { ActivityPicker } from './activity-picker'
import { useAppearance } from './appearance'
import { Habits } from './habits'
import { TodayStats } from './today-stats'
import { VitalsHeader } from './vitals-header'
import { WorkoutPlanCard } from './workout-plan-card'

/**
 * Dashboard ("Personalized journey").
 *
 * The file ships two frames for this screen and the header's theme control
 * picks between them:
 *
 *  - **light** — the workout-plan hero over a plain header, plus today's
 *    numbers on desktop.
 *  - **dark** — a photographic header carrying the vitals card, with the
 *    content sheet curving up over it and Running pre-selected.
 *
 * Both reproduce their frame at 375px; on desktop each reflows into the app
 * shell's grid.
 */
export const DashboardPage = () => {
  const { appearance } = useAppearance()

  if (appearance === 'dark') {
    return (
      <AppShell
        title="Dashboard"
        subtitle="Today, 5 March 2023"
        mobileHeader={<VitalsHeader className="pb-[50px]" />}
      >
        <div className="relative z-10 mx-auto grid w-full max-w-frame gap-6 rounded-t-sheet bg-surface px-gutter pb-6 pt-6 max-lg:-mt-[26px] md:max-w-3xl md:gap-8 lg:max-w-[1180px] lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0">
          <div className="flex min-w-0 flex-col gap-6 md:gap-8">
            {/* Desktop keeps the shell's chrome, so the header becomes a hero
                card in the same column — and at the same width — as the light
                frame's workout-plan banner. */}
            <VitalsHeader className="hidden rounded-tile pb-8 lg:flex" />
            <ActivityPicker selected="Running" />
            <TodayStats />
          </div>

          <div className="min-w-0">
            <Habits layout="grid" />
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title="Dashboard" subtitle="Today, 5 March 2023" mobileHeader={<NavHeader />}>
      <div className="mx-auto grid w-full max-w-frame gap-6 px-gutter py-3 md:max-w-3xl md:gap-8 md:py-8 lg:max-w-[1180px] lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start lg:px-0 lg:py-0">
        <div className="flex min-w-0 flex-col gap-6 md:gap-8">
          <WorkoutPlanCard />
          <ActivityPicker />
          <TodayStats />
        </div>

        <div className="min-w-0">
          <Habits />
        </div>
      </div>
    </AppShell>
  )
}
