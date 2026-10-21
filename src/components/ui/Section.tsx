import * as m from 'motion/react-m'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { expoTransition } from '@/lib/motion'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  tone?: 'default' | 'alt'
  children: ReactNode
}

export function Section({ id, tone = 'default', children }: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-14', tone === 'default' ? 'bg-night' : 'bg-night-2')}>
      <div className="mx-auto max-w-[1300px] px-gutter py-section">{children}</div>
    </section>
  )
}

interface SectionTitleProps {
  label: string
  title: ReactNode
  nowrap?: boolean
  underlineClassName?: string
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center font-mono text-label tracking-[0.02em] text-accent before:mr-[0.5ch] before:text-ink-3 before:content-['//']">
      {children}
    </div>
  )
}

export function SectionTitle({ label, title, nowrap, underlineClassName }: SectionTitleProps) {
  return (
    <Reveal className="min-w-0 max-w-full">
      <SectionLabel>{label}</SectionLabel>
      <h2
        className={cn(
          'font-display font-bold leading-none tracking-[-0.035em] text-ink',
          'text-[clamp(1.9rem,7vw,2.5rem)] min-[481px]:text-[clamp(2.2rem,4vw,3.25rem)] max-[360px]:text-[clamp(1.5rem,7.5vw,1.8rem)]',
          nowrap && 'md:whitespace-nowrap',
        )}
      >
        {title}
        <m.span
          aria-hidden
          className={cn('mt-4 block h-0.5 bg-accent shadow-[0_0_14px_var(--color-glow)]', underlineClassName)}
          initial={{ width: 0 }}
          whileInView={{ width: 54 }}
          viewport={{ once: true }}
          transition={expoTransition(0.8, 0.35)}
        />
      </h2>
    </Reveal>
  )
}

type SectionHeadingProps = Omit<SectionTitleProps, 'underlineClassName'>

export function SectionHeading(props: SectionHeadingProps) {
  return (
    <div className="mb-9 flex flex-col items-start gap-3 min-[481px]:mb-11 lg:mb-14 md:flex-row md:items-end md:justify-between">
      <SectionTitle {...props} />
    </div>
  )
}
