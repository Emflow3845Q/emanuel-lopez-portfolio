import { ExternalLink } from 'lucide-react'
import * as m from 'motion/react-m'
import type { Project } from '@/data/projects'
import { useLanguage } from '@/i18n/LanguageContext'
import { easeOutExpo } from '@/lib/motion'
import { ProjectImage } from './ProjectImage'

interface ProjectCardProps {
  project: Project
  index: number
  /** Tarjetas visibles al cargar: su imagen se pide con prioridad. */
  priority?: boolean
  onOpen: (project: Project, trigger: HTMLElement) => void
  /** Se dispara al mostrar intención de abrir (hover/foco) para precargar el modal. */
  onIntent?: () => void
}

const CARD_SIZES = '(min-width: 1024px) 380px, (min-width: 768px) 30vw, 100vw'

export function ProjectCard({ project, index, priority = false, onOpen, onIntent }: ProjectCardProps) {
  const { t, lang } = useLanguage()
  const { title } = project.text[lang]

  return (
    <m.article
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.035, ease: easeOutExpo }}
      onPointerEnter={onIntent}
      onFocusCapture={onIntent}
      className="group border-travel relative aspect-[16/10] min-h-[190px] w-full min-w-0 select-none overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-4 has-[button:focus-visible]:outline-accent min-[481px]:aspect-[16/10] min-[481px]:min-h-0 md:aspect-[2.16/1]"
    >
      <div className="absolute inset-0 overflow-hidden bg-night">
        <ProjectImage
          src={project.image}
          label={title}
          alt=""
          sizes={CARD_SIZES}
          priority={priority}
          className="size-full object-cover object-top brightness-[0.88] grayscale-[0.3]"
        />
      </div>
      {/* Degradado oscuro fijo: el título siempre se lee, también en el tema claro */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(5_4_4/0.92)_0%,rgb(5_4_4/0.55)_38%,rgb(5_4_4/0.05)_68%,transparent_100%)]" />

      <div className="absolute inset-x-0 bottom-0 z-2 px-3.5 py-3 min-[481px]:px-4 min-[481px]:py-3.5">
        {project.status === 'in-development' && (
          <span className="mb-1.5 inline-block rounded-full border border-white/40 bg-black/40 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[#f0ede8]">
            {t.projects.inDevelopment}
          </span>
        )}
        <h3 className="font-display text-[0.96rem] font-bold leading-tight tracking-[-0.02em] text-[#f0ede8] min-[481px]:text-base">
          {title}
        </h3>
      </div>

      {/* Botón que abre el detalle: cubre toda la tarjeta */}
      <button
        type="button"
        onClick={(e) => onOpen(project, e.currentTarget)}
        aria-label={`${t.projects.openDescription} ${title}`}
        className="absolute inset-0 z-3 cursor-pointer rounded-[inherit] border-0 bg-transparent outline-none"
      />

      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          title={t.projects.demoTitle}
          aria-label={`${t.projects.demoTitle}: ${title}`}
          className="absolute right-3 top-3 z-5 flex size-8 items-center justify-center rounded-full bg-accent-solid text-white no-underline"
        >
          <ExternalLink size={15} strokeWidth={2} />
        </a>
      )}
    </m.article>
  )
}
