import { useId } from 'react'

/**
 * The activity chart from Figma's "Card Vertical - Switch".
 *
 * The two path shapes are the exact vectors exported from the design; only the
 * gradient stops are parameterised, so the same curve serves the selected
 * (Blue 500) card and the resting white ones without shipping three rasters.
 */
export const Sparkline = ({ tone = 'light' }: { tone?: 'light' | 'dark' }) => {
  const id = useId()
  const areaId = `${id}-area`
  const lineId = `${id}-line`
  const stop = tone === 'light' ? '#1268CC' : '#A0AEC0'

  return (
    <svg viewBox="0 0 135.5 114.5" preserveAspectRatio="none" fill="none" aria-hidden="true" className="size-full">
      <defs>
        <linearGradient id={areaId} x1="93.5" y1="12" x2="93.5" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor={stop} stopOpacity="0.5" />
          <stop offset="1" stopColor={stop} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={lineId} x1="179.1" y1="0.5" x2="-30.9" y2="0.5" gradientUnits="userSpaceOnUse">
          <stop stopColor={stop} stopOpacity="0" />
          <stop offset="0.526" stopColor={stop} />
          <stop offset="1" stopColor={stop} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M34.5 18.5C31.0369 17 26.0824 20.5792 24.5 25.5C23.8333 27.4203 23.16 30.9952 20 32.5C9.5 37.5 11.5 54.5 0 52V114.5H135.5V47C125.5 47.5 114 40 106.5 19.5C101.365 5.46459 94.0357 10 92 19.5C90.1786 28 89.5 29.5 86 29.5C81.2453 29.5 80.5 19.5 75.9888 18.6911C70.6196 17.7284 69 26.5 63.573 18.6911C59.7068 13.128 59.7079 0 53.5 0C47.2921 0 50.4775 29.2855 45 31.5C39.5225 33.7145 39.6124 20.7143 34.5 18.5Z"
        fill={`url(#${areaId})`}
      />
      <path
        opacity="0.5"
        d="M135.106 47C125.106 47.5 113.606 40.5 106.106 20C100.971 5.96459 93.6419 10.5 91.6062 20C89.7848 28.5 89.1062 30 85.6062 30C80.8515 30 80.1062 20 75.595 19.1911C70.2258 18.2284 68.6062 27 63.1792 19.1911C59.313 13.628 59.3141 0.5 53.1062 0.5C46.8983 0.5 50.0332 29.5247 44.5557 31.7391C39.0781 33.9536 38.2467 18.8089 33.6062 18.5C28.128 18.1354 25.6886 21.0792 24.1062 26C23.4395 27.9203 21.639 31.7529 18.6062 33.5C8.60621 39.2609 11.6062 54.5 0.106215 52"
        stroke={`url(#${lineId})`}
      />
    </svg>
  )
}
