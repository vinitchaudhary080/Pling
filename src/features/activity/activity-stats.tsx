import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FlameIcon, HeartbeatIcon } from '../../components/icons/line-icons'
import { StepIcon } from '../../components/icons/step-icon'
import { SectionHeader } from '../../components/ui/section-header'
import { StatCard } from '../../components/ui/stat-card'

const METRICS = [
  { id: 'calories', label: 'Calories Burn', value: '310', unit: 'kcal', icon: FlameIcon },
  { id: 'heart', label: 'Heart Rate', value: '98', unit: 'bpm', icon: HeartbeatIcon },
  { id: 'steps', label: 'Steps', value: '2.123', unit: 'steps', icon: undefined },
] as const

/**
 * "Your habits" on the tracking screens — a horizontal rail of metric tiles
 * where exactly one is selected at a time (Figma ships it as a switch group).
 */
export const ActivityStats = () => {
  const [selected, setSelected] = useState<string>('calories')

  return (
    <section className="flex w-full flex-col gap-4">
      <SectionHeader
        title="Your habits"
        action={
          <Link
            to="/home"
            className="shrink-0 text-sm font-semibold leading-5 text-grey-600 transition-colors hover:text-brand-500"
          >
            See all →
          </Link>
        }
      />

      <div className="no-scrollbar -mx-gutter -my-3 flex items-start gap-4 overflow-x-auto px-gutter py-3 md:mx-0 md:px-0">
        {METRICS.map((metric) => (
          <StatCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            icon={metric.icon}
            iconSlot={
              metric.id === 'steps' ? <StepIcon className="size-5" /> : undefined
            }
            selected={selected === metric.id}
            onClick={() => setSelected(metric.id)}
          />
        ))}
      </div>
    </section>
  )
}
