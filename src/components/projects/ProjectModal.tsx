import { X } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'
import { type Project, tagLabel } from '@/data/projects'
import { useBodyClass } from '@/hooks/useBodyClass'
import { useDialogKeys } from '@/hooks/useDialogKeys'
import { useLanguage } from '@/i18n/LanguageContext'
import { MODAL_WIDTHS, ZOOM_WIDTHS } from '@/lib/images'
import { easeOutExpo } from '@/lib/motion'
import { btnPrimary } from '@/lib/ui'
import { ProjectImage } from './ProjectImage'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

const MODAL_IMAGE_SIZES = '(min-width: 601px) 58vw, 100vw'

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, lang } = useLanguage()
  const [zoomed, setZoomed] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useBodyClass('modal-open', project !== null)

  // Reinicia el zoom al cambiar de proyecto y enfoca el botón de cerrar.
  // biome-ignore lint/correctness/useExhaustiveDependencies: depende solo de cambios de proyecto
  useEffect(() => {
    setZoomed(false)
    if (project) closeRef.current?.focus()
  }, [project?.id])

  useDialogKeys(project !== null, panelRef, () => (zoomed ? setZoomed(false) : onClose()))

  const text = project?.text[lang]

  return (
    <AnimatePresence>
      {project && text && (
        <div
          key={project.id}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          data-theme="dark"
          className="fixed inset-0 z-500 grid place-items-center p-4 min-[601px]:p-6"
        >
          <m.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <m.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="relative block max-h-[90vh] w-[min(1100px,100%)] overflow-y-auto rounded-lg border border-t-2 border-line-2 border-t-accent bg-surface text-ink shadow-[0_28px_80px_rgb(0_0_0/0.5)] min-[601px]:grid min-[601px]:max-h-[min(620px,90vh)] min-[601px]:grid-cols-[minmax(0,58%)_minmax(300px,42%)] min-[601px]:items-center"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.modal.close}
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border border-line-2 bg-transparent text-ink-2 transition-[color,border-color,transform] duration-250 hover:rotate-90 hover:border-accent hover:text-ink"
            >
              <X size={18} strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={() => setZoomed(true)}
              disabled={!project.image}
              aria-label={project.image ? t.modal.zoomIn : undefined}
              className="block w-full enabled:cursor-zoom-in disabled:cursor-default border-0 bg-transparent p-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <ProjectImage
                src={project.image}
                label={text.title}
                widths={MODAL_WIDTHS}
                sizes={MODAL_IMAGE_SIZES}
                alt={`${t.modal.preview} ${text.title}`}
                loading="eager"
                className="h-[180px] w-full border-b border-line bg-night object-contain min-[601px]:aspect-[2.16/1] min-[601px]:h-auto min-[601px]:border-b-0 min-[601px]:border-r"
              />
            </button>

            <div className="px-6 py-6 min-[601px]:p-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <div className="flex items-center font-mono text-label tracking-[0.02em] text-accent before:mr-[0.5ch] before:text-ink-3 before:content-['//']">
                  {t.filters[project.category]}
                </div>
                {project.status === 'in-development' && (
                  <span className="rounded-full border border-accent px-2.5 py-0.5 font-mono text-caption uppercase tracking-[0.08em] text-accent">
                    {t.projects.inDevelopment}
                  </span>
                )}
              </div>
              <h2
                id="project-modal-title"
                className="mb-4 mt-3 max-w-[90%] font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-[1.05] text-ink"
              >
                {text.title}
              </h2>
              <p className="text-[0.95rem] leading-[1.65] text-ink-2">{text.desc}</p>
              <p className="mb-2 mt-5 font-mono text-caption uppercase tracking-[0.1em] text-ink-3">{t.modal.stack}</p>
              <ul className="m-0 mb-6 flex list-none flex-wrap gap-2 p-0">
                {project.tags.map((tag) => (
                  <li
                    key={tagLabel(tag, 'es')}
                    className="rounded-[3px] border border-line-2 px-[9px] py-[5px] font-mono text-[0.68rem] text-ink-2"
                  >
                    {tagLabel(tag, lang)}
                  </li>
                ))}
              </ul>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  {t.modal.demo}
                </a>
              )}
            </div>
          </m.div>

          <AnimatePresence>
            {zoomed && (
              <m.button
                key="zoom"
                type="button"
                onClick={() => setZoomed(false)}
                aria-label={t.modal.zoomOut}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-[5vh_5vw] z-501 cursor-zoom-out rounded-lg border-0 bg-night/95 p-0"
              >
                <ProjectImage
                  src={project.image}
                  label={text.title}
                  widths={ZOOM_WIDTHS}
                  sizes="90vw"
                  alt={text.title}
                  loading="eager"
                  className="size-full rounded-lg object-contain"
                />
              </m.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  )
}
