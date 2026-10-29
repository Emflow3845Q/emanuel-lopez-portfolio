import { type ComponentType, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'

interface DeferredSectionProps {
  id: string
  component: ComponentType
  tone?: 'default' | 'alt'
  minHeight?: string
  eager?: boolean
}

export function DeferredSection({
  id,
  component: Component,
  tone = 'default',
  minHeight = '60vh',
  eager = false,
}: DeferredSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [shouldLoad, setShouldLoad] = useState(eager)

  useEffect(() => {
    if (shouldLoad) return
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const loadForHash = () => {
      if (window.location.hash === `#${id}`) setShouldLoad(true)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px' },
    )
    observer.observe(section)
    window.addEventListener('hashchange', loadForHash)
    loadForHash()
    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', loadForHash)
    }
  }, [id, shouldLoad])

  if (!shouldLoad) return <Placeholder ref={sectionRef} id={id} tone={tone} minHeight={minHeight} />

  return (
    <Suspense fallback={<Placeholder id={id} tone={tone} minHeight={minHeight} />}>
      <>
        <Component />
        <RestoreAnchorScroll id={id} />
      </>
    </Suspense>
  )
}

function RestoreAnchorScroll({ id }: { id: string }) {
  useLayoutEffect(() => {
    if (window.location.hash === `#${id}`) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [id])

  return null
}

function Placeholder({
  id,
  tone,
  minHeight,
  ref,
}: {
  id: string
  tone: 'default' | 'alt'
  minHeight: string
  ref?: React.Ref<HTMLElement>
}) {
  return (
    <section
      ref={ref}
      id={id}
      aria-busy="true"
      className={`relative scroll-mt-14 ${tone === 'default' ? 'bg-night' : 'bg-night-2'}`}
    >
      <div className="mx-auto max-w-[1300px] px-gutter py-section" style={{ minHeight }} />
    </section>
  )
}
