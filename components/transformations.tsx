import NextImage from 'next/image'
import { Badge, Card, Carousel, Heading, Text } from '@the_viveksingh/vivek-ui'
import { TRANSFORMATIONS } from '@/data/gym'

/**
 * Before / after pairs.
 *
 * The headline for each is a lift, a skill or a return from injury rather than a
 * weight lost — the honest version of this section, and the one that does not
 * make the page a worse place to land for someone deciding whether to walk in.
 */
export function Transformations() {
  return (
    <Carousel
      slidesPerView={{ base: 1, md: 2, lg: 3 }}
      gap={4}
      showArrows
      showDots
      loop
      label="Member results"
      slideLabel={(index, total) => `Member ${index + 1} of ${total}`}
    >
      {TRANSFORMATIONS.map((item) => (
        <Card key={item.id} variant="outline" padding="none">
          <div className="ip-transform">
            <div className="ip-transform__half" data-when="before">
              <NextImage
                src={item.before}
                alt={`${item.name} at the start of their ${item.weeks}-week block`}
                width={640}
                height={800}
                sizes="(max-width: 48rem) 45vw, 20vw"
              />
              <span className="ip-transform__tag">Week 0</span>
            </div>
            <div className="ip-transform__half" data-when="after">
              <NextImage
                src={item.after}
                alt={`${item.name} after ${item.weeks} weeks of training at IronPulse`}
                width={640}
                height={800}
                sizes="(max-width: 48rem) 45vw, 20vw"
              />
              <span className="ip-transform__tag">Week {item.weeks}</span>
            </div>
          </div>

          <Card.Body>
            <Badge variant="soft" tone="primary" size="sm" pill>
              {item.weeks} weeks
            </Badge>
            <Heading level={3} size="md" className="ip-display">
              {item.headline}
            </Heading>
            <Text size="sm" tone="muted">
              {item.detail}
            </Text>
            <Text size="sm" weight="medium">
              {item.name}
            </Text>
          </Card.Body>
        </Card>
      ))}
    </Carousel>
  )
}
