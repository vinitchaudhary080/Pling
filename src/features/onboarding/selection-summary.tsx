import { CheckCircledIcon } from '../../components/icons/glyphs'

type SelectionSummaryProps = {
  labels: string[]
  mode: 'multi' | 'single'
}

/**
 * Echoes the current answer back underneath the options.
 *
 * On a phone the chosen card is always on screen, so this would be noise. On a
 * wide viewport the answer column has room to spare, and confirming the choice
 * in words is more useful than leaving the space blank.
 */
export const SelectionSummary = ({ labels, mode }: SelectionSummaryProps) => (
  <div className="hidden min-h-[76px] rounded-card border border-grey-100 bg-white/60 px-5 py-4 md:block">
    {labels.length === 0 ? (
      <p className="text-sm font-medium leading-5 text-grey-500">
        {mode === 'multi' ? 'Pick as many as you like — nothing is locked in.' : 'Choose the one that fits you best.'}
      </p>
    ) : (
      <div className="flex animate-fade-up flex-col gap-3">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold leading-[18px] text-grey-600">
          <CheckCircledIcon className="size-4 text-brand-500 [&_path:first-child]:fill-brand-500 [&_path:first-child]:stroke-brand-500 [&_path:last-child]:stroke-white" />
          {labels.length} selected
        </p>
        <ul className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <li
              key={label}
              className="rounded-lg bg-sky-100 px-2.5 py-1 text-[13px] font-semibold leading-[18px] text-brand-500"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)
