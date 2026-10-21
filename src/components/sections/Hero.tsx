import { ArrowRight, Download } from 'lucide-react'
import { useMotionTemplate, useMotionValue } from 'motion/react'
import * as m from 'motion/react-m'
import { type PointerEvent, useRef } from 'react'
import { site } from '@/data/site'
import { useInViewport } from '@/hooks/useInViewport'
import { useLanguage } from '@/i18n/LanguageContext'
import { easeOutExpo, heroFadeUp } from '@/lib/motion'
import { btnPrimary, btnSecondary, iconSlide } from '@/lib/ui'
import { HeroPoster } from './HeroPoster'
import { HeroStats } from './HeroStats'

export function Hero() {
  const { t, lang } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const onScreen = useInViewport(ref)

  // Cursor dentro del Hero: alimenta el foco de luz y el parallax del póster (solo con ratón).
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const spotX = useMotionValue(0)
  const spotY = useMotionValue(0)
  const spotOpacity = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX}px ${spotY}px, var(--color-accent-dim), transparent 70%)`

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    spotX.set(x)
    spotY.set(y)
    spotOpacity.set(1)
    pointerX.set(x / rect.width)
    pointerY.set(y / rect.height)
  }
  const onPointerLeave = () => {
    spotOpacity.set(0)
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  return (
    <section
      ref={ref}
      id="hero"
      data-offscreen={!onScreen}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative flex min-h-svh scroll-mt-14 items-center overflow-hidden px-gutter-wide max-md:block max-md:pb-12 max-md:pt-24 md:pb-[clamp(4.5rem,9vh,7rem)] md:pt-[clamp(5.5rem,11vh,8rem)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(var(--color-grid)_1px,transparent_1px),linear-gradient(90deg,var(--color-grid)_1px,transparent_1px)] bg-[length:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_100%)]" />
        <m.div
          className="absolute inset-0 max-md:hidden"
          style={{ background: spotlight, opacity: spotOpacity }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute -right-20 -top-[180px] size-[500px] rounded-full bg-[radial-gradient(circle,var(--color-accent-dim)_0%,transparent_70%)] opacity-70 blur-[140px]" />
      </div>

      <div className="relative z-1 grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
        <div className="min-w-0 max-w-[760px] max-md:max-w-full max-md:pt-2">
          <m.div
            {...heroFadeUp(0.2, 0.8)}
            className="mb-5 inline-flex items-center font-mono text-[0.62rem] tracking-[0.03em] text-accent min-[361px]:text-[0.68rem] min-[481px]:mb-7 min-[481px]:text-label min-[481px]:tracking-[0.04em]"
          >
            {t.hero.available}
            <span className="ml-[9px] size-[5px] animate-status-pulse rounded-full bg-accent" />
          </m.div>

          <h1 className="mb-5 font-display min-[481px]:mb-[clamp(1rem,2.6vh,1.5rem)] text-[clamp(2rem,11vw,2.6rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink min-[361px]:text-[clamp(2.35rem,11vw,3.6rem)] min-[481px]:text-[clamp(2.75rem,min(5.5vw,9vh),4.5rem)]">
            {t.hero.greeting.map((text, i) => (
              <span key={text} className="block overflow-hidden">
                <m.span
                  className={
                    i === 1
                      ? 'block animate-shimmer bg-[linear-gradient(100deg,var(--color-accent)_20%,var(--color-accent-2)_50%,var(--color-accent)_80%)] bg-[length:200%_100%] bg-clip-text text-transparent'
                      : 'block'
                  }
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.15, ease: easeOutExpo }}
                >
                  {text}
                </m.span>
              </span>
            ))}
          </h1>

          <m.div {...heroFadeUp(0.8)} className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 min-[481px]:mb-4">
            <span className="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-ink min-[481px]:text-[1.25rem]">
              {t.hero.title}
            </span>
            <span aria-hidden className="h-px w-6 bg-accent" />
            <span className="font-mono text-label tracking-[0.02em] text-ink-3">{t.hero.location}</span>
          </m.div>

          <m.p
            {...heroFadeUp(0.9)}
            className="mb-6 max-w-[560px] text-base font-light leading-[1.7] text-ink-2 max-md:max-w-full min-[481px]:mb-[clamp(1.25rem,3.5vh,2.25rem)] min-[481px]:text-[clamp(1rem,min(1.5vw,2.4vh),1.2rem)] [&_strong]:font-medium [&_strong]:text-ink"
          >
            {t.hero.role}
          </m.p>

          <m.div
            {...heroFadeUp(1)}
            className="flex flex-col items-stretch gap-3.5 max-md:w-[min(100%,320px)] md:flex-row md:flex-wrap md:items-center md:gap-4 max-md:[&>a]:w-full max-md:[&>a]:justify-center"
          >
            <a href="#projects" className={btnPrimary}>
              <span>{t.hero.projectsButton}</span>
              <ArrowRight size={16} strokeWidth={2.5} className={iconSlide} />
            </a>
            <a href={site.cv[lang]} download className={btnSecondary}>
              <Download size={15} strokeWidth={2} />
              <span>{t.hero.downloadCv}</span>
            </a>
          </m.div>

          <HeroStats />
        </div>

        <HeroPoster pointerX={pointerX} pointerY={pointerY} />
      </div>

      <m.div
        aria-hidden
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: easeOutExpo }}
        className="absolute bottom-8 left-[max(var(--gutter),calc((100%-var(--content-max))/2+var(--gutter)))] hidden items-center gap-4 md:flex"
      >
        <div className="relative h-px w-10 overflow-hidden bg-ink-3">
          <div className="absolute inset-0 animate-scroll-line bg-accent" />
        </div>
        <span className="text-caption font-medium uppercase tracking-[0.15em] text-ink-3">{t.hero.scroll}</span>
      </m.div>
    </section>
  )
}
