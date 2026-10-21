import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionTitle } from '@/components/ui/Section'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'

const lead =
  'mb-5 font-display text-[1.2rem] font-medium leading-[1.4] tracking-[-0.02em] text-ink md:text-[1.45rem] [&_strong]:font-bold [&_strong]:text-accent'
const support =
  'text-[0.98rem] font-light leading-[1.75] text-ink-2 md:text-base [&_strong]:font-medium [&_strong]:text-ink'

export function About() {
  const { t } = useLanguage()

  return (
    <Section id="about">
      <div className="grid items-center gap-9 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div>
          <SectionTitle label={t.about.label} title={t.about.title} underlineClassName="mb-7" />
          <Reveal delay={0.1}>
            <p className={lead}>{t.about.lead}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={support}>{t.about.text}</p>
          </Reveal>
        </div>

        <Reveal className="relative flex items-center justify-center max-md:hidden">
          <TerminalPanel />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <ol className="m-0 mt-10 grid list-none gap-6 border-t border-line-2 p-0 pt-6 md:mt-14 md:grid-cols-3 md:gap-8 md:pt-8">
          {t.about.pillars.map((pillar, i) => (
            <li key={pillar.title} className="flex gap-4 md:block">
              <span className="font-mono text-label tracking-[0.02em] text-accent md:mb-3 md:block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="mb-1.5 font-display text-[1.05rem] font-bold tracking-[-0.02em] text-ink md:text-[1.15rem]">
                  {pillar.title}
                </h3>
                <p className="text-body-sm leading-[1.65] text-ink-2">{pillar.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}

/** Terminal decorativa: conserva su paleta oscura también en el tema claro. */
function TerminalPanel() {
  const { t } = useLanguage()

  return (
    <div
      data-theme="dark"
      className="w-full max-w-[420px] overflow-hidden rounded-xl border border-line-2 bg-surface shadow-[0_30px_60px_rgb(0_0_0/0.35)]"
    >
      <div className="flex items-center gap-2 border-b border-line bg-night-2 px-4 py-3">
        <span className="size-[9px] rounded-full bg-line-2" />
        <span className="size-[9px] rounded-full bg-line-2" />
        <span className="size-[9px] rounded-full bg-line-2" />
        <span className="ml-auto font-mono text-caption tracking-[0.02em] text-ink-3">~/emanuel-lopez</span>
      </div>
      <div className="px-5 pb-6 pt-5 font-mono text-[0.82rem]" aria-hidden>
        <Command>whoami</Command>
        <Output>{t.terminal.identity}</Output>
        <Command>cat stack.txt</Command>
        <Output>React · TypeScript · Node.js · Python</Output>
        <Command>status --check</Command>
        <Output accent last>
          {t.terminal.status} <span className="inline-block animate-cursor-blink">▌</span>
        </Output>
      </div>
    </div>
  )
}

function Command({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1 text-ink-2">
      <span className="mr-2 text-accent">$</span> {children}
    </p>
  )
}

function Output({ children, accent, last }: { children: ReactNode; accent?: boolean; last?: boolean }) {
  return <p className={cn('pl-5 leading-[1.6]', !last && 'mb-4', accent ? 'text-accent' : 'text-ink')}>{children}</p>
}
