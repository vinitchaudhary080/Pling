/**
 * Client for the Bacon Ipsum JSON API (https://baconipsum.com/json-api/).
 *
 * The endpoint returns a bare `string[]` of paragraphs. Everything else in this
 * module exists to turn that into something the UI can trust: a validated
 * response, a typed error, an abort signal and a request timeout.
 */

const ENDPOINT = 'https://baconipsum.com/api/'
const TIMEOUT_MS = 10_000

export type BaconType = 'all-meat' | 'meat-and-filler'

export type BaconRequest = {
  /** `all-meat` is pure meat words; `meat-and-filler` mixes in lorem ipsum. */
  type?: BaconType
  /** Number of paragraphs to return (1-30). */
  paras?: number
  /** Start the first paragraph with the classic "Bacon ipsum dolor amet". */
  startWithLorem?: boolean
  signal?: AbortSignal
}

/** Narrow error type so the UI can distinguish a timeout from a server fault. */
export class BaconIpsumError extends Error {
  readonly kind: 'network' | 'timeout' | 'http' | 'malformed'
  readonly status?: number

  constructor(kind: BaconIpsumError['kind'], message: string, status?: number) {
    super(message)
    this.name = 'BaconIpsumError'
    this.kind = kind
    this.status = status
  }
}

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

/**
 * Fetches paragraphs of filler copy.
 *
 * @throws {BaconIpsumError} on timeout, transport failure, a non-2xx status, or
 * a payload that is not the documented `string[]`.
 */
export const fetchParagraphs = async ({
  type = 'meat-and-filler',
  paras = 5,
  startWithLorem = false,
  signal,
}: BaconRequest = {}): Promise<string[]> => {
  const params = new URLSearchParams({ type, paras: String(paras) })
  if (startWithLorem) params.set('start-with-lorem', '1')

  // Compose the caller's signal with our own timeout so either can cancel.
  const timeout = new AbortController()
  const timer = setTimeout(() => timeout.abort(), TIMEOUT_MS)
  const onAbort = () => timeout.abort()
  signal?.addEventListener('abort', onAbort)

  try {
    const response = await fetch(`${ENDPOINT}?${params.toString()}`, { signal: timeout.signal })

    if (!response.ok) {
      throw new BaconIpsumError('http', `The insights service responded with ${response.status}.`, response.status)
    }

    const payload: unknown = await response.json()

    if (!isStringArray(payload) || payload.length === 0) {
      throw new BaconIpsumError('malformed', 'The insights service returned an unexpected payload.')
    }

    return payload
  } catch (error) {
    if (error instanceof BaconIpsumError) throw error

    // A caller-driven abort is not a failure — let it propagate untouched.
    if (signal?.aborted) throw error

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new BaconIpsumError('timeout', 'The request took too long. Check your connection and try again.')
    }

    throw new BaconIpsumError('network', 'We could not reach the insights service.')
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', onAbort)
  }
}
