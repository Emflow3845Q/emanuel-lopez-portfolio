import { Layers, Mail, Server, SquareTerminal } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'

export function DeployPipeline({ complete }: { complete: boolean }) {
  const { t } = useLanguage()
  const nodes = [
    { icon: SquareTerminal, label: t.feedback.code },
    { icon: Layers, label: t.feedback.build },
    { icon: Server, label: t.feedback.server },
    { icon: Mail, label: t.feedback.inbox },
  ]

  return (
    <div aria-hidden className="relative mb-[26px] mt-1 grid grid-cols-4 items-start">
      <span className="absolute left-[12%] right-[12%] top-[21px] h-px overflow-hidden bg-line-2">
        <span className="absolute inset-0 -translate-x-full animate-pipeline-flow bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)]" />
      </span>
      <span className="absolute left-[10%] top-[17px] z-2 size-[9px] animate-packet-travel rounded-xs bg-accent shadow-[0_0_14px_var(--color-accent)]" />
      {nodes.map(({ icon: Icon, label }, i) => (
        <div
          key={label}
          style={{ animationDelay: `${i * 0.25}s` }}
          className="relative z-1 grid animate-node-pulse justify-items-center gap-[7px] text-ink-3"
        >
          <Icon
            strokeWidth={1.8}
            className={cn(
              'size-[42px] rounded-full border bg-night p-2.5 transition-[color,border-color,box-shadow] duration-300',
              complete || i === 0 ? 'border-accent text-accent shadow-[0_0_18px_var(--color-glow)]' : 'border-line-2',
            )}
          />
          <small className="text-[0.55rem] tracking-[0.12em]">{label}</small>
        </div>
      ))}
    </div>
  )
}
