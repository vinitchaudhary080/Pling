import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from './ui/button'

type Props = { children: ReactNode }
type State = { error: Error | null }

/**
 * Last line of defence around the router.
 *
 * A render-time crash in one screen should not blank the whole app, so this
 * catches it, reports it once, and offers a way back to a working screen.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // In a real app this is where the error would go to Sentry / Datadog.
    console.error('Unhandled UI error', error, info.componentStack)
  }

  render(): ReactNode {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-surface px-gutter text-center">
        <h1 className="text-[26px] font-bold leading-[34px] text-grey-800">Something went wrong</h1>
        <p className="max-w-content text-sm font-medium leading-5 text-grey-600">
          The screen failed to render. Reloading usually clears it.
        </p>
        <Button className="w-auto px-8" onClick={() => window.location.assign('/')}>
          Back to start
        </Button>
      </div>
    )
  }
}
