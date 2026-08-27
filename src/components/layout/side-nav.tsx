import { NavLink } from 'react-router-dom'
import { HomeIcon, WalkIcon } from '../icons/line-icons'
import { ChartIcon } from '../icons/nav-icons'
import { BrandMark } from './brand-mark'
import avatar from '../../assets/avatar.png'
import { cn } from '../../lib/cn'

const LINKS = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/activity', label: 'Activity', icon: WalkIcon },
  { to: '/insights', label: 'Daily Reports', icon: ChartIcon },
]

/**
 * Persistent desktop navigation.
 *
 * The Figma file is a set of phone screens, so it has no site-level nav — each
 * screen is reached by tapping through. On a 1440px viewport that leaves the
 * product with no way to move around, so the routes the flow already has are
 * surfaced as a rail. Hidden below `lg:`, where the phone chrome takes over.
 */
export const SideNav = () => (
  <aside className="hidden w-[248px] shrink-0 flex-col gap-10 border-r border-grey-150 bg-white px-6 py-8 lg:flex">
    <BrandMark />

    <nav aria-label="Main">
      <ul className="flex flex-col gap-1">
        {LINKS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-card px-3.5 py-3 text-sm font-semibold leading-5 transition-colors',
                  isActive ? 'bg-sky-100 text-brand-500' : 'text-grey-600 hover:bg-grey-100 hover:text-grey-800',
                )
              }
            >
              <Icon className="size-5 shrink-0" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>

    <div className="mt-auto flex items-center gap-3 rounded-card border border-grey-100 bg-surface px-3 py-3">
      <img src={avatar} alt="" className="size-10 shrink-0 rounded-full object-cover" />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-bold leading-5 text-grey-800">Thomas</span>
        <span className="truncate text-xs font-medium leading-4 text-grey-500">Personalised plan</span>
      </div>
    </div>
  </aside>
)
