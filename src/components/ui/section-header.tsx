import type { ReactNode } from 'react'

/** Figma "Navigation - Section Header": 16px Bold title with an optional action. */
export const SectionHeader = ({ title, action }: { title: string; action?: ReactNode }) => (
  <div className="flex w-full items-center">
    <h2 className="min-w-0 flex-1 text-base font-bold leading-[26px] text-grey-800">{title}</h2>
    {action}
  </div>
)
