import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { APPEARANCE_STORAGE_KEY, AppearanceContext, type Appearance } from './appearance'

const read = (): Appearance => {
  try {
    return localStorage.getItem(APPEARANCE_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    // Private mode or blocked storage — fall back to the default look.
    return 'light'
  }
}

/** Holds which dashboard frame is showing, and remembers it per browser. */
export const AppearanceProvider = ({ children }: { children: ReactNode }) => {
  const [appearance, setAppearance] = useState<Appearance>(read)

  useEffect(() => {
    try {
      localStorage.setItem(APPEARANCE_STORAGE_KEY, appearance)
    } catch {
      // Nothing to do — the choice simply will not survive a reload.
    }
  }, [appearance])

  const toggle = useCallback(() => setAppearance((current) => (current === 'dark' ? 'light' : 'dark')), [])
  const value = useMemo(() => ({ appearance, toggle }), [appearance, toggle])

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>
}
