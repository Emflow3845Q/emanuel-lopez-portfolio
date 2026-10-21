# Portafolio — Emanuel López

Portafolio profesional de **Emanuel López**, Desarrollador Full Stack en Medellín, Colombia. Está construido como un producto real: bilingüe (ES/EN), accesible, con pruebas automatizadas, integración continua y SEO.

**Sitio en producción:** <https://emadev.neuradevsoftware.com>

## Qué muestra

- **Proyectos reales**: la plataforma CM3D en producción (API REST, launcher y panel de escritorio, sitio web), aplicaciones web, sitios corporativos, e-commerce (BigCommerce, Tiendanube, PayU), landing pages y mantenimiento/seguridad. Se filtran por categoría y cada uno tiene su propia URL compartible.
- **Habilidades** agrupadas por área (frontend, backend y datos, CMS y e-commerce, hosting e infraestructura, herramientas y soporte).
- **Experiencia profesional** con responsabilidades concretas, y **formación y certificaciones** (técnico en CESDE, Scrum Foundation de CertiProf y cursos de Udemy), y los certificados se pueden **ver dentro de la propia web** en un visor (con descarga en PDF y, cuando el emisor lo ofrece, enlace de verificación).
- **Formulario de contacto** con validación, estados de error y envío mediante Netlify Forms.

## Stack

| Tecnología | Uso |
|---|---|
| **React 19** + **TypeScript** (modo estricto) | Interfaz tipada por componentes |
| **Vite 8** | Servidor de desarrollo y build |
| **Tailwind CSS v4** | Estilos; tokens en `@theme` y tema claro/oscuro con variables CSS |
| **Motion** (`LazyMotion` + `m`) | Animaciones con carga diferida |
| **react-icons** + **lucide-react** | Iconos incluidos en el bundle (sin CDN) |
| **@fontsource-variable** | Syne, DM Sans y JetBrains Mono autoalojadas |
| **Biome** | Linter y formateador, con reglas de accesibilidad |
| **Vitest** + **Playwright** | Pruebas unitarias y end-to-end |
| **GitHub Actions** | Integración continua |

## Empezar

Requisitos: **Node.js 22.12 o superior** (ver `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:5173
```

| Comando | Qué hace |
|---|---|
| `npm run build` | Comprueba tipos y genera el build en `dist/` |
| `npm run preview` | Sirve el build en `:4173` |
| `npm run check` | Typecheck + lint + pruebas + build (lo mismo que el CI) |
| `npm run lint` / `lint:fix` | Biome: revisar / corregir y formatear |
| `npm test` | Pruebas unitarias y de integridad de datos (Vitest) |
| `npm run test:e2e` | Pruebas end-to-end (Playwright; levanta el build solo) |
| `npm run warm:images` | Precalienta las variantes de imagen en la caché de Cloudinary |

Para Playwright, la primera vez ejecuta `npx playwright install chromium`, o apunta a un Chromium propio con `PW_CHROMIUM_PATH=/ruta/a/chromium npm run test:e2e`.

## Estructura

```
src/
├── components/
│   ├── layout/      Navbar, ThemeToggle, LangToggle, SkipLink, Footer
│   ├── pages/       NotFound (404)
│   ├── sections/    Hero (+Poster, +Stats), About, Skills, Experience, Projects, Contact
│   ├── projects/    ProjectCard, ProjectModal (carga diferida), ProjectImage
│   ├── contact/     ContactForm, FormField, MailDeploy (carga diferida) + deploy/*
│   └── ui/          Section, Reveal, CountUp
├── data/            projects · skills · experience · education · site   ← el contenido vive aquí
├── hooks/           useProjectsSlider, useActiveSection, useProjectRoute, useMediaQuery, …
├── i18n/            translations.tsx (ES/EN) + LanguageContext
├── theme/           ThemeContext (claro/oscuro, respeta prefers-color-scheme)
├── lib/             images (Cloudinary), hashRoute, formValidation, motion, viewTransition, …
└── index.css        paletas por tema, tokens (@theme), utilidades y keyframes
public/
├── cv/              CV en PDF (español e inglés)
├── certificates/    certificados: PDF descargable + imágenes WebP para el visor de la web
└── og-image.png     imagen para compartir en redes
e2e/                 pruebas Playwright
scripts/             utilidades (warm-images)
.github/workflows/   CI: typecheck, lint, pruebas, build y e2e
```

## Decisiones de diseño y calidad

- **Rendimiento:** el JS inicial pesa ~390 KB (~132 KB gzip). El modal de proyecto, el visor de certificados, el panel de envío del formulario y las funciones de Motion se cargan bajo demanda; el modal se precarga al pasar el cursor por una tarjeta. Las imágenes de Cloudinary se piden con `f_auto,q_auto` y `srcset`, y las animaciones infinitas del hero se pausan fuera de pantalla.
- **Accesibilidad:** contraste AA en ambos temas, enlace "Saltar al contenido", `aria-current` en la navegación, foco atrapado en el modal, carrusel operable con teclado y páginas fuera de vista `inert`, errores de formulario con `aria-invalid`/`aria-describedby` y respeto de `prefers-reduced-motion`.
- **Tema claro/oscuro:** se resuelve antes del primer pintado con un script inline para evitar parpadeos. Los bloques tipo terminal y el modal mantienen su paleta oscura.
- **Rutas compartibles:** cada proyecto se abre con `#/proyecto/<slug>`; el botón "atrás" cierra el modal.
- **Internacionalización:** ES/EN con la misma estructura, verificada por una prueba. Si se añade una clave en un idioma y no en el otro, la prueba falla.
- **SEO y vista previa al compartir:** canonical, Open Graph / Twitter Card con imagen propia (`public/og-image.png`, 1200×630, misma línea gráfica del sitio), JSON-LD (`Person`), `robots.txt` y `sitemap.xml`. Una prueba verifica que todos apunten al mismo dominio que `site.url`.
- **Página 404:** `public/_redirects` sirve `index.html` con estado 404 en rutas inexistentes y `src/lib/notFound.ts` pinta la página 404 (ES/EN, con `noindex`).
- **Transiciones:** el cambio de idioma y de tema usa la View Transitions API, con degradación si no existe.

## Calidad y pruebas

- **Unitarias y de integridad (Vitest):** utilidades, validación de formularios, rutas por hash, y **integridad de los datos** (slugs únicos, textos completos en ES/EN, imágenes de Cloudinary, categorías sin filtros vacíos, dominio coherente y habilidades alineadas con la experiencia).
- **End-to-end (Playwright):** carga sin errores de consola, idioma y tema persistentes, navegación y sección activa, filtros, modal y enlaces directos, carrusel (botones, arrastre y teclado), formulario (validación, éxito y fallo del servidor), 404 y ausencia de desbordamiento horizontal. Los conteos se calculan desde los datos, por lo que no se desfasan al añadir proyectos.
- **CI:** cada push a `main` y cada pull request ejecutan typecheck, lint, pruebas unitarias, build y e2e.

## Mantener el contenido

- **Proyectos, habilidades y experiencia:** `src/data/*.ts`. Cada proyecto lleva `slug` y textos en `es` y `en`. El orden del arreglo es el orden en pantalla.
- **Textos de la interfaz:** `src/i18n/translations.tsx`.
- **Contacto, CV y estadísticas:** `src/data/site.ts`. El CV vive en `public/cv/` como PDF por idioma (`cv-emanuel-lopez-es.pdf` y `-en.pdf`); el botón "Descargar CV" entrega el del idioma activo. Para actualizarlo, reemplaza esos dos archivos. La cifra de proyectos entregados se calcula sola a partir de `projects.ts`.
- **Formación y certificados:** `src/data/education.ts`. Por cada certificado van en `public/certificates/` el PDF y dos imágenes WebP (miniatura de ~640 px y completa de ~1800 px) que usa el visor; una prueba verifica que cada archivo referenciado exista. Para convertir un PDF: `pdftoppm -scale-to-x 1800 -scale-to-y -1 -png -singlefile cert.pdf cert` y exportar a WebP.
- **Colores y fuentes:** paletas y `@theme` en `src/index.css`.
- **Imágenes:** se alojan en Cloudinary. Un proyecto con `image: null` muestra un marcador con su monograma hasta que se suba la captura.

Si cambia el dominio, actualiza `site.url` y los mismos valores en `index.html`, `public/robots.txt` y `public/sitemap.xml` (una prueba avisa si quedan desalineados).

## Formulario de contacto

Por defecto envía a `/` mediante **Netlify Forms** (formulario `contacto-portafolio`); el formulario estático que Netlify detecta vive en `index.html`. Los avisos por correo se configuran en Netlify → *Forms* → *Form notifications*.
Para otro servicio (Formspree, una API propia…), crea un `.env` con `VITE_FORM_ENDPOINT=...` (ver `.env.example`). En `npm run dev` el envío mostrará el estado de error, porque Netlify solo procesa el formulario una vez desplegado.

## Despliegue

- **Netlify:** comando de build `npm run build`, directorio de publicación `dist` (incluye `public/_redirects`). Dominio: `emadev.neuradevsoftware.com`.
- **Vercel:** detecta Vite automáticamente.

## Contacto

- Correo: <emanuel.arango1226@gmail.com>
- LinkedIn: <https://www.linkedin.com/in/emanuel-l%C3%B3pez-490899308/>

## Licencia

© 2026 Emanuel López. Todos los derechos reservados. El código se publica para que pueda revisarse como muestra de trabajo; no se concede licencia de reutilización sin autorización.
