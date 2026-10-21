import { type ImgHTMLAttributes, useState } from 'react'
import { cn } from '@/lib/cn'
import { buildSrcSet, CARD_WIDTHS, optimizedSrc } from '@/lib/images'

interface ProjectImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  /** URL de Cloudinary. Con `null` (o si falla la carga) se muestra un marcador visual. */
  src: string | null
  /** Título del proyecto: de él sale el monograma del marcador. */
  label: string
  widths?: readonly number[]
  alt: string
  /** Imágenes visibles al cargar la página: se piden primero y sin esperar al scroll. */
  priority?: boolean
}

/** "CM3D Launcher — Colombia Mods 3D" → "CM3D"; "Sistema de Clientes" → "SC"; "Otto" → "OTTO". */
export function monogram(label: string, max = 3): string {
  const words = label.split(' — ')[0].trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  if (/^[A-Z0-9]{2,}$/.test(words[0])) return words[0]
  if (words.length === 1) return words[0].slice(0, 4).toUpperCase()
  return words
    .filter((word) => word.length > 2 || /^\p{Lu}/u.test(word))
    .slice(0, max)
    .map((word) => word[0].toUpperCase())
    .join('')
}

export function ProjectImage({
  src,
  label,
  widths = CARD_WIDTHS,
  alt,
  sizes,
  priority = false,
  className,
  ...rest
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        {...(alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true })}
        className={cn(
          'relative grid place-items-center overflow-hidden bg-[radial-gradient(ellipse_at_28%_18%,var(--color-accent-dim),transparent_62%),linear-gradient(135deg,#151517,#0a0a0b)]',
          className,
        )}
      >
        <span
          aria-hidden
          className="absolute inset-0 opacity-70 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:32px_32px]"
        />
        <span
          aria-hidden
          className="relative font-display text-[clamp(2.5rem,9vw,5rem)] font-extrabold leading-none tracking-[-0.06em] text-white/15"
        >
          {monogram(label)}
        </span>
      </div>
    )
  }

  const largest = widths[widths.length - 1]

  return (
    <img
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable={false}
      {...rest}
      src={optimizedSrc(src, largest)}
      srcSet={buildSrcSet(src, widths)}
      sizes={sizes}
      alt={alt}
      width={1080}
      height={500}
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
