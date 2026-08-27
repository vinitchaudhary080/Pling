import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../icons/line-icons'
import avatar from '../../assets/avatar.png'
import { PageHeader } from './page-header'

type NavHeaderProps = {
  /** Avatar and greeting on the dashboard; a back button and title elsewhere. */
  variant?: 'avatar' | 'back'
  greeting?: string
  name?: string
  title?: string
  backTo?: string
}

/** Figma "Navigation Header + Divider", rendered through the shared header. */
export const NavHeader = ({
  variant = 'avatar',
  greeting = 'Hello,',
  name = 'Thomas',
  title,
  backTo = '/home',
}: NavHeaderProps) => (
  <PageHeader divider actions={variant === 'avatar' ? 'full' : 'menu'}>
    {variant === 'avatar' ? (
      <>
        <img src={avatar} alt="" className="size-[42px] shrink-0 rounded-full object-cover" />
        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-medium leading-5 text-grey-600">{greeting}</span>
          <span className="truncate text-base font-bold leading-6 text-grey-800">{name}</span>
        </div>
      </>
    ) : (
      <>
        <Link
          to={backTo}
          aria-label="Go back"
          className="flex size-9 shrink-0 items-center justify-center rounded-card text-grey-600 transition-colors hover:bg-grey-100 hover:text-grey-800"
        >
          <ArrowLeftIcon className="size-5" />
        </Link>
        <span className="truncate text-base font-bold leading-6 text-grey-800">{title}</span>
      </>
    )}
  </PageHeader>
)
