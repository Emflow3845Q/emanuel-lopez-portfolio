/** Mini-router por hash para el modal de proyectos: `#/proyecto/<slug>` (compartible; "atrás" cierra el modal). */
const PROJECT_PREFIX = '#/proyecto/'
const MODAL_STATE = { projectModal: true } as const

export function parseProjectSlug(hash: string): string | null {
  if (!hash.startsWith(PROJECT_PREFIX)) return null
  const slug = decodeURIComponent(hash.slice(PROJECT_PREFIX.length)).trim()
  return slug.length > 0 ? slug : null
}

export function projectHash(slug: string): string {
  return `${PROJECT_PREFIX}${encodeURIComponent(slug)}`
}

export function subscribeToRoute(callback: () => void): () => void {
  window.addEventListener('hashchange', callback)
  window.addEventListener('popstate', callback)
  return () => {
    window.removeEventListener('hashchange', callback)
    window.removeEventListener('popstate', callback)
  }
}

export const getCurrentSlug = (): string | null => parseProjectSlug(window.location.hash)
export const getServerSlug = (): string | null => null

function notify() {
  // pushState/replaceState no emiten eventos: avisamos a los suscriptores manualmente.
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function openProjectRoute(slug: string): void {
  window.history.pushState(MODAL_STATE, '', projectHash(slug))
  notify()
}

export function closeProjectRoute(): void {
  if (window.history.state?.projectModal) {
    // Abrimos nosotros: retrocedemos para no dejar entradas huérfanas en el historial.
    window.history.back()
    return
  }
  // Llegamos por enlace directo: reemplazamos la entrada por la sección de proyectos.
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#projects`)
  notify()
}
