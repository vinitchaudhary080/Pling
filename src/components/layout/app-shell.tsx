import type { ReactNode } from 'react'
import { HomeIndicator } from './home-indicator'
import { SideNav } from './side-nav'
import { TopBar } from './top-bar'

type AppShellProps = {
  /** Desktop page title, shown in the top bar. */
  title: string
  subtitle?: string
  /** Set on screens reached from another page, so desktop gets a way back. */
  backTo?: string
  backLabel?: string
  topBarAction?: ReactNode
  /** The phone header — this is the Figma chrome, so it only renders below `lg:`. */
  mobileHeader?: ReactNode
  children: ReactNode
}

/**
 * One frame for every screen.
 *
 * Below `lg:` this is a pass-through: the page keeps the phone header from the
 * Figma frames and nothing else changes. From `lg:` it becomes a desktop
 * application — a persistent nav rail, a top bar carrying the page title, and a
 * content well — so Home, Activity and Daily Reports all share the same chrome
 * instead of each being a phone screen stretched to fill a monitor.
 */
export const AppShell = ({ title, subtitle, backTo, backLabel, topBarAction, mobileHeader, children }: AppShellProps) => (
  <div className="flex min-h-dvh bg-surface lg:bg-[#F4F6FA]">
    <SideNav />

    <div className="flex min-w-0 flex-1 flex-col">
      <TopBar title={title} subtitle={subtitle} backTo={backTo} backLabel={backLabel} action={topBarAction} />

      <div className="lg:hidden">{mobileHeader}</div>

      <main className="flex flex-1 flex-col lg:overflow-y-auto lg:px-10 lg:py-8">{children}</main>

      <HomeIndicator />
    </div>
  </div>
)
