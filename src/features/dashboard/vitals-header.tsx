import type { ComponentType, SVGProps } from 'react'
import { HeartbeatIcon } from '../../components/icons/line-icons'
import { StepIcon } from '../../components/icons/step-icon'
import { PageHeader } from '../../components/layout/page-header'
import avatar from '../../assets/avatar.png'
import texture from '../../assets/illustrations/header-texture.jpg'
import { cn } from '../../lib/cn'

/** Weight glyph — the only icon in this header the shared set does not carry. */
const WeightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
    <path
      d="M6.86 3.41h2.36c.93 0 1.73.66 1.89 1.58l.99 5.6a1.92 1.92 0 0 1-1.89 2.25H4.87a1.92 1.92 0 0 1-1.89-2.25l.99-5.6a1.92 1.92 0 0 1 1.89-1.58Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path d="M6.5 5.9a1.6 1.6 0 1 1 3.2 0 1.6 1.6 0 0 1-3.2 0Z" fill="#FFD67B" />
  </svg>
)

type Vital = { icon: ComponentType<SVGProps<SVGSVGElement>>; tint: string; label: string; value: string; unit: string }

/** Figma tints each vital's glyph, and only the glyph. */
const VITALS: Vital[] = [
  { icon: WeightIcon, tint: 'text-[#FFC542]', label: 'Weight', value: '86.5', unit: 'kg' },
  { icon: StepIcon, tint: 'text-[#3DD598]', label: 'Step', value: '1428', unit: 'steps' },
  { icon: HeartbeatIcon, tint: 'text-[#FD8C8C]', label: 'Heart Rate', value: '80', unit: 'Bpm' },
]

/**
 * The dark header from the second "Personalized journey" frame.
 *
 * Three stacked layers, exactly as Figma composites them: a #2A3240 ground at
 * 90%, the photograph at 90% over it, then a black gradient rising from the
 * bottom to keep the vitals card legible.
 *
 * The greeting row is the shared `PageHeader`, so the action icons sit on the
 * same pixel here as on every other screen.
 */
export const VitalsHeader = ({ className }: { className?: string }) => (
  <div className={cn('relative isolate flex flex-col items-start overflow-hidden pb-6', className)}>
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[rgba(42,50,64,0.9)]" />
      <img src={texture} alt="" className="absolute inset-0 size-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-64%" />
    </div>

    <PageHeader tone="dark" hideActionsOnDesktop className="lg:pt-7">
      <img src={avatar} alt="" className="size-[42px] shrink-0 rounded-full object-cover" />
      <div className="flex min-w-0 flex-col">
        <span className="text-sm font-medium leading-5 text-[#D9DFE6]">Hello,</span>
        <span className="truncate text-base font-bold leading-6 text-white">Thomas</span>
      </div>
    </PageHeader>

    <div className="mt-5 flex w-full flex-col items-center px-gutter lg:items-stretch">
      {/* "Header Card - Info" — 20px radius, 60% #40464D, 10px blur. */}
      <div className="flex w-full max-w-content items-start justify-between rounded-[20px] bg-[rgba(64,70,77,0.6)] p-5 backdrop-blur-[10px] md:max-w-none">
        {VITALS.map((vital, index) => (
          <div key={vital.label} className="flex items-start">
            {index > 0 ? <span className="mr-5 h-full w-px self-stretch bg-white/20" aria-hidden="true" /> : null}
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-[5px]">
                <vital.icon className={cn('size-4 shrink-0', vital.tint)} />
                <span className="text-[11px] font-semibold leading-[18px] text-[#ECEFF2]">{vital.label}</span>
              </span>
              <span className="flex items-end gap-1 whitespace-nowrap">
                <span className="text-xl font-bold leading-[30px] text-white">{vital.value}</span>
                <span className="pb-1 text-[11px] font-medium leading-[18px] text-[#B3BECD]">{vital.unit}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
