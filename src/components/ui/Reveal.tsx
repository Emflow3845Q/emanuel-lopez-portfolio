import * as m from 'motion/react-m'
import type { ReactNode } from 'react'
import { expoTransition } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  delay?: number
  x?: number
  y?: number
  duration?: number
  className?: string
}

export function Reveal({ children, delay = 0, x = 0, y = 40, duration = 0.8, className }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
      transition={expoTransition(duration, delay)}
    >
      {children}
    </m.div>
  )
}
