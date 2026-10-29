import * as m from 'motion/react-m'
import { type Skill, skillGroups, skillLabel } from '@/data/skills'
import { useLanguage } from '@/i18n/LanguageContext'
import { expoTransition } from '@/lib/motion'

export default function SkillsGrid() {
  const { t, lang } = useLanguage()

  return (
    <div className="flex flex-col gap-9 md:gap-11">
      {skillGroups.map((group) => (
        <section key={group.id} aria-labelledby={`skills-${group.id}`}>
          <h3
            id={`skills-${group.id}`}
            className="mb-4 flex items-center gap-3 font-mono text-label font-normal tracking-[0.02em] text-ink-2"
          >
            <span className="text-accent">{String(group.skills.length).padStart(2, '0')}</span>
            {t.skills.groups[group.id]}
            <span aria-hidden className="h-px flex-1 bg-line" />
          </h3>

          <ul className="m-0 grid list-none grid-cols-3 gap-2.5 p-0 min-[481px]:grid-cols-4 min-[481px]:gap-3 md:grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
            {group.skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} label={skillLabel(skill, lang)} index={i} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function SkillCard({ skill, label, index }: { skill: Skill; label: string; index: number }) {
  const Icon = skill.icon
  return (
    <m.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
      transition={expoTransition(0.7, (index % 8) * 0.04)}
      className={
        'group relative flex min-h-[96px] cursor-default flex-col items-center justify-center gap-2.5 overflow-hidden rounded-xl border bg-surface px-2 py-4 transition-[border-color,background,transform] duration-300 hover:-translate-y-1 hover:border-line-2 hover:bg-accent-dim md:min-h-0 md:rounded-xl md:px-4 md:py-5 border-line'
      }
    >
      <span className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-accent transition-transform duration-400 ease-out-expo group-hover:scale-x-100" />
      <Icon
        aria-hidden
        className="size-8 text-ink opacity-70 transition-[opacity,transform] duration-300 ease-spring group-hover:scale-110 group-hover:opacity-100 md:size-9"
      />
      <span className="text-center text-[0.68rem] font-medium leading-[1.25] tracking-[0.03em] text-ink-2 transition-colors duration-300 [overflow-wrap:anywhere] group-hover:text-ink md:text-[0.74rem]">
        {label}
      </span>
    </m.li>
  )
}
