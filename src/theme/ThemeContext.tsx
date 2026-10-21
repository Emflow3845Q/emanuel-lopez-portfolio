import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { withViewTransition } from '@/lib/viewTransition'

export type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const STORAGE_KEY = 'portfolio-theme'
const META_COLORS: Record<Theme, string> = { dark: '#080808', light: '#f7f5f0' }

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme])
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // El script inline de index.html ya fijó data-theme antes del primer pintado.
  const [theme, setTheme] = useState<Theme>(() => readStored() ?? systemTheme())

  useEffect(() => applyTheme(theme), [theme])

  // Si la persona no eligió tema manualmente, seguimos el del sistema.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (!readStored()) setTheme(query.matches ? 'light' : 'dark')
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    withViewTransition(() => {
      setTheme((current) => {
        const next: Theme = current === 'dark' ? 'light' : 'dark'
        try {
          localStorage.setItem(STORAGE_KEY, next)
        } catch {
          /* sin almacenamiento: el cambio vale solo para esta visita */
        }
        return next
      })
    })
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return ctx
}
