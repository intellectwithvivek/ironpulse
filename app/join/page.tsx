import type { Metadata } from 'next'
import { Breadcrumb, Hero, Section } from '@the_viveksingh/vivek-ui'
import { JoinFlow } from '@/components/join-flow'
import { BreadcrumbJsonLd } from '@/components/json-ld'
import { PLANS } from '@/data/plans'

export const metadata: Metadata = {
  title: 'Start a free week — membership sign-up',
  description:
    'Three steps: pick a plan, tell us your name, and see what your first week looks like. No card details, no minimum term, no sales call.',
  alternates: { canonical: '/join' },
  openGraph: {
    title: 'Start a free week at IronPulse',
    description: 'Pick a plan, leave your name, and turn up. Nothing is charged for seven days.',
    url: '/join',
  },
}

export default async function JoinPage(props: PageProps<'/join'>) {
  const { plan } = await props.searchParams
  const requested = typeof plan === 'string' ? plan : undefined
  const initialPlan = requested && PLANS.some((p) => p.id === requested) ? requested : 'pro'

  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: 'Join', path: '/join' }]} />

      <Section size="lg" padding="sm">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Join' }]} label="Breadcrumb" />
      </Section>

      <Hero
        size="lg"
        padding="md"
        align="start"
        eyebrow="Seven days, no card"
        title={<span className="ip-display">Start your free week</span>}
        description="Three steps and about ninety seconds. You will not be asked for card details, and nobody from here will ring you."
      />

      <Section size="lg" padding="md">
        <JoinFlow initialPlan={initialPlan} />
      </Section>
    </>
  )
}
