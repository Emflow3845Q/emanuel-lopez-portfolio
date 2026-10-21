import * as m from 'motion/react-m'
import { site } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'

export function DeployLog({ complete }: { complete: boolean }) {
  const { t } = useLanguage()
  const lines = [
    t.feedback.connection,
    t.feedback.compiling,
    <>
      {t.feedback.delivered} <em className="not-italic text-accent">{site.email}</em>
    </>,
  ]

  return (
    <>
      <div className="whitespace-nowrap text-ink">
        <span className="mr-2 text-accent">$</span> mail.send(
        <b className="font-medium text-accent-2">{t.feedback.message}</b>)
        <i
          className={cn(
            'ml-1 inline-block h-[13px] w-1.5 align-[-2px]',
            complete ? 'bg-accent-2' : 'animate-cursor-blink bg-accent',
          )}
        />
      </div>
      <div className="grid gap-0.5">
        {lines.map((line, i) => (
          <m.span
            // biome-ignore lint/suspicious/noArrayIndexKey: lista fija de 3 líneas
            key={i}
            className="block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.25 + i * 0.4 }}
          >
            <b className="mr-2 font-normal text-ink-3">{`0${i + 1}`}</b>
            {line}
          </m.span>
        ))}
      </div>
    </>
  )
}
