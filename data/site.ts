/**
 * One place for every URL, so the promotion kit and the SEO metadata can never
 * drift apart. `utm()` is the only way links to the VivekUI properties are built.
 */

export const SITE = {
  name: 'IronPulse',
  tagline: 'Strength club, Bengaluru',
  url: 'https://ironpulse.vivekkumarsingh.in',
  description:
    'A free, open-source gym website template for Next.js: weekly class timetable, membership plans, trainer profiles and SVG charts. Built with VivekUI.',
  repo: 'ironpulse',
  repoUrl: 'https://github.com/intellectwithvivek/ironpulse',
  campaign: 'fitness',
} as const

/**
 * Everything a developer needs to take this template away with them.
 *
 * Surfaced in the navbar, the footer and on /built-with, because "how do I get
 * this?" is the single most common question a showcase template has to answer.
 */
export const CLONE = {
  /** The command, ready to paste. */
  command: `git clone ${SITE.repoUrl}.git`,
  /** GitHub's own "create a repo from this template" entry point. */
  useTemplate: `${SITE.repoUrl}/generate`,
  issues: `${SITE.repoUrl}/issues`,
  stars: `${SITE.repoUrl}/stargazers`,
  /** One-click Vercel import, with the repo pre-filled. */
  deploy: `https://vercel.com/new/clone?repository-url=${encodeURIComponent(
    SITE.repoUrl,
  )}&project-name=ironpulse&repository-name=ironpulse`,
} as const

export const VIVEKUI = {
  pkg: '@the_viveksingh/vivek-ui',
  install: 'npm i @the_viveksingh/vivek-ui',
  docs: 'https://ui.vivekkumarsingh.in/docs',
  components: 'https://ui.vivekkumarsingh.in/docs/components',
  npm: 'https://www.npmjs.com/package/@the_viveksingh/vivek-ui',
  github: 'https://github.com/intellectwithvivek/vivek_UI',
  author: 'https://vivekkumarsingh.in/',
} as const

/** Tags a VivekUI link with the campaign for this template and the placement it sits in. */
export function utm(base: string, medium: string): string {
  const url = new URL(base)
  url.searchParams.set('utm_source', 'vivekui-template')
  url.searchParams.set('utm_campaign', SITE.campaign)
  url.searchParams.set('utm_medium', medium)
  return url.toString()
}

/** Deep link to one component's docs page. */
export function componentDocs(name: string, medium = 'builtwith'): string {
  return utm(`${VIVEKUI.components}/${name}`, medium)
}

export const GYM = {
  street: '14 Kasturba Cross Road',
  locality: 'Bengaluru',
  region: 'KA',
  postalCode: '560001',
  country: 'IN',
  phone: '+91 80 4123 9000',
  email: 'front-desk@ironpulse.example',
  /** Schema.org openingHours notation, and the source for the visible hours list. */
  hours: [
    { days: 'Mon – Fri', open: '05:30', close: '22:30', spec: 'Mo-Fr 05:30-22:30' },
    { days: 'Saturday', open: '06:00', close: '21:00', spec: 'Sa 06:00-21:00' },
    { days: 'Sunday', open: '07:00', close: '20:00', spec: 'Su 07:00-20:00' },
  ],
  timeZone: 'Asia/Kolkata',
} as const
