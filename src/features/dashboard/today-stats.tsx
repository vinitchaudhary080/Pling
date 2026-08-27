import { useState } from 'react'
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
 * Today's numbers on the dashboard.
 *
 * Desktop only — the phone dashboard is a faithful copy of the Figma frame and
 * has no room for it, but a 1440px viewport does, and these are figures the
 * product already tracks on the activity screen.
 */
export const TodayStats = () => {
  const [selected, setSelected] = useState<string>('calories')

  return (
    <section className="hidden w-full flex-col gap-4 lg:flex">
      <SectionHeader title="Today" />
      <div className="flex items-start gap-4">
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
