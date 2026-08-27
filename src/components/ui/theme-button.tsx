import { useAppearance } from '../../features/dashboard/appearance'
import { cn } from '../../lib/cn'

/**
 * Theme control in the header cluster, beside search.
 *
 * Switches the dashboard between the file's two "Personalized journey" frames —
 * the light header with the workout-plan hero, and the dark photographic header
 * with the vitals card.
 */
export const ThemeButton = ({ className }: { className?: string }) => {
  const { appearance, toggle } = useAppearance()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={appearance === 'dark' ? 'Switch to the light dashboard' : 'Switch to the dark dashboard'}
      aria-pressed={appearance === 'dark'}
      className={cn('transition-colors', className)}
    >
      <ThemeIcon className="size-full" />
    </button>
  )
}

/** Half-filled disc — the conventional glyph for a theme or contrast control. */
const ThemeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5v-16.5Z" fill="currentColor" />
  </svg>
)
