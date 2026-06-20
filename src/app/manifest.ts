import type { MetadataRoute } from 'next'

// Manifest default da PLATAFORMA (painel/admin e fallback). O app do CLIENTE e
// white-label: cada barbearia tem o seu em /b/[slug]/manifest.webmanifest
// (nome, icone e cor da propria barbearia). Ver b/[slug]/layout generateMetadata.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SuaBarbeariaApp',
    short_name: 'SuaBarbearia',
    description: 'Gestao da sua barbearia',
    start_url: '/painel',
    scope: '/painel',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#18181B',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
