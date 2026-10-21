import type { Lang } from '@/i18n/translations'

export interface ExperienceText {
  role: string
  period: string
  /** Resumen del cargo en una o dos frases. */
  desc: string
  /** Responsabilidades, de lo más relevante a lo menos. */
  points: string[]
}

export interface Experience {
  company: string
  /** URL (Cloudinary o ruta local en /public); `null` mientras no se haya subido (se muestra el monograma de la empresa). */
  logo: string | null
  /** El logo trae su propio fondo: se muestra sin relleno. */
  logoBleed?: boolean
  text: Record<Lang, ExperienceText>
}

export const experience: Experience[] = [
  {
    company: 'Neuradev Software',
    logo: 'https://res.cloudinary.com/dhoyps3vk/image/upload/v1773786788/isotipo-blanco-neuradev2026_wkewyc.png',
    text: {
      es: {
        role: 'Desarrollador Full Stack',
        period: 'Diciembre 2024 — Presente',
        desc: 'Desarrollo de soluciones digitales a medida, desde sitios web corporativos hasta sistemas de gestión completos, y administración de la infraestructura que los respalda.',
        points: [
          'Diseño y desarrollo de la plataforma CM3D, en producción: API REST (Node.js y MariaDB), launcher y panel de escritorio, y sitio web (React)',
          'Desarrollo de aplicaciones web con integración de APIs, chatbots y herramientas de terceros',
          'Gestión de dominios, DNS y correo corporativo',
          'Administración de servidores y hosting con cPanel y WHM',
        ],
      },
      en: {
        role: 'Full Stack Developer',
        period: 'December 2024 — Present',
        desc: 'Building custom digital solutions, from corporate websites to complete management systems, and administering the infrastructure behind them.',
        points: [
          'Design and development of the CM3D platform, in production: REST API (Node.js and MariaDB), launcher and desktop panel, and website (React)',
          'Web application development with API, chatbot, and third-party tool integration',
          'Domain, DNS, and corporate email management',
          'Server and hosting administration with cPanel and WHM',
        ],
      },
    },
  },
  {
    company: 'Xtrategic Publicidad Digital',
    logo: '/logos/xtrategic-publicidad-digital.webp',
    logoBleed: true,
    text: {
      es: {
        role: 'Desarrollador Full Stack Freelance',
        period: 'Enero 2025 — Junio 2026',
        desc: 'Desarrollo de software y soluciones digitales a medida para una agencia de publicidad digital, con acompañamiento completo hasta el lanzamiento.',
        points: [
          'Implementación de APIs, chatbots y herramientas externas',
          'Aplicación de SEO técnico y optimización del rendimiento',
          'Soporte integral desde el desarrollo hasta la puesta en producción',
        ],
      },
      en: {
        role: 'Freelance Full Stack Developer',
        period: 'January 2025 — June 2026',
        desc: 'Developing custom software and digital solutions for a digital advertising agency, with full support through launch.',
        points: [
          'Implementation of APIs, chatbots, and external tools',
          'Technical SEO and performance optimization',
          'End-to-end support from development to production release',
        ],
      },
    },
  },
  {
    company: 'LatinoAmérica Hosting',
    logo: '/logos/latinoamerica-hosting.webp',
    text: {
      es: {
        role: 'Especialista en Soporte Técnico',
        period: 'Agosto 2022 — Abril 2024',
        desc: 'Soporte técnico y administración de servicios de hosting, con atención a incidencias y formación de usuarios.',
        points: [
          'Administración de hosting, dominios, DNS, SSL y correo corporativo con cPanel y WHM',
          'Soporte técnico de WordPress, Joomla, PrestaShop, PHP y MySQL',
          'Diagnóstico de incidencias, documentación y capacitación de usuarios',
        ],
      },
      en: {
        role: 'Technical Support Specialist',
        period: 'August 2022 — April 2024',
        desc: 'Technical support and administration of hosting services, handling incidents and training users.',
        points: [
          'Administration of hosting, domains, DNS, SSL, and corporate email with cPanel and WHM',
          'Technical support for WordPress, Joomla, PrestaShop, PHP, and MySQL',
          'Incident troubleshooting, documentation, and user training',
        ],
      },
    },
  },
]
