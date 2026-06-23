// Gera o icone-marca (tesoura branca em quadrado escuro #18181B), o mesmo mark
// do header. Vira o FALLBACK do splash/PWA quando a barbearia ainda nao subiu
// logo propria. Determinístico (rasteriza o SVG do Lucide via sharp) — nao usa
// servico de geracao de imagem.
const sharp = require('sharp')
const path = require('path')

const pub = path.join(__dirname, '..', 'public')

// Lucide "scissors" (viewBox 24). Centralizado num quadrado full-bleed escuro,
// dentro da safe zone de icone maskable (~80% central).
function svg(size, bg = '#18181B', stroke = '#FAFAFA') {
  const icon = 280 // px do glifo dentro de 512
  const s = icon / 24
  const off = (512 - icon) / 2
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${bg}"/>
  <g transform="translate(${off},${off}) scale(${s})" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="6" cy="6" r="3"/>
    <path d="M8.12 8.12 12 12"/>
    <path d="M20 4 8.12 15.88"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M14.8 14.8 20 20"/>
  </g>
</svg>`)
}

async function out(size, file) {
  await sharp(svg(size)).png().toFile(path.join(pub, file))
  console.log('ok', file, size)
}

;(async () => {
  await out(512, 'icon-512.png')
  await out(192, 'icon-192.png')
  await out(180, 'apple-touch-icon.png')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
