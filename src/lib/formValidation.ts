export type FieldErrorKey = 'required' | 'email' | 'tooShort'

export interface ValidityLike {
  valueMissing: boolean
  typeMismatch: boolean
  tooShort: boolean
}

export function getFieldErrorKey(validity: ValidityLike): FieldErrorKey | null {
  if (validity.valueMissing) return 'required'
  if (validity.typeMismatch) return 'email'
  if (validity.tooShort) return 'tooShort'
  return null
}
