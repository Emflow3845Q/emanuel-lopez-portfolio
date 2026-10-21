import { type KeyboardEvent, type PointerEvent, useCallback, useEffect, useRef, useState } from 'react'

const DRAG_THRESHOLD = 5
const SWIPE_RATIO = 0.15

interface DragState {
  active: boolean
  moved: boolean
  startX: number
  startScroll: number
}

/**
 * Carrusel horizontal con scroll-snap: flechas, puntos, teclado y arrastre con el ratón.
 * Una "página" equivale al ancho visible del contenedor.
 */
export function useProjectsSlider(pageCount: number, resetKey: unknown, enabled: boolean) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const [dragging, setDragging] = useState(false)
  const scrollTimeout = useRef<number | undefined>(undefined)
  const drag = useRef<DragState>({ active: false, moved: false, startX: 0, startScroll: 0 })

  // biome-ignore lint/correctness/useExhaustiveDependencies: resetKey es un disparador intencional
  useEffect(() => {
    setPage(0)
    trackRef.current?.scrollTo({ left: 0 })
  }, [resetKey])

  useEffect(() => () => window.clearTimeout(scrollTimeout.current), [])

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(pageCount - 1, index))
      setPage(next)
      const track = trackRef.current
      track?.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' })
    },
    [pageCount],
  )

  /** Mantiene `page` sincronizado cuando el scroll cambia por gestos táctiles o la rueda. */
  const onScroll = useCallback(() => {
    window.clearTimeout(scrollTimeout.current)
    scrollTimeout.current = window.setTimeout(() => {
      const track = trackRef.current
      if (track && track.clientWidth > 0) setPage(Math.round(track.scrollLeft / track.clientWidth))
    }, 100)
  }, [])

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!enabled) return
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goTo(page + 1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goTo(page - 1)
      }
    },
    [enabled, goTo, page],
  )

  // Arrastre con el ratón (el táctil usa el scroll nativo).
  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current
      if (!enabled || !track || event.pointerType !== 'mouse' || event.button !== 0) return
      drag.current = { active: true, moved: false, startX: event.clientX, startScroll: track.scrollLeft }
    },
    [enabled],
  )

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current
    const track = trackRef.current
    if (!state.active || !track) return
    const delta = event.clientX - state.startX
    if (!state.moved && Math.abs(delta) > DRAG_THRESHOLD) {
      state.moved = true
      setDragging(true)
      track.setPointerCapture(event.pointerId)
    }
    if (state.moved) track.scrollLeft = state.startScroll - delta
  }, [])

  const endDrag = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const state = drag.current
      const track = trackRef.current
      if (!state.active || !track) return
      state.active = false
      if (!state.moved) return
      setDragging(false)
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
      const travelled = (state.startScroll - track.scrollLeft) / track.clientWidth // <0: hacia la derecha
      const base = Math.round(state.startScroll / track.clientWidth)
      if (travelled < -SWIPE_RATIO) goTo(base + 1)
      else if (travelled > SWIPE_RATIO) goTo(base - 1)
      else goTo(base)
    },
    [goTo],
  )

  return {
    trackRef,
    page,
    dragging,
    goTo,
    canPrev: page > 0,
    canNext: page < pageCount - 1,
    trackProps: {
      onScroll,
      onKeyDown,
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  }
}
