import { useCallback, useMemo, useState } from 'react'
import { STEPS } from './steps'
import type { Answers, Step, StepId } from './types'

const EMPTY_ANSWERS: Answers = {
  sports: [],
  activity: [],
  location: [],
  frequency: [],
  health: [],
  diet: [],
  improve: [],
}

type UseOnboarding = {
  step: Step
  index: number
  total: number
  isLast: boolean
  answers: Answers
  selected: string[]
  healthNote: string
  canContinue: boolean
  toggle: (optionId: string) => void
  setHealthNote: (value: string) => void
  next: () => void
  back: () => void
  skip: () => void
  /** Jump straight to a step; the desktop rail uses this to revisit answers. */
  goTo: (target: number) => void
  /** True once a step has been visited, so the rail can mark it complete. */
  furthest: number
}

/**
 * Wizard state for the seven-question flow.
 *
 * Single-select steps replace their answer; multi-select steps toggle. Answers
 * survive navigating backwards, so returning to a step shows what was picked.
 */
export const useOnboarding = (onComplete: () => void): UseOnboarding => {
  const [index, setIndex] = useState(0)
  const [furthest, setFurthest] = useState(0)
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS)
  const [healthNote, setHealthNote] = useState('')

  const step = STEPS[index]
  const selected = answers[step.id]
  const isLast = index === STEPS.length - 1

  const toggle = useCallback(
    (optionId: string) => {
      setAnswers((current) => {
        const existing = current[step.id]
        const nextValue =
          step.mode === 'single'
            ? [optionId]
            : existing.includes(optionId)
              ? existing.filter((id) => id !== optionId)
              : [...existing, optionId]

        return { ...current, [step.id]: nextValue }
      })
    },
    [step.id, step.mode],
  )

  const advance = useCallback(
    (stepId: StepId) => {
      if (stepId === STEPS[STEPS.length - 1].id) {
        onComplete()
        return
      }
      setIndex((current) => {
        const nextIndex = Math.min(current + 1, STEPS.length - 1)
        setFurthest((seen) => Math.max(seen, nextIndex))
        return nextIndex
      })
    },
    [onComplete],
  )

  const next = useCallback(() => advance(step.id), [advance, step.id])
  const back = useCallback(() => setIndex((current) => Math.max(current - 1, 0)), [])

  const skip = useCallback(() => {
    setAnswers((current) => ({ ...current, [step.id]: [] }))
    advance(step.id)
  }, [advance, step.id])

  // Only steps already reached are navigable — jumping ahead would skip questions.
  const goTo = useCallback((target: number) => {
    setIndex((current) => (target >= 0 && target <= Math.max(current, target) ? Math.min(target, STEPS.length - 1) : current))
  }, [])

  const canContinue = useMemo(() => selected.length > 0, [selected])

  return {
    step,
    index,
    total: STEPS.length,
    isLast,
    answers,
    selected,
    healthNote,
    canContinue,
    toggle,
    setHealthNote,
    next,
    back,
    skip,
    goTo,
    furthest,
  }
}
