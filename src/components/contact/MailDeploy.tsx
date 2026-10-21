import { X } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/lib/motion'
import { DeployLog } from './deploy/DeployLog'
import { DeployOutcome } from './deploy/DeployOutcome'
import { DeployPipeline } from './deploy/DeployPipeline'
import type { DeployPhase, DeployResult } from './deploy/types'

interface MailDeployProps {
  phase: DeployPhase
  result: DeployResult
  onDismiss: () => void
}

export default function MailDeploy({ phase, result, onDismiss }: MailDeployProps) {
  const { t } = useLanguage()
  const visible = phase !== 'idle'
  const complete = phase === 'complete'

  useEffect(() => {
    if (!visible) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onDismiss()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onDismiss])

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          role="status"
          aria-live="polite"
          data-theme="dark"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="fixed inset-x-4 bottom-4 z-1000 overflow-hidden rounded-[10px] border border-t-2 border-line-2 border-t-accent bg-[#0c0c0c] p-6 font-mono text-[0.7rem] leading-[1.8] text-ink-3 shadow-[0_30px_100px_rgb(0_0_0/0.6),0_0_60px_var(--color-glow)] min-[640px]:left-auto min-[640px]:right-6 min-[640px]:bottom-6 min-[640px]:w-[min(500px,calc(100vw-3rem))]"
        >
          <div className="absolute inset-x-0 top-0 h-px -translate-y-2.5 animate-scan-panel bg-accent opacity-80 shadow-[0_0_18px_3px_var(--color-accent)]" />

          <header className="mb-4 flex items-center gap-3 border-b border-line pb-4">
            <span className="size-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_0_5px_var(--color-accent-dim),0_0_22px_var(--color-accent)]" />
            <div>
              <small className="block text-[0.58rem] tracking-[0.16em] text-accent">{t.feedback.transmission}</small>
              <strong className="mt-[3px] block font-display text-[1.05rem] font-bold tracking-normal text-ink">
                {t.feedback.deployed}
              </strong>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label={t.feedback.dismiss}
              className="ml-auto grid size-7 place-items-center rounded-full border border-line-2 bg-transparent text-ink-2 transition-colors hover:border-accent hover:text-ink"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </header>

          <DeployPipeline complete={complete} />
          <DeployLog complete={complete} />

          <div className="mt-[18px] h-[3px] overflow-hidden bg-line-2">
            <m.span
              className={cn(
                'block h-full shadow-[0_0_12px_var(--color-accent)]',
                complete ? 'bg-accent-2' : 'bg-accent',
              )}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: complete ? 0.4 : 1.5, ease: easeOutExpo }}
            />
          </div>

          <DeployOutcome result={result} />
        </m.div>
      )}
    </AnimatePresence>
  )
}
