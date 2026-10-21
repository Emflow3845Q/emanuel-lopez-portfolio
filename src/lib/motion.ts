import type { Transition } from 'motion/react'

export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOutExpo = [0.76, 0, 0.24, 1] as const

export const expoTransition = (duration = 0.8, delay = 0): Transition => ({
  duration,
  delay,
  ease: easeOutExpo,
})

export const heroFadeUp = (delay: number, duration = 0.9) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: expoTransition(duration, delay),
})
