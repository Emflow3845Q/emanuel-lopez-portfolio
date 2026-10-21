import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as m from 'motion/react-m'
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { type Project, type ProjectCategory, projectCategories, projects } from '@/data/projects'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useProjectRoute } from '@/hooks/useProjectRoute'
import { useProjectsSlider } from '@/hooks/useProjectsSlider'
import { useLanguage } from '@/i18n/LanguageContext'
import { chunk } from '@/lib/array'
import { cn } from '@/lib/cn'

type Filter = 'all' | ProjectCategory

const PER_PAGE = 9
const loadModal = () => import('@/components/projects/ProjectModal')
const ProjectModal = lazy(loadModal)

export function Projects() {
  const { t } = useLanguage()
  const isSlider = useMediaQuery('(min-width: 768px)')
  const [filter, setFilter] = useState<Filter>('all')
  const route = useProjectRoute()
  const openerRef = useRef<HTMLElement | null>(null)
  // El modal se descarga bajo demanda; una vez cargado se mantiene montado para animar su salida.
  const [modalRequested, setModalRequested] = useState(route.slug !== null)

  const selected = useMemo(() => projects.find((p) => p.slug === route.slug) ?? null, [route.slug])

  const pages = useMemo(
    () => chunk(filter === 'all' ? projects : projects.filter((p) => p.category === filter), PER_PAGE),
    [filter],
  )
  const slider = useProjectsSlider(pages.length, filter, isSlider)

  // Enlace directo a un proyecto: llevamos la vista hasta la sección.
  // biome-ignore lint/correctness/useExhaustiveDependencies: solo al montar
  useEffect(() => {
    if (route.slug) document.getElementById('projects')?.scrollIntoView()
  }, [])

  const openProject = (project: Project, trigger: HTMLElement) => {
    openerRef.current = trigger
    setModalRequested(true)
    route.open(project.slug)
  }

  const closeProject = () => {
    route.close()
    openerRef.current?.focus()
  }

  const filters: Filter[] = ['all', ...projectCategories]

  return (
    <Section id="projects" tone="alt">
      <SectionHeading label={t.projects.label} title={t.projects.title} />

      <Reveal>
        <div
          role="status"
          className="mb-6 flex items-center gap-3 rounded border border-l-2 border-line-2 border-l-accent bg-accent-dim px-3 py-2 min-[481px]:px-4 min-[481px]:py-2.5"
        >
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_var(--color-glow)]" />
          <p className="font-mono text-[0.72rem] leading-normal text-ink-2 min-[481px]:text-label">
            {t.projects.notice}
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mb-7 flex flex-wrap gap-2 min-[481px]:gap-2">
          {filters.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={cn(
                'rounded border px-3 py-1.5 font-mono text-caption tracking-[0.01em] transition-all duration-250 hover:border-accent-solid hover:bg-accent-solid hover:text-white min-[481px]:px-3.5 min-[481px]:py-1.5 min-[481px]:text-[0.74rem]',
                filter === key
                  ? 'border-accent-solid bg-accent-solid text-white'
                  : 'border-line-2 bg-transparent text-ink-2',
              )}
            >
              {t.filters[key]}
            </button>
          ))}
        </div>
      </Reveal>

      <m.div
        key={filter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div
          ref={slider.trackRef}
          {...slider.trackProps}
          data-dragging={slider.dragging || undefined}
          {...(isSlider
            ? { role: 'region', 'aria-roledescription': 'carousel', 'aria-label': t.projects.carousel, tabIndex: 0 }
            : {})}
          className="grid min-w-0 grid-cols-1 gap-4 md:flex md:cursor-grab md:snap-x md:snap-mandatory md:overflow-x-auto md:rounded-3xl md:[-ms-overflow-style:none] md:[scrollbar-width:none] md:data-[dragging]:cursor-grabbing md:data-[dragging]:snap-none md:[&::-webkit-scrollbar]:hidden"
        >
          {pages.map((page, pageIndex) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: las páginas se recalculan por completo al filtrar
              key={pageIndex}
              inert={isSlider && pageIndex !== slider.page}
              className="contents md:grid md:flex-[0_0_100%] md:snap-start md:grid-cols-3 md:gap-4 lg:gap-5"
            >
              {page.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  priority={pageIndex === 0}
                  onOpen={openProject}
                  onIntent={loadModal}
                />
              ))}
            </div>
          ))}
        </div>
      </m.div>

      <div className="mt-7 flex items-center justify-between max-md:hidden">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {pages.map((_, i) => (
              <button
                // biome-ignore lint/suspicious/noArrayIndexKey: un punto por página, sin identidad propia
                key={i}
                type="button"
                onClick={() => slider.goTo(i)}
                aria-label={`${t.projects.goToPage} ${i + 1}`}
                aria-current={i === slider.page}
                className={cn(
                  'h-2 rounded-full border-0 p-0 transition-[background,width] duration-300',
                  i === slider.page ? 'w-[22px] bg-accent' : 'w-2 bg-line-2',
                )}
              />
            ))}
          </div>
          <span className="font-mono text-caption tracking-[0.04em] text-ink-3" aria-live="polite">
            {String(slider.page + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
          </span>
        </div>
        <div className="flex gap-2.5">
          <ArrowButton label={t.projects.prev} disabled={!slider.canPrev} onClick={() => slider.goTo(slider.page - 1)}>
            <ChevronLeft size={18} strokeWidth={2.5} />
          </ArrowButton>
          <ArrowButton label={t.projects.next} disabled={!slider.canNext} onClick={() => slider.goTo(slider.page + 1)}>
            <ChevronRight size={18} strokeWidth={2.5} />
          </ArrowButton>
        </div>
      </div>

      {modalRequested && (
        <Suspense fallback={null}>
          <ProjectModal project={selected} onClose={closeProject} />
        </Suspense>
      )}
    </Section>
  )
}

interface ArrowButtonProps {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}

function ArrowButton({ label, disabled, onClick, children }: ArrowButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-full border border-line-2 bg-transparent text-ink transition-[border-color,background,color] duration-250 hover:border-accent-solid hover:bg-accent-solid hover:text-white disabled:pointer-events-none disabled:cursor-default disabled:opacity-30"
    >
      {children}
    </button>
  )
}
