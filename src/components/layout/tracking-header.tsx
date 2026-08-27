import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../icons/line-icons'
import { PageHeader } from './page-header'

/** Figma's tracking header: back, hairline, screen name and a status pill. */
export const TrackingHeader = ({ label = 'Activity tracking', status = 'Running' }: { label?: string; status?: string }) => (
  <PageHeader actions="menu">
    <Link
      to="/home"
      aria-label="Go back"
      className="flex size-[22px] shrink-0 items-center justify-center text-grey-600 transition-colors hover:text-grey-800"
    >
      <ArrowLeftIcon className="size-5" />
    </Link>
    <span className="h-[22px] w-px shrink-0 bg-grey-200" aria-hidden="true" />

    <div className="flex min-w-0 items-center gap-1.5">
      <span className="truncate text-sm font-semibold leading-5 text-grey-600">{label}</span>
      <span className="shrink-0 rounded-[10px] bg-[#E6F3D8] px-3 py-1 text-xs font-bold leading-4 text-[#5B892A]">
        {status}
      </span>
    </div>
  </PageHeader>
)
