import type { ChangeEvent, FocusEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const controlClass =
  'rounded-lg border bg-surface px-4 py-3 font-body text-body-sm font-light text-ink outline-none transition-[border-color,background,box-shadow] duration-300 placeholder:text-ink-3 focus:border-accent focus:bg-accent-dim focus:shadow-[0_6px_24px_var(--color-accent-dim)]'

interface FormFieldProps {
  id: string
  name: string
  label: string
  placeholder: string
  error?: string
  type?: 'text' | 'email'
  multiline?: boolean
  autoComplete?: string
  minLength?: number
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  children?: ReactNode
}

export function FormField({
  id,
  name,
  label,
  placeholder,
  error,
  type = 'text',
  multiline,
  autoComplete,
  minLength,
  onBlur,
  onChange,
}: FormFieldProps) {
  const errorId = `${id}-error`
  const shared = {
    id,
    name,
    placeholder,
    required: true,
    minLength,
    onBlur,
    onChange,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: cn(controlClass, error ? 'border-accent' : 'border-line'),
  } as const

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label font-medium uppercase tracking-[0.1em] text-ink-2">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} className={cn(shared.className, 'h-28 resize-none')} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
      <p id={errorId} role="alert" className={cn('text-caption text-accent', !error && 'hidden')}>
        {error}
      </p>
    </div>
  )
}
