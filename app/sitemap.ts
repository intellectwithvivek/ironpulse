import type { MetadataRoute } from 'next'
import { SITE } from '@/data/site'

/**
 * Five routes, so this stays a hand-written list rather than a crawl.
 * `lastModified` is stamped at build time, which is exactly when the content
 * last changed for a statically generated site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/classes`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/join`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/trainers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/built-with`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
