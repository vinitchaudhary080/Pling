import { CheckCircledIcon } from '../../components/icons/glyphs'
import { cn } from '../../lib/cn'
import type { DietOption } from './types'

type DietCardsProps = {
  options: DietOption[]
  selected: string[]
  onSelect: (id: string) => void
}

/**
 * Step 7 cards: title over description, amber fill plus a white check when
 * chosen. Figma thickens the border to 2px on the selected card, so the padding
 * drops by 1px to keep the box the same size.
 */
export const DietCards = ({ options, selected, onSelect }: DietCardsProps) => (
  <div role="radiogroup" className="flex w-full flex-col gap-4">
    {options.map((option) => {
      const isSelected = selected.includes(option.id)

      return (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={isSelected}
          onClick={() => onSelect(option.id)}
          className={cn(
            'flex w-full items-center gap-1.5 overflow-hidden rounded-card border px-5 py-4 text-left shadow-card transition-all duration-200',
            isSelected
              ? 'border-2 border-accent-700 bg-accent-600 px-[19px] py-[15px]'
              : 'border-grey-100 bg-white hover:border-grey-200',
          )}
        >
          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className={cn('text-sm leading-5', isSelected ? 'font-bold text-white' : 'font-semibold text-grey-800')}>
              {option.label}
            </span>
            <span className={cn('text-[13px] font-medium leading-[18px]', isSelected ? 'text-white/80' : 'text-grey-600')}>
              {option.description}
            </span>
          </span>
          {isSelected ? <CheckCircledIcon className="size-5 shrink-0" /> : null}
        </button>
      )
    })}
  </div>
)
