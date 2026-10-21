import type { Lang } from '@/i18n/translations'

/** Etiqueta de tecnología: texto único (marcas) o traducido cuando no es una marca. */
export type Tag = string | Record<Lang, string>

export const tagLabel = (tag: Tag, lang: Lang): string => (typeof tag === 'string' ? tag : tag[lang])

export type ProjectCategory = 'webapps' | 'corporate' | 'landing' | 'ecommerce' | 'desktop' | 'maintenance'

export interface Project {
  id: number
  /** Identificador estable para la URL (#/proyecto/<slug>). */
  slug: string
  featured?: boolean
  /** URL de Cloudinary; `null` mientras no se haya subido (se muestra un marcador con el monograma). */
  image: string | null
  demo: string | null
  tags: Tag[]
  category: ProjectCategory
  /** `in-development`: se muestra una etiqueta "En desarrollo" en la tarjeta y el detalle. */
  status?: 'in-development'
  text: Record<Lang, { title: string; desc: string }>
}

const CDN = 'https://res.cloudinary.com/dhoyps3vk/image/upload'

/**
 * Orden de aparición en el portafolio (curado a mano, no por id):
 * 1) la plataforma CM3D, en producción; 2) trabajos con demo pública; 3) el resto, de más a menos relevante.
 * El `id` solo identifica el proyecto; no determina la posición.
 */
export const projects: Project[] = [
  {
    id: 15,
    slug: 'cm3d-backend',
    featured: true,
    image: `${CDN}/cm3d-backend-arquitectura_nuhjyi.png`,
    demo: null,
    tags: ['Node.js', 'Express', 'MariaDB', 'JWT', 'Google OAuth', 'Zod'],
    category: 'webapps',
    text: {
      es: {
        title: 'CM3D Backend — API de la plataforma',
        desc: 'API REST en producción que sustenta la plataforma CM3D y conecta el launcher de los usuarios con el panel del staff. Gestiona autenticación con roles y Google, catálogo, accesos y activadores, precios con descuentos y VIP, y tasas de cambio automáticas, con control de dispositivos, sesión única y detección de manipulación con registro de incidentes y alertas a Discord. Arquitectura por capas (rutas, controladores y servicios), validación con Zod, 43 migraciones versionadas y más de 80 pruebas automatizadas.',
      },
      en: {
        title: 'CM3D Backend — Platform API',
        desc: 'Production REST API behind the CM3D platform, connecting the users’ launcher with the staff panel. It handles role-based and Google authentication, catalog, access control and activators, pricing with discounts and VIP, and automatic exchange rates, with device limits, single-session control, and tamper detection with incident records and Discord alerts. Layered architecture (routes, controllers, and services), Zod validation, 43 versioned migrations, and over 80 automated tests.',
      },
    },
  },
  {
    id: 13,
    slug: 'cm3d-launcher',
    featured: true,
    image: `${CDN}/cm3d-launcher_l0gf6j.png`,
    demo: null,
    tags: ['Python', 'PyWebView', 'JavaScript', 'Google OAuth', 'Windows Service', 'PyInstaller'],
    category: 'desktop',
    text: {
      es: {
        title: 'CM3D Launcher — Colombia Mods 3D',
        desc: 'Launcher de escritorio en producción de Colombia Mods 3D: tienda de mods, garage, servidores, encuestas y plugins, con inicio de sesión local o con Google y descarga de la Base y el Activador para ETS2 y ATS. Muestra descuentos con cuenta regresiva sincronizada con la hora del servidor y se actualiza solo. Incluye CM3D Guard, un servicio de Windows que protege los archivos descargados incluso con el launcher cerrado, y más de 100 pruebas automatizadas.',
      },
      en: {
        title: 'CM3D Launcher — Colombia Mods 3D',
        desc: 'Production desktop launcher for Colombia Mods 3D: mod store, garage, servers, surveys, and plugins, with local or Google sign-in and downloads of the Base and Activator for ETS2 and ATS. It shows discounts with a countdown synced to server time and updates itself. It includes CM3D Guard, a Windows service that protects downloaded files even when the launcher is closed, and over 100 automated tests.',
      },
    },
  },
  {
    id: 14,
    slug: 'cm3d-admin',
    featured: true,
    image: `${CDN}/launcher-admin_qkmo9f.png`,
    demo: null,
    tags: ['Python', 'PyWebView', 'JavaScript', 'HashFS', 'PyInstaller', 'GitHub Actions'],
    category: 'desktop',
    text: {
      es: {
        title: 'CM3D Admin — Panel de Staff',
        desc: 'Aplicación de escritorio en producción para el equipo de CM3D que cubre el flujo completo del staff: preparar, proteger y empaquetar mods (.scs), publicarlos en la tienda, asignar activadores y administrar usuarios, descuentos, servidores, plugins y encuestas. Automatiza el reemplazo de placas y se actualiza sola desde GitHub Releases.',
      },
      en: {
        title: 'CM3D Admin — Staff Panel',
        desc: 'Desktop application in production for the CM3D team that covers the full staff workflow: preparing, protecting, and packaging mods (.scs), publishing them to the store, assigning activators, and managing users, discounts, servers, plugins, and surveys. It automates license plate replacement and updates itself from GitHub Releases.',
      },
    },
  },
  {
    id: 23,
    slug: 'colombia-mods-3d',
    featured: true,
    image: `${CDN}/colombiamods3d_wku52k.png`,
    demo: 'https://colombiamods3d.com',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Three.js', 'Node.js', 'SMTP'],
    category: 'corporate',
    text: {
      es: {
        title: 'Colombia Mods 3D — Sitio web oficial',
        desc: 'Sitio oficial de Colombia Mods 3D, con el catálogo de camiones, trailers y accesorios cargado en vivo desde la API de la plataforma, ofertas con cuenta regresiva, anuncios publicados desde el panel del staff y un modelo 3D interactivo en la portada. Incluye SEO por página, formulario de contacto con servicio SMTP propio y políticas legales; sin cookies ni analítica.',
      },
      en: {
        title: 'Colombia Mods 3D — Official website',
        desc: 'Official Colombia Mods 3D website, with the truck, trailer, and accessory catalog loaded live from the platform API, discounts with a countdown, announcements published from the staff panel, and an interactive 3D model on the home page. It includes per-page SEO, a contact form backed by its own SMTP service, and legal policies, with no cookies or analytics.',
      },
    },
  },
  {
    id: 2,
    slug: 'otto',
    image: `${CDN}/otto_u6733s.png`,
    demo: 'https://ottoapis.com',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'PayU', 'AWS'],
    category: 'ecommerce',
    text: {
      es: {
        title: 'Otto — E-commerce Corporativo',
        desc: 'Comercio electrónico corporativo desarrollado a medida, con pasarela de pagos PayU y diseño personalizado. Combina la tienda en línea con la presentación institucional de la empresa.',
      },
      en: {
        title: 'Otto — Corporate E-commerce',
        desc: 'Custom-built corporate e-commerce site with PayU payments and a tailored design. It combines an online store with the company’s institutional presence.',
      },
    },
  },
  {
    id: 3,
    slug: 'neuradev-software',
    image: `${CDN}/neuradevsoftware_glwqld.png`,
    demo: 'https://neuradevsoftware.com',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    category: 'corporate',
    text: {
      es: {
        title: 'Neuradev Software',
        desc: 'Sitio corporativo que presenta los servicios de desarrollo web, aplicaciones móviles y consultoría tecnológica de la empresa, con un diseño moderno y una presencia digital sólida.',
      },
      en: {
        title: 'Neuradev Software',
        desc: 'Corporate website presenting the company’s web development, mobile application, and technology consulting services, with a modern design.',
      },
    },
  },
  {
    id: 24,
    slug: 'smart-ppc-bidding',
    image: `${CDN}/smartppcbidding_lzibhp.png`,
    demo: 'https://www.smartppcbidding.com',
    tags: ['WordPress', 'Elementor Pro'],
    category: 'corporate',
    text: {
      es: {
        title: 'Smart PPC Bidding',
        desc: 'Sitio corporativo para una agencia de marketing digital y PPC de Miami, desarrollado con Elementor Pro sobre WordPress. Presenta sus servicios de Google Ads, desarrollo web y redes sociales, el proceso de trabajo y casos de estudio, con la llamada telefónica como conversión principal y el formulario de contacto dentro del hero.',
      },
      en: {
        title: 'Smart PPC Bidding',
        desc: 'Corporate website for a Miami digital marketing and PPC agency, built with Elementor Pro on WordPress. It presents its Google Ads, web development, and social media services, its process, and case studies, with the phone call as the main conversion and the contact form inside the hero.',
      },
    },
  },
  {
    id: 16,
    slug: 'navajo-1',
    image: `${CDN}/navajo1_cbppsl.png`,
    demo: 'https://navajo1.com',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Vitest', 'GitHub Actions'],
    category: 'corporate',
    text: {
      es: {
        title: 'Navajo 1 Construction',
        desc: 'Sitio corporativo para un contratista general de propiedad nativa en Arizona, con servicios, historia del fundador, misión y solicitud de cotización. Reestructurado desde un único componente de ~800 líneas con estilos inline a una arquitectura modular en React 19 y TypeScript estricto, con design tokens en Tailwind CSS v4 y el contenido tipado y separado de la interfaz. El formulario de cotización va por capas (validación, envío, estado e interfaz), con honeypot anti-spam y backend intercambiable. Incluye accesibilidad (menú móvil operable con teclado, enlace de salto, contraste AA, prefers-reduced-motion), fuentes autoalojadas, pruebas con Vitest y CI en GitHub Actions.',
      },
      en: {
        title: 'Navajo 1 Construction',
        desc: 'Corporate website for a Native-owned general contractor in Arizona, with services, the founder’s story, mission, and a quote request. Restructured from a single ~800-line component with inline styles into a modular React 19 and strict TypeScript architecture, with Tailwind CSS v4 design tokens and typed content kept separate from the UI. The quote form is layered (validation, submission, state, and UI), with an anti-spam honeypot and a swappable backend. It includes accessibility work (keyboard-operable mobile menu, skip link, AA contrast, prefers-reduced-motion), self-hosted fonts, Vitest tests, and CI on GitHub Actions.',
      },
    },
  },
  {
    id: 19,
    slug: 'soundsphere',
    image: `${CDN}/soundsphere_iupmpz.png`,
    demo: 'https://soundsphere.neuradevsoftware.com',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vitest'],
    category: 'landing',
    text: {
      es: {
        title: 'SoundSphere',
        desc: 'Landing page de e-commerce para unos auriculares premium (SoundSphere Pro), con héroe de producto, características, especificaciones técnicas, opiniones de clientes y llamada a la compra con precio y descuento. Migrada de un único HTML a una aplicación en React, TypeScript y Tailwind CSS: contenido tipado y separado de la interfaz, carrito con estado global compartido por todos los botones de compra, menú móvil accesible, pruebas automatizadas con Vitest e integración continua.',
      },
      en: {
        title: 'SoundSphere',
        desc: 'E-commerce landing page for a premium headphone product (SoundSphere Pro), with a product hero, features, technical specifications, customer reviews, and a purchase call to action with price and discount. Migrated from a single HTML file to a React, TypeScript, and Tailwind CSS app: typed content separated from the UI, a cart with global state shared across every buy button, an accessible mobile menu, automated tests with Vitest, and continuous integration.',
      },
    },
  },
  {
    id: 25,
    slug: 'stockflow',
    featured: true,
    image: `${CDN}/stockflow_jvyp1x.png`,
    demo: null,
    tags: ['Angular', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'JWT', 'Zod'],
    category: 'webapps',
    status: 'in-development',
    text: {
      es: {
        title: 'StockFlow — Gestión de inventario',
        desc: 'Sistema de inventario con interfaz tipo SaaS para pymes, en desarrollo. Controla productos, categorías y movimientos de stock con alertas de reposición, código de barras, importación y exportación a Excel/CSV, y reportes de valorización, kardex y rotación. Usa roles con JWT y registra cada movimiento en una sola transacción con bloqueo de fila, para que el stock nunca quede en negativo. Backend en capas con validación Zod y pruebas unitarias y de integración.',
      },
      en: {
        title: 'StockFlow — Inventory management',
        desc: 'SaaS-style inventory system for small and medium businesses, currently in development. It manages products, categories, and stock movements with restock alerts, barcodes, Excel/CSV import and export, and valuation, kardex, and rotation reports. It uses role-based JWT authentication and records each movement in a single transaction with row locking, so stock can never go negative. Layered backend with Zod validation and unit and integration tests.',
      },
    },
  },
  {
    id: 1,
    slug: 'sistema-clientes',
    image: null, // TODO: URL de Cloudinary
    demo: 'https://clientes.neuradevsoftware.com',
    tags: ['React', 'Node.js', 'MongoDB', 'Material UI', 'JWT', 'Google OAuth'],
    category: 'webapps',
    text: {
      es: {
        title: 'Sistema de Clientes — Neuradev Software',
        desc: 'Plataforma de gestión para registrar clientes, emitir facturas y asignar proyectos y desarrolladores. Centraliza la relación con los clientes y la operación interna.',
      },
      en: {
        title: 'Client System — Neuradev Software',
        desc: 'Management platform for registering clients, issuing invoices, and assigning projects and developers. It centralizes client relations and internal operations.',
      },
    },
  },
  {
    id: 4,
    slug: 'sistema-rifas',
    image: `${CDN}/sistemarifas-landing_ijtiqn.png`,
    demo: 'https://demorifas.neuradevsoftware.com',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
    category: 'webapps',
    text: {
      es: {
        title: 'Sistema de Rifas — Neuradev Software',
        desc: 'Plataforma web para administrar rifas en línea. Incluye panel de gestión, landing personalizada, verificación de reservas en tiempo real y notificaciones automáticas por WhatsApp.',
      },
      en: {
        title: 'Raffle System — Neuradev Software',
        desc: 'Web platform for managing online raffles. It includes a management dashboard, a custom landing page, real-time reservation checks, and automated WhatsApp notifications.',
      },
    },
  },
  {
    id: 12,
    slug: 'comuna-latin-vice',
    image: `${CDN}/v1769846091/comunalatinvice_fiiitx.png`,
    demo: 'https://comunalatinvicerp.neuradevsoftware.com',
    tags: ['React', 'React Bootstrap', 'Node.js', 'Nodemailer'],
    category: 'corporate',
    text: {
      es: {
        title: 'Comuna Latín Vice RP',
        desc: 'Sitio web para un servidor de roleplay con acceso rápido a reglas, noticias y recursos. Interfaz intuitiva y adaptada a todos los dispositivos.',
      },
      en: {
        title: 'Comuna Latin Vice RP',
        desc: 'Website for a roleplay server with quick access to rules, news, and resources. An intuitive interface that adapts to every device.',
      },
    },
  },
  {
    id: 8,
    slug: 'aps',
    image: `${CDN}/v1769846087/apsbest_pa1ci5.png`,
    demo: 'https://apsbest.com',
    tags: ['WordPress', 'Elementor'],
    category: 'corporate',
    text: {
      es: {
        title: 'APS Atlantic Pacific Standard',
        desc: 'Sitio corporativo para un contratista general. Renueva su presencia digital destacando servicios, proyectos y certificaciones; desarrollado en colaboración con Smart PPC Bidding.',
      },
      en: {
        title: 'APS Atlantic Pacific Standard',
        desc: 'Corporate website for a general contractor that renews its digital presence around services, projects, and certifications. Built in collaboration with Smart PPC Bidding.',
      },
    },
  },
  {
    id: 18,
    slug: 'alta-one-usa',
    image: `${CDN}/v1780245691/altaoneusa_bazwgh.png`,
    demo: 'https://altaoneusa.com',
    tags: ['BigCommerce'],
    category: 'ecommerce',
    text: {
      es: {
        title: 'Alta One USA',
        desc: 'Tienda en BigCommerce con diseño personalizado para la venta mayorista de suministros. Catálogo organizado por categorías y configurada para que el cliente la administre de forma autónoma.',
      },
      en: {
        title: 'Alta One USA',
        desc: 'BigCommerce store with a custom design for wholesale supplies. The catalog is organized by category and set up so the client can manage it independently.',
      },
    },
  },
  {
    id: 17,
    slug: 'general-lift',
    image: `${CDN}/generalliftna_n5bd9q.png`,
    demo: 'https://generalliftna.com',
    tags: ['E-commerce'],
    category: 'ecommerce',
    text: {
      es: {
        title: 'General Lift',
        desc: 'Tienda en línea de montacargas, transpaletas, apiladores y otros equipos de manejo de materiales. Catálogo por categorías y marcas, con información de financiamiento y garantía extendida.',
      },
      en: {
        title: 'General Lift',
        desc: 'Online store for forklifts, pallet jacks, stackers, and other material-handling equipment. Catalog by category and brand, with financing and extended warranty information.',
      },
    },
  },
  {
    id: 20,
    slug: 'tiendolia',
    image: `${CDN}/v1780311957/tiendolia_jbwkrw.png`,
    demo: 'https://tiendolia.mitiendanube.com',
    tags: ['Tiendanube', 'ePayco'],
    category: 'ecommerce',
    text: {
      es: {
        title: 'Tiendolia',
        desc: 'Tienda en línea de accesorios tecnológicos desarrollada en Tiendanube. Diseño personalizado, catálogo por categorías y proceso de compra sencillo.',
      },
      en: {
        title: 'Tiendolia',
        desc: 'Online store for tech accessories built on Tiendanube. Custom design, a catalog organized by category, and a simple checkout.',
      },
    },
  },
  {
    id: 21,
    slug: 'tesista-latam',
    image: `${CDN}/v1752452429/landing-tesistas_ocfnon.webp`,
    demo: 'https://comunidadtesistadelatinoamerica.com/convocatoria-asesores-academicos',
    tags: ['Landing Page'],
    category: 'landing',
    text: {
      es: {
        title: 'Comunidad Tesista LATAM — Convocatoria de Asesores',
        desc: 'Diseño y optimización de la landing de convocatoria de asesores académicos de la comunidad. Comunica con claridad el perfil buscado y facilita las postulaciones.',
      },
      en: {
        title: 'Comunidad Tesista LATAM — Advisor Recruitment',
        desc: 'Design and optimization of the community’s academic advisor recruitment landing page. It states the profile sought clearly and makes applying easier.',
      },
    },
  },
  {
    id: 22,
    slug: 'tdm-transportes',
    image: `${CDN}/mantenimiento-tdmtransportes_ofvvfe.png`,
    demo: 'https://www.tdm.com.co',
    tags: [
      { es: 'Soporte y mantenimiento', en: 'Support & maintenance' },
      { es: 'Seguridad', en: 'Security' },
    ],
    category: 'maintenance',
    text: {
      es: {
        title: 'TDM Transportes',
        desc: 'Limpieza de código malicioso tras un ataque externo, revisión general de la seguridad del sitio y restablecimiento en producción.',
      },
      en: {
        title: 'TDM Transportes',
        desc: 'Malware cleanup after an external attack, a general security review of the site, and recovery in production.',
      },
    },
  },
]

export const projectCategories: ProjectCategory[] = [
  'webapps',
  'corporate',
  'landing',
  'ecommerce',
  'desktop',
  'maintenance',
]
