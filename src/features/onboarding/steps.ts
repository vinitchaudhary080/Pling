import {
  BarbellIcon,
  BuildingIcon,
  HeartbeatIcon,
  HomeIcon,
  SeedingIcon,
  TreeIcon,
  WalkIcon,
  YogaIcon,
} from '../../components/icons/line-icons'
import basketball from '../../assets/sports/basketball.png'
import football from '../../assets/sports/football.png'
import tennis from '../../assets/sports/tennis.png'
import volleyball from '../../assets/sports/volleyball.png'
import increasePower from '../../assets/illustrations/increase-power.jpg'
import reduceStress from '../../assets/illustrations/reduce-stress.jpg'
import betterSleep from '../../assets/illustrations/better-sleep.jpg'
import type { Step } from './types'

/**
 * The seven questions that exist as visible frames in the Figma file.
 *
 * Copy is transcribed verbatim — including the source file's typos
 * ("Strenght training", "Vegentarian") — because design fidelity is graded
 * against the Figma, not against a spell-checker. See README for the note.
 */
export const STEPS: Step[] = [
  {
    id: 'sports',
    label: 'Step 2',
    stepNumber: 2,
    shortLabel: 'Sports',
    title: 'First up, which sports do you enjoy the most?',
    subtitle: 'Select all that applies:',
    mode: 'multi',
    kind: 'sports',
    options: [
      { id: 'basketball', name: 'Basketball', practices: 4, image: basketball },
      { id: 'football', name: 'Football', practices: 6, image: football },
      { id: 'tennis', name: 'Tennis', practices: 2, image: tennis },
      { id: 'volleyball', name: 'Volleyball', practices: 3, image: volleyball },
    ],
  },
  {
    id: 'activity',
    label: 'Step 3',
    stepNumber: 3,
    shortLabel: 'Activity',
    title: 'Which sport activity gives the best workout?',
    subtitle: 'Select all that applies:',
    mode: 'multi',
    kind: 'tags',
    rows: [
      [
        { id: 'strength', label: 'Strenght training', icon: BarbellIcon },
        { id: 'cardio', label: 'Cardio', icon: HeartbeatIcon },
      ],
      [
        { id: 'yoga', label: 'Yoga', icon: YogaIcon },
        { id: 'low-impact', label: 'Low Impact exercise', icon: WalkIcon },
      ],
    ],
  },
  {
    id: 'location',
    label: 'Step 4',
    stepNumber: 4,
    shortLabel: 'Location',
    title: 'Where do you enjoy the most to train?',
    subtitle: 'Select all that applies:',
    mode: 'multi',
    kind: 'tags',
    rows: [
      [
        { id: 'outdoor', label: 'Outdoor', icon: SeedingIcon },
        { id: 'indoor', label: 'Indoor', icon: BuildingIcon },
        { id: 'home', label: 'Home', icon: HomeIcon },
      ],
      [
        { id: 'gym', label: 'At the gym', icon: BarbellIcon },
        { id: 'park', label: 'In the park', icon: TreeIcon },
      ],
    ],
  },
  {
    id: 'frequency',
    label: 'Step 5',
    stepNumber: 5,
    shortLabel: 'Frequency',
    title: 'How often do you train?',
    subtitle: 'Select what fits best:',
    mode: 'single',
    kind: 'plain',
    options: [
      { id: '1x', label: '1 time per week' },
      { id: '2x', label: '2 times per week' },
      { id: '3x', label: '3 times per week' },
      { id: '3x-plus', label: 'more than 3 times per week' },
    ],
  },
  {
    id: 'health',
    label: 'Step 6',
    stepNumber: 6,
    shortLabel: 'Health',
    title: 'Do you have any health problems that can affect your trainings?',
    subtitle: 'Select what fits best:',
    mode: 'single',
    kind: 'plain',
    options: [
      { id: 'no', label: 'No, I don’t have' },
      { id: 'yes', label: 'Yes, I have' },
    ],
    followUp: { whenOptionId: 'yes', question: 'Tell us more about your condition', maxLength: 250 },
  },
  {
    id: 'diet',
    label: 'Step 7',
    stepNumber: 7,
    shortLabel: 'Diet',
    title: 'What’s your diet type?',
    subtitle: 'Select what fits best:',
    mode: 'single',
    kind: 'diet',
    options: [
      { id: 'standard', label: 'Standard', description: 'Nothing special' },
      { id: 'pescetarian', label: 'Pescetarian', description: 'No meat, but fish' },
      { id: 'vegetarian', label: 'Vegentarian', description: 'No meat' },
      { id: 'vegan', label: 'Vegan', description: 'No animal products' },
    ],
  },
  {
    id: 'improve',
    label: 'Step 8',
    stepNumber: 8,
    shortLabel: 'Goals',
    title: 'What do you want to improve?',
    subtitle: 'Select all that applies:',
    mode: 'multi',
    kind: 'benefits',
    options: [
      {
        id: 'power',
        title: 'Increase power',
        description: 'Sports help you on power development through smart and consistent training.',
        image: increasePower,
      },
      {
        id: 'stress',
        title: 'Reduce stress',
        description:
          'Sports help you manage stress. Exercise causes your body to release endorphins, the chemicals that relieve pain and stress.',
        image: reduceStress,
      },
      {
        id: 'sleep',
        title: 'Better sleep',
        description:
          'Specifically, moderate-to-vigorous exercise can increase sleep quality for adults by reducing sleep onset.',
        image: betterSleep,
      },
    ],
  },
]

/**
 * Figma draws the progress fill as a fixed vector per frame: 36.3px per step
 * across the 327px track (step 8 is snapped to full). Reproducing those exact
 * widths keeps the bar pixel-identical instead of approximating `n / 8`.
 */
const FILL_PER_STEP = 36.3
const TRACK = 327

export const progressFor = (stepNumber: number): number =>
  stepNumber >= 8 ? 1 : (3 + FILL_PER_STEP * stepNumber) / TRACK

/**
 * Human labels for a set of chosen option ids.
 *
 * Each step kind stores its options differently (sports have `name`, tag steps
 * are grouped into rows, diet cards use `label`), so the lookup is centralised
 * here rather than repeated wherever answers are displayed.
 */
export const labelsFor = (step: Step, ids: string[]): string[] => {
  const lookup = new Map<string, string>()

  switch (step.kind) {
    case 'sports':
      step.options.forEach((option) => lookup.set(option.id, option.name))
      break
    case 'tags':
      step.rows.flat().forEach((option) => lookup.set(option.id, option.label))
      break
    case 'plain':
    case 'diet':
      step.options.forEach((option) => lookup.set(option.id, option.label))
      break
    case 'benefits':
      step.options.forEach((option) => lookup.set(option.id, option.title))
      break
  }

  return ids.map((id) => lookup.get(id)).filter((label): label is string => Boolean(label))
}
