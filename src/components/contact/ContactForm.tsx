import { Send } from 'lucide-react'
import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { getFieldErrorKey } from '@/lib/formValidation'
import { btnPrimary, iconSlide } from '@/lib/ui'
import type { DeployPhase, DeployResult } from './deploy/types'
import { FormField } from './FormField'

const loadDeploy = () => import('./MailDeploy')
const MailDeploy = lazy(loadDeploy)

/**
 * Endpoint del formulario. Por defecto "/" (Netlify Forms).
 * Puedes sobreescribirlo con VITE_FORM_ENDPOINT (Formspree, tu API, etc.).
 */
const ENDPOINT: string = import.meta.env.VITE_FORM_ENDPOINT ?? '/'

const MIN_RUNNING_MS = 1200
const RESULT_DELAY_MS = 850
const HIDE_AFTER_MS = 6000
const MESSAGE_MIN_LENGTH = 10

type FieldName = 'nombre' | 'email' | 'asunto' | 'mensaje'
type FieldElement = HTMLInputElement | HTMLTextAreaElement
type Errors = Partial<Record<FieldName, string>>

export function ContactForm() {
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const timers = useRef<number[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [phase, setPhase] = useState<DeployPhase>('idle')
  const [result, setResult] = useState<DeployResult>(null)
  const [deployRequested, setDeployRequested] = useState(false)

  const clearTimers = useCallback(() => {
    for (const id of timers.current) window.clearTimeout(id)
    timers.current = []
  }, [])
  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const dismiss = useCallback(() => {
    clearTimers()
    setPhase('idle')
    setResult(null)
  }, [clearTimers])

  const messageFor = useCallback(
    (el: FieldElement): string | undefined => {
      const key = getFieldErrorKey(el.validity)
      return key ? t.form.errors[key] : undefined
    },
    [t],
  )

  const setFieldError = useCallback((name: FieldName, message: string | undefined) => {
    setErrors((prev) => {
      if (prev[name] === message) return prev
      const next = { ...prev }
      if (message) next[name] = message
      else delete next[name]
      return next
    })
  }, [])

  const onBlur = (event: FocusEvent<FieldElement>) =>
    setFieldError(event.target.name as FieldName, messageFor(event.target))

  // Una vez que un campo mostró error, lo revalidamos mientras se escribe.
  const onChange = (event: ChangeEvent<FieldElement>) => {
    const name = event.target.name as FieldName
    if (errors[name]) setFieldError(name, messageFor(event.target))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    const fields = Array.from(form.querySelectorAll<FieldElement>('input[name], textarea[name]')).filter(
      (el) => el.type !== 'hidden' && el.name !== 'bot-field',
    )
    const nextErrors: Errors = {}
    let firstInvalid: FieldElement | null = null
    for (const el of fields) {
      const message = messageFor(el)
      if (message) {
        nextErrors[el.name as FieldName] = message
        firstInvalid ??= el
      }
    }
    setErrors(nextErrors)
    if (firstInvalid) {
      firstInvalid.focus()
      return
    }

    clearTimers()
    setSending(true)
    setResult(null)
    setDeployRequested(true)
    setPhase('running')

    const startedAt = Date.now()
    let ok = false
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString()
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (!response.ok) throw new Error(`El formulario respondió ${response.status}`)
      ok = true
      form.reset()
    } catch (error) {
      console.error('No se pudo enviar el formulario:', error)
    }

    // Deja que la animación "respire" aunque la respuesta sea instantánea.
    const wait = Math.max(0, MIN_RUNNING_MS - (Date.now() - startedAt))
    later(() => {
      setSending(false)
      setPhase('complete')
      later(() => setResult(ok ? 'success' : 'error'), RESULT_DELAY_MS)
      later(dismiss, HIDE_AFTER_MS)
    }, wait)
  }

  return (
    <>
      <form
        ref={formRef}
        name="contacto-portafolio"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        noValidate
        onSubmit={onSubmit}
        onFocus={loadDeploy}
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="form-name" value="contacto-portafolio" />
        <p hidden>
          <label>
            No rellenar: <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <FormField
          id="cf-name"
          name="nombre"
          label={t.form.name}
          placeholder={t.form.namePh}
          autoComplete="name"
          error={errors.nombre}
          onBlur={onBlur}
          onChange={onChange}
        />
        <FormField
          id="cf-email"
          name="email"
          type="email"
          label={t.form.email}
          placeholder={t.form.emailPh}
          autoComplete="email"
          error={errors.email}
          onBlur={onBlur}
          onChange={onChange}
        />
        <FormField
          id="cf-subject"
          name="asunto"
          label={t.form.subject}
          placeholder={t.form.subjectPh}
          error={errors.asunto}
          onBlur={onBlur}
          onChange={onChange}
        />
        <FormField
          id="cf-msg"
          name="mensaje"
          multiline
          label={t.form.message}
          placeholder={t.form.messagePh}
          minLength={MESSAGE_MIN_LENGTH}
          error={errors.mensaje}
          onBlur={onBlur}
          onChange={onChange}
        />

        <div className="mt-2">
          <button type="submit" disabled={sending} className={btnPrimary}>
            <span>{sending ? t.form.sending : t.form.submit}</span>
            <Send size={16} strokeWidth={2.5} className={iconSlide} />
          </button>
        </div>
      </form>

      {deployRequested && (
        <Suspense fallback={null}>
          <MailDeploy phase={phase} result={result} onDismiss={dismiss} />
        </Suspense>
      )}
    </>
  )
}
