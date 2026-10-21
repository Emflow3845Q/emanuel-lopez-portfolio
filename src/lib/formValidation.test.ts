import { describe, expect, it } from 'vitest'
import { getFieldErrorKey } from './formValidation'

const valid = { valueMissing: false, typeMismatch: false, tooShort: false }

describe('getFieldErrorKey', () => {
  it('devuelve null cuando el campo es válido', () => {
    expect(getFieldErrorKey(valid)).toBeNull()
  })

  it('prioriza "required" sobre los demás errores', () => {
    expect(getFieldErrorKey({ valueMissing: true, typeMismatch: true, tooShort: true })).toBe('required')
  })

  it('distingue email inválido y texto demasiado corto', () => {
    expect(getFieldErrorKey({ ...valid, typeMismatch: true })).toBe('email')
    expect(getFieldErrorKey({ ...valid, tooShort: true })).toBe('tooShort')
  })
})
