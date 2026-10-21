import { ArrowUp } from 'lucide-react'
import { site } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-line bg-night">
      <div className="mx-auto flex max-w-[1300px] flex-col items-center gap-3 px-gutter py-6 text-center md:flex-row md:justify-between md:py-8 md:text-left">
        <p className="text-label text-ink-3">
          © {site.year} <span className="text-ink-2">{site.name}</span> — {t.footer.rights}
        </p>
        <a
          href="#hero"
          className="flex items-center gap-2 text-label tracking-[0.06em] text-ink-2 no-underline transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-accent"
        >
          {t.footer.backTop}
          <ArrowUp size={14} strokeWidth={2} />
        </a>
      </div>
    </footer>
  )
}
