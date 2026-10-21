// Netlify responde con index.html y estado 404 a cualquier ruta inexistente (ver public/_redirects).
const HOME_PATHS = new Set(['/', '/index.html'])

export const isNotFoundPath = (pathname: string): boolean => !HOME_PATHS.has(pathname)
