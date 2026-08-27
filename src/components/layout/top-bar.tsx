import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, SearchIcon } from '../icons/line-icons'
import { BellIcon } from '../icons/nav-icons'
import { ThemeButton } from '../ui/theme-button'

type TopBarProps = {
  title: string
  subtitle?: string
  /** Set on screens reached from another page, so desktop gets a way back. */
  backTo?: string
  backLabel?: string
  /** Page-specific control, e.g. the activity screen's status pill. */
  action?: ReactNode
}

/**
 * Desktop page header. Carries the page title plus the two affordances the
 * phone header already had (search and a menu, here a notification bell), so
 * every screen opens with the same chrome in the same place.
 */
export const TopBar = ({ title, subtitle, backTo, backLabel = 'Back', action }: TopBarProps) => (
  <header className="hidden shrink-0 items-center gap-6 border-b border-grey-150 bg-white px-10 py-5 lg:flex">
    <div className="flex min-w-0 flex-1 items-center gap-3">
      {backTo ? (
        <Link
          to={backTo}
          aria-label={backLabel}
          className="flex size-10 shrink-0 items-center justify-center rounded-card border border-grey-150 bg-white text-grey-600 transition-colors hover:border-grey-200 hover:text-grey-800"
        >
          <ArrowLeftIcon className="size-5" />
        </Link>
      ) : null}

      <div className="flex min-w-0 flex-col">
        <h1 className="truncate text-xl font-bold leading-7 text-grey-800">{title}</h1>
        {subtitle ? <p className="truncate text-[13px] font-medium leading-[18px] text-grey-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>

    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        aria-label="Search"
        className="flex size-10 items-center justify-center rounded-card text-grey-600 transition-colors hover:bg-grey-100 hover:text-grey-800"
      >
        <SearchIcon className="size-5" />
      </button>
      <ThemeButton className="flex size-10 items-center justify-center rounded-card p-2.5 text-grey-600 hover:bg-grey-100 hover:text-grey-800" />

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex size-10 items-center justify-center rounded-card text-grey-600 transition-colors hover:bg-grey-100 hover:text-grey-800"
      >
        <BellIcon className="size-5" />
        <span className="absolute right-2.5 top-2.5 size-2 rounded-full border-2 border-white bg-brand-500" />
      </button>
    </div>
  </header>
)
