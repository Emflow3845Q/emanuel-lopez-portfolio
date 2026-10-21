import { type MotionValue, useSpring, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { site } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/lib/motion'

interface HeroPosterProps {
  /** Posición normalizada del cursor dentro del Hero (0–1). */
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
}

const chips = [
  { label: 'React', className: '-left-10 top-14', delay: '0s' },
  { label: 'Node.js', className: '-right-6 top-[44%]', delay: '-1.8s' },
  { label: 'TypeScript', className: '-bottom-4 left-20', delay: '-3.4s' },
]

export function HeroPoster({ pointerX, pointerY }: HeroPosterProps) {
  const { t } = useLanguage()
  const springConfig = { stiffness: 90, damping: 18, mass: 0.6 }
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-11, 11]), springConfig)
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [9, -9]), springConfig)
  const shiftX = useSpring(useTransform(pointerX, [0, 1], [10, -10]), springConfig)
  const shiftY = useSpring(useTransform(pointerY, [0, 1], [8, -8]), springConfig)

  return (
    <m.div
      aria-hidden
      initial={{ opacity: 0, x: 24, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: easeOutExpo }}
      className="pointer-events-none relative z-1 mr-6 hidden w-[min(340px,28vw)] lg:block"
    >
      <m.div style={{ rotateX, rotateY, x: shiftX, y: shiftY, transformPerspective: 900 }}>
        <div className="animate-float">
          <div className="relative aspect-square w-full rotate-[4deg] overflow-hidden border border-line-2 bg-surface shadow-[20px_20px_0_var(--color-accent-dim),0_30px_70px_rgb(0_0_0/0.25)]">
            <div className="absolute -right-2 -top-[30px] font-display text-[11rem] font-extrabold leading-none tracking-[-0.1em] text-ink/6">
              01
            </div>
            <div className="absolute bottom-14 left-6 z-2 font-display text-[2rem] font-extrabold leading-[0.88] tracking-[-0.06em] text-ink [&_span]:text-accent">
              {t.hero.posterWord}
            </div>
            <div className="absolute right-10 top-7 h-[230px] w-[175px] -rotate-[22deg] border border-ink/15" />
            <div className="absolute right-[66px] top-[50px] h-[185px] w-[140px] -rotate-[22deg] border border-accent" />
            <div className="absolute -top-[30px] right-[110px] h-[420px] w-0.5 animate-poster-beam bg-accent shadow-[0_0_24px_var(--color-glow)]" />
            <div className="absolute left-6 top-5 z-2 font-mono text-[0.58rem] tracking-[0.1em] text-ink-3">
              {t.hero.posterLabel}
            </div>
            <div className="absolute right-4 top-1/2 z-2 -translate-y-1/2 font-mono text-[0.55rem] tracking-[0.1em] text-ink-3 [writing-mode:vertical-rl]">
              {site.name.toUpperCase()} — {site.year}
            </div>
          </div>

          {chips.map(({ label, className, delay }) => (
            <span
              key={label}
              style={{ animationDelay: delay }}
              className={cn(
                'absolute z-3 flex animate-float items-center gap-2 rounded-full border border-line-2 bg-surface/85 px-3 py-1.5 font-mono text-[0.65rem] text-ink shadow-[0_10px_30px_rgb(0_0_0/0.25)] backdrop-blur-md',
                className,
              )}
            >
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
              {label}
            </span>
          ))}
        </div>
      </m.div>
    </m.div>
  )
}
