import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, Button, Hero, Section, Text } from '@the_viveksingh/vivek-ui'
import { TrainerCard } from '@/components/trainer-card'
import { BreadcrumbJsonLd } from '@/components/json-ld'
import { TRAINERS } from '@/data/trainers'

export const metadata: Metadata = {
  title: 'Coaches — the four people on the floor',
  description:
    'Meet the IronPulse coaching team: strength, conditioning and boxing, yoga and mobility, and CrossFit. Specialities, years coaching, and how to reach them.',
  alternates: { canonical: '/trainers' },
  openGraph: {
    title: 'Coaches at IronPulse',
    description: 'Four coaches, all of them on the floor rather than in an office.',
    url: '/trainers',
  },
}

export default function TrainersPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: 'Trainers', path: '/trainers' }]} />

      <Section size="xl" padding="sm">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Trainers' }]}
          label="Breadcrumb"
        />
      </Section>

      <Hero
        size="xl"
        padding="md"
        align="start"
        eyebrow="The coaching team"
        title={<span className="ip-display">Four coaches, no waiting list</span>}
        description="Between them they have coached here for thirty-one years. The one who writes your programme is the one standing next to you while you lift it — there is no tier of the membership where that changes."
        actions={
          <Button asChild size="lg">
            <Link href="/join">Start a free week</Link>
          </Button>
        }
      />

      <Section size="xl" padding="lg" aria-label="Coach profiles">
        <div
          style={{
            display: 'grid',
            gap: 'var(--vk-space-6)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))',
          }}
        >
          {TRAINERS.map((trainer, index) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              headingLevel={2}
              priority={index === 0}
            />
          ))}
        </div>

        <Text tone="muted" size="sm" style={{ marginBlockStart: 'var(--vk-space-8)', maxWidth: '52ch' }}>
          Want a specific coach for your free week? Say so when you sign up and we will
          put you in one of their classes rather than whatever is next on the timetable.
        </Text>
      </Section>
    </>
  )
}
