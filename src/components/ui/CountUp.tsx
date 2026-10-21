import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  /** Valor con sufijo opcional, p. ej. "15+". */
  value: string
  delay?: number
  duration?: number
  className?: string
}

const easeOut = (t: number) => 1 - (1 - t) ** 4

function parse(value: string): { target: number; suffix: string } | null {
  const match = /^(\d+)(.*)$/.exec(value)
  return match ? { target: Number(match[1]), suffix: match[2] } : null
}

/** Cuenta de 0 al valor cuando entra en pantalla. Sin movimiento si el usuario lo reduce. */
export function CountUp({ value, delay = 0, duration = 1600, className }: CountUpProps) {
  const parsed = parse(value)
  const target = parsed?.target ?? 0
  const suffix = parsed?.suffix ?? ''
  const animated = parsed !== null
  const ref = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(target)

  useEffect(() => {
    const node = ref.current
    if (!node || !animated) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target)
      return
    }

    let frame = 0
    let timer = 0
    setCurrent(0)
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        setCurrent(Math.round(target * easeOut(progress)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = window.setTimeout(run, delay)
      },
      { threshold: 0.6 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [animated, target, delay, duration])

  if (!animated) return <strong className={className}>{value}</strong>

  return (
    <strong ref={ref} className={className}>
      <span aria-hidden className="tabular-nums">
        {current}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </strong>
  )
}
