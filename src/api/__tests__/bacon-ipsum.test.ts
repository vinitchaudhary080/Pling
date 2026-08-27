import { afterEach, describe, expect, it, vi } from 'vitest'
import { BaconIpsumError, fetchParagraphs } from '../bacon-ipsum'

const mockFetch = (impl: typeof fetch) => {
  vi.stubGlobal('fetch', impl)
}

afterEach(() => vi.unstubAllGlobals())

describe('fetchParagraphs', () => {
  it('returns the paragraphs on a successful response', async () => {
    mockFetch((async () => new Response(JSON.stringify(['a', 'b']), { status: 200 })) as typeof fetch)
    await expect(fetchParagraphs()).resolves.toEqual(['a', 'b'])
  })

  it('raises a typed http error for a non-2xx status', async () => {
    mockFetch((async () => new Response('', { status: 503 })) as typeof fetch)
    await expect(fetchParagraphs()).rejects.toMatchObject({ kind: 'http', status: 503 })
  })

  it('rejects a payload that is not an array of strings', async () => {
    mockFetch((async () => new Response(JSON.stringify({ oops: true }), { status: 200 })) as typeof fetch)
    await expect(fetchParagraphs()).rejects.toBeInstanceOf(BaconIpsumError)
  })

  it('rejects an empty array rather than rendering a blank screen', async () => {
    mockFetch((async () => new Response(JSON.stringify([]), { status: 200 })) as typeof fetch)
    await expect(fetchParagraphs()).rejects.toMatchObject({ kind: 'malformed' })
  })

  it('reports a transport failure as a network error', async () => {
    mockFetch((async () => {
      throw new TypeError('Failed to fetch')
    }) as unknown as typeof fetch)
    await expect(fetchParagraphs()).rejects.toMatchObject({ kind: 'network' })
  })
})
