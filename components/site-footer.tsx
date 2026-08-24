import Link from 'next/link'
import {
  Badge,
  Button,
  Code,
  CopyButton,
  Footer,
  Heading,
  MapEmbed,
  Section,
  Text,
} from '@the_viveksingh/vivek-ui'
import { CLONE, GYM, SITE, VIVEKUI, utm } from '@/data/site'
import { GitHubIcon, InstagramIcon, MailIcon, TerminalIcon, XIcon } from './icons'

/** A social link. An anchor that looks like a button — never a button that navigates. */
function SocialLink({
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

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <>
      {/* --- Take it away with you -------------------------------------------
          The developer-facing band. A visitor looking for a gym scrolls past it;
          a developer evaluating VivekUI came for exactly this, so the command is
          spelled out rather than hidden behind a repo link.
          ------------------------------------------------------------------ */}
      <Section
        as="aside"
        padding="lg"
        size="xl"
        background="muted"
        aria-labelledby="clone-title"
        id="clone"
        className="ip-anchor"
      >
        <div className="ip-clone">
          <div>
            <Badge variant="soft" tone="primary" pill>
              Free · MIT licensed
            </Badge>
            <Heading
              level={2}
              size="lg"
              className="ip-display"
              id="clone-title"
              style={{ marginBlockStart: 'var(--vk-space-3)' }}
            >
              Clone this template
            </Heading>
            <Text tone="muted" style={{ maxWidth: '48ch' }}>
              Every page you just scrolled through is in one public repository —
              the timetable, the charts, the sign-up flow and all the mock data.
              Take it, rebrand it, ship it. No attribution required.
            </Text>
          </div>

          <div className="ip-clone__box">
            <Text
              size="sm"
              tone="muted"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--vk-space-2)',
                margin: 0,
              }}
            >
              <TerminalIcon size={16} />
              Clone it
            </Text>

            <div className="ip-clone__cmd">
              <Code block size="sm">
                {CLONE.command}
              </Code>
              <CopyButton
                value={CLONE.command}
                size="sm"
                variant="solid"
                label="Copy"
                copiedLabel="Copied"
                copiedAnnouncement="Clone command copied to the clipboard"
              />
            </div>

            <div className="ip-clone__actions">
              <Button asChild size="sm">
                <a href={CLONE.useTemplate} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon size={16} />
                  Use this template
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
                  Star the repo
                </a>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <a href={CLONE.deploy} target="_blank" rel="noopener noreferrer">
                  Deploy to Vercel
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* --- Where we are --------------------------------------------------- */}
      <Section as="aside" padding="lg" size="xl" aria-labelledby="findus-title">
        <div className="ip-panel">
          <div>
            <Heading level={2} size="lg" className="ip-display" id="findus-title">
              Find us
            </Heading>
            <Text tone="muted" style={{ marginBlockEnd: 'var(--vk-space-4)' }}>
              {GYM.street}, {GYM.locality} {GYM.postalCode}. Two minutes from Trinity
              metro, and there is bike parking under the building.
            </Text>

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
              <a className="ip-plain" href={`tel:${GYM.phone.replace(/\s/g, '')}`}>
                {GYM.phone}
              </a>
              {' · '}
              <a className="ip-plain" href={`mailto:${GYM.email}`}>
                {GYM.email}
              </a>
            </Text>
          </div>

          <MapEmbed
            query={`${GYM.street}, ${GYM.locality}`}
            zoom={15}
            ratio={4 / 3}
            title={`Map showing IronPulse at ${GYM.street}, ${GYM.locality}`}
          />
        </div>
      </Section>

      <Footer
        size="xl"
        background="muted"
        navLabel="Footer"
        headingLevel={2}
        brand={
          <div style={{ display: 'grid', gap: 'var(--vk-space-4)', maxWidth: '34rem' }}>
            <div>
              <span className="ip-display" style={{ fontSize: 'var(--vk-text-xl)' }}>
                Iron<span style={{ color: 'var(--vk-color-primary)' }}>Pulse</span>
              </span>
              <Text size="sm" tone="muted">
                {SITE.tagline}. A fictional gym, and a real open-source template.
              </Text>
            </div>

            {/* --- Promotion kit: the credit, on every page. --- */}
            <div className="ip-credit">
              <Text size="sm">
                Built with ❤️ using VivekUI — 91 React components · 6 SVG charts · zero
                runtime dependencies. One install, one CSS import, no config.
              </Text>
              <div className="ip-credit__install">
                <Code>{VIVEKUI.install}</Code>
                <CopyButton
                  value={VIVEKUI.install}
                  size="sm"
                  variant="outline"
                  label="Copy"
                  copiedLabel="Copied"
                />
              </div>
              <Text size="sm" tone="muted">
                <Link className="ip-plain" href="/built-with">
                  See every component this site uses →
                </Link>
              </Text>
            </div>
          </div>
        }
        social={
          <>
            <SocialLink href={SITE.repoUrl} label={`${SITE.repo} on GitHub`}>
              <GitHubIcon />
            </SocialLink>
            <SocialLink href="https://instagram.com/" label="IronPulse on Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="https://x.com/" label="IronPulse on X">
              <XIcon />
            </SocialLink>
            <SocialLink href={`mailto:${GYM.email}`} label="Email the front desk">
              <MailIcon />
            </SocialLink>
          </>
        }
        columns={[
          {
            title: 'Train',
            links: [
              { label: 'All classes', href: '/classes' },
              { label: 'Weekly timetable', href: '/#timetable' },
              { label: 'Trainers', href: '/trainers' },
              { label: 'Live occupancy', href: '/#right-now' },
            ],
          },
          {
            title: 'Membership',
            links: [
              { label: 'Plans and pricing', href: '/#pricing' },
              { label: 'Start a free week', href: '/join' },
              { label: 'Freezing a membership', href: '/#faq' },
              { label: 'BMI estimator', href: '/#bmi' },
            ],
          },
          {
            title: 'For developers',
            links: [
              { label: 'Clone the repo', href: SITE.repoUrl, target: '_blank' },
              { label: 'Use as a template', href: CLONE.useTemplate, target: '_blank' },
              { label: 'Deploy to Vercel', href: CLONE.deploy, target: '_blank' },
              { label: 'Report an issue', href: CLONE.issues, target: '_blank' },
              { label: 'Components used', href: '/built-with' },
            ],
          },
          {
            title: 'VivekUI',
            links: [
              { label: 'Documentation', href: utm(VIVEKUI.docs, 'footer'), target: '_blank' },
              { label: 'npm package', href: VIVEKUI.npm, target: '_blank' },
              { label: 'Library on GitHub', href: VIVEKUI.github, target: '_blank' },
              {
                label: 'Vivek Kumar Singh',
                href: utm(VIVEKUI.author, 'footer'),
                target: '_blank',
              },
            ],
          },
        ]}
        copyright={
          <Text size="sm" tone="muted">
            © {year} IronPulse — a fictional gym, built as a free MIT-licensed template to
            showcase{' '}
            <a
              className="ip-plain"
              href={utm(VIVEKUI.docs, 'footer')}
              target="_blank"
              rel="noopener noreferrer"
            >
              VivekUI
            </a>
            . The credit above is removable; a star on the repo is appreciated instead.
          </Text>
        }
      />
    </>
  )
}
