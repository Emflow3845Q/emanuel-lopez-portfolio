import type { Lang } from '@/i18n/translations'

export type CredentialKind = 'degree' | 'certification' | 'course'

export interface CertificatePreview {
  thumb: string
  full: string
  /** Dimensiones de la imagen completa (reservan el espacio y evitan saltos de layout). */
  width: number
  height: number
}

export interface Credential {
  /** Identificador estable (clave de lista y de pruebas). */
  id: string
  kind: CredentialKind
  institution: string
  /** `in-progress`: se muestra la etiqueta "En curso" en la tarjeta. */
  status?: 'in-progress'
  /** Certificado en PDF (descargable) dentro de `public/certificates/`. */
  file?: string
  /** Imágenes del certificado para verlo dentro de la web: miniatura (tarjeta) y tamaño completo (visor). */
  preview?: CertificatePreview
  /** Enlace de verificación oficial del emisor. */
  verifyUrl?: string
  text: Record<Lang, { title: string; period: string }>
}

/** De lo más reciente a lo más antiguo; los cursos en marcha van primero. */
export const credentials: Credential[] = [
  {
    id: 'angular-udemy',
    kind: 'course',
    institution: 'Udemy',
    status: 'in-progress',
    text: {
      es: { title: 'Domina Angular: TypeScript, Firebase, Firestore y JWT', period: 'En curso' },
      en: { title: 'Master Angular: TypeScript, Firebase, Firestore, and JWT', period: 'In progress' },
    },
  },
  {
    id: 'frontend-udemy',
    kind: 'course',
    institution: 'Udemy',
    file: '/certificates/frontend-web-developer-udemy.pdf',
    preview: {
      thumb: '/certificates/frontend-web-developer-udemy-sm.webp',
      full: '/certificates/frontend-web-developer-udemy.webp',
      width: 1800,
      height: 1339,
    },
    verifyUrl: 'https://ude.my/UC-3014b125-008a-42e1-afcd-77c56390cee8',
    text: {
      es: { title: 'Universidad Desarrollo Web — FrontEnd Web Developer', period: 'Octubre 2025' },
      en: { title: 'Universidad Desarrollo Web — FrontEnd Web Developer', period: 'October 2025' },
    },
  },
  {
    id: 'scrum-sfpc',
    kind: 'certification',
    institution: 'CertiProf',
    file: '/certificates/scrum-foundation-sfpc-certiprof.pdf',
    preview: {
      thumb: '/certificates/scrum-foundation-sfpc-certiprof-sm.webp',
      full: '/certificates/scrum-foundation-sfpc-certiprof.webp',
      width: 1800,
      height: 1273,
    },
    text: {
      es: { title: 'Scrum Foundation Professional Certificate (SFPC)', period: 'Mayo 2023' },
      en: { title: 'Scrum Foundation Professional Certificate (SFPC)', period: 'May 2023' },
    },
  },
  {
    id: 'cesde-software',
    kind: 'degree',
    institution: 'CESDE — Centro de Estudios Especializados',
    file: '/certificates/cesde-asistente-desarrollo-software.pdf',
    preview: {
      thumb: '/certificates/cesde-asistente-desarrollo-software-sm.webp',
      full: '/certificates/cesde-asistente-desarrollo-software.webp',
      width: 1800,
      height: 1270,
    },
    text: {
      es: { title: 'Técnico en Desarrollo de Software', period: 'Febrero 2022 — Febrero 2024' },
      en: { title: 'Software Development Technician', period: 'February 2022 — February 2024' },
    },
  },
]
