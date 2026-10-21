import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { LangToggle } from '@/components/layout/LangToggle'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { site } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'
import { btnPrimary, btnSecondary } from '@/lib/ui'

export function NotFound() {
  const { t } = useLanguage()

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!meta) return
    const previous = meta.content
    meta.content = 'noindex, follow'
    return () => {
      meta.content = previous
    }
  }, [])

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between px-gutter-wide py-3.5 md:py-5">
        <a
          href="/"
          className="flex items-center gap-2 font-display text-[0.94rem] font-bold tracking-[-0.01em] text-ink no-underline min-[481px]:text-[1.1rem]"
        >
          <span className="size-1.5 shrink-0 animate-pulse-dot rounded-full bg-accent" />
          {site.name}
        </a>
        <div className="flex items-center gap-2.5">
          <LangToggle />
          <ThemeToggle />
        </div>
      </header>

      <main
        id="main"
        className="mx-auto flex w-full max-w-[1300px] flex-1 flex-col items-center justify-center gap-4 px-gutter pb-8 pt-2 md:gap-5 text-center"
      >
        <p className="font-mono text-label uppercase tracking-[0.15em] text-accent before:mr-[0.5ch] before:text-ink-3 before:content-['//']">
          {t.notFound.label}
        </p>
        <p
          aria-hidden
          className="font-display text-[clamp(5.5rem,22vw,10.5rem)] font-extrabold leading-none tracking-[-0.04em] text-ink"
        >
          4<span className="text-accent">0</span>4
        </p>
        <div className="flex max-w-[520px] flex-col gap-3">
          <h1 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.02em]">
            {t.notFound.title}
          </h1>
          <p className="text-[1.02rem] font-light leading-[1.8] text-ink-2">{t.notFound.text}</p>
        </div>

        <div
          data-theme="dark"
          aria-hidden
          className="w-full max-w-[460px] overflow-hidden rounded-xl border border-line-2 bg-surface text-left shadow-[0_30px_60px_rgb(0_0_0/0.35)]"
        >
          <div className="flex items-center gap-2 border-b border-line bg-night-2 px-4 py-3">
            <span className="size-[9px] rounded-full bg-line-2" />
            <span className="size-[9px] rounded-full bg-line-2" />
            <span className="size-[9px] rounded-full bg-line-2" />
          </div>
          <div className="break-all px-6 py-6 font-mono text-[0.85rem] leading-[1.6]">
            <p className="text-ink-2">
              <span className="mr-2 text-accent">$</span>curl -I {window.location.pathname}
            </p>
            <p className="pl-5 text-accent">HTTP/1.1 404 Not Found</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/" className={btnPrimary}>
            <ArrowLeft
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-spring group-hover:-translate-x-[3px]"
            />
            <span>{t.notFound.home}</span>
          </a>
          <a href="/#projects" className={btnSecondary}>
            {t.notFound.projects}
          </a>
        </div>
      </main>
    </div>
  )
}
