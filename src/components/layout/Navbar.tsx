import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useState } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useBodyClass } from '@/hooks/useBodyClass'
import { useScrolled } from '@/hooks/useScrolled'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/lib/motion'
import { LangToggle } from './LangToggle'
import { ThemeToggle } from './ThemeToggle'

const links = ['about', 'skills', 'experience', 'projects'] as const
const mobileLinks = [...links, 'contact'] as const
const sectionIds = ['hero', ...mobileLinks] as const

const burgerLine = 'block h-[1.5px] w-6 bg-ink transition-[transform,opacity] duration-300 ease-out-expo'

export function Navbar() {
  const { t } = useLanguage()
  const scrolled = useScrolled(80)
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)

  useBodyClass('modal-open', open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav
        aria-label={t.nav.label}
        className={cn(
          'fixed inset-x-0 top-0 z-100 flex items-center justify-between px-gutter-wide transition-[padding,background] duration-400 ease-out-expo',
          scrolled
            ? 'border-b border-line bg-night/85 py-2.5 backdrop-blur-xl min-[481px]:py-3 lg:py-3.5'
            : 'py-3.5 min-[481px]:py-4 lg:py-5',
        )}
      >
        <a
          href="#hero"
          className="flex max-w-[110px] items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap font-display text-[0.94rem] font-bold tracking-[-0.01em] text-ink no-underline min-[361px]:max-w-none min-[481px]:text-[1.1rem]"
        >
          <span className="size-1.5 shrink-0 animate-pulse-dot rounded-full bg-accent" />
          Emanuel López
        </a>

        <ul className="m-0 hidden list-none items-center gap-[22px] p-0 min-[901px]:flex lg:gap-10">
          {links.map((key) => {
            const isActive = active === key
            return (
              <li key={key}>
                <a
                  href={`#${key}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'group relative text-[0.74rem] font-medium uppercase tracking-[0.05em] no-underline transition-colors duration-300 hover:text-ink lg:text-label lg:tracking-[0.08em]',
                    isActive ? 'text-ink' : 'text-ink-2',
                  )}
                >
                  {t.nav[key]}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-px bg-accent transition-[width] duration-400 ease-out-expo group-hover:w-full',
                      isActive ? 'w-full' : 'w-0',
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1.5 min-[481px]:gap-2.5">
          <a
            href="#contact"
            className="group hidden rounded border border-accent bg-transparent px-4 py-2 font-mono text-label tracking-[0.02em] text-ink no-underline transition-colors duration-250 hover:bg-accent-solid hover:text-white min-[901px]:inline-block"
          >
            <span className="text-accent transition-colors group-hover:text-white">[</span> {t.nav.talk}{' '}
            <span className="text-accent transition-colors group-hover:text-white">]</span>
          </a>
          <LangToggle />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex flex-col gap-[5px] border-0 bg-transparent p-1.5 min-[901px]:hidden"
          >
            <span className={cn(burgerLine, open && 'translate-y-[6.5px] rotate-45')} />
            <span className={cn(burgerLine, open && 'scale-x-0 opacity-0')} />
            <span className={cn(burgerLine, open && '-translate-y-[6.5px] -rotate-45')} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="fixed inset-0 z-99 flex flex-col items-center justify-center gap-5 bg-night p-6 min-[481px]:gap-8"
          >
            {mobileLinks.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setOpen(false)}
                aria-current={active === key ? 'true' : undefined}
                className={cn(
                  'font-display text-[clamp(2rem,9vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.03em] no-underline transition-colors duration-300 hover:text-accent min-[481px]:text-[clamp(2rem,8vw,3.5rem)]',
                  active === key ? 'text-accent' : 'text-ink',
                )}
              >
                {t.nav[key]}
              </a>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
