import { useLanguage } from '@/i18n/LanguageContext'

export function LangToggle() {
  const { t, toggleLang } = useLanguage()
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.nav.switchLang}
      className="grid h-8 min-w-9 place-items-center rounded-[3px] border border-accent bg-transparent px-2.5 font-mono text-label leading-none min-[481px]:h-9 min-[481px]:px-3.5 text-ink transition-[background,box-shadow,color] duration-250 hover:bg-accent-solid hover:text-white hover:shadow-[0_0_16px_var(--color-glow)]"
    >
      {t.nav.langButton}
    </button>
  )
}
