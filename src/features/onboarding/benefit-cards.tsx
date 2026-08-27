import { useCallback, useEffect, useRef, useState } from 'react'
import { Checkbox } from '../../components/ui/checkbox'
import { cn } from '../../lib/cn'
import type { BenefitOption } from './types'

type BenefitCardsProps = {
  options: BenefitOption[]
  selected: string[]
  onToggle: (id: string) => void
}

/** Decorative dots that orbit the illustration (Grey 150 / Grey 100 in Figma). */
const DOTS = [
  { className: 'left-[84.5%] top-[87.5%] size-[5.2%] bg-grey-150' },
  { className: 'left-[93%] top-[7.9%] size-[2.9%] bg-grey-150' },
  { className: 'left-0 top-[26.1%] size-[2.8%] bg-grey-150' },
  { className: 'left-[-4.7%] top-[0.6%] size-[18.8%] bg-grey-100' },
  { className: 'left-[95.9%] top-[15.3%] size-[7.9%] bg-grey-100' },
  { className: 'left-[80%] top-[92.6%] size-[2.3%] bg-grey-150' },
]

/**
 * Figma draws the resting card at 260x344 against a 280x381 featured one.
 * 260/280 and 344/381 both land within a hair of 0.92, so a single scale
 * reproduces the design without animating width or height.
 */
const RESTING_SCALE = 0.92

/**
 * Step 8's card carousel.
 *
 * Two states are deliberately kept apart:
 *
 *  - **Featured** is positional. Whichever card sits nearest the middle of the
 *    rail is shown at full size; scrolling changes it, selecting does not.
 *  - **Selected** is the answer, and drives the border and the checkbox.
 *
 * Every card keeps the same 280x381 footprint and the size difference is a
 * `transform: scale()`. Animating width/height/font-size instead would relayout
 * on every frame — and because the cards live in a horizontal scroller, a width
 * change also shifts the scroll content underneath the user's finger, which is
 * what made the earlier version stutter. Transform is composited, changes no
 * layout, and leaves the scroll position alone.
 */
export const BenefitCards = ({ options, selected, onToggle }: BenefitCardsProps) => {
  const rail = useRef<HTMLDivElement>(null)
  const [featured, setFeatured] = useState(0)

  const measure = useCallback(() => {
    const node = rail.current
    if (!node) return

    const railCentre = node.getBoundingClientRect().left + node.clientWidth / 2
    let nearest = 0
    let shortest = Number.POSITIVE_INFINITY

    Array.from(node.children).forEach((child, index) => {
      const box = child.getBoundingClientRect()
      const distance = Math.abs(box.left + box.width / 2 - railCentre)
      if (distance < shortest) {
        shortest = distance
        nearest = index
      }
    })

    setFeatured(nearest)
  }, [])

  useEffect(() => {
    const node = rail.current
    if (!node) return

    measure()
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    node.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  return (
    <div
      ref={rail}
      className="no-scrollbar -mx-gutter -my-3 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-gutter py-3 md:mx-0 md:px-0"
    >
      {options.map((option, index) => {
        const isSelected = selected.includes(option.id)
        const isFeatured = index === featured

        return (
          <button
            key={option.id}
            type="button"
            role="checkbox"
            aria-checked={isSelected}
            onClick={() => onToggle(option.id)}
            style={{ transform: `scale(${isFeatured ? 1 : RESTING_SCALE})` }}
            className={cn(
              'relative flex h-[381px] w-[280px] shrink-0 snap-center flex-col items-center justify-center',
              'rounded-tile border bg-white px-4 py-5 shadow-tile',
              'will-change-transform transition-[transform,border-color] duration-300 ease-out',
              isSelected ? 'border-brand-500' : 'border-grey-200 hover:border-grey-300',
            )}
          >
            <span className="relative block w-full flex-1">
              <span className="absolute inset-0 flex items-center justify-center px-[5px]">
                <span className="relative block aspect-square w-[176px]">
                  <img
                    src={option.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-[5.7%] size-[88.6%] rounded-full object-cover"
                  />
                  {DOTS.map((dot, dotIndex) => (
                    <span key={dotIndex} className={cn('absolute rounded-full', dot.className)} aria-hidden="true" />
                  ))}
                </span>
              </span>
            </span>

            <span className="flex w-full flex-col items-start">
              <span className="flex w-full items-center justify-center py-2.5">
                <span className="text-center text-base font-semibold leading-6 text-grey-800">{option.title}</span>
              </span>
              <span className="flex w-full items-center justify-center">
                <span className="flex-1 text-center text-sm font-medium leading-5 text-grey-600">{option.description}</span>
              </span>
            </span>

            <span className="absolute right-[22px] top-[13px]">
              <Checkbox checked={isSelected} />
            </span>
          </button>
        )
      })}
    </div>
  )
}
