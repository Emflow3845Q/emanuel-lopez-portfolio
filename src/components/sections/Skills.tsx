import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Section, SectionHeading } from '@/components/ui/Section'
import { useLanguage } from '@/i18n/LanguageContext'

const SkillsGrid = lazy(() => import('./SkillsGrid'))

export function Skills() {
  const { t } = useLanguage()
  const gridRef = useRef<HTMLDivElement>(null)
  const [shouldLoadGrid, setShouldLoadGrid] = useState(false)

  useEffect(() => {
    const element = gridRef.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setShouldLoadGrid(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadGrid(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="skills" tone="alt">
      <SectionHeading label={t.skills.label} title={t.skills.title} nowrap />

      <div
        ref={gridRef}
        className="min-h-[2100px] min-[481px]:min-h-[1750px] min-[768px]:min-h-[1500px] min-[1024px]:min-h-[1200px] min-[1280px]:min-h-[1000px]"
      >
        {shouldLoadGrid && (
          <Suspense fallback={null}>
            <SkillsGrid />
          </Suspense>
        )}
      </div>
    </Section>
  )
}
