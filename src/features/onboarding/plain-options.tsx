import { Tag } from '../../components/ui/tag'
import type { FollowUp, PlainOption } from './types'

type PlainOptionsProps = {
  options: PlainOption[]
  selected: string[]
  onSelect: (id: string) => void
  followUp?: FollowUp
  note: string
  onNoteChange: (value: string) => void
}

/**
 * Full-width single-select tags (Steps 5 and 6), plus Step 6's conditional
 * free-text field which only appears once "Yes, I have" is chosen.
 */
export const PlainOptions = ({ options, selected, onSelect, followUp, note, onNoteChange }: PlainOptionsProps) => {
  const showFollowUp = followUp !== undefined && selected.includes(followUp.whenOptionId)

  return (
    <div className="flex w-full flex-col gap-5">
      <div role="radiogroup" className="flex w-full flex-col gap-4">
        {options.map((option) => (
          <Tag
            key={option.id}
            role="radio"
            block
            label={option.label}
            selected={selected.includes(option.id)}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>

      {showFollowUp ? (
        <div className="flex animate-fade-up flex-col gap-3 border-t border-grey-150 pt-5">
          <label htmlFor="health-note" className="text-sm font-medium leading-[22px] text-grey-600">
            {followUp.question}
          </label>
          <div className="rounded-card border border-grey-200 bg-white p-3">
            <textarea
              id="health-note"
              value={note}
              maxLength={followUp.maxLength}
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder="Suggested"
              rows={2}
              className="w-full resize-none bg-transparent text-sm leading-[18px] text-grey-800 outline-none placeholder:text-grey-400"
            />
            <p className="mt-2 text-right text-xs leading-5 text-grey-300">
              {note.length}/{followUp.maxLength}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
