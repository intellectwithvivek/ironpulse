import { Badge, Card, Clock, Heading, Progress, Text } from '@the_viveksingh/vivek-ui'
import { Sparkline } from '@the_viveksingh/vivek-ui/charts'
import {
  OCCUPANCY,
  OCCUPANCY_CAPACITY,
  OCCUPANCY_HOURS,
  occupancyPeak,
} from '@/data/gym'
import { GYM } from '@/data/site'

/** The studio's own wall-clock hour, whatever zone the server happens to run in. */
function gymHour(now: Date): number {
  const hour = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    hour12: false,
    timeZone: GYM.timeZone,
  }).format(now)
  return Number(hour) % 24
}

function readingFor(hour: number): { index: number; open: boolean } {
  const index = OCCUPANCY_HOURS.findIndex((h) => Number(h.slice(0, 2)) === hour)
  return index === -1 ? { index: OCCUPANCY.length - 1, open: false } : { index, open: true }
}

/**
 * "Right now at the gym" — today's hourly footfall, plus the current reading.
 *
 * Every clock read happens here, on the server, and is handed down as a plain
 * number or timestamp. `Clock` takes `now` for exactly this reason: without it
 * the component renders a `--:--` placeholder rather than risk the server and
 * the browser disagreeing about the second.
 */
export function OccupancyPanel() {
  const now = new Date()
  const hour = gymHour(now)
  const { index, open } = readingFor(hour)
  const current = OCCUPANCY[index]
  const peak = occupancyPeak()
  const percent = Math.round((current / OCCUPANCY_CAPACITY) * 100)

  const busyness =
    percent >= 75
      ? { label: 'Busy', tone: 'danger' as const }
      : percent >= 45
        ? { label: 'Filling up', tone: 'warning' as const }
        : { label: 'Quiet', tone: 'success' as const }

  return (
    <div className="ip-panel" id="right-now">
      <Card variant="outline" padding="lg">
        <Card.Header>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 'var(--vk-space-3)',
              flexWrap: 'wrap',
            }}
          >
            <Heading level={3} size="lg" className="ip-display">
              Right now at the gym
            </Heading>
            <Badge variant="soft" tone={busyness.tone} pill>
              {open ? busyness.label : 'Closed'}
            </Badge>
          </div>
          <Text size="sm" tone="muted">
            {open ? (
              <>
                <strong className="ip-tabular">{current}</strong> people in, of about{' '}
                {OCCUPANCY_CAPACITY} at the busiest. Today peaked at {peak.hour} with{' '}
                {peak.value}.
              </>
            ) : (
              <>
                Doors are shut. Today peaked at {peak.hour} with {peak.value} people in.
              </>
            )}
          </Text>
        </Card.Header>

        <Card.Body>
          <Progress
            value={open ? percent : 0}
            max={100}
            tone={busyness.tone}
            label="Current occupancy against the day's busiest hour"
          />

          <div style={{ marginBlockStart: 'var(--vk-space-5)' }}>
            <Sparkline
              className="ip-sparkline-wide"
              data={OCCUPANCY}
              height={56}
              width={320}
              fill
              showLastPoint
              curve="smooth"
              strokeWidth={2}
              title="Gym occupancy today, by hour"
              description="Hourly headcount from 05:00 to 22:00. A small early rush, a dip through the afternoon, and the day's peak at 19:00."
              xLabel="Hour"
              yLabel="People in the gym"
              formatValue={(v) => `${v} people`}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBlockStart: 'var(--vk-space-2)',
              }}
            >
              <Text as="span" size="sm" tone="muted">
                05:00
              </Text>
              <Text as="span" size="sm" tone="muted">
                22:00
              </Text>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card variant="outline" padding="lg">
        <Card.Header>
          <Heading level={3} size="lg" className="ip-display">
            Opening hours
          </Heading>
          <Text size="sm" tone="muted">
            Local time in {GYM.locality}
            <span className="ip-clock">
              <Clock
                now={now}
                timeZone={GYM.timeZone}
                locale="en-GB"
                hour12={false}
                showSeconds={false}
              />
            </span>
          </Text>
        </Card.Header>
        <Card.Body>
          <dl className="ip-hours">
            {GYM.hours.map((slot) => (
              <div key={slot.spec}>
                <dt>{slot.days}</dt>
                <dd className="ip-tabular">
                  {slot.open} – {slot.close}
                </dd>
              </div>
            ))}
          </dl>
          <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-4)' }}>
            Staffed the whole time we are open — there is never a shift where the floor
            has no coach on it.
          </Text>
        </Card.Body>
      </Card>
    </div>
  )
}
