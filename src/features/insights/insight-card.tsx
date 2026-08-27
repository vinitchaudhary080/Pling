import { Skeleton } from '../../components/ui/skeleton'
import type { Insight } from './insight'

/** One article tile: category chip, headline, read time, then the body copy. */
export const InsightCard = ({ insight }: { insight: Insight }) => (
  <article className="flex w-full flex-col gap-3 rounded-card border border-grey-100 bg-white px-5 py-4 shadow-card transition-shadow duration-200 hover:shadow-tile">
    <div className="flex items-center gap-2">
      <span className="rounded-lg bg-sky-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.04em] text-brand-500">
        {insight.category}
      </span>
      <span className="text-[13px] font-medium leading-[18px] text-grey-500">{insight.readMinutes} min read</span>
    </div>

    <h3 className="text-base font-semibold leading-6 text-grey-800">{insight.title}</h3>
    <p className="text-sm font-medium leading-[22px] text-grey-600">{insight.body}</p>
  </article>
)

/** Matching placeholder so the layout does not jump when the data lands. */
export const InsightCardSkeleton = () => (
  <div className="flex w-full flex-col gap-3 rounded-card border border-grey-100 bg-white px-5 py-4 shadow-card">
    <div className="flex items-center gap-2">
      <Skeleton className="h-[18px] w-20" />
      <Skeleton className="h-[18px] w-16" />
    </div>
    <Skeleton className="h-6 w-2/3" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  </div>
)
