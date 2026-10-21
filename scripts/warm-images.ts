/**
 * Calienta la caché de Cloudinary: pide una vez cada variante de imagen que usa la web.
 * Cloudinary genera cada transformación la primera vez que se pide (puede tardar segundos);
 * a partir de ahí la sirve desde su CDN. Ejecútalo después de subir o cambiar imágenes:
 *
 *   npm run warm:images
 */
import { experience } from '../src/data/experience.ts'
import { projects } from '../src/data/projects.ts'
import { CARD_WIDTHS, MODAL_WIDTHS, optimizedSrc, ZOOM_WIDTHS } from '../src/lib/images.ts'

const widths = [...new Set([...CARD_WIDTHS, ...MODAL_WIDTHS, ...ZOOM_WIDTHS])]
const sources = [...projects.map((p) => p.image), ...experience.map((e) => e.logo)].filter(
  (url): url is string => Boolean(url),
)
const urls = sources.flatMap((src) => widths.map((w) => optimizedSrc(src, w)))

// f_auto elige el formato según la cabecera Accept: se piden AVIF/WebP y el formato de reserva.
const ACCEPTS = ['image/avif,image/webp,*/*', 'image/webp,*/*', '*/*']

let ok = 0
const failed: string[] = []
const queue = urls.flatMap((url) => ACCEPTS.map((accept) => ({ url, accept })))

async function worker() {
  for (let job = queue.pop(); job; job = queue.pop()) {
    try {
      const res = await fetch(job.url, { headers: { Accept: job.accept } })
      await res.arrayBuffer()
      if (res.ok) ok++
      else failed.push(`${res.status} ${job.url}`)
    } catch (error) {
      failed.push(`${(error as Error).message} ${job.url}`)
    }
  }
}

const total = queue.length
await Promise.all(Array.from({ length: 6 }, worker))
console.log(`Variantes calentadas: ${ok}/${total}`)
if (failed.length) {
  console.error(`Fallaron ${failed.length}:\n${[...new Set(failed)].join('\n')}`)
  process.exitCode = 1
}
