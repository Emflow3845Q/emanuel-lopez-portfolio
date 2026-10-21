import { describe, expect, it } from 'vitest'
import { parseProjectSlug, projectHash } from './hashRoute'

describe('parseProjectSlug', () => {
  it('extrae el slug de #/proyecto/<slug>', () => {
    expect(parseProjectSlug('#/proyecto/cm3d-launcher')).toBe('cm3d-launcher')
  })

  it('ignora otros hashes y rutas vacías', () => {
    expect(parseProjectSlug('#projects')).toBeNull()
    expect(parseProjectSlug('')).toBeNull()
    expect(parseProjectSlug('#/proyecto/')).toBeNull()
  })

  it('es el inverso de projectHash', () => {
    expect(parseProjectSlug(projectHash('otto'))).toBe('otto')
    expect(parseProjectSlug(projectHash('a b'))).toBe('a b')
  })
})
