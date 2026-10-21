import { projects } from './projects'

/** Proyectos terminados (los marcados "en desarrollo" no cuentan). Se calcula para que la cifra nunca quede desfasada. */
const deliveredProjects = projects.filter((project) => project.status !== 'in-development').length

export const site = {
  name: 'Emanuel López',
  url: 'https://emadev.neuradevsoftware.com',
  email: 'emanuel.arango1226@gmail.com',
  /** CV por idioma, servido desde public/ (mismo dominio, sin depender de Google Drive). */
  cv: { es: '/cv/cv-emanuel-lopez-es.pdf', en: '/cv/cv-emanuel-lopez-en.pdf' },
  year: 2026,
  stats: { years: '4+', projects: `${deliveredProjects}`, technologies: '10+' },
  socials: {
    linkedin: { url: 'https://www.linkedin.com/in/emanuel-l%C3%B3pez-490899308/', value: 'Emanuel López' },
    whatsapp: { url: 'https://wa.me/573004902545', value: '3004902545' },
    instagram: { url: 'https://www.instagram.com/lophexz_/', value: '@lophexz_' },
  },
} as const
