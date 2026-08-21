/**
 * PORTFOLIO PREMIUM 2026
 * Emanuel López | Full Stack Developer
 * ─────────────────────────────────────
 * Features:
 *  - Scroll progress bar
 *  - Intersection Observer reveals
 *  - Smooth scroll
 *  - Projects filter
 *  - Contact form
 *  - Mobile nav
 */

// ── DATA ─────────────────────────────────────
const PROJECTS = [
  {
    id: 1, featured: true,
    title: "Sistema de Clientes — Neuradev Software",
    desc: "Sistema de gestión que permite registrar clientes, generar facturas, asignar proyectos y desarrolladores. Plataforma integral para optimizar la relación con clientes y la gestión interna.",
    image: "./assets/img/projects/clientes-neuradevsoftware.webp",
    demo: "https://clientes.neuradevsoftware.com",
    tags: ["React", "Node.js", "MongoDB", "Material UI", "JWT", "Google OAuth"],
    category: "webapps"
  },
  {
    id: 2, featured: true,
    title: "Otto — E-commerce Corporativo",
    desc: "Ecommerce corporativo desarrollado a código, integra pasarela de pagos PayU y diseño personalizado. Combina funcionalidades de tienda en línea con estructura institucional.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/otto_u6733s.png",
    demo: "https://ottoapis.com",
    tags: ["React", "Vite", "TailwindCSS", "Node.js", "PayU", "AWS"],
    category: "ecommerce"
  },
  {
    id: 3,
    title: "Neuradev Software",
    desc: "Sitio web corporativo que comunica servicios de desarrollo web, aplicaciones móviles y consultoría tecnológica. Moderno y con sólida presencia digital.",
    image: "./assets/img/projects/neuradevsoftware.webp",
    demo: "https://neuradevsoftware.com",
    tags: ["React", "Vite", "TailwindCSS", "Framer Motion"],
    category: "corporate"
  },
  {
    id: 4,
    title: "Sistema de Rifas — Neuradev Software",
    desc: "Plataforma web para administrar rifas en línea con panel de gestión, landing personalizada, verificación de reservas en tiempo real y notificaciones automáticas por WhatsApp.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/sistemarifas-landing_ijtiqn.png",
    demo: "https://demorifas.neuradevsoftware.com",
    tags: ["React", "Node.js", "MongoDB", "TailwindCSS", "JWT"],
    category: "webapps"
  },
  {
    id: 8,
    title: "APS Atlantic Pacific Standard",
    desc: "Sitio web corporativo para contratista general. Renovó su presencia digital destacando servicios integrales, proyectos y certificaciones, en colaboración con Smart PPC Bidding.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/v1769846087/apsbest_pa1ci5.png",
    demo: "https://apsbest.com",
    tags: ["WordPress", "Elementor"],
    category: "corporate"
  },
  {
    id: 12,
    title: "Comuna Latín Vice RP",
    desc: "Página web para servidor de roleplay, diseñada para ofrecer a los jugadores acceso rápido a reglas, noticias y recursos en un entorno intuitivo y compatible en todos los dispositivos.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/v1769846091/comunalatinvice_fiiitx.png",
    demo: "https://comunalatinvicerp.neuradevsoftware.com",
    tags: ["React", "React Bootstrap", "Node.js", "Nodemailer"],
    category: "corporate"
  },
  {
    id: 13, featured: true,
    title: "CM3D Launcher — Colombia Mods 3D",
    desc: "Launcher de escritorio con tienda propia para vender y entregar mods de camiones sin depender de plataformas externas. Incluye inicio de sesión con cuenta o Gmail, descargas seguras y actualizaciones automáticas.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/cm3d-launcher_l0gf6j.png",
    demo: null,
    tags: ["Python", "PyWebView", "OAuth Google", "Auto-actualización"],
    category: "desktop"
  },
  {
    id: 14,
    title: "CM3D Admin — Panel de Staff",
    desc: "Panel de administración a medida que automatiza la preparación de cada mod y protege el producto final antes de publicarlo, reduciendo el trabajo operativo y el margen de error humano en cada lanzamiento.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/launcher-admin_qkmo9f.png",
    demo: null,
    tags: ["Python", "PyWebView", "HashFS", "Node.js"],
    category: "desktop"
  },
  {
    id: 16,
    title: "Navajo 1 Construction",
    desc: "Sitio web corporativo para contratista general en Arizona, con diseño personalizado, presentación clara de servicios y una identidad visual sólida enfocada en generar confianza.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/navajo1_cbppsl.png",
    demo: "https://navajo1.com",
    tags: ["React", "Vite", "TailwindCSS"],
    category: "landing"
  },
  {
    id: 17,
    title: "General Lift",
    desc: "Tienda online para la venta de montacargas, transpaletas, apiladores y otros equipos de manejo de materiales, con catálogo por categorías y marcas, financiamiento y garantía extendida.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/generalliftna_n5bd9q.png",
    demo: "https://generalliftna.com",
    tags: ["E-commerce"],
    category: "ecommerce"
  },
  {
    id: 18,
    title: "Alta One USA",
    desc: "Tienda online en BigCommerce con diseño personalizado para la venta mayorista de suministros, catálogo organizado por categorías y adaptada para ser administrada de forma autónoma por el cliente.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/v1780245691/altaoneusa_bazwgh.png",
    demo: "https://altaoneusa.com",
    tags: ["BigCommerce"],
    category: "ecommerce"
  },
  {
    id: 19,
    title: "SoundSphere",
    desc: "Landing page para un producto tecnológico, enfocada en presentar sus características y beneficios de forma visual y ordenada, con sección de especificaciones y una llamada a la acción clara.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/soundsphere_iupmpz.png",
    demo: "https://soundsphere.neuradevsoftware.com",
    tags: ["Landing Page"],
    category: "landing"
  },
  {
    id: 20,
    title: "Tiendolia",
    desc: "Tienda online para la venta de accesorios tecnológicos, desarrollada en Tiendanube. Diseño personalizado, catálogo organizado por categorías y proceso de compra sencillo.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/v1780311957/tiendolia_jbwkrw.png",
    demo: "https://tiendolia.mitiendanube.com",
    tags: ["Tiendanube", "ePayco"],
    category: "ecommerce"
  },
  {
    id: 21,
    title: "Comunidad Tesista LATAM — Convocatoria de Asesores",
    desc: "Diseño y optimización de la landing page de convocatoria de asesores académicos para la comunidad, comunicando con más claridad el perfil buscado y facilitando las postulaciones.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/v1752452429/landing-tesistas_ocfnon.webp",
    demo: "https://comunidadtesistadelatinoamerica.com/convocatoria-asesores-academicos",
    tags: ["Landing Page"],
    category: "landing"
  },
  {
    id: 22,
    title: "TDM Transportes",
    desc: "Limpieza de código malicioso tras un ataque externo, revisión de la seguridad general del sitio y puesta en marcha nuevamente en producción.",
    image: "https://res.cloudinary.com/dhoyps3vk/image/upload/mantenimiento-tdmtransportes_ofvvfe.png",
    demo: "https://www.tdm.com.co",
    tags: ["Soporte y Mantenimiento", "Seguridad"],
    category: "maintenance"
  }
];

const SKILLS = [
  { name: "HTML5", icon: "https://api.iconify.design/simple-icons:html5.svg?color=%23ffffff" },
  { name: "CSS3", icon: "https://api.iconify.design/simple-icons:css3.svg?color=%23ffffff" },
  { name: "JavaScript", icon: "https://api.iconify.design/simple-icons:javascript.svg?color=%23ffffff" },
  { name: "React", icon: "https://api.iconify.design/simple-icons:react.svg?color=%23ffffff" },
  { name: "TailwindCSS", icon: "https://api.iconify.design/simple-icons:tailwindcss.svg?color=%23ffffff" },
  { name: "Python", icon: "https://api.iconify.design/simple-icons:python.svg?color=%23ffffff" },
  { name: "PHP", icon: "https://api.iconify.design/simple-icons:php.svg?color=%23ffffff" },
  { name: "Laravel", icon: "https://api.iconify.design/simple-icons:laravel.svg?color=%23ffffff" },
  { name: "WordPress", icon: "https://api.iconify.design/simple-icons:wordpress.svg?color=%23ffffff" },
  { name: "Tiendanube", icon: "https://api.iconify.design/nimbus:tiendanube.svg?color=%23ffffff" },
  { name: "BigCommerce", icon: "https://api.iconify.design/simple-icons:bigcommerce.svg?color=%23ffffff" },
  { name: "Shopify", icon: "https://api.iconify.design/simple-icons:shopify.svg?color=%23ffffff" },
  { name: "Git", icon: "https://api.iconify.design/simple-icons:git.svg?color=%23ffffff" },
  { name: "GitHub", icon: "https://api.iconify.design/simple-icons:github.svg?color=%23ffffff" },
  { name: "Lua", icon: "https://api.iconify.design/simple-icons:lua.svg?color=%23ffffff" },
  { name: "cPanel", icon: "https://api.iconify.design/simple-icons:cpanel.svg?color=%23ffffff" },
  { name: "Trello", icon: "https://api.iconify.design/simple-icons:trello.svg?color=%23ffffff" },
  { name: "Vite", icon: "https://api.iconify.design/simple-icons:vite.svg?color=%23ffffff" }
];

const EXPERIENCE = [
  {
    company: "Neuradev Software",
    logo: "https://res.cloudinary.com/dhoyps3vk/image/upload/v1773786788/isotipo-blanco-neuradev2026_wkewyc.png",
    role: "Full Stack Developer",
    period: "Diciembre 2024 — Presente",
    desc: "Desarrollo soluciones digitales personalizadas, desde sitios CMS hasta aplicaciones completas. Trabajo con WordPress, APIs, chatbots y herramientas de terceros, además de gestionar dominios, DNS, correo corporativo, cPanel y WHM."
  },
  {
    company: "Xtrategic Publicidad Digital",
    logo: "./assets/img/company/xtrategic.webp",
    role: "Full Stack Freelance",
    period: "Enero 2025 — Junio 2026",
    desc: "Desarrollo de soluciones digitales personalizadas con WordPress y software a medida. Implementación de APIs, chatbots, herramientas externas, SEO técnico, optimización de rendimiento y soporte completo hasta el lanzamiento."
  },
  {
    company: "LatinoAmérica Hosting",
    logo: "./assets/img/company/logo-latinoamericahosting.webp",
    role: "Technical Support Specialist",
    period: "Agosto 2022 — Abril 2024",
    desc: "Administración de hosting, dominios, DNS, correo corporativo, SSL, cPanel y WHM. Soporte para WordPress, Joomla, PrestaShop, PHP y MySQL, además de diagnóstico, documentación y capacitación de usuarios."
  }
];

// ── INIT ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initLanguage();
  initScrollProgress();
  renderSkills();
  renderExperience();
  renderProjects("all");
  initProjectsFilter();
  initReveal();
  initProjectModal();
  initContactForm();
  initSmoothScroll();
});

// ── LANGUAGE SWITCHER ─────────────────────────
const UI_TRANSLATIONS = {
  es: {
    "meta.title": "Emanuel López — Desarrollador Web Full Stack",
    "nav.about": "Acerca de", "nav.skills": "Habilidades", "nav.experience": "Experiencia",
    "nav.projects": "Proyectos", "nav.contact": "Contacto", "nav.talk": "Hablemos",
    "hero.available": "[ disponible para proyectos ]",
    "hero.role": "Desarrollo sitios WordPress, software personalizado y soluciones digitales completas. También gestiono cPanel, DNS, hosting, correo corporativo, APIs y chatbots. Con sede en <strong>Medellín, Colombia</strong>.",
    "hero.years": "años de experiencia", "hero.projects": "proyectos entregados", "hero.technologies": "tecnologías", "hero.projectsButton": "Ver proyectos", "hero.downloadCv": "Descargar CV", "hero.posterWord": "CREACIÓN<br><span>DIGITAL</span>", "hero.posterLabel": "IDEAS / SISTEMAS", "hero.scroll": "Desplazar",
    "about.label": "Sobre mí", "about.title": "Desarrollador<br>con visión<br>de producto.",
    "about.text1": "Soy un desarrollador especializado en la <strong>colaboración en equipo</strong> y en la <strong>implementación de soluciones tecnológicas efectivas</strong>. Con experiencia tanto en trabajo colaborativo como en labores individuales, mi enfoque abarca desde CMS como WordPress y Joomla hasta frameworks modernos como React y Laravel.",
    "about.text2": "Me apasiona crear sitios web que ofrezcan una <strong>experiencia de usuario excepcional</strong>: veloces, accesibles y con identidad visual fuerte. Cada proyecto es una oportunidad de construir algo que realmente funcione para las personas.",
    "skills.label": "Stack", "skills.title": "Habilidades & Tecnologías",
    "experience.label": "Trayectoria", "experience.title": "Experiencia<br>Profesional",
    "projects.label": "Trabajo", "projects.title": "Proyectos<br>Seleccionados",
    "filters.all": "Todos", "filters.webapps": "Aplicaciones Web", "filters.corporate": "Corporativas", "filters.landing": "Landing Pages", "filters.ecommerce": "E-commerce", "filters.desktopApps": "Aplicaciones de Escritorio", "filters.maintenance": "Mantenimiento",
    "contact.label": "Contacto", "contact.title": "¿Trabajamos<br>juntos?",
    "contact.tagline": "Cuéntame qué necesitas<br>construir. <span>Hablamos hoy.</span>",
    "contact.sub": "Freelance, colaboraciones o un puesto fijo — respondo yo mismo, sin intermediarios. Escríbeme con el contexto de tu proyecto y en menos de 24h tienes respuesta.",
    "form.name": "Nombre", "form.email": "Email", "form.subject": "Asunto", "form.message": "Mensaje",
    "modal.project": "Proyecto", "modal.demo": "Ver proyecto", "form.submit": "Enviar mensaje", "form.sending": "Enviando...", "project.demoTitle": "Ver demo", "project.openDescription": "Ver descripción de", "slider.page": "Ir a la página", "modal.preview": "Vista previa de", "terminal.identity": "Emanuel López, Desarrollador Full Stack", "terminal.status": "disponible para proyectos <span class=\"terminal-cursor\">▌</span>", "feedback.transmission": "TRANSMISIÓN SALIENTE", "feedback.deployed": "Mensaje enviado", "feedback.code": "CÓDIGO", "feedback.build": "COMPILACIÓN", "feedback.server": "SERVIDOR", "feedback.inbox": "BANDEJA", "feedback.message": "mensaje", "feedback.connection": "estableciendo conexión segura...", "feedback.compiling": "compilando tu mensaje...", "feedback.delivered": "entregado a", "feedback.success": "Mensaje enviado", "feedback.error": "No se pudo enviar", "feedback.detail": "Gracias por escribirme. Te responderé pronto."
  },
  en: {
    "meta.title": "Emanuel López — Full Stack Web Developer",
    "nav.about": "About", "nav.skills": "Skills", "nav.experience": "Experience",
    "nav.projects": "Projects", "nav.contact": "Contact", "nav.talk": "Let's talk",
    "hero.available": "[ available for projects ]",
    "hero.role": "I build WordPress websites, custom software, and complete digital solutions. I also manage cPanel, DNS, hosting, corporate email, APIs, and chatbots. Based in <strong>Medellin, Colombia</strong>.",
    "hero.years": "years of experience", "hero.projects": "projects delivered", "hero.technologies": "technologies", "hero.projectsButton": "View projects", "hero.downloadCv": "Download CV", "hero.posterWord": "DIGITAL<br><span>CRAFT</span>", "hero.posterLabel": "IDEAS / SYSTEMS", "hero.scroll": "Scroll",
    "about.label": "About me", "about.title": "Developer<br>with product<br>vision.",
    "about.text1": "I am a developer focused on <strong>team collaboration</strong> and the <strong>delivery of effective technology solutions</strong>. My experience spans collaborative and independent work, from CMS platforms such as WordPress and Joomla to modern frameworks like React and Laravel.",
    "about.text2": "I love building websites with an <strong>exceptional user experience</strong>: fast, accessible, and visually distinctive. Every project is an opportunity to create something that genuinely works for people.",
    "skills.label": "Stack", "skills.title": "Skills & Technology",
    "experience.label": "Journey", "experience.title": "Professional<br>Experience",
    "projects.label": "Work", "projects.title": "Selected<br>Projects",
    "filters.all": "All", "filters.webapps": "Web Applications", "filters.corporate": "Corporate Websites", "filters.landing": "Landing Pages", "filters.ecommerce": "E-commerce", "filters.desktopApps": "Desktop Applications", "filters.maintenance": "Maintenance",
    "contact.label": "Contact", "contact.title": "Shall we work<br>together?",
    "contact.tagline": "Tell me what you need to<br>build. <span>Let's talk today.</span>",
    "contact.sub": "Freelance, collaborations, or a full-time role — I answer personally, with no middlemen. Share your project context and I will get back to you within 24 hours.",
    "form.name": "Name", "form.email": "Email", "form.subject": "Subject", "form.message": "Message",
    "modal.project": "Project", "modal.demo": "View project", "form.submit": "Send message", "form.sending": "Sending...", "project.demoTitle": "View demo", "project.openDescription": "View description of", "slider.page": "Go to page", "modal.preview": "Preview of", "terminal.identity": "Emanuel López, Full Stack Developer", "terminal.status": "available for projects <span class=\"terminal-cursor\">▌</span>", "feedback.transmission": "OUTBOUND TRANSMISSION", "feedback.deployed": "Message deployed", "feedback.code": "CODE", "feedback.build": "BUILD", "feedback.server": "SERVER", "feedback.inbox": "INBOX", "feedback.message": "message", "feedback.connection": "establishing secure connection...", "feedback.compiling": "compiling your message...", "feedback.delivered": "delivered to", "feedback.success": "Message sent", "feedback.error": "Could not send", "feedback.detail": "Thanks for writing. I will get back to you soon."
  }
};

let activeLanguage = "es";

const PROJECT_EN = {
  1: ["Client System — Neuradev Software", "Management platform for registering clients, generating invoices, assigning projects and developers, and centralizing internal operations."],
  2: ["Otto — Corporate E-commerce", "Custom-coded corporate ecommerce with PayU payments and a tailored institutional storefront."],
  3: ["Neuradev Software", "Corporate website communicating web development, mobile applications, and technology consulting services."],
  4: ["Raffle System", "Online raffle platform with management dashboard, real-time reservation checks, and automated WhatsApp notifications."],
  8: ["APS Atlantic Pacific Standard", "Corporate website for a general contractor, highlighting services, projects, and certifications."],
  12: ["Comuna Latin Vice RP", "Responsive website for a roleplay server, giving players quick access to rules, news, and resources."],
  13: ["CM3D Launcher — Colombia Mods 3D", "Desktop launcher with its own store, secure downloads, Google login, and automatic updates."],
  14: ["CM3D Admin — Staff Panel", "Custom administration panel that automates mod preparation and protects the final product before release."],
  16: ["Navajo 1 Construction", "Corporate website for an Arizona general contractor, built around trust and a clear service presentation."],
  17: ["General Lift", "Online store for material-handling equipment with categorized products, financing, and extended warranty information."],
  18: ["Alta One USA", "BigCommerce wholesale store with custom design, organized catalog, and independent client administration."],
  19: ["SoundSphere", "Product landing page presenting technical features and benefits through a clear visual structure."],
  20: ["Tiendolia", "Tiendanube store for tech accessories with organized catalog and a simple checkout experience."],
  21: ["Comunidad Tesista LATAM — Advisor Recruitment", "Landing page optimized to communicate the academic advisor profile and make applications easier."],
  22: ["TDM Transportes", "Malware cleanup, security review, and production recovery after an external attack."
  ]
};

const EXPERIENCE_EN = {
  "Neuradev Software": ["Full Stack Developer", "December 2024 — Present", "Building custom digital solutions from CMS websites to complete applications. Working with WordPress, APIs, chatbots, third-party tools, domains, DNS, corporate email, cPanel, and WHM."],
  "Xtrategic Publicidad Digital": ["Full Stack Freelance", "January 2025 — June 2026", "Developing custom digital solutions with WordPress and bespoke software. Implementing APIs, chatbots, external tools, technical SEO, performance optimization, and full support through launch."],
  "LatinoAmérica Hosting": ["Technical Support Specialist", "August 2022 — April 2024", "Managing hosting, domains, DNS, corporate email, SSL, cPanel, and WHM. Supporting WordPress, Joomla, PrestaShop, PHP, and MySQL, with troubleshooting, documentation, and user training."]
};

function localizeProject(project) {
  if (activeLanguage !== "en" || !PROJECT_EN[project.id]) return project;
  const [title, desc] = PROJECT_EN[project.id];
  return { ...project, title, desc };
}

function localizeExperience(exp) {
  if (activeLanguage !== "en" || !EXPERIENCE_EN[exp.company]) return exp;
  const [role, period, desc] = EXPERIENCE_EN[exp.company];
  return { ...exp, role, period, desc };
}

function initLanguage() {
  const toggle = document.getElementById("language-toggle");
  if (!toggle) return;
  let language = localStorage.getItem("portfolio-language") || "es";

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    activeLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const value = UI_TRANSLATIONS[language][element.dataset.i18n];
      if (value) element.innerHTML = value;
    });
    document.querySelectorAll("[data-aria-es]").forEach(element => {
      element.setAttribute("aria-label", element.dataset[`aria${language === "es" ? "Es" : "En"}`]);
    });
    document.querySelectorAll("[data-placeholder-es]").forEach(element => {
      element.placeholder = element.dataset[`placeholder${language === "es" ? "Es" : "En"}`];
    });
    toggle.textContent = language === "es" ? "EN" : "ES";
    toggle.setAttribute("aria-label", language === "es" ? "Switch to English" : "Cambiar a español");
    localStorage.setItem("portfolio-language", language);
    renderExperience();
    renderProjects(document.querySelector(".filter-btn.active")?.dataset.filter || "all");
  }

  toggle.addEventListener("click", () => applyLanguage(language === "es" ? "en" : "es"));
  applyLanguage(language);
}

// ── NAV ───────────────────────────────────────
function initNav() {
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("nav-hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  window.addEventListener("scroll", () => {
    if (!nav) return;
    if (window.scrollY > 80) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }
}

// ── SCROLL PROGRESS ───────────────────────────
function initScrollProgress() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    bar.style.width = `${pct}%`;
  });
}

// ── RENDER: SKILLS ────────────────────────────
function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  SKILLS.forEach((skill, i) => {
    const card = document.createElement("div");
    card.className = "skill-card reveal";
    card.style.transitionDelay = `${i * 40}ms`;
    card.innerHTML = `
      <img src="${skill.icon}" alt="${skill.name}" class="skill-icon" loading="lazy" onerror="this.style.display='none'">
      <span class="skill-name">${skill.name}</span>
    `;
    grid.appendChild(card);
  });
}

// ── RENDER: EXPERIENCE ────────────────────────
function renderExperience() {
  const timeline = document.getElementById("exp-timeline");
  if (!timeline) return;

  timeline.innerHTML = "";
  EXPERIENCE.forEach(baseExperience => {
    const exp = localizeExperience(baseExperience);
    const item = document.createElement("div");
    item.className = "exp-item";
    item.innerHTML = `
      <div class="exp-dot"></div>
      <div class="exp-company">
        <img src="${exp.logo}" alt="${exp.company}" class="exp-company-logo" loading="lazy" onerror="this.style.display='none'">
        <span class="exp-company-name">${exp.company}</span>
      </div>
      <h3 class="exp-role">${exp.role}</h3>
      <div class="exp-period">${exp.period}</div>
      <p class="exp-desc">${exp.desc}</p>
    `;
    timeline.appendChild(item);
  });
}

// ── RENDER: PROJECTS (3x3 grid) ──────────────
// Each page shows nine projects: three columns by three rows.
const BENTO_VARIANTS = Array(9).fill("size-sq");
const PROJECTS_PER_PAGE = 9;

function buildProjectCard(project, variant) {
  const card = document.createElement("div");
  card.className = `project-card ${variant}`;
  card.dataset.projectId = project.id;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${UI_TRANSLATIONS[activeLanguage]["project.openDescription"]} ${project.title}`);

  const demoLink = project.demo
    ? `<a href="${project.demo}" target="_blank" rel="noopener" class="overlay-link" title="${UI_TRANSLATIONS[activeLanguage]["project.demoTitle"]}">
        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>`
    : "";

  card.innerHTML = `
    <div class="project-thumb">
      <img src="${project.image}" class="project-thumb-bg" alt="" aria-hidden="true" loading="lazy" onerror="this.style.display='none'">
      <img src="${project.image}" class="project-thumb-fg" alt="${project.title}" loading="lazy" onerror="this.src='./assets/img/projects/portafolio.webp'">
    </div>
    <div class="project-overlay"></div>
    <div class="project-overlay-links">${demoLink}</div>
    <div class="project-body">
      <h3 class="project-title">${project.title}</h3>
    </div>
  `;

  return card;
}

function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const track = document.getElementById("projects-track");
  const image = document.getElementById("project-modal-image");
  const title = document.getElementById("project-modal-title");
  const description = document.getElementById("project-modal-description");
  const tags = document.getElementById("project-modal-tags");
  const demo = document.getElementById("project-modal-demo");
  if (!modal || !track || !image || !title || !description || !tags || !demo) return;

  let lastFocusedCard = null;

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    lastFocusedCard?.focus();
  }

  function openModal(project) {
    image.src = project.image;
    image.alt = `${UI_TRANSLATIONS[activeLanguage]["modal.preview"]} ${project.title}`;
    image.hidden = false;
    title.textContent = project.title;
    description.textContent = project.desc;
    tags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join("");

    if (project.demo) {
      demo.href = project.demo;
      demo.hidden = false;
    } else {
      demo.hidden = true;
    }

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".project-modal-close").focus();
  }

  image.addEventListener("error", () => {
    image.hidden = true;
  });

  function handleCardOpen(card) {
    const baseProject = PROJECTS.find(item => String(item.id) === card.dataset.projectId);
    if (!baseProject) return;
    lastFocusedCard = card;
    openModal(localizeProject(baseProject));
  }

  track.addEventListener("click", event => {
    if (event.target.closest(".overlay-link")) return;
    const card = event.target.closest(".project-card");
    if (card) handleCardOpen(card);
  });

  track.addEventListener("keydown", event => {
    const card = event.target.closest(".project-card");
    if (!card || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    handleCardOpen(card);
  });

  modal.addEventListener("click", event => {
    if (event.target.closest("[data-modal-close]")) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (!modal.hidden && event.key === "Escape") closeModal();
  });
}

function renderProjects(filter) {
  const track = document.getElementById("projects-track");
  if (!track) return;

  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  track.style.transition = "opacity 0.3s";
  track.style.opacity = "0";

  setTimeout(() => {
    track.innerHTML = "";

    const pages = [];
    for (let i = 0; i < filtered.length; i += PROJECTS_PER_PAGE) {
      pages.push(filtered.slice(i, i + PROJECTS_PER_PAGE));
    }
    if (pages.length === 0) pages.push([]);

    pages.forEach(pageProjects => {
      const page = document.createElement("div");
      page.className = "projects-page";
      pageProjects.forEach((project, i) => {
        page.appendChild(buildProjectCard(localizeProject(project), BENTO_VARIANTS[i % BENTO_VARIANTS.length]));
      });
      track.appendChild(page);
    });

    track.style.opacity = "1";
    initProjectsSlider(pages.length);
    initReveal(); // re-check: the slider wrapper had 0 height before cards existed

    requestAnimationFrame(() => {
      document.querySelectorAll(".project-card").forEach((card, i) => {
        setTimeout(() => card.classList.add("visible"), i * 35);
      });
    });
  }, 300);
}

// ── PROJECTS SLIDER NAV ───────────────────────
function initProjectsSlider(pageCount) {
  const track = document.getElementById("projects-track");
  const dotsWrap = document.getElementById("slider-dots");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

  let currentPage = 0;

  dotsWrap.innerHTML = "";
  for (let i = 0; i < pageCount; i++) {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `${UI_TRANSLATIONS[activeLanguage]["slider.page"]} ${i + 1}`);
    dot.addEventListener("click", () => goToPage(i));
    dotsWrap.appendChild(dot);
  }

  function updateDots() {
    dotsWrap.querySelectorAll(".slider-dot").forEach((d, idx) => {
      d.classList.toggle("active", idx === currentPage);
    });
  }

  function updateArrows() {
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= pageCount - 1;
  }

  function goToPage(i) {
    currentPage = Math.max(0, Math.min(pageCount - 1, i));
    track.scrollTo({ left: currentPage * track.clientWidth, behavior: "smooth" });
    updateDots();
    updateArrows();
  }

  prevBtn.onclick = () => goToPage(currentPage - 1);
  nextBtn.onclick = () => goToPage(currentPage + 1);

  let scrollTimeout;
  track.onscroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const pageWidth = track.clientWidth;
      if (pageWidth > 0) {
        currentPage = Math.round(track.scrollLeft / pageWidth);
        updateDots();
        updateArrows();
      }
    }, 100);
  };

  updateArrows();
}

// ── PROJECTS FILTER ───────────────────────────
function initProjectsFilter() {
  const btns = document.querySelectorAll(".filter-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });
}

// ── INTERSECTION OBSERVER ─────────────────────
function initReveal() {
  const elements = document.querySelectorAll(".reveal:not(.visible), .exp-item:not(.visible)");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  elements.forEach(el => observer.observe(el));
}

// ── CONTACT FORM ──────────────────────────────
function initContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (!form) return;
  if (feedback) document.body.appendChild(feedback);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector(".btn-primary");
    const origText = btn.innerHTML;
    if (feedback) {
      feedback.classList.remove("is-complete", "is-result-success", "is-result-error");
      feedback.classList.add("is-running");
    }

    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${UI_TRANSLATIONS[activeLanguage]["form.sending"]}`;
    btn.disabled = true;

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString()
      });

      if (!response.ok) throw new Error(`Netlify Forms respondió ${response.status}`);

      btn.innerHTML = origText;
      btn.disabled = false;
      form.reset();
      if (feedback) {
        feedback.classList.remove("is-running", "is-result-error");
        feedback.classList.add("is-complete");
        setTimeout(() => feedback.classList.add("is-result-success"), 850);
        setTimeout(() => feedback.classList.remove("is-complete", "is-result-success"), 4200);
      }
    } catch (error) {
      console.error("No se pudo enviar el formulario a Netlify:", error);
      btn.innerHTML = origText;
      btn.disabled = false;
      if (feedback) {
        feedback.classList.remove("is-running", "is-result-success");
        feedback.classList.add("is-complete");
        setTimeout(() => feedback.classList.add("is-result-error"), 850);
        setTimeout(() => feedback.classList.remove("is-complete", "is-result-error"), 4200);
      }
    }
  });
}

// ── SMOOTH SCROLL ─────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

// ── RE-CHECK REVEALS AFTER FULL LOAD ─────────
window.addEventListener("load", () => {
  initReveal();
});
