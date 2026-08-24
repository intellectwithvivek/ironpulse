import { FAQS } from '@/data/gym'
import { CURRENCY, PLANS } from '@/data/plans'
import { GYM, SITE, VIVEKUI } from '@/data/site'

/**
 * One renderer for every block of structured data on the site.
 *
 * `JSON.stringify` is the whole sanitisation story: the payload is built from
 * our own typed data, never from a request, and the `<` escape below closes the
 * one hole that matters — a `</script>` sequence inside a string value.
 */
function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: GYM.street,
  addressLocality: GYM.locality,
  addressRegion: GYM.region,
  postalCode: GYM.postalCode,
  addressCountry: GYM.country,
}

/** The gym itself: ExerciseGym is the narrower type, HealthClub the familiar one. */
export function GymJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': ['ExerciseGym', 'HealthClub'],
        '@id': `${SITE.url}#gym`,
        name: SITE.name,
        description: SITE.description,
        url: SITE.url,
        telephone: GYM.phone,
        email: GYM.email,
        address: ADDRESS,
        openingHours: GYM.hours.map((slot) => slot.spec),
        currenciesAccepted: 'INR',
        priceRange: `${CURRENCY}${PLANS[0].monthly}–${CURRENCY}${PLANS[PLANS.length - 1].monthly} per month`,
        amenityFeature: [
          'Weights floor',
          'Group studio',
          'Boxing ring',
          'Sauna',
          'Showers',
          'Bike parking',
        ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
        makesOffer: PLANS.map((plan) => ({
          '@type': 'Offer',
          name: `${plan.name} membership`,
          description: plan.blurb,
          price: plan.monthly,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${SITE.url}/join?plan=${plan.id}`,
          category: 'Gym membership',
          priceSpecification: [
            {
              '@type': 'UnitPriceSpecification',
              price: plan.monthly,
              priceCurrency: 'INR',
              unitText: 'MONTH',
              billingDuration: 1,
              billingIncrement: 1,
            },
            {
              '@type': 'UnitPriceSpecification',
              price: plan.annual,
              priceCurrency: 'INR',
              unitText: 'ANNUAL',
              billingDuration: 12,
            },
          ],
        })),
      }}
    />
  )
}

export function FaqJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${SITE.url}#faq`,
        mainEntity: FAQS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }}
    />
  )
}

/** Every page but the homepage gets a trail, so the SERP shows the hierarchy. */
export function BreadcrumbJsonLd({
  trail,
}: {
  trail: { name: string; path: string }[]
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${SITE.url}${crumb.path}`,
        })),
      }}
    />
  )
}

/**
 * The site itself, and its author.
 *
 * Rendered in the root layout so every page carries it. `@id` values are stable
 * and derived from `SITE.url`, which is what lets the other blocks on a page
 * point at these two nodes by reference instead of repeating them.
 */
export function SiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${SITE.url}#author`,
            name: 'Vivek Kumar Singh',
            url: VIVEKUI.author,
            jobTitle: 'Software engineer',
            sameAs: [VIVEKUI.github, VIVEKUI.npm, 'https://ui.vivekkumarsingh.in'],
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE.url}#website`,
            name: `${SITE.name} — free Next.js gym website template`,
            url: SITE.url,
            description: SITE.description,
            inLanguage: 'en',
            author: { '@id': `${SITE.url}#author` },
            publisher: { '@id': `${SITE.url}#author` },
            license: 'https://opensource.org/licenses/MIT',
            isAccessibleForFree: true,
          },
        ],
      }}
    />
  )
}

/**
 * The template as a piece of software, on /built-with.
 *
 * This is the block that answers "is this actually free, and where is the code?"
 * for a crawler — the question the whole showcase exists to answer.
 */
export function TemplateJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        '@id': `${SITE.url}/built-with#template`,
        name: `${SITE.name} — Next.js gym website template`,
        description:
          'A free, open-source gym and fitness website template for Next.js 16 and React 19, built entirely with the VivekUI component library. Includes a weekly class timetable, membership plans, trainer profiles, a BMI estimator and three SVG charts.',
        codeRepository: SITE.repoUrl,
        url: `${SITE.url}/built-with`,
        programmingLanguage: ['TypeScript', 'CSS'],
        runtimePlatform: 'Next.js 16',
        license: 'https://opensource.org/licenses/MIT',
        isAccessibleForFree: true,
        author: { '@id': `${SITE.url}#author` },
        maintainer: { '@id': `${SITE.url}#author` },
        about: { '@id': `${SITE.url}#website` },
        keywords: [
          'free gym website template nextjs',
          'gym website template',
          'fitness website template',
          'nextjs template',
          'react component library',
          'VivekUI',
        ],
        dependencies: VIVEKUI.pkg,
      }}
    />
  )
}

/** The class list, so the six programmes can surface as an itemised result. */
export function ClassListJsonLd({
  classes,
}: {
  classes: { slug: string; name: string; summary: string; minutes: number }[]
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Classes at IronPulse',
        itemListElement: classes.map((gymClass, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'ExercisePlan',
            name: gymClass.name,
            description: gymClass.summary,
            url: `${SITE.url}/classes?type=${gymClass.slug}`,
            activityDuration: `PT${gymClass.minutes}M`,
            provider: { '@id': `${SITE.url}#gym` },
          },
        })),
      }}
    />
  )
}
