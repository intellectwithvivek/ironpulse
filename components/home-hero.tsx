import Link from 'next/link'
import { Photo } from '@/components/photo'
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
        {/*
          `unoptimized` on this one image, deliberately.

          Unsplash is itself an image CDN: `w=` does the resizing and
          `auto=format` negotiates WebP/AVIF per browser, so this URL already
          arrives correctly sized and in a modern format. Proxying it through
          Next's optimizer as well repeats that work — measured at ~4.7s for the
          first cold request on this source, because sharp has to fetch, decode,
          resize and re-encode a multi-megapixel photograph. This is the
          `priority` LCP element, so those seconds land squarely on first paint,
          and a request that slow is also the one most likely to time out and
          leave a broken image behind. On Vercel it additionally burns an
          image-optimization invocation per size, which matters on a free plan.

          The trade is the responsive `srcset`, and for a full-bleed decorative
          backdrop that is genuinely 100vw wide, desaturated and covered by a
          gradient scrim, one 1920px file is the right answer at every width.
          The card photographs below keep the optimizer, where a real srcset
          saves a phone from downloading a desktop-sized image.
        */}
        <Photo
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=70"
          alt="A dimly lit weights floor, racks loaded and chalk dust in the air"
          fill
          priority
          unoptimized
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
