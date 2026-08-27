import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../components/icons/line-icons'
import { HomeIndicator } from '../../components/layout/home-indicator'
import { Button } from '../../components/ui/button'
import { ProgressBar } from '../../components/ui/progress-bar'
import { BenefitCards } from './benefit-cards'
import { DietCards } from './diet-cards'
import { PlainOptions } from './plain-options'
import { SportCard } from './sport-card'
import { TagRows } from './tag-rows'
import { AmbientBackground } from '../../components/layout/ambient-background'
import { BrandMark } from '../../components/layout/brand-mark'
import { SelectionSummary } from './selection-summary'
import { StepRail } from './step-rail'
import { STEPS, labelsFor, progressFor } from './steps'
import { useOnboarding } from './use-onboarding'
import type { Step } from './types'

type StepBodyProps = {
  step: Step
  selected: string[]
  healthNote: string
  onToggle: (id: string) => void
  onNoteChange: (value: string) => void
}

/** Maps a step's `kind` to the control set the Figma frame uses. */
const StepBody = ({ step, selected, healthNote, onToggle, onNoteChange }: StepBodyProps) => {
  switch (step.kind) {
    case 'sports':
      return (
        <div className="flex w-full flex-col gap-5 2xl:grid 2xl:grid-cols-2">
          {step.options.map((option) => (
            <SportCard
              key={option.id}
              option={option}
              selected={selected.includes(option.id)}
              onToggle={() => onToggle(option.id)}
            />
          ))}
        </div>
      )
    case 'tags':
      return <TagRows rows={step.rows} selected={selected} onToggle={onToggle} />
    case 'plain':
      return (
        <PlainOptions
          options={step.options}
          selected={selected}
          onSelect={onToggle}
          followUp={step.followUp}
          note={healthNote}
          onNoteChange={onNoteChange}
        />
      )
    case 'diet':
      return <DietCards options={step.options} selected={selected} onSelect={onToggle} />
    case 'benefits':
      return <BenefitCards options={step.options} selected={selected} onToggle={onToggle} />
  }
}

/**
 * The onboarding wizard.
 *
 * Mobile reproduces the Figma frame exactly: a 375px column with 24px gutters,
 * a 327px content width and the Continue button in a blurred bottom sheet.
 * From `md:` up the same content reflows into a two-column layout — the
 * question, progress and primary action stay pinned on the left while the
 * answers occupy the right — so wide viewports get a real web layout rather
 * than a stretched phone.
 */
export const OnboardingPage = () => {
  const navigate = useNavigate()
  const flow = useOnboarding(() => navigate('/home'))
  const { step, index, total, isLast } = flow

  return (
    <div className="relative flex min-h-dvh flex-col bg-surface lg:bg-[#F4F6FA]">
      <AmbientBackground />

      {/* Desktop masthead: the phone frames have no app chrome, so the page needs
          something to identify it once it stops looking like a phone. */}
      <div className="relative z-10 mx-auto hidden w-full max-w-6xl px-10 pb-8 pt-10 lg:block">
        <BrandMark />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-frame flex-1 flex-col md:max-w-3xl md:flex-none md:flex-row md:items-start md:gap-12 md:px-8 md:py-16 lg:my-auto lg:max-w-6xl lg:items-stretch lg:gap-12 lg:rounded-[28px] lg:bg-surface lg:px-14 lg:py-14 lg:shadow-[0_28px_80px_-40px_rgba(45,55,72,0.35)] lg:ring-1 lg:ring-white">
        {/* Step rail — desktop only; the phone uses the progress bar instead. */}
        <StepRail steps={STEPS} current={index} furthest={flow.furthest} onSelect={flow.goTo} />

        {/* Question column — sticky on desktop so the action never scrolls away. */}
        <header className="flex shrink-0 flex-col gap-6 md:sticky md:top-16 md:w-[340px] md:gap-8 lg:static lg:w-[330px]">
          {/*
            Pinned to the top of the viewport on mobile: the step label and the
            progress bar are the wizard's orientation cues, so they should stay
            visible while a long list of options scrolls underneath. On desktop
            the whole question column is already sticky, so this reverts to flow.
          */}
          <div className="pt-top sticky top-0 z-30 flex flex-col justify-center gap-2.5 bg-surface px-gutter pb-4 md:static md:bg-transparent md:p-0">
            <div className="flex h-[41px] items-center gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={flow.back}
                  disabled={index === 0}
                  aria-label="Go back to the previous question"
                  className="flex size-[22px] shrink-0 items-center justify-center rounded-card text-grey-600 transition-colors hover:text-grey-800 disabled:opacity-30"
                >
                  <ArrowLeftIcon className="size-5" />
                </button>
                <span className="h-[22px] w-px bg-grey-150" aria-hidden="true" />
                <span className="min-w-0 flex-1 text-base font-semibold leading-[22px] text-grey-600">{step.label}</span>
              </div>

              <button
                type="button"
                onClick={flow.skip}
                className="rounded-card p-[9px] text-sm font-semibold leading-5 text-grey-600 transition-colors hover:text-grey-800"
              >
                Skip question
              </button>
            </div>

            <ProgressBar
              value={progressFor(step.stepNumber)}
              step={index + 1}
              total={total}
              className="lg:hidden"
            />
          </div>

          <div key={step.id} className="flex animate-fade-up flex-col gap-2.5 px-gutter md:px-0">
            <h1 className="text-[26px] font-bold leading-[34px] text-grey-800 md:text-[30px] md:leading-[40px]">
              {step.title}
            </h1>
            <p className="text-sm font-medium leading-5 text-grey-600">{step.subtitle}</p>
          </div>

          {/* Desktop-only action; mobile keeps the button in the bottom sheet.
              From `lg:` it drops to the foot of the column so the panel reads as
              a page with a footer, rather than leaving its lower half empty. */}
          <div className="hidden px-gutter md:block md:px-0 lg:mt-auto lg:pt-8">
            <Button onClick={flow.next} disabled={!flow.canContinue}>
              {isLast ? 'Finish' : 'Continue'}
            </Button>
            <p className="mt-3 hidden text-center text-[13px] font-medium leading-[18px] text-grey-500 lg:block">
              You can change any of this later.
            </p>
          </div>
        </header>

        {/*
          Answer column.

          On desktop the answers are taken out of flow (absolute inside a
          stretched column) so they no longer drive the panel's height. The
          step rail does instead, which keeps the panel the same size on every
          question — a four-card step and a two-chip step now match — and the
          answers scroll inside it when they overflow.
        */}
        <main className="flex min-w-0 flex-1 flex-col px-gutter pb-6 pt-6 md:px-0 md:pt-0 lg:relative lg:pb-0">
          <div className="no-scrollbar flex flex-col gap-6 lg:absolute lg:inset-0 lg:overflow-y-auto lg:pr-1">
            <div key={step.id} className="animate-fade-up">
              <StepBody
                step={step}
                selected={flow.selected}
                healthNote={flow.healthNote}
                onToggle={flow.toggle}
                onNoteChange={flow.setHealthNote}
              />
            </div>

            <SelectionSummary labels={labelsFor(step, flow.selected)} mode={step.mode} />
          </div>
        </main>
      </div>

      {/* Mobile bottom sheet — Figma: 97% white, 5px blur, 26px top radius. */}
      <div className="sticky bottom-0 z-20 flex flex-col items-center gap-0.5 rounded-t-sheet bg-white/[0.97] shadow-sheet backdrop-blur-[5px] md:hidden">
        <div className="flex w-full flex-col items-center px-gutter pt-6">
          <Button onClick={flow.next} disabled={!flow.canContinue}>
            {isLast ? 'Finish' : 'Continue'}
          </Button>
        </div>
        <HomeIndicator />
      </div>
    </div>
  )
}
