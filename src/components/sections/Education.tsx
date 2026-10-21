import { Award, BookOpen, GraduationCap, type LucideIcon, ZoomIn } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { type Credential, type CredentialKind, credentials } from '@/data/education'
import { useLanguage } from '@/i18n/LanguageContext'

// El visor se descarga la primera vez que el usuario apunta a una miniatura (o la abre).
const loadViewer = () => import('./CertificateModal')
const CertificateModal = lazy(loadViewer)

const kindIcon: Record<CredentialKind, LucideIcon> = {
  degree: GraduationCap,
  certification: Award,
  course: BookOpen,
}

export function Education() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<Credential | null>(null)

  return (
    <div className="mt-4 md:mt-8">
      <Reveal>
        <h3
          id="education-heading"
          className="mb-6 flex items-center gap-3 font-display text-[1.2rem] font-bold tracking-[-0.03em] text-ink md:text-[1.4rem]"
        >
          {t.education.title}
          <span aria-hidden className="h-px flex-1 bg-line" />
        </h3>
      </Reveal>

      <ul
        aria-labelledby="education-heading"
        className="m-0 grid list-none grid-cols-1 gap-3 p-0 min-[481px]:gap-4 md:grid-cols-2"
      >
        {credentials.map((credential, i) => (
          <li key={credential.id} className="min-w-0">
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <CredentialCard credential={credential} onOpen={() => setSelected(credential)} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Suspense fallback={null}>
        <CertificateModal credential={selected} onClose={() => setSelected(null)} />
      </Suspense>
    </div>
  )
}

function CredentialCard({ credential, onOpen }: { credential: Credential; onOpen: () => void }) {
  const { t, lang } = useLanguage()
  const { title, period } = credential.text[lang]
  const Icon = kindIcon[credential.kind]
  const { preview } = credential

  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border border-line bg-surface p-4 transition-[border-color,background] duration-300 hover:border-line-2 hover:bg-accent-dim min-[481px]:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 font-mono text-caption uppercase tracking-[0.08em] text-accent">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-night">
            <Icon aria-hidden className="size-[17px] text-ink" />
          </span>
          {t.education.kinds[credential.kind]}
        </span>
        {credential.status === 'in-progress' && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line-2 px-2.5 py-0.5 font-mono text-caption text-ink-2">
            <span aria-hidden className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
            {t.education.inProgress}
          </span>
        )}
      </div>

      <div className="flex-1">
        <h4 className="font-display text-[1.02rem] font-bold leading-snug tracking-[-0.02em] text-ink md:text-[1.1rem]">
          {title}
        </h4>
        <p className="mt-1.5 text-body-sm leading-normal text-ink-2">{credential.institution}</p>
      </div>

      {preview && (
        <button
          type="button"
          onClick={onOpen}
          onPointerEnter={loadViewer}
          onFocus={loadViewer}
          aria-haspopup="dialog"
          aria-label={`${t.education.viewCertificate}: ${title}`}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-line-2 bg-white p-0 outline-none transition-[border-color,transform] duration-300 hover:border-accent focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <img
            src={preview.thumb}
            alt=""
            width={preview.width}
            height={preview.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-black/75 py-2 font-mono text-caption text-white opacity-0 transition-opacity duration-250 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100">
            <ZoomIn aria-hidden size={14} strokeWidth={2} />
            {t.education.viewCertificate}
          </span>
        </button>
      )}

      <span className="text-label tracking-[0.06em] text-ink-2">{period}</span>
    </article>
  )
}
