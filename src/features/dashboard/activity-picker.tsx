import { Link } from 'react-router-dom'
import { BikeIcon, MountainIcon, Yoga25Icon } from '../../components/icons/line-icons'
import { StepIcon } from '../../components/icons/step-icon'
import { SectionHeader } from '../../components/ui/section-header'
import { cn } from '../../lib/cn'

const SPORTS = [
  { id: 'Running', icon: StepIcon },
  { id: 'Cycling', icon: BikeIcon },
  { id: 'Yoga', icon: Yoga25Icon },
  { id: 'Hiking', icon: MountainIcon },
] as const

type ActivityPickerProps = {
  /** Figma's dark frame ships Running pre-selected; the light frame ships none. */
  selected?: string
}

/**
 * "What are you up to today?" — four 92px activity tiles.
 *
 * Figma only wires Running, but a tile that looks tappable and goes nowhere is
 * a dead end, so each one opens the tracking screen for its own sport.
 */
export const ActivityPicker = ({ selected }: ActivityPickerProps) => (
  <section className="flex w-full flex-col gap-4">
    <SectionHeader title="What are you up to today?" />

    <div className="no-scrollbar -mx-gutter -my-3 flex items-start gap-4 overflow-x-auto px-gutter py-3 md:mx-0 md:px-0">
      {SPORTS.map(({ id, icon: Icon }) => {
        const isSelected = id === selected

        return (
          <Link
            key={id}
            to={`/activity?sport=${id}`}
            className={cn(
              'flex w-[92px] shrink-0 flex-col items-center gap-2 rounded-tile px-[15px] py-4 transition-transform duration-200 hover:-translate-y-0.5',
              isSelected
                ? 'bg-brand-500 shadow-[0px_2px_6px_0px_rgba(27,133,243,0.3),0px_4px_20px_0px_rgba(50,50,71,0.02)]'
                : 'bg-white shadow-[0px_0px_8px_0px_rgba(12,26,75,0.1),0px_4px_20px_0px_rgba(50,50,71,0.02)]',
            )}
          >
            <Icon className={cn('size-[25px]', isSelected ? 'text-white' : 'text-grey-700')} />
            <span className={cn('text-sm font-semibold leading-5', isSelected ? 'text-white' : 'text-grey-700')}>{id}</span>
          </Link>
        )
      })}
    </div>
  </section>
)
