import Link from 'next/link'
import NextImage from 'next/image'
import { Badge, Button, Container, Countdown, Stack, Text } from '@the_viveksingh/vivek-ui'
import { formatChallengeDate, nextChallengeStart } from '@/lib/schedule'

/**
 * The top of the page: one photograph, one h1, one countdown.
 *
 * `now` is read here on the server and handed to `Countdown` so the server HTML
 * ships real digits that the browser reproduces exactly. Without it the first
 * paint is a `--` placeholder — see the prop's own documentation.
 */
export function HomeHero() {
  const now = new Date()
  const challenge = nextChallengeStart(now)

  return (
    <section className="ip-hero" aria-labelledby="hero-title">
      <div className="ip-hero__media">
        <NextImage
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=75"
          alt="A dimly lit weights floor, racks loaded and chalk dust in the air"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="ip-hero__scrim" />

      <Container size="xl" className="ip-hero__inner">
        <Stack gap={6} align="start">
          <Badge variant="soft" tone="primary" pill>
            Kasturba Cross Road · Bengaluru
          </Badge>

          <h1 id="hero-title" className="ip-display ip-hero__title">
            Show up.
            <span>Get strong.</span>
          </h1>

          <Text className="ip-hero__copy">
            A strength club with a timetable you can actually plan a week around —
            twenty-two coached classes, four coaches who know your name, and a free
            first week that needs no card and involves no sales call.
          </Text>

          <div className="ip-hero__countdown">
            <p className="ip-hero__countdown-label">
              Summer Challenge starts in — {formatChallengeDate(challenge)}
            </p>
            <Countdown
              to={challenge}
              now={now}
              label={`Time until the Summer Challenge begins on ${formatChallengeDate(challenge)}`}
            />
          </div>

          <Stack direction="horizontal" gap={3} wrap>
            <Button asChild size="lg">
              <Link href="/join">Start your free week</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#timetable">See the timetable</Link>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </section>
  )
}
