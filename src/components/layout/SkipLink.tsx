import { useLanguage } from '@/i18n/LanguageContext'

export function SkipLink() {
  const { t } = useLanguage()
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-[10000] -translate-y-24 rounded bg-accent-solid px-4 py-2 font-mono text-label text-white no-underline transition-transform duration-200 focus:translate-y-0"
    >
      {t.nav.skip}
    </a>
  )
}
