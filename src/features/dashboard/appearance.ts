import { createContext, useContext } from 'react'

/**
 * The Figma file ships two "Personalized journey" frames: one on a light
 * header with the workout-plan hero, one on a dark photographic header with a
 * vitals card. They are alternative looks for the same screen, so the header's
 * theme control switches between them.
 */
export type Appearance = 'light' | 'dark'

export const APPEARANCE_STORAGE_KEY = 'pling-appearance'

export type AppearanceValue = { appearance: Appearance; toggle: () => void }

export const AppearanceContext = createContext<AppearanceValue | null>(null)

export const useAppearance = (): AppearanceValue => {
  const value = useContext(AppearanceContext)
  if (!value) throw new Error('useAppearance must be used inside an AppearanceProvider')
  return value
}
