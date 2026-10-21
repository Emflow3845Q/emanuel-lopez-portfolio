import { flushSync } from 'react-dom'

/**
 * Ejecuta una actualización de estado dentro de una View Transition (si el navegador la soporta),
 * produciendo un fundido suave. En navegadores sin soporte simplemente aplica el cambio.
 */
export function withViewTransition(update: () => void): void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || typeof document.startViewTransition !== 'function') {
    update()
    return
  }
  document.startViewTransition(() => {
    flushSync(update)
  })
}
