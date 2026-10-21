import { useState } from 'react'
import { monogram } from '@/components/projects/ProjectImage'

interface CompanyLogoProps {
  /** URL (Cloudinary o ruta local en /public). Con `null` (o si falla) se muestra el monograma de la empresa. */
  src: string | null
  company: string
  /** El logo ya trae su propio fondo (circular/cuadrado): ocupa todo el recuadro, sin relleno. */
  bleed?: boolean
}

const box = 'size-10 shrink-0 rounded-lg bg-[#111] md:size-[46px]'

export function CompanyLogo({ src, company, bleed = false }: CompanyLogoProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <span
        aria-hidden
        className={`${box} grid place-items-center border border-line-2 font-display text-[0.9rem] font-bold tracking-[-0.04em] text-ink-2 md:text-base`}
      >
        {monogram(company, 2)}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt=""
      width={46}
      height={46}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${box} ${bleed ? 'object-cover' : 'object-contain p-[7px]'}`}
    />
  )
}
