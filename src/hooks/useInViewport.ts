import { type RefObject, useEffect, useState } from 'react'

export function useInViewport<T extends Element>(ref: RefObject<T | null>, rootMargin = '200px 0px'): boolean {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return visible
}
