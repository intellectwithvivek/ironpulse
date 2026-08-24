import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, Button, Hero, Section } from '@the_viveksingh/vivek-ui'
import { ClassGrid } from '@/components/class-grid'
import { BreadcrumbJsonLd, ClassListJsonLd } from '@/components/json-ld'
import { CLASSES } from '@/data/classes'

export const metadata: Metadata = {
  title: 'Classes — strength, HIIT, yoga, CrossFit, boxing and mobility',
  description:
    'All six IronPulse programmes: duration, intensity, the coach who leads it and how often it runs. Filter by programme or intensity.',
  alternates: { canonical: '/classes' },
  openGraph: {
    title: 'Classes at IronPulse',
    description:
      'Six coached programmes, twenty-two sessions a week. Filter by programme or intensity.',
    url: '/classes',
  },
}

export default async function ClassesPage(props: PageProps<'/classes'>) {
  // Async in Next.js 16 — synchronous access was removed in this major.
  const { type } = await props.searchParams
  const requested = typeof type === 'string' ? type : undefined
  const initialType =
    requested && CLASSES.some((c) => c.slug === requested) ? requested : 'all'

  return (
    <>
      <ClassListJsonLd classes={CLASSES} />
      <BreadcrumbJsonLd trail={[{ name: 'Classes', path: '/classes' }]} />

      <Section size="xl" padding="sm">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Classes' }]}
          label="Breadcrumb"
        />
      </Section>

      <Hero
        size="xl"
        padding="md"
        align="start"
        eyebrow="Six programmes"
        title={<span className="ip-display">Every class on the board</span>}
        description="Twenty-two coached sessions a week. Nothing here needs experience you do not have yet — every programme has a scaled version, and saying so at the door is all it takes."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/join">Start a free week</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#timetable">See the weekly timetable</Link>
            </Button>
          </>
        }
      />

      <Section size="xl" padding="md">
        <ClassGrid initialType={initialType} />
      </Section>
    </>
  )
}
