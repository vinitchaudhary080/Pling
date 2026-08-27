import { useCallback } from 'react'
import { AppShell } from '../../components/layout/app-shell'
import { NavHeader } from '../../components/layout/nav-header'
import { ErrorState } from '../../components/ui/error-state'
import { fetchParagraphs } from '../../api/bacon-ipsum'
import { useAsync } from '../../hooks/use-async'
import { InsightCard, InsightCardSkeleton } from './insight-card'
import { toInsights } from './insight'

const PARAGRAPH_COUNT = 6

/**
 * Daily Reports — the screen the Figma file marks "Implement APIs".
 *
 * That frame is intentionally empty in the design (status bar plus the words
 * "Implement APIs"), so the layout is built from the file's own design system:
 * the same header, section header, 14px card, shadow and type ramp used
 * everywhere else.
 *
 * All four remote states are handled — loading (skeletons that match the real
 * card), error (cause plus a retry), empty, and success.
 */
export const InsightsPage = () => {
  const load = useCallback((signal: AbortSignal) => fetchParagraphs({ paras: PARAGRAPH_COUNT, signal }), [])
  const { status, data, error, reload } = useAsync(load)

  const insights = data ? toInsights(data) : []
  const isLoading = status === 'loading' || status === 'idle'

  return (
    <AppShell
      title="Daily Reports"
      subtitle="Fresh reading picked for your plan"
      mobileHeader={<NavHeader variant="back" title="Daily Reports" />}
    >
      <div className="mx-auto flex w-full max-w-frame flex-col gap-6 px-gutter py-6 md:max-w-3xl md:py-10 lg:max-w-[1180px] lg:px-0 lg:py-0">
        <div className="flex flex-col gap-2.5 lg:hidden">
          <h2 className="text-[26px] font-bold leading-[34px] text-grey-800">Today’s training insights</h2>
          <p className="text-sm font-medium leading-5 text-grey-600">
            Fresh reading picked for your plan, updated every session.
          </p>
        </div>

        {status === 'error' && error ? (
          <ErrorState message={error.message} onRetry={reload} />
        ) : isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading insights">
            {Array.from({ length: PARAGRAPH_COUNT }, (_, index) => (
              <InsightCardSkeleton key={index} />
            ))}
          </div>
        ) : insights.length === 0 ? (
          <p className="rounded-card border border-grey-100 bg-white px-5 py-10 text-center text-sm font-medium text-grey-600 shadow-card">
            No insights are available right now.
          </p>
        ) : (
          <>
            <div className="grid animate-fade-up gap-4 md:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
            <button
              type="button"
              onClick={reload}
              className="self-center rounded-card border border-grey-200 bg-white px-6 py-3 text-sm font-semibold text-grey-700 transition-colors hover:border-brand-500 hover:text-brand-500"
            >
              Load new insights
            </button>
          </>
        )}
      </div>
    </AppShell>
  )
}
