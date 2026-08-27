import type { ReactNode } from 'react'
import { MenuIcon, SearchIcon } from '../icons/line-icons'
import { ThemeButton } from '../ui/theme-button'
import { cn } from '../../lib/cn'

type PageHeaderProps = {
  /** Whatever identifies the screen: avatar and greeting, or back and title. */
  children: ReactNode
  /** `dark` is for the photographic header, where the icons sit on the image. */
  tone?: 'light' | 'dark'
  /** The hairline the Figma frames draw under the light header. */
  divider?: boolean
  /**
   * Search and theme belong to the home screen; inner screens carry the menu
   * alone, and the map carries none. The cluster is right-aligned, so dropping
   * actions never moves the ones that remain.
   */
  actions?: 'full' | 'menu' | 'none'
  /**
   * Hides the cluster from `lg:` up, for headers that sit inside the desktop
   * shell — its top bar already carries these actions.
   */
  hideActionsOnDesktop?: boolean
  className?: string
}

/**
 * The one phone header every screen uses.
 *
 * Its whole job is that the action cluster never moves. The row is
 * `items-start` and the cluster is locked to a 42px band — the height of the
 * avatar, the tallest left-hand element — so the icons land on the same pixel
 * whatever the screen puts on the left, be that a greeting, a title, or the
 * map's three-line route block.
 */
export const PageHeader = ({
  children,
  tone = 'light',
  divider = false,
  actions = 'full',
  hideActionsOnDesktop = false,
  className,
}: PageHeaderProps) => {
  const hover = tone === 'dark' ? 'hover:opacity-80' : 'hover:text-grey-900'

  return (
    <header className={cn('pt-top flex w-full flex-col items-center gap-3 px-gutter', className)}>
      <div className="flex w-full max-w-content items-start gap-6 md:max-w-none">
        <div className="flex min-h-[42px] min-w-0 flex-1 items-center gap-3">{children}</div>

        <div
          className={cn(
            'flex h-[42px] shrink-0 items-center gap-6',
            tone === 'dark' ? 'text-white' : 'text-grey-700',
            hideActionsOnDesktop && 'lg:hidden',
          )}
        >
          {actions === 'full' ? (
            <>
              <button type="button" aria-label="Search" className={cn('transition-colors', hover)}>
                <SearchIcon className="size-6" />
              </button>
              <ThemeButton className={cn('size-6', hover)} />
            </>
          ) : null}

          {actions === 'none' ? null : (
            <button type="button" aria-label="Open menu" className={cn('transition-colors', hover)}>
              <MenuIcon className="size-6" />
            </button>
          )}
        </div>
      </div>

      {divider ? <div className="h-px w-full max-w-content bg-grey-150 md:max-w-none lg:hidden" /> : null}
    </header>
  )
}
