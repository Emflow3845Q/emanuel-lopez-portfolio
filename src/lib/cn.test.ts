import { describe, expect, it } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('ignora valores falsy', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b')
  })
})
