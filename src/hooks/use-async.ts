import { useCallback, useEffect, useRef, useState } from 'react'

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export type AsyncState<T> = {
  status: AsyncStatus
  data: T | null
  error: Error | null
  /** Re-runs the task, cancelling any request still in flight. */
  reload: () => void
}

/**
 * Runs an abortable async task on mount and on demand.
 *
 * The in-flight request is aborted when the component unmounts or when a reload
 * supersedes it, so a slow response can never overwrite fresher state.
 */
export const useAsync = <T,>(task: (signal: AbortSignal) => Promise<T>, deps: unknown[] = []): AsyncState<T> => {
  const [status, setStatus] = useState<AsyncStatus>('idle')
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [nonce, setNonce] = useState(0)

  const taskRef = useRef(task)
  taskRef.current = task

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setStatus('loading')
    setError(null)

    taskRef
      .current(controller.signal)
      .then((result) => {
        if (!active) return
        setData(result)
        setStatus('success')
      })
      .catch((cause: unknown) => {
        if (!active || controller.signal.aborted) return
        setError(cause instanceof Error ? cause : new Error('Something went wrong.'))
        setStatus('error')
      })

    return () => {
      active = false
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce, ...deps])

  const reload = useCallback(() => setNonce((value) => value + 1), [])

  return { status, data, error, reload }
}
