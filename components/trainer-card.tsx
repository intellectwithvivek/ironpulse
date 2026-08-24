import NextImage from 'next/image'
import { Badge, Button, Card, Heading, Text } from '@the_viveksingh/vivek-ui'
import type { Trainer } from '@/data/trainers'
import { InstagramIcon, MailIcon, XIcon } from './icons'

/**
 * A social link on a profile.
 *
 * An anchor wearing button styling, via `Button asChild`. Deliberately not
 * `IconButton`: that renders a real `<button>`, and a control that navigates has
 * to be an `<a>` or middle-click, cmd-click and "copy link address" all break.
 */
function Social({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  const external = href.startsWith('http')
  return (
    <Button asChild variant="ghost" size="sm">
      <a
        href={href}
        aria-label={label}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    </Button>
  )
}

export function TrainerCard({
  trainer,
  headingLevel = 2,
  compact = false,
}: {
  trainer: Trainer
  headingLevel?: 2 | 3
  /** Drops the bio, for the denser grid on the homepage. */
  compact?: boolean
}) {
  return (
    <Card variant="outline" padding="none" className="ip-trainer">
      <div className="ip-media ip-media--trainer">
        <NextImage
          src={trainer.photo}
          alt={`${trainer.name}, ${trainer.role.toLowerCase()} at IronPulse`}
          width={800}
          height={1000}
          sizes="(max-width: 48rem) 90vw, (max-width: 75rem) 45vw, 22vw"
        />
      </div>

      <Card.Body>
        <Heading level={headingLevel} size="md" className="ip-display">
          {trainer.name}
        </Heading>
        <Text size="sm" tone="primary" weight="medium" style={{ margin: 0 }}>
          {trainer.role}
        </Text>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--vk-space-2)',
            marginBlockStart: 'var(--vk-space-3)',
          }}
        >
          {trainer.specialties.map((specialty) => (
            <Badge key={specialty} variant="outline" size="sm" pill>
              {specialty}
            </Badge>
          ))}
        </div>

        {compact ? null : (
          <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-3)' }}>
            {trainer.bio}
          </Text>
        )}

        <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-3)' }}>
          Coaching since {trainer.since}
        </Text>
      </Card.Body>

      <Card.Footer>
        <div style={{ display: 'flex', gap: 'var(--vk-space-1)' }}>
          {trainer.socials.instagram ? (
            <Social href={trainer.socials.instagram} label={`${trainer.name} on Instagram`}>
              <InstagramIcon />
            </Social>
          ) : null}
          {trainer.socials.x ? (
            <Social href={trainer.socials.x} label={`${trainer.name} on X`}>
              <XIcon />
            </Social>
          ) : null}
          {trainer.socials.email ? (
            <Social href={`mailto:${trainer.socials.email}`} label={`Email ${trainer.name}`}>
              <MailIcon />
            </Social>
          ) : null}
        </div>
      </Card.Footer>
    </Card>
  )
}
