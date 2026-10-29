import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

function inlineProductionStyles(): Plugin {
  const inlinedStylesheets = new Set<string>()

  return {
    name: 'inline-production-styles',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        return html.replace(/<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*>/g, (link) => {
          const href = /\bhref=["']([^"']+)["']/.exec(link)?.[1]
          if (!href) throw new Error(`Stylesheet link has no href: ${link}`)

          const stylesheetPath = new URL(href, 'https://inline-css.invalid').pathname
          const stylesheet = Object.values(context.bundle ?? {}).find(
            (output) =>
              output.type === 'asset' &&
              output.fileName.endsWith('.css') &&
              (stylesheetPath === `/${output.fileName}` || stylesheetPath.endsWith(`/${output.fileName}`)),
          )
          if (stylesheet?.type !== 'asset') {
            if (/^https?:\/\//.test(href)) return link
            throw new Error(`Could not find emitted stylesheet for ${href}`)
          }

          inlinedStylesheets.add(stylesheet.fileName)
          const css =
            typeof stylesheet.source === 'string' ? stylesheet.source : new TextDecoder().decode(stylesheet.source)
          return `<style>${css}</style>`
        })
      },
    },
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        for (const fileName of inlinedStylesheets) delete bundle[fileName]
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inlineProductionStyles()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
