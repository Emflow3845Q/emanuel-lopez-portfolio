import { Check, X } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/lib/motion'
import type { DeployResult } from './types'

export function DeployOutcome({ result }: { result: DeployResult }) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      {result && (
        <m.div
          initial={{ opacity: 0, height: 0, marginTop: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 20, y: 0, scale: 1 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="grid justify-items-center gap-[5px] overflow-hidden"
        >
          <div
            className={cn(
              'grid size-[42px] animate-result-pop place-items-center rounded-full',
              result === 'success'
                ? 'bg-accent-2 text-[#0c0c0c] shadow-[0_0_26px_rgb(255_122_77/0.45)]'
                : 'bg-accent-solid text-white shadow-[0_0_26px_var(--color-glow)]',
            )}
          >
            {result === 'success' ? <Check size={22} strokeWidth={2.5} /> : <X size={22} strokeWidth={2.5} />}
          </div>
          <strong className="font-display text-[1.15rem] text-ink">
            {result === 'success' ? t.feedback.success : t.feedback.error}
          </strong>
          <span className="text-[0.68rem] text-ink-2">
            {result === 'success' ? t.feedback.detail : t.feedback.errorDetail}
          </span>
        </m.div>
      )}
    </AnimatePresence>
  )
}
