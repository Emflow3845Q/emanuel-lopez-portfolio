import { describe, expect, it } from 'vitest'
import { isNotFoundPath } from './notFound'

describe('isNotFoundPath', () => {
  it('reconoce la portada', () => {
    expect(isNotFoundPath('/')).toBe(false)
    expect(isNotFoundPath('/index.html')).toBe(false)
  })

  it('trata cualquier otra ruta como 404', () => {
    expect(isNotFoundPath('/no-existe')).toBe(true)
    expect(isNotFoundPath('/proyecto/otto')).toBe(true)
    expect(isNotFoundPath('/assets/')).toBe(true)
  })
})
