import type { ReactNode } from 'react'
import type { SkillGroupId } from '@/data/skills'

export type Lang = 'es' | 'en'

export interface Pillar {
  title: string
  desc: string
}

/** Estructura de textos de la interfaz. Los valores pueden ser JSX (negritas, saltos de línea, etc.). */
export interface Dictionary {
  meta: { title: string; notFoundTitle: string }
  nav: {
    label: string
    about: string
    skills: string
    experience: string
    projects: string
    contact: string
    talk: string
    openMenu: string
    closeMenu: string
    switchLang: string
    langButton: string
    skip: string
    toLight: string
    toDark: string
  }
  hero: {
    available: string
    greeting: [string, string, string]
    title: string
    location: string
    role: ReactNode
    projectsButton: string
    downloadCv: string
    years: string
    projects: string
    technologies: string
    posterWord: ReactNode
    posterLabel: string
    scroll: string
  }
  about: {
    label: string
    title: ReactNode
    lead: ReactNode
    text: ReactNode
    pillars: [Pillar, Pillar, Pillar]
  }
  terminal: { identity: string; status: string }
  skills: { label: string; title: string; groups: Record<SkillGroupId, string> }
  experience: { label: string; title: ReactNode }
  education: {
    title: string
    kinds: Record<'degree' | 'certification' | 'course', string>
    inProgress: string
    viewCertificate: string
    certificateAlt: string
    downloadPdf: string
    verify: string
  }
  projects: {
    label: string
    title: ReactNode
    notice: string
    prev: string
    next: string
    goToPage: string
    carousel: string
    openDescription: string
    demoTitle: string
    inDevelopment: string
  }
  filters: {
    all: string
    webapps: string
    corporate: string
    landing: string
    ecommerce: string
    desktop: string
    maintenance: string
  }
  modal: {
    project: string
    stack: string
    demo: string
    close: string
    preview: string
    zoomIn: string
    zoomOut: string
  }
  contact: { label: string; title: ReactNode; tagline: ReactNode; sub: string }
  form: {
    errors: { required: string; email: string; tooShort: string }
    name: string
    email: string
    subject: string
    message: string
    namePh: string
    emailPh: string
    subjectPh: string
    messagePh: string
    submit: string
    sending: string
  }
  feedback: {
    transmission: string
    deployed: string
    code: string
    build: string
    server: string
    inbox: string
    message: string
    connection: string
    compiling: string
    delivered: string
    success: string
    error: string
    detail: string
    errorDetail: string
    dismiss: string
  }
  footer: { rights: string; backTop: string }
  notFound: { label: string; title: string; text: string; home: string; projects: string }
}

const es: Dictionary = {
  meta: {
    title: 'Emanuel López — Desarrollador Web Full Stack',
    notFoundTitle: '404 — Página no encontrada | Emanuel López',
  },
  nav: {
    label: 'Principal',
    about: 'Sobre mí',
    skills: 'Habilidades',
    experience: 'Experiencia',
    projects: 'Proyectos',
    contact: 'Contacto',
    talk: 'Hablemos',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    switchLang: 'Switch to English',
    langButton: 'EN',
    skip: 'Saltar al contenido',
    toLight: 'Cambiar a tema claro',
    toDark: 'Cambiar a tema oscuro',
  },
  hero: {
    available: '[ disponible para nuevas oportunidades ]',
    greeting: ['¡Hola! Soy', 'Emanuel', 'López.'],
    title: 'Desarrollador Full Stack',
    location: 'Medellín, Colombia',
    role: (
      <>
        Desarrollo <strong>software a medida</strong>, aplicaciones web y sistemas completos, y me encargo también de la
        infraestructura que los respalda: hosting, DNS, correo corporativo, APIs y chatbots.
      </>
    ),
    projectsButton: 'Ver proyectos',
    downloadCv: 'Descargar CV',
    years: 'años de experiencia',
    projects: 'proyectos entregados',
    technologies: 'tecnologías',
    posterWord: (
      <>
        CREACIÓN
        <br />
        <span>DIGITAL</span>
      </>
    ),
    posterLabel: 'IDEAS / SISTEMAS',
    scroll: 'Desplazar',
  },
  about: {
    label: 'Sobre mí',
    title: (
      <>
        Desarrollador
        <br />
        con visión
        <br />
        de producto.
      </>
    ),
    lead: (
      <>
        Diseño y entrego <strong>software a medida de punta a punta</strong>: desde la API y la base de datos hasta la
        interfaz y el servidor donde corre.
      </>
    ),
    text: (
      <>
        Mi trabajo más reciente es la plataforma CM3D, en producción: API REST en Node.js y MariaDB, launcher y panel de
        escritorio en Python, y sitio web en React. Trabajo sobre todo con TypeScript, React, Node.js y Python, y lo
        complemento con Angular, PHP, Java y plataformas como WordPress, PrestaShop y Shopify. Cada proyecto busca ser
        veloz, accesible y con una identidad visual sólida.
      </>
    ),
    pillars: [
      {
        title: 'Trabajo en equipo',
        desc: 'Colaboro con equipos y clientes, con una comunicación clara en cada etapa del proyecto.',
      },
      {
        title: 'Soluciones efectivas',
        desc: 'Software a la medida de cada necesidad, con APIs, automatizaciones y herramientas de terceros.',
      },
      {
        title: 'Experiencia de usuario',
        desc: 'Interfaces veloces y accesibles, con una identidad visual propia.',
      },
    ],
  },
  terminal: { identity: 'Emanuel López, Desarrollador Full Stack', status: 'disponible para nuevas oportunidades' },
  skills: {
    label: 'Stack',
    title: 'Habilidades técnicas',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend & datos',
      cms: 'CMS & e-commerce',
      infra: 'Hosting & infraestructura',
      tools: 'Herramientas & soporte',
    },
  },
  experience: {
    label: 'Trayectoria',
    title: (
      <>
        Experiencia
        <br />
        Profesional
      </>
    ),
  },
  education: {
    title: 'Formación y certificaciones',
    kinds: { degree: 'Educación', certification: 'Certificación', course: 'Curso' },
    inProgress: 'En curso',
    viewCertificate: 'Ver certificado',
    certificateAlt: 'Certificado:',
    downloadPdf: 'Descargar PDF',
    verify: 'Verificar certificado',
  },
  projects: {
    label: 'Trabajo',
    title: (
      <>
        Proyectos
        <br />
        Seleccionados
      </>
    ),
    notice:
      'Portafolio en actualización: aún faltan proyectos por agregar. Los proyectos sin enlace público son sistemas internos o en desarrollo; su ficha describe el alcance y la arquitectura.',
    prev: 'Proyectos anteriores',
    next: 'Siguientes proyectos',
    goToPage: 'Ir a la página',
    carousel: 'Carrusel de proyectos',
    openDescription: 'Ver descripción de',
    demoTitle: 'Ver demo',
    inDevelopment: 'En desarrollo',
  },
  filters: {
    all: 'Todos',
    webapps: 'Aplicaciones Web',
    corporate: 'Corporativas',
    landing: 'Landing Pages',
    ecommerce: 'E-commerce',
    desktop: 'Aplicaciones de Escritorio',
    maintenance: 'Mantenimiento',
  },
  modal: {
    project: 'Proyecto',
    stack: 'Tecnologías',
    demo: 'Ver proyecto en línea',
    close: 'Cerrar descripción del proyecto',
    preview: 'Vista previa de',
    zoomIn: 'Ampliar imagen',
    zoomOut: 'Reducir imagen',
  },
  contact: {
    label: 'Contacto',
    title: (
      <>
        ¿Trabajamos
        <br />
        juntos?
      </>
    ),
    tagline: (
      <>
        Cuénteme qué necesita
        <br />
        construir. <span className="text-accent">Conversemos hoy.</span>
      </>
    ),
    sub: 'Proyectos freelance, colaboraciones o un cargo de tiempo completo. Respondo personalmente, sin intermediarios. Comparta el contexto de su proyecto y recibirá una respuesta en menos de 24 horas.',
  },
  form: {
    errors: {
      required: 'Este campo es obligatorio.',
      email: 'Escriba un correo válido, por ejemplo nombre@correo.com.',
      tooShort: 'Cuéntenos un poco más (mínimo 10 caracteres).',
    },
    name: 'Nombre',
    email: 'Email',
    subject: 'Asunto',
    message: 'Mensaje',
    namePh: 'Su nombre',
    emailPh: 'nombre@correo.com',
    subjectPh: 'Proyecto, colaboración…',
    messagePh: 'Cuénteme sobre su proyecto…',
    submit: 'Enviar mensaje',
    sending: 'Enviando...',
  },
  feedback: {
    transmission: 'TRANSMISIÓN SALIENTE',
    deployed: 'Mensaje enviado',
    code: 'CÓDIGO',
    build: 'COMPILACIÓN',
    server: 'SERVIDOR',
    inbox: 'BANDEJA',
    message: 'mensaje',
    connection: 'estableciendo conexión segura...',
    compiling: 'compilando su mensaje...',
    delivered: 'entregado a',
    success: 'Mensaje enviado',
    error: 'No se pudo enviar',
    detail: 'Gracias por escribirme. Le responderé pronto.',
    errorDetail: 'Inténtelo de nuevo o escríbame por WhatsApp.',
    dismiss: 'Cerrar',
  },
  footer: { rights: 'Medellín, Colombia', backTop: 'Volver al inicio' },
  notFound: {
    label: 'error 404',
    title: 'Página no encontrada',
    text: 'La dirección que busca no existe o fue movida. Regrese al inicio para seguir explorando mi portafolio.',
    home: 'Volver al inicio',
    projects: 'Ver proyectos',
  },
}

const en: Dictionary = {
  meta: {
    title: 'Emanuel López — Full Stack Web Developer',
    notFoundTitle: '404 — Page not found | Emanuel López',
  },
  nav: {
    label: 'Main',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
    talk: "Let's talk",
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLang: 'Cambiar a español',
    langButton: 'ES',
    skip: 'Skip to content',
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
  hero: {
    available: '[ available for new opportunities ]',
    greeting: ["Hi! I'm", 'Emanuel', 'López.'],
    title: 'Full Stack Developer',
    location: 'Medellín, Colombia',
    role: (
      <>
        I build <strong>custom software</strong>, web applications, and complete systems, and I also handle the
        infrastructure behind them: hosting, DNS, corporate email, APIs, and chatbots.
      </>
    ),
    projectsButton: 'View projects',
    downloadCv: 'Download CV',
    years: 'years of experience',
    projects: 'projects delivered',
    technologies: 'technologies',
    posterWord: (
      <>
        DIGITAL
        <br />
        <span>CRAFT</span>
      </>
    ),
    posterLabel: 'IDEAS / SYSTEMS',
    scroll: 'Scroll',
  },
  about: {
    label: 'About me',
    title: (
      <>
        Developer
        <br />
        with product
        <br />
        vision.
      </>
    ),
    lead: (
      <>
        I design and deliver <strong>custom software end to end</strong>: from the API and the database to the interface
        and the server it runs on.
      </>
    ),
    text: (
      <>
        My most recent work is the CM3D platform, in production: a REST API in Node.js and MariaDB, a desktop launcher
        and panel in Python, and a React website. I mainly work with TypeScript, React, Node.js, and Python, and
        complement them with Angular, PHP, Java, and platforms such as WordPress, PrestaShop, and Shopify. Every project
        aims to be fast, accessible, and visually distinctive.
      </>
    ),
    pillars: [
      {
        title: 'Teamwork',
        desc: 'I collaborate with teams and clients, keeping communication clear at every stage of the project.',
      },
      {
        title: 'Effective solutions',
        desc: 'Custom software shaped around each need, with APIs, automation, and third-party tools.',
      },
      {
        title: 'User experience',
        desc: 'Fast, accessible interfaces with a strong visual identity.',
      },
    ],
  },
  terminal: { identity: 'Emanuel López, Full Stack Developer', status: 'available for new opportunities' },
  skills: {
    label: 'Stack',
    title: 'Technical skills',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend & data',
      cms: 'CMS & e-commerce',
      infra: 'Hosting & infrastructure',
      tools: 'Tools & support',
    },
  },
  experience: {
    label: 'Journey',
    title: (
      <>
        Professional
        <br />
        Experience
      </>
    ),
  },
  education: {
    title: 'Education & certifications',
    kinds: { degree: 'Education', certification: 'Certification', course: 'Course' },
    inProgress: 'In progress',
    viewCertificate: 'View certificate',
    certificateAlt: 'Certificate:',
    downloadPdf: 'Download PDF',
    verify: 'Verify certificate',
  },
  projects: {
    label: 'Work',
    title: (
      <>
        Selected
        <br />
        Projects
      </>
    ),
    notice:
      'Portfolio being updated: more projects are still to be added. Projects without a public link are internal or in-development systems; each detail card describes the scope and architecture.',
    prev: 'Previous projects',
    next: 'Next projects',
    goToPage: 'Go to page',
    carousel: 'Project carousel',
    openDescription: 'View description of',
    demoTitle: 'View demo',
    inDevelopment: 'In development',
  },
  filters: {
    all: 'All',
    webapps: 'Web Applications',
    corporate: 'Corporate Websites',
    landing: 'Landing Pages',
    ecommerce: 'E-commerce',
    desktop: 'Desktop Applications',
    maintenance: 'Maintenance',
  },
  modal: {
    project: 'Project',
    stack: 'Technologies',
    demo: 'View live project',
    close: 'Close project description',
    preview: 'Preview of',
    zoomIn: 'Zoom image',
    zoomOut: 'Zoom out image',
  },
  contact: {
    label: 'Contact',
    title: (
      <>
        Shall we work
        <br />
        together?
      </>
    ),
    tagline: (
      <>
        Tell me what you need to
        <br />
        build. <span className="text-accent">Let's talk today.</span>
      </>
    ),
    sub: 'Freelance, collaborations, or a full-time role — I answer personally, with no middlemen. Share your project context and I will get back to you within 24 hours.',
  },
  form: {
    errors: {
      required: 'This field is required.',
      email: 'Enter a valid email, e.g. you@email.com.',
      tooShort: 'Tell me a bit more (at least 10 characters).',
    },
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    namePh: 'Your name',
    emailPh: 'you@email.com',
    subjectPh: 'Project, collaboration…',
    messagePh: 'Tell me about your project…',
    submit: 'Send message',
    sending: 'Sending...',
  },
  feedback: {
    transmission: 'OUTBOUND TRANSMISSION',
    deployed: 'Message deployed',
    code: 'CODE',
    build: 'BUILD',
    server: 'SERVER',
    inbox: 'INBOX',
    message: 'message',
    connection: 'establishing secure connection...',
    compiling: 'compiling your message...',
    delivered: 'delivered to',
    success: 'Message sent',
    error: 'Could not send',
    detail: 'Thanks for writing. I will get back to you soon.',
    errorDetail: 'Please try again or message me on WhatsApp.',
    dismiss: 'Close',
  },
  footer: { rights: 'Medellín, Colombia', backTop: 'Back to top' },
  notFound: {
    label: 'error 404',
    title: 'Page not found',
    text: 'The address you are looking for does not exist or has moved. Head back home to keep exploring my portfolio.',
    home: 'Back to home',
    projects: 'View projects',
  },
}

export const dictionaries: Record<Lang, Dictionary> = { es, en }
