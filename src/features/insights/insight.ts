/** A single card on the insights screen, derived from one API paragraph. */
export type Insight = {
  id: string
  category: string
  title: string
  readMinutes: number
  body: string
}

/** Rotating labels so the generated cards read like a real content feed. */
const CATEGORIES = ['Recovery', 'Nutrition', 'Endurance', 'Mobility', 'Mindset', 'Strength']

const WORDS_PER_MINUTE = 200

/** Builds a short headline from the opening words of a paragraph. */
const toTitle = (paragraph: string): string => {
  const words = paragraph.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean).slice(0, 4)
  const headline = words.join(' ')
  return headline.charAt(0).toUpperCase() + headline.slice(1).toLowerCase()
}

/**
 * Maps the API's bare `string[]` onto the view model.
 *
 * Bacon Ipsum returns unstructured filler, so the title, category and read time
 * are derived here rather than invented in the component — that keeps the
 * rendering layer dumb and makes the mapping unit-testable.
 */
export const toInsights = (paragraphs: string[]): Insight[] =>
  paragraphs.map((body, index) => ({
    id: `insight-${index}`,
    category: CATEGORIES[index % CATEGORIES.length],
    title: toTitle(body),
    readMinutes: Math.max(1, Math.round(body.split(/\s+/).length / WORDS_PER_MINUTE)),
    body,
  }))
