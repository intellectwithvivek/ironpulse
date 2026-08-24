import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AnimatedCounter,
  Button,
  FAQ,
  FeatureGrid,
  Section,
  Stack,
  Testimonials,
  Text,
} from '@the_viveksingh/vivek-ui'

import { HomeHero } from '@/components/home-hero'
import { OccupancyPanel } from '@/components/occupancy-panel'
import { Timetable } from '@/components/timetable'
import { ChartsBlock } from '@/components/charts-block'
import { BmiCalculator } from '@/components/bmi-calculator'
import { PricingBlock } from '@/components/pricing-block'
import { Transformations } from '@/components/transformations'
import { TrainerCard } from '@/components/trainer-card'
import { RepMarker } from '@/components/rep-marker'
import { FaqJsonLd, GymJsonLd } from '@/components/json-ld'
import {
  BarbellIcon,
  BoltIcon,
  GloveIcon,
  LotusIcon,
  RingsIcon,
  StretchIcon,
} from '@/components/icons'

import { FAQS, HEADLINE, TESTIMONIALS } from '@/data/gym'
import { TRAINERS } from '@/data/trainers'

export const metadata: Metadata = {
  title: {
    absolute: 'Free Gym Website Template (Next.js) — IronPulse | VivekUI',
  },
  description:
    'IronPulse is a free, open-source gym and fitness website template for Next.js 16: a weekly class timetable, membership plans, trainer profiles, a BMI estimator and SVG charts. Built entirely with VivekUI.',
  alternates: { canonical: '/' },
}

/**
 * Rebuilt hourly so the Summer Challenge countdown and the occupancy reading
 * never go stale in a deployment that sits untouched for a while.
 */
export const revalidate = 3600

const PROGRAMMES = [
  {
    id: 'strength',
    icon: <BarbellIcon />,
    title: 'Strength',
    description:
      'Barbell work on a five-week wave. Squat, press, hinge, and one logbook you keep from your first session onward.',
  },
  {
    id: 'hiit',
    icon: <BoltIcon />,
    title: 'HIIT',
    description:
      'Forty-five minutes of intervals against a clock that does not negotiate. The highest-output class on the board.',
  },
  {
    id: 'yoga',
    icon: <LotusIcon />,
    title: 'Yoga',
    description:
      'Slow, warm and unhurried. Mostly hips and thoracic spine, because that is what lifting takes out of you.',
  },
  {
    id: 'crossfit',
    icon: <RingsIcon />,
    title: 'CrossFit',
    description:
      'A scored session every time, written up three ways before the doors open so nobody has to ask for the easier one.',
  },
  {
    id: 'boxing',
    icon: <GloveIcon />,
    title: 'Boxing',
    description:
      'Pads, bags and footwork. Technical rounds first, conditioning last, and no sparring unless you ask for it.',
  },
  {
    id: 'mobility',
    icon: <StretchIcon />,
    title: 'Mobility',
    description:
      'Thirty minutes of end-range work and breathing. Booked after a first heavy week, and then never dropped.',
  },
]

export default function HomePage() {
  return (
    <>
      <GymJsonLd />
      <FaqJsonLd />

      <HomeHero />

      {/* --- SIGNATURE: the three-word promise, numbered like sets. --- */}
      <div className="ip-strip">
        {[
          { n: '01', word: 'Sweat', note: 'Conditioning that earns the name.' },
          { n: '02', word: 'Lift', note: 'Barbells, coached properly, from day one.' },
          { n: '03', word: 'Recover', note: 'Mobility and sleep count as training.' },
        ].map((cell) => (
          <div className="ip-strip__cell" key={cell.n}>
            <span className="ip-strip__num" aria-hidden="true">
              {cell.n}
            </span>
            <div>
              <p className="ip-strip__word">{cell.word}</p>
              <p className="ip-strip__note">{cell.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- 04 · The numbers --- */}
      <Section size="xl" padding="lg" aria-labelledby="numbers-title">
        <RepMarker
          number="04"
          label="The club, in numbers"
          id="numbers-title"
          note="Everything below is mock data in /data — swap it for your own and the charts, counters and timetable all follow."
        />

        <div
          style={{
            display: 'grid',
            gap: 'var(--vk-space-8)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))',
            marginBlockEnd: 'var(--vk-space-12)',
          }}
        >
          {[
            { value: HEADLINE.members, label: 'Members', suffix: '' },
            { value: HEADLINE.trainers, label: 'Coaches', suffix: '' },
            { value: HEADLINE.classesPerWeek, label: 'Classes a week', suffix: '' },
            { value: HEADLINE.squareFeet, label: 'Square feet', suffix: '' },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="ip-display"
                style={{
                  fontSize: 'clamp(2.25rem, 6vw, 3.25rem)',
                  margin: 0,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <AnimatedCounter value={stat.value} locale="en-GB" suffix={stat.suffix} />
              </p>
              <Text size="sm" tone="muted" style={{ margin: 0 }}>
                {stat.label}
              </Text>
            </div>
          ))}
        </div>

        <OccupancyPanel />
      </Section>

      {/* --- 05 · Programmes --- */}
      <Section size="xl" padding="lg" background="muted" aria-labelledby="programmes-title">
        <RepMarker
          number="05"
          label="Six ways to train"
          id="programmes-title"
          note="Every programme runs at least twice a week, and every membership above Basic includes all of them."
        />
        <FeatureGrid
          padding="none"
          bleed
          headingLevel={3}
          columns={{ base: 1, sm: 2, lg: 3 }}
          features={PROGRAMMES}
        />
        <Stack direction="horizontal" gap={3} wrap style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          <Button asChild variant="outline">
            <Link href="/classes">All six classes in detail</Link>
          </Button>
        </Stack>
      </Section>

      {/* --- 06 · The timetable. The centrepiece. --- */}
      <Section
        size="xl"
        padding="lg"
        id="timetable"
        className="ip-anchor"
        aria-labelledby="timetable-title"
      >
        <RepMarker
          number="06"
          label={
            <>
              This week&apos;s <em>timetable</em>
            </>
          }
          id="timetable-title"
          note="Days down the side, opening hours across the top. Navigable entirely from the keyboard — arrow keys move between slots, Enter opens one."
        />
        <Timetable />
      </Section>

      {/* --- 07 · Coaches --- */}
      <Section size="xl" padding="lg" background="muted" aria-labelledby="coaches-title">
        <RepMarker
          number="07"
          label="Who is coaching"
          id="coaches-title"
          note="Four coaches, all of them on the floor rather than in an office. The one who writes your programme is the one who watches you lift it."
        />
        <div
          style={{
            display: 'grid',
            gap: 'var(--vk-space-6)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
          }}
        >
          {TRAINERS.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} headingLevel={3} compact />
          ))}
        </div>
      </Section>

      {/* --- 08 · Results --- */}
      <Section size="xl" padding="lg" aria-labelledby="results-title">
        <RepMarker
          number="08"
          label="Where people got to"
          id="results-title"
          note="Lifts, skills and comebacks — the things our members actually talk about, rather than a number on a scale."
        />
        <Transformations />
      </Section>

      {/* --- 09 · Train smarter: the charts --- */}
      <Section size="xl" padding="lg" background="muted" aria-labelledby="smarter-title">
        <RepMarker
          number="09"
          label={
            <>
              Train <em>smarter</em>
            </>
          }
          id="smarter-title"
          note="Three charts, no charting library. All SVG, all server-rendered, and each one ships a hidden data table so a screen reader gets the numbers rather than the word “graphic”."
        />
        <ChartsBlock />
        <div style={{ marginBlockStart: 'var(--vk-space-6)', maxWidth: '32rem' }}>
          <BmiCalculator />
        </div>
      </Section>

      {/* --- 10 · Membership --- */}
      <Section size="xl" padding="lg" aria-labelledby="membership-title">
        <RepMarker
          number="10"
          label="Pick a membership"
          id="membership-title"
          note="No joining fee, no minimum term, and any plan can be frozen for up to three months a year."
        />
        <PricingBlock />
      </Section>

      {/* --- 11 · Members --- */}
      <Section size="xl" padding="lg" background="muted" aria-labelledby="voices-title">
        <RepMarker number="11" label="What members say" id="voices-title" />
        <Testimonials
          padding="none"
          bleed
          headingLevel={3}
          columns={{ base: 1, md: 3 }}
          items={TESTIMONIALS}
        />
      </Section>

      {/* --- 12 · FAQ --- */}
      <Section size="lg" padding="lg" id="faq" className="ip-anchor" aria-labelledby="faq-title">
        <RepMarker number="12" label="Before you ask" id="faq-title" />
        <FAQ padding="none" bleed name="ironpulse-faq" headingLevel={3} items={FAQS} />
        <Stack direction="horizontal" gap={3} wrap style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          <Button asChild size="lg">
            <Link href="/join">Start your free week</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/built-with">See how this site was built</Link>
          </Button>
        </Stack>
      </Section>
    </>
  )
}
