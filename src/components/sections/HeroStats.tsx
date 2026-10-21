import * as m from 'motion/react-m'
import { CountUp } from '@/components/ui/CountUp'
import { site } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'
import { heroFadeUp } from '@/lib/motion'

export function HeroStats() {
  const { t } = useLanguage()
  const stats = [
    { value: site.stats.years, label: t.hero.years },
    { value: site.stats.projects, label: t.hero.projects },
    { value: site.stats.technologies, label: t.hero.technologies },
  ]

  return (
    <m.ul
      {...heroFadeUp(1.15, 0.8)}
      className="m-0 mt-7 grid max-w-[560px] list-none grid-cols-3 divide-x divide-line-2 border-t border-line-2 p-0 pt-5 md:mt-[clamp(1.5rem,4vh,2.75rem)]"
    >
      {stats.map(({ value, label }, i) => (
        <li key={label} className={i === 0 ? 'pr-3 md:pr-6' : 'px-3 md:px-6'}>
          <CountUp
            value={value}
            delay={1300 + i * 150}
            className="block font-display text-[1.6rem] font-bold leading-none tracking-[-0.03em] text-ink md:text-[2.2rem]"
          />
          <span className="mt-2 block font-mono text-[0.64rem] leading-snug tracking-[0.02em] text-ink-3 md:text-caption">
            {label}
          </span>
        </li>
      ))}
    </m.ul>
  )
}
