import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { ThemeProvider, ToastProvider } from '@the_viveksingh/vivek-ui'

import '@the_viveksingh/vivek-ui/styles.css'
import '@the_viveksingh/vivek-ui/charts.css'
import './globals.css'

import { SiteNavbar } from '@/components/site-navbar'
import { SiteFooter } from '@/components/site-footer'
import { SiteJsonLd } from '@/components/json-ld'
import { SITE } from '@/data/site'
import { themeScript } from '@/lib/theme-script'

/** Condensed, uppercase, unapologetic. The whole display voice of the site. */
const display = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Free Gym Website Template (Next.js) — IronPulse | VivekUI',
    template: '%s | IronPulse',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: 'Vivek Kumar Singh', url: 'https://vivekkumarsingh.in/' }],
  creator: 'Vivek Kumar Singh',
  keywords: [
    'free gym website template nextjs',
    'gym website template',
    'fitness website template',
    'next.js template',
    'react component library',
    'VivekUI',
    'class timetable component',
    'open source template',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    title: 'Free Gym Website Template (Next.js) — IronPulse | VivekUI',
    description: SITE.description,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Gym Website Template (Next.js) — IronPulse | VivekUI',
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  category: 'fitness',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        {/*
          Blocking, synchronous, and deliberately not React. The server cannot know
          this visitor's stored choice, so without this the first paint is the
          default theme and dark-mode users get a white flash before hydration.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteJsonLd />
        <ThemeProvider defaultTheme="dark">
          <ToastProvider position="bottom-end" max={3}>
            <a className="ip-skip" href="#main">
              Skip to content
            </a>
            <SiteNavbar />
            <main id="main">{children}</main>
            <SiteFooter />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
