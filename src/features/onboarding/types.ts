import type { ComponentType } from 'react'
import type { IconProps } from '../../components/icons/line-icons'

/** Stable identifiers for each question in the flow. */
export type StepId = 'sports' | 'activity' | 'location' | 'frequency' | 'health' | 'diet' | 'improve'

export type SportOption = {
  id: string
  name: string
  /** Powers the "N available practices" badge. */
  practices: number
  /** Pre-composed ball artwork exported from Figma, already clipped to the card. */
  image: string
}

export type TagOption = { id: string; label: string; icon: ComponentType<IconProps> }
export type PlainOption = { id: string; label: string }
export type DietOption = { id: string; label: string; description: string }
export type BenefitOption = { id: string; title: string; description: string; image: string }

type StepBase = {
  id: StepId
  /** Header label copied verbatim from the Figma frame (the flow starts at "Step 2"). */
  label: string
  /** The step's own number in Figma's 8-step scale, used for the progress fill. */
  stepNumber: number
  /** One-word name for the desktop step rail, where the full question is too long. */
  shortLabel: string
  title: string
  subtitle: string
  /** `multi` renders checkboxes, `single` renders radios. */
  mode: 'multi' | 'single'
}

export type Step =
  | (StepBase & { kind: 'sports'; options: SportOption[] })
  /** Tag rows are explicit because Figma pins specific chips per row. */
  | (StepBase & { kind: 'tags'; rows: TagOption[][] })
  | (StepBase & { kind: 'plain'; options: PlainOption[]; followUp?: FollowUp })
  | (StepBase & { kind: 'diet'; options: DietOption[] })
  | (StepBase & { kind: 'benefits'; options: BenefitOption[] })

/** Conditional free-text field revealed by a specific answer (Step 6). */
export type FollowUp = { whenOptionId: string; question: string; maxLength: number }

/** Every answer is stored as a set of option ids, keyed by step. */
export type Answers = Record<StepId, string[]>
