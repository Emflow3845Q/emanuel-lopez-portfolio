import { expect, type Page, test } from '@playwright/test'
import { projects } from '../src/data/projects'

/** Los conteos salen de los datos reales para que las pruebas no se desfasen al añadir proyectos. */
const TOTAL_PROJECTS = projects.length
const ECOMMERCE_PROJECTS = projects.filter((p) => p.category === 'ecommerce').length
const PER_PAGE = 9 // debe coincidir con PER_PAGE en Projects.tsx
const PAGES = Math.ceil(TOTAL_PROJECTS / PER_PAGE)
const pageLabel = (n: number) => `${String(n).padStart(2, '0')} / ${String(PAGES).padStart(2, '0')}`

/** Evita depender de Cloudinary y de Netlify durante las pruebas. */
async function stubNetwork(page: Page, formStatus = 200) {
  await page.route(/res\.cloudinary\.com/, (route) => route.abort())
  await page.route('**/', (route) =>
    route.request().method() === 'POST' ? route.fulfill({ status: formStatus, body: 'ok' }) : route.continue(),
  )
}

test.beforeEach(async ({ page }) => {
  await stubNetwork(page)
})

test.describe('general', () => {
  test('el CSS principal está inlineado para no bloquear el primer render', async ({ page }) => {
    const stylesheetRequests: string[] = []
    page.on('request', (request) => {
      if (/\.css(?:\?|$)/.test(request.url())) stylesheetRequests.push(request.url())
    })

    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('style')).toHaveCount(1)
    expect(stylesheetRequests).toEqual([])
  })

  test('carga sin errores de consola y con el título en español', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto('/')
    await expect(page).toHaveTitle(/Desarrollador Web Full Stack/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Emanuel')
    expect(errors).toEqual([])
  })

  test('el enlace "Saltar al contenido" es el primer elemento enfocable', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused()
  })

  test('cambia de idioma y lo recuerda', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Switch to English' }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page).toHaveTitle(/Full Stack Web Developer/)
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('alterna el tema y lo recuerda', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.getByRole('button', { name: 'Cambiar a tema claro' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })

  test('respeta prefers-color-scheme cuando no hay preferencia guardada', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })

  test('el menú marca la sección activa al hacer scroll', async ({ page }) => {
    await page.goto('/')
    await page.locator('#skills').scrollIntoViewIfNeeded()
    await page.evaluate(() => document.getElementById('skills')?.scrollIntoView())
    await expect(page.getByRole('link', { name: 'Habilidades' }).first()).toHaveAttribute('aria-current', 'true')
  })
})

test.describe('página 404', () => {
  test('una ruta inexistente muestra la 404 en español, con noindex y enlace al inicio', async ({ page }) => {
    await page.goto('/ruta-que-no-existe')
    await expect(page).toHaveTitle(/404 — Página no encontrada/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página no encontrada')
    await expect(page.getByText('curl -I /ruta-que-no-existe')).toBeAttached()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    await page.getByRole('link', { name: 'Volver al inicio' }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Emanuel')
  })

  test('la 404 cambia de idioma y de tema', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/otra/ruta')
    await page.getByRole('button', { name: 'Switch to English' }).click()
    await expect(page).toHaveTitle(/404 — Page not found/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found')
    await page.getByRole('button', { name: 'Switch to light theme' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })
})

test.describe('formación', () => {
  test('muestra la formación y los certificados, y cambia de idioma', async ({ page }) => {
    await page.goto('/')
    const heading = page.getByRole('heading', { name: 'Formación y certificaciones' })
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
    await expect(page.getByText('Técnico en Desarrollo de Software')).toBeVisible()
    // El certificado se ve dentro de la web, en un visor (no abre otra pestaña).
    await page.getByRole('button', { name: /Ver certificado: Scrum Foundation/ }).click()
    const viewer = page.getByRole('dialog', { name: /Scrum Foundation/ })
    await expect(viewer).toBeVisible()
    await expect(viewer.getByRole('img', { name: /Certificado: Scrum Foundation/ })).toBeVisible()
    await expect(viewer.getByRole('link', { name: 'Descargar PDF' })).toHaveAttribute(
      'href',
      '/certificates/scrum-foundation-sfpc-certiprof.pdf',
    )
    await page.keyboard.press('Escape')
    await expect(viewer).toBeHidden()
    await page.getByRole('button', { name: 'Switch to English' }).first().click()
    await expect(page.getByRole('heading', { name: 'Education & certifications' })).toBeVisible()
  })
})

test.describe('CV', () => {
  test('el botón descarga el CV en el idioma activo', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: 'Descargar CV' })
    await expect(link).toHaveAttribute('href', '/cv/cv-emanuel-lopez-es.pdf')
    await expect(link).toHaveAttribute('download', '')
    await page.getByRole('button', { name: 'Switch to English' }).first().click()
    await expect(page.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '/cv/cv-emanuel-lopez-en.pdf')
  })
})

test.describe('proyectos', () => {
  test('el filtro reduce la lista y "Todos" la restaura', async ({ page }) => {
    await page.goto('/')
    const cards = page.locator('#projects article')
    await expect(cards).toHaveCount(TOTAL_PROJECTS)
    await page.getByRole('button', { name: 'E-commerce', exact: true }).click()
    await expect(cards).toHaveCount(ECOMMERCE_PROJECTS)
    await page.getByRole('button', { name: 'Todos', exact: true }).click()
    await expect(cards).toHaveCount(TOTAL_PROJECTS)
  })

  test('abrir un proyecto actualiza la URL; Escape y "atrás" lo cierran', async ({ page }) => {
    await page.goto('/')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: /Ver descripción de Otto/ }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(page).toHaveURL(/#\/proyecto\/otto$/)

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    expect(page.url()).not.toContain('/proyecto/')

    await page.getByRole('button', { name: /Ver descripción de Otto/ }).click()
    await expect(dialog).toBeVisible()
    await page.goBack()
    await expect(dialog).toBeHidden()
  })

  test('un enlace directo abre el proyecto correspondiente', async ({ page }) => {
    await page.goto('/#/proyecto/cm3d-launcher')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { level: 2 })).toContainText('CM3D Launcher')
    await page.getByRole('button', { name: 'Cerrar descripción del proyecto' }).click()
    await expect(dialog).toBeHidden()
  })

  test('el carrusel avanza de página y deshabilita lo que queda fuera de vista', async ({ page }) => {
    await page.goto('/')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    await expect(page.getByText(pageLabel(1))).toBeVisible()
    await page.getByRole('button', { name: 'Siguientes proyectos' }).click()
    await expect(page.getByText(pageLabel(2))).toBeVisible()
    // Avanzamos hasta la última página: ahí "Siguientes" queda deshabilitado.
    for (let current = 2; current < PAGES; current++) {
      await page.getByRole('button', { name: 'Siguientes proyectos' }).click()
      await expect(page.getByText(pageLabel(current + 1))).toBeVisible()
    }
    await expect(page.getByRole('button', { name: 'Siguientes proyectos' })).toBeDisabled()
    // La primera página queda inerte: sus tarjetas no reciben foco.
    await expect(page.locator('#projects [inert]').first()).toBeAttached()
  })

  test('los indicadores de página tienen áreas táctiles de al menos 24 px y separación', async ({ page }) => {
    await page.goto('/')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    const indicators = page.getByRole('button', { name: /^Ir a la página \d+$/ })
    const boxes = await indicators.evaluateAll((buttons) =>
      buttons.map((button) => {
        const { x, y, width, height } = button.getBoundingClientRect()
        return { x, y, width, height }
      }),
    )

    expect(boxes.length).toBeGreaterThan(1)
    for (const box of boxes) {
      expect(box.width).toBeGreaterThanOrEqual(24)
      expect(box.height).toBeGreaterThanOrEqual(24)
    }
    for (let i = 1; i < boxes.length; i++) {
      expect(boxes[i].x - (boxes[i - 1].x + boxes[i - 1].width)).toBeGreaterThanOrEqual(8)
    }
  })

  test('el carrusel se puede arrastrar con el ratón', async ({ page }) => {
    await page.goto('/')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    const track = page.getByRole('region', { name: 'Carrusel de proyectos' })
    const box = await track.boundingBox()
    if (!box) throw new Error('Carrusel sin dimensiones')
    const y = box.y + 80
    await page.mouse.move(box.x + box.width * 0.8, y)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width * 0.5, y, { steps: 8 })
    await page.mouse.move(box.x + box.width * 0.2, y, { steps: 8 })
    await page.mouse.up()
    await expect(page.getByText(pageLabel(2))).toBeVisible()
  })

  test('el carrusel responde a las flechas del teclado', async ({ page }) => {
    await page.goto('/')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    await page.getByRole('region', { name: 'Carrusel de proyectos' }).focus()
    await page.keyboard.press('ArrowRight')
    await expect(page.getByText(pageLabel(2))).toBeVisible()
    await page.keyboard.press('ArrowLeft')
    await expect(page.getByText(pageLabel(1))).toBeVisible()
  })
})

test.describe('formulario de contacto', () => {
  test('muestra errores por campo y enfoca el primero inválido', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Enviar mensaje' }).click()
    await expect(page.getByRole('alert').filter({ hasText: 'obligatorio' })).toHaveCount(4)
    await expect(page.getByLabel('Nombre')).toBeFocused()
    await expect(page.getByLabel('Nombre')).toHaveAttribute('aria-invalid', 'true')
  })

  test('valida el formato del correo y la longitud del mensaje', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Nombre').fill('Ana')
    await page.getByLabel('Email').fill('no-es-correo')
    await page.getByLabel('Asunto').fill('Hola')
    await page.getByLabel('Mensaje').fill('corto')
    await page.getByRole('button', { name: 'Enviar mensaje' }).click()
    await expect(page.getByText(/correo válido/)).toBeVisible()
    await expect(page.getByText(/mínimo 10 caracteres/)).toBeVisible()
  })

  test('envía correctamente y muestra el panel de confirmación sin bloquear la página', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Nombre').fill('Ana')
    await page.getByLabel('Email').fill('ana@ejemplo.com')
    await page.getByLabel('Asunto').fill('Proyecto')
    await page.getByLabel('Mensaje').fill('Quiero hablar de un proyecto web.')
    await page.getByRole('button', { name: 'Enviar mensaje' }).click()
    const panel = page.getByRole('status').filter({ hasText: 'TRANSMISIÓN SALIENTE' })
    await expect(panel).toBeVisible()
    await expect(panel.getByText('Gracias por escribirme')).toBeVisible({ timeout: 6000 })
    // No hay capa que tape la página: el campo sigue siendo accesible.
    await expect(page.getByLabel('Nombre')).toBeEnabled()
    await page.keyboard.press('Escape')
    await expect(panel).toBeHidden()
  })

  test('informa del error si el servidor falla', async ({ page }) => {
    await page.unroute('**/')
    await stubNetwork(page, 500)
    await page.goto('/')
    await page.getByLabel('Nombre').fill('Ana')
    await page.getByLabel('Email').fill('ana@ejemplo.com')
    await page.getByLabel('Asunto').fill('Proyecto')
    await page.getByLabel('Mensaje').fill('Quiero hablar de un proyecto web.')
    await page.getByRole('button', { name: 'Enviar mensaje' }).click()
    await expect(page.getByText('No se pudo enviar')).toBeVisible({ timeout: 6000 })
  })
})

test.describe('móvil', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('no hay desbordamiento horizontal y el menú funciona', async ({ page }) => {
    await page.goto('/')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow).toBe(false)

    await page.getByRole('button', { name: 'Abrir menú' }).click()
    await expect(page.locator('#mobile-menu')).toBeVisible()
    await page.locator('#mobile-menu').getByRole('link', { name: 'Proyectos' }).click()
    await expect(page.locator('#mobile-menu')).toBeHidden()
  })

  test('los proyectos se muestran en lista (sin carrusel)', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('region', { name: 'Carrusel de proyectos' })).toHaveCount(0)
    await expect(page.locator('#projects article')).toHaveCount(TOTAL_PROJECTS)
  })
})
