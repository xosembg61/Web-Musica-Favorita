import { build } from 'vite'
import { writeFile } from 'node:fs/promises'

// Imágenes y fuentes incrustadas para probar la web sin servidor ni instalación.
const result = await build({
  build: { write: false, assetsInlineLimit: Number.MAX_SAFE_INTEGER },
  publicDir: false,
  logLevel: 'warn',
})
const bundles = Array.isArray(result) ? result : [result]
const output = bundles.flatMap((bundle) => bundle.output)
const index = output.find((file) => file.fileName === 'index.html')
if (!index) throw new Error('No se ha generado index.html para la vista previa.')
let html = String(index.source)
html = html.replace(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g, (tag, path) => {
  const file = output.find((item) => item.fileName === path.replace(/^\.\//, ''))
  if (!file || file.type !== 'chunk') throw new Error(`No se encuentra el script ${path}`)
  return `<script type="module">${file.code.replace(/<\/script/gi, '<\\/script')}</script>`
})
html = html.replace(/<link\b[^>]*\brel="stylesheet"[^>]*>/g, (tag) => {
  const path = tag.match(/href="([^"]+)"/)?.[1]
  const file = output.find((item) => item.fileName === path?.replace(/^\.\//, ''))
  if (!file) throw new Error(`No se encuentra la hoja de estilos ${path}`)
  return `<style>${String(file.source).replace(/<\/style/gi, '<\\/style')}</style>`
})
await writeFile('Vista_previa.html', html, 'utf8')
console.log('Vista_previa.html lista: se puede abrir directamente en el navegador.')
