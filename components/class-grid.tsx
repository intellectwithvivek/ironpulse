'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Heading,
  Select,
  Stack,
  Text,
} from '@the_viveksingh/vivek-ui'
import { CLASSES, INTENSITY_TONE, type Intensity } from '@/data/classes'
import { SESSIONS } from '@/data/classes'
import { trainerName } from '@/data/trainers'

const INTENSITIES: Intensity[] = ['Low', 'Moderate', 'High', 'All out']

function sessionCount(slug: string): number {
  return SESSIONS.filter((s) => s.classSlug === slug).length
}

/**
 * The class list and its two filters.
 *
 * `initialType` arrives from the server, read out of `searchParams`, so a link
 * from the timetable lands with the right programme already selected and the
 * URL stays shareable. Changing a filter rewrites the query with
 * `router.replace`, which keeps that property without adding history entries.
 */
export function ClassGrid({ initialType = 'all' }: { initialType?: string }) {
  const router = useRouter()
  const [type, setType] = useState(initialType)
  const [intensity, setIntensity] = useState('all')

  const shown = useMemo(
    () =>
      CLASSES.filter(
        (gymClass) =>
          (type === 'all' || gymClass.slug === type) &&
          (intensity === 'all' || gymClass.intensity === intensity),
      ),
    [type, intensity],
  )

  function changeType(value: string) {
    setType(value)
    router.replace(value === 'all' ? '/classes' : `/classes?type=${value}`, { scroll: false })
  }

  function clear() {
    setType('all')
    setIntensity('all')
    router.replace('/classes', { scroll: false })
  }

  return (
    <div>
      <Stack
        direction="horizontal"
        gap={4}
        wrap
        align="end"
        style={{ marginBlockEnd: 'var(--vk-space-8)' }}
      >
        <Select
          aria-label="Filter by programme"
          value={type}
          onChange={(event) => changeType(event.currentTarget.value)}
          options={[
            { value: 'all', label: 'Every programme' },
            ...CLASSES.map((c) => ({ value: c.slug, label: c.name })),
          ]}
        />
        <Select
          aria-label="Filter by intensity"
          value={intensity}
          onChange={(event) => setIntensity(event.currentTarget.value)}
          options={[
            { value: 'all', label: 'Any intensity' },
            ...INTENSITIES.map((level) => ({ value: level, label: level })),
          ]}
        />
        <Text as="span" size="sm" tone="muted">
          Showing {shown.length} of {CLASSES.length}
        </Text>
      </Stack>

      {shown.length === 0 ? (
        <EmptyState
          title="Nothing matches those two filters"
          description="No single programme runs at that intensity. Widen one of them and it will show up."
          actions={
            <Button onClick={clear} variant="outline">
              Clear filters
            </Button>
          }
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gap: 'var(--vk-space-6)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(19rem, 1fr))',
          }}
        >
          {shown.map((gymClass) => (
            <Card
              key={gymClass.slug}
              id={`class-${gymClass.slug}`}
              variant="outline"
              padding="none"
              className="ip-anchor"
            >
              <div className="ip-media ip-media--class">
                <NextImage
                  src={gymClass.image}
                  alt={`A ${gymClass.name.toLowerCase()} session in progress at IronPulse`}
                  width={1200}
                  height={750}
                  sizes="(max-width: 48rem) 92vw, (max-width: 75rem) 45vw, 30vw"
                />
              </div>

              <Card.Body>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--vk-space-2)',
                    flexWrap: 'wrap',
                    marginBlockEnd: 'var(--vk-space-2)',
                  }}
                >
                  <Badge variant="soft" tone={INTENSITY_TONE[gymClass.intensity]} pill>
                    {gymClass.intensity}
                  </Badge>
                  <Badge variant="outline" pill>
                    {gymClass.minutes} min
                  </Badge>
                  <Badge variant="outline" pill>
                    {sessionCount(gymClass.slug)}× a week
                  </Badge>
                </div>

                <Heading level={2} size="md" className="ip-display">
                  {gymClass.name}
                </Heading>
                <Text size="sm" tone="muted">
                  {gymClass.summary}
                </Text>
                <Text size="sm" weight="medium" style={{ marginBlockStart: 'var(--vk-space-3)' }}>
                  Led by {trainerName(gymClass.trainerId)}
                </Text>
                <Text size="sm" tone="muted">
                  {gymClass.bring}
                </Text>
              </Card.Body>

              <Card.Footer>
                <Stack direction="horizontal" gap={2} wrap>
                  <Button asChild size="sm">
                    <Link href="/join">Book a free week</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link href="/#timetable">See it on the timetable</Link>
                  </Button>
                </Stack>
              </Card.Footer>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
