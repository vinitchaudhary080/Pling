import { describe, expect, it } from 'vitest'
import { toInsights } from '../insight'

describe('toInsights', () => {
  it('derives a four-word, sentence-cased headline from the paragraph', () => {
    const [insight] = toInsights(['Bacon ipsum dolor amet, short ribs nostrud.'])
    expect(insight.title).toBe('Bacon ipsum dolor amet')
  })

  it('never reports a read time below one minute', () => {
    const [insight] = toInsights(['Short.'])
    expect(insight.readMinutes).toBe(1)
  })

  it('cycles categories so adjacent cards never repeat a label', () => {
    const insights = toInsights(Array.from({ length: 3 }, (_, i) => `Paragraph number ${i}`))
    expect(new Set(insights.map((i) => i.category)).size).toBe(3)
  })

  it('assigns stable, unique ids', () => {
    const insights = toInsights(['one two', 'three four'])
    expect(insights.map((i) => i.id)).toEqual(['insight-0', 'insight-1'])
  })
})
