import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { experience } from '@/data/experience'
import { useLanguage } from '@/i18n/LanguageContext'
import { CompanyLogo } from './CompanyLogo'
import { Education } from './Education'

export function Experience() {
  const { t, lang } = useLanguage()

  return (
    <Section id="experience">
      <SectionHeading label={t.experience.label} title={t.experience.title} />

      <ol className="relative m-0 list-none p-0 pl-4 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-[linear-gradient(to_bottom,transparent,var(--color-line-2)_10%,var(--color-line-2)_90%,transparent)] before:content-[''] md:pl-8">
        {experience.map((item) => {
          const { role, period, desc, points } = item.text[lang]
          return (
            <li key={item.company}>
              <Reveal x={-20} y={0} duration={0.7} className="relative pb-10 pl-7 md:pb-12 md:pl-12">
                <div className="absolute -left-1 top-1.5 size-[9px] rounded-full bg-accent shadow-[0_0_0_3px_var(--color-night),0_0_0_5px_var(--color-accent-dim)]" />
                <div className="mb-2.5 flex items-center gap-3.5">
                  <CompanyLogo src={item.logo} company={item.company} bleed={item.logoBleed} />
                  <span className="text-label font-medium uppercase tracking-[0.08em] text-accent">{item.company}</span>
                </div>
                <h3 className="mb-2 font-display text-[1.2rem] font-bold tracking-[-0.03em] text-ink md:text-[1.4rem]">
                  {role}
                </h3>
                <div className="mb-3 text-label tracking-[0.06em] text-ink-2">{period}</div>
                <p className="max-w-[620px] text-[0.98rem] font-normal leading-[1.6] text-ink">{desc}</p>
                <ul className="m-0 mt-3 grid max-w-[720px] list-none gap-x-8 gap-y-1.5 p-0 md:grid-cols-2">
                  {points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-body-sm leading-[1.55] text-ink-2">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          )
        })}
      </ol>

      <Education />
    </Section>
  )
}
