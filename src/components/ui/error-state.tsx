import { Button } from './button'

type ErrorStateProps = {
  title?: string
  message: string
  onRetry: () => void
}

/**
 * Terminal state for a failed fetch. Kept deliberately plain and actionable —
 * one sentence of cause, one button that fixes it.
 */
export const ErrorState = ({ title = 'We could not load this', message, onRetry }: ErrorStateProps) => (
  <div
    role="alert"
    className="flex w-full flex-col items-center gap-4 rounded-card border border-grey-100 bg-white px-6 py-10 text-center shadow-card"
  >
    <span className="flex size-12 items-center justify-center rounded-full bg-[#FFEADB]" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" className="size-6 text-[#973636]">
        <path d="M12 8v5M12 16.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
    <div className="flex flex-col gap-1.5">
      <h3 className="text-base font-semibold leading-6 text-grey-800">{title}</h3>
      <p className="text-sm font-medium leading-5 text-grey-600">{message}</p>
    </div>
    <Button onClick={onRetry} className="w-auto px-8">
      Try again
    </Button>
  </div>
)
