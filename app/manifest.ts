import type { MetadataRoute } from 'next'
import { SITE } from '@/data/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — free Next.js gym website template`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#08080a',
    theme_color: '#ff4d6d',
    categories: ['health', 'fitness', 'sports'],
    icons: [{ src: '/icon', sizes: '64x64', type: 'image/png' }],
  }
}
