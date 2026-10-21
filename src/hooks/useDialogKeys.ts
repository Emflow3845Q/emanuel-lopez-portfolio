import { type RefObject, useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * Comportamiento de teclado de un diálogo modal: Escape llama a `onEscape` y Tab
 * queda atrapado dentro de `panelRef` mientras `active` sea verdadero.
 */
export function useDialogKeys(active: boolean, panelRef: RefObject<HTMLElement | null>, onEscape: () => void) {
  const escapeRef = useRef(onEscape)
  useEffect(() => {
    escapeRef.current = onEscape
  })

  useEffect(() => {
    if (!active) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        escapeRef.current()
        return
      }
      if (event.key === 'Tab' && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [active, panelRef])
}
