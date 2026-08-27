import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../../components/icons/line-icons'
import { SectionHeader } from '../../components/ui/section-header'
import goals from '../../assets/illustrations/goals.svg'
import nutrition from '../../assets/illustrations/nutrition.svg'
import challenges from '../../assets/illustrations/challenges.svg'
import { cn } from '../../lib/cn'

const CARD =
  'flex flex-col items-start justify-between overflow-hidden rounded-card border border-grey-100 bg-white px-3.5 py-[18px] shadow-card'

/**
 * Figma sizes the illustration frame at 74x50 while the artwork spans 102x102
 * and bleeds out of it; the card's own clipping is what crops the rings. The
 * image is therefore positioned to overflow rather than laid out inline.
 *
 * `object-contain` normalises the three sources: Figma trims SVG exports to
 * their drawn content, so they do not share one intrinsic size.
 */
const HabitIllustration = ({ src }: { src: string }) => (
  <span className="relative block h-[50px] w-[74px]">
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="absolute left-[-26.5px] top-[-26px] size-[102px] max-w-none object-contain"
    />
  </span>
)

type HabitsProps = {
  /**
   * `stacked` is the light frame: two tiles over a full-width Daily Reports row,
   * with Challenges appearing only where desktop has room. `grid` is the dark
   * frame, which ships the full 2x2 at every width.
   */
  layout?: 'stacked' | 'grid'
}

export const Habits = ({ layout = 'stacked' }: HabitsProps) => {
  const isGrid = layout === 'grid'
  // The dark frame runs shorter rows than the light one; desktop uses 176 for both.
  const topRow = isGrid ? 'min-h-[150px] py-3 lg:min-h-[176px] lg:py-[18px]' : 'min-h-[176px]'
  const bottomRow = isGrid ? 'min-h-[129px] py-3 lg:min-h-[176px] lg:py-[18px]' : 'min-h-[176px]'

  return (
    <section className="flex w-full flex-col gap-4">
      <SectionHeader title="Your habits" />

      <div className="grid w-full grid-cols-2 gap-4">
        <article className={cn(CARD, topRow)}>
          <HabitIllustration src={goals} />
          <div className="relative flex flex-col gap-1">
            <h3 className="text-base font-semibold leading-6 text-grey-800">Goals</h3>
            <p className="text-[13px] font-medium leading-[18px] text-grey-600">73% achived</p>
          </div>
        </article>

        <article className={cn(CARD, topRow)}>
          <HabitIllustration src={nutrition} />
          <div className="relative flex flex-col gap-1">
            <h3 className="text-base font-semibold leading-6 text-grey-800">Nutrition</h3>
            <p className="text-[13px] font-medium leading-[18px] text-grey-600">3 hours of fasting</p>
          </div>
        </article>

        <article className={cn(CARD, bottomRow, isGrid ? 'flex' : 'hidden lg:flex')}>
          <HabitIllustration src={challenges} />
          <div className="relative flex flex-col gap-1">
            <h3 className="text-base font-semibold leading-6 text-grey-800">Challenges</h3>
            <p className="text-[13px] font-medium leading-[18px] text-grey-600">73% achived</p>
          </div>
        </article>

        <article
          className={cn(
            'flex w-full flex-col items-start justify-between gap-4 overflow-hidden rounded-card border border-grey-100 bg-white px-4 py-[18px] shadow-card lg:col-span-1 lg:min-h-[176px] lg:px-3.5',
            isGrid ? `${bottomRow} px-3.5` : 'col-span-2',
          )}
        >
          <div
            className={cn(
              'flex w-full gap-4 lg:flex-col lg:items-start',
              isGrid ? 'flex-col items-start' : 'items-start justify-between',
            )}
          >
            <div className="relative flex flex-col gap-1">
              <h3 className="text-base font-semibold leading-6 text-grey-800">Daily Reports</h3>
              <p className="text-[13px] font-medium leading-[18px] text-grey-600">All your details in a single place.</p>
            </div>
            <Link
              to="/insights"
              aria-label="Open daily reports"
              className="flex shrink-0 items-center justify-center rounded-card border border-brand-500 bg-white p-[9px] text-brand-500 transition-colors hover:bg-brand-500 hover:text-white"
            >
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
