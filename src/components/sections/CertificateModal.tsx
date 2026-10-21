import { Download, ExternalLink, X } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useRef } from 'react'
import type { Credential } from '@/data/education'
import { useBodyClass } from '@/hooks/useBodyClass'
import { useDialogKeys } from '@/hooks/useDialogKeys'
import { useLanguage } from '@/i18n/LanguageContext'
import { easeOutExpo } from '@/lib/motion'
import { btnSecondary } from '@/lib/ui'

interface CertificateModalProps {
  credential: Credential | null
  onClose: () => void
}

/** Visor del certificado dentro de la propia web (no abre otra pestaña). */
export default function CertificateModal({ credential, onClose }: CertificateModalProps) {
  const { t, lang } = useLanguage()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useBodyClass('modal-open', credential !== null)
  useDialogKeys(credential !== null, panelRef, onClose)

  // Enfoca "cerrar" al abrir y devuelve el foco a la miniatura que lo abrió al cerrar.
  const credentialId = credential?.id
  useEffect(() => {
    if (!credentialId) return
    const trigger = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => trigger?.focus()
  }, [credentialId])

  const text = credential?.text[lang]
  const preview = credential?.preview

  return (
    <AnimatePresence>
      {credential && text && preview && (
        <div
          key={credential.id}
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          data-theme="dark"
          className="fixed inset-0 z-500 grid place-items-center p-3 min-[601px]:p-6"
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
            className="relative w-[min(1000px,100%)] max-h-[92vh] overflow-y-auto rounded-lg border border-t-2 border-line-2 border-t-accent bg-surface p-4 text-ink shadow-[0_28px_80px_rgb(0_0_0/0.5)] min-[601px]:p-7"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.modal.close}
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border border-line-2 bg-surface text-ink-2 transition-[color,border-color,transform] duration-250 hover:rotate-90 hover:border-accent hover:text-ink"
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className="flex items-center font-mono text-label tracking-[0.02em] text-accent before:mr-[0.5ch] before:text-ink-3 before:content-['//']">
              {t.education.kinds[credential.kind]}
            </div>
            <h2
              id="certificate-modal-title"
              className="mb-1 mt-2.5 max-w-[88%] font-display text-[clamp(1.2rem,2.6vw,1.8rem)] font-bold leading-tight tracking-[-0.02em] text-ink"
            >
              {text.title}
            </h2>
            <p className="mb-4 text-body-sm text-ink-2">
              {credential.institution} · {text.period}
            </p>

            <img
              src={preview.full}
              alt={`${t.education.certificateAlt} ${text.title}`}
              width={preview.width}
              height={preview.height}
              decoding="async"
              className="mx-auto block h-auto w-full rounded border border-line-2 bg-white"
            />

            {(credential.file || credential.verifyUrl) && (
              <div className="mt-4 flex flex-wrap gap-3">
                {credential.file && (
                  <a href={credential.file} download className={btnSecondary}>
                    <Download aria-hidden size={15} strokeWidth={2} />
                    {t.education.downloadPdf}
                  </a>
                )}
                {credential.verifyUrl && (
                  <a href={credential.verifyUrl} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                    <ExternalLink aria-hidden size={15} strokeWidth={2} />
                    {t.education.verify}
                  </a>
                )}
              </div>
            )}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}
