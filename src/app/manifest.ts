import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SuaBarbeariaApp',
    short_name: 'Barbearia',
    description: 'Agende seu horario na barbearia',
    start_url: '/b/torres',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#18181B',
    icons: [
      { src: '/AutomaWeb_favicon.png', sizes: '192x192', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}