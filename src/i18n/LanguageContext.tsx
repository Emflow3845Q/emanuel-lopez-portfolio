import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { isNotFoundPath } from '@/lib/notFound'
import { withViewTransition } from '@/lib/viewTransition'
import { type Dictionary, dictionaries, type Lang } from './translations'

interface LanguageContextValue {
  lang: Lang
  t: Dictionary
  toggleLang: () => void
}

const STORAGE_KEY = 'portfolio-language'
const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'es' || stored === 'en') return stored
  } catch {
    /* localStorage no disponible */
  }
  return 'es'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    const { title, notFoundTitle } = dictionaries[lang].meta
    document.title = isNotFoundPath(window.location.pathname) ? notFoundTitle : title
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const toggleLang = useCallback(() => withViewTransition(() => setLang((l) => (l === 'es' ? 'en' : 'es'))), [])

  const value = useMemo<LanguageContextValue>(() => ({ lang, t: dictionaries[lang], toggleLang }), [lang, toggleLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  return ctx
}
