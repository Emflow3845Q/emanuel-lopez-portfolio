import { existsSync, readFileSync } from 'node:fs'
import { isValidElement } from 'react'
import { describe, expect, it } from 'vitest'
import { dictionaries } from '@/i18n/translations'
import { credentials } from './education'
import { experience } from './experience'
import { projectCategories, projects, tagLabel } from './projects'
import { site } from './site'
import { skillGroups } from './skills'

/** Estructura de claves de un objeto; los elementos JSX y las listas cuentan como hojas. */
function shape(value: unknown): unknown {
  if (value === null || typeof value !== 'object' || isValidElement(value) || Array.isArray(value)) return typeof value
  return Object.fromEntries(
    Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => [k, shape(v)]),
  )
}

describe('proyectos', () => {
  it('tienen id y slug únicos', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length)
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length)
  })

  it('los slugs son aptos para URL', () => {
    for (const p of projects) expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('tienen texto en español e inglés y categoría válida', () => {
    for (const p of projects) {
      expect(p.text.es.title && p.text.es.desc).toBeTruthy()
      expect(p.text.en.title && p.text.en.desc).toBeTruthy()
      expect(projectCategories).toContain(p.category)
    }
  })

  it('las etiquetas traducibles tienen texto en ambos idiomas y ninguna se repite dentro de un proyecto', () => {
    for (const p of projects) {
      for (const lang of ['es', 'en'] as const) {
        const labels = p.tags.map((tag) => tagLabel(tag, lang))
        expect(labels.every(Boolean), p.slug).toBe(true)
        expect(new Set(labels).size, p.slug).toBe(labels.length)
      }
    }
  })

  it('cada categoría tiene al menos un proyecto (el filtro nunca queda vacío)', () => {
    for (const category of projectCategories) expect(projects.some((p) => p.category === category)).toBe(true)
  })
})

describe('imágenes', () => {
  const isCloudinaryOrPending = (url: string | null) => url === null || /^https:\/\/res\.cloudinary\.com\//.test(url)

  it('las imágenes de proyectos vienen de Cloudinary (o están pendientes)', () => {
    for (const p of projects) expect(isCloudinaryOrPending(p.image), p.slug).toBe(true)
  })

  it('los logos de empresas vienen de Cloudinary, de /public (o están pendientes)', () => {
    for (const item of experience) {
      const ok = isCloudinaryOrPending(item.logo) || /^\/logos\/[a-z0-9-]+\.webp$/.test(item.logo ?? '')
      expect(ok, item.company).toBe(true)
    }
  })
})

describe('experiencia', () => {
  it('tiene traducciones completas', () => {
    for (const item of experience) {
      expect(Object.values(item.text.es).every(Boolean)).toBe(true)
      expect(Object.values(item.text.en).every(Boolean)).toBe(true)
    }
  })
})

describe('skills', () => {
  it('no repiten nombre dentro de un grupo y no hay grupos vacíos', () => {
    for (const group of skillGroups) {
      expect(group.skills.length).toBeGreaterThan(0)
      expect(new Set(group.skills.map((s) => s.name)).size).toBe(group.skills.length)
    }
  })
})

describe('traducciones', () => {
  it('ES y EN tienen exactamente la misma estructura', () => {
    expect(shape(dictionaries.en)).toEqual(shape(dictionaries.es))
  })

  it('no hay textos vacíos', () => {
    const walk = (value: unknown, path: string) => {
      if (typeof value === 'string') expect(value.length, path).toBeGreaterThan(0)
      else if (value && typeof value === 'object' && !isValidElement(value))
        for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`)
    }
    walk(dictionaries.es, 'es')
    walk(dictionaries.en, 'en')
  })
})

describe('dominio y SEO', () => {
  const read = (path: string) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

  it('index.html, robots.txt y sitemap.xml apuntan al mismo dominio que site.url', () => {
    for (const file of ['index.html', 'public/robots.txt', 'public/sitemap.xml'])
      expect(read(file), file).toContain(site.url)
  })

  it('la imagen para redes existe en public/ y las metaetiquetas la referencian con URL absoluta', () => {
    expect(existsSync(new URL('../../public/og-image.png', import.meta.url))).toBe(true)
    const html = read('index.html')
    expect(html).toContain(`<meta property="og:image" content="${site.url}/og-image.png" />`)
    expect(html).toContain(`<meta name="twitter:image" content="${site.url}/og-image.png" />`)
    expect(html).toContain('content="summary_large_image"')
  })

  it('el CV existe en public/ para cada idioma y el botón apunta a él', () => {
    for (const path of Object.values(site.cv))
      expect(existsSync(new URL(`../../public${path}`, import.meta.url)), path).toBe(true)
  })

  it('la cifra de proyectos entregados coincide con los datos', () => {
    const delivered = projects.filter((p) => p.status !== 'in-development').length
    expect(Number.parseInt(site.stats.projects, 10)).toBe(delivered)
  })
})

describe('coherencia del perfil', () => {
  const skillNames = skillGroups.flatMap((g) => g.skills.map((s) => s.name))

  it('las plataformas que menciona la experiencia aparecen en las habilidades', () => {
    for (const name of ['WordPress', 'Joomla', 'PrestaShop', 'PHP', 'MySQL', 'cPanel', 'WHM'])
      expect(skillNames).toContain(name)
  })

  it('la tecnología principal de cada proyecto técnico figura en las habilidades', () => {
    for (const name of ['React', 'Angular', 'Node.js', 'TypeScript', 'Python', 'MariaDB', 'Express'])
      expect(skillNames).toContain(name)
  })
})

describe('formación y certificaciones', () => {
  it('tienen id único y texto completo en español e inglés', () => {
    expect(new Set(credentials.map((c) => c.id)).size).toBe(credentials.length)
    for (const c of credentials) {
      expect(c.institution, c.id).toBeTruthy()
      expect(c.text.es.title && c.text.es.period, c.id).toBeTruthy()
      expect(c.text.en.title && c.text.en.period, c.id).toBeTruthy()
    }
  })

  it('cada certificado enlazado existe como PDF en public/certificates', () => {
    for (const c of credentials.filter((item) => item.file)) {
      expect(c.file, c.id).toMatch(/^\/certificates\/[a-z0-9-]+\.pdf$/)
      expect(existsSync(new URL(`../../public${c.file}`, import.meta.url)), c.id).toBe(true)
    }
  })

  it('cada certificado con vista previa tiene sus imágenes en public/certificates', () => {
    for (const c of credentials.filter((item) => item.preview)) {
      const { thumb, full, width, height } = c.preview ?? { thumb: '', full: '', width: 0, height: 0 }
      for (const path of [thumb, full]) {
        expect(path, c.id).toMatch(/^\/certificates\/[a-z0-9-]+\.webp$/)
        expect(existsSync(new URL(`../../public${path}`, import.meta.url)), path).toBe(true)
      }
      expect(width > 0 && height > 0, c.id).toBe(true)
    }
  })

  it('los enlaces de verificación son https', () => {
    for (const c of credentials.filter((item) => item.verifyUrl)) expect(c.verifyUrl, c.id).toMatch(/^https:\/\//)
  })
})
