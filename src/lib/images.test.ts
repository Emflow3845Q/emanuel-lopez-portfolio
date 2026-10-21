import { describe, expect, it } from 'vitest'
import { buildSrcSet, optimizedSrc } from './images'

const CLOUD = 'https://res.cloudinary.com/demo/image/upload/v123/sample.png'

describe('optimizedSrc', () => {
  it('inserta formato, calidad y ancho tras /upload/', () => {
    expect(optimizedSrc(CLOUD, 800)).toBe(
      'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_limit,w_800/v123/sample.png',
    )
  })

  it('no toca URLs que no son de Cloudinary', () => {
    expect(optimizedSrc('/assets/local.webp', 800)).toBe('/assets/local.webp')
  })
})

describe('buildSrcSet', () => {
  it('genera un candidato por ancho', () => {
    const srcset = buildSrcSet(CLOUD, [480, 800])
    expect(srcset).toContain('w_480/v123/sample.png 480w')
    expect(srcset).toContain('w_800/v123/sample.png 800w')
  })

  it('devuelve undefined para imágenes locales', () => {
    expect(buildSrcSet('/assets/local.webp', [480])).toBeUndefined()
  })
})
