import { Moon, Sun } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import { useTheme } from '@/theme/ThemeContext'

export function ThemeToggle() {
  const { t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.nav.toLight : t.nav.toDark}
      className="grid size-8 place-items-center rounded-[3px] border border-accent bg-transparent text-ink transition-[background,box-shadow,color] duration-250 hover:bg-accent-solid hover:text-white hover:shadow-[0_0_16px_var(--color-glow)] min-[481px]:size-9"
    >
      {isDark ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
    </button>
  )
}
