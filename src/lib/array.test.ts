import { describe, expect, it } from 'vitest'
import { chunk } from './array'

describe('chunk', () => {
  it('divide en bloques del tamaño indicado', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('devuelve una página vacía si no hay elementos', () => {
    expect(chunk([], 9)).toEqual([[]])
  })

  it('rechaza tamaños inválidos', () => {
    expect(() => chunk([1], 0)).toThrow(RangeError)
  })
})
