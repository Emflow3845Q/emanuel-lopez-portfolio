const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/

/**
 * Anchos que la web pide a Cloudinary. Son pocos y fijos a propósito: Cloudinary genera cada
 * variante la primera vez que alguien la pide (lento), y después la sirve desde su CDN. Menos
 * variantes = menos primeras cargas lentas. `npm run warm:images` las pide todas de antemano.
 */
export const CARD_WIDTHS = [480, 800] as const
export const MODAL_WIDTHS = [800, 1200] as const
export const ZOOM_WIDTHS = [1600] as const

/**
 * Inserta transformaciones de Cloudinary: formato y calidad automáticos, y ancho máximo
 * (`c_limit` nunca agranda la imagen). Las URLs que no son de Cloudinary se devuelven intactas.
 */
export function optimizedSrc(url: string, width: number): string {
  const match = CLOUDINARY_UPLOAD.exec(url)
  if (!match) return url
  return `${match[1]}f_auto,q_auto,c_limit,w_${width}/${match[2]}`
}

export function buildSrcSet(url: string, widths: readonly number[]): string | undefined {
  if (!CLOUDINARY_UPLOAD.test(url)) return undefined
  return widths.map((w) => `${optimizedSrc(url, w)} ${w}w`).join(', ')
}
