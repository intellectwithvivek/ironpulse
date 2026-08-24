import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Code,
  CopyButton,
  Heading,
  Section,
  Stack,
  Table,
  Text,
} from '@the_viveksingh/vivek-ui'
import { BreadcrumbJsonLd, TemplateJsonLd } from '@/components/json-ld'
import { CLONE, SITE, VIVEKUI, componentDocs, utm } from '@/data/site'

export const metadata: Metadata = {
  title: 'Built with VivekUI — every component on this site',
  description:
    'A section-by-section map of the VivekUI components behind IronPulse: Scheduler, BarChart, ProgressRing, Sparkline, Countdown, Pricing, Stepper and more — all from one package with zero runtime dependencies.',
  alternates: { canonical: '/built-with' },
  openGraph: {
    title: 'Built with VivekUI',
    description:
      'Every component behind the IronPulse gym template, deep-linked to its documentation.',
    url: '/built-with',
  },
}

/**
 * Section of the site → the components that build it.
 *
 * Kept as data so the table, the count in the copy and the component list at the
 * bottom of the README can never disagree with each other.
 */
const USAGE: { section: string; where: string; components: string[] }[] = [
  {
    section: 'Navigation bar',
    where: 'Every page',
    components: ['navbar', 'badge', 'button', 'theme-toggle', 'theme-provider'],
  },
  {
    section: 'Hero',
    where: 'Homepage',
    components: ['container', 'countdown', 'badge', 'button', 'stack', 'text'],
  },
  {
    section: 'Page headers',
    where: 'Classes, Trainers, Join',
    components: ['hero', 'breadcrumb', 'section'],
  },
  {
    section: 'Club in numbers',
    where: 'Homepage',
    components: ['animated-counter', 'text'],
  },
  {
    section: 'Right now at the gym',
    where: 'Homepage',
    components: ['sparkline', 'progress', 'clock', 'card', 'badge'],
  },
  {
    section: 'Six programmes',
    where: 'Homepage',
    components: ['feature-grid', 'button'],
  },
  {
    section: 'Weekly timetable',
    where: 'Homepage',
    components: ['scheduler', 'badge', 'text'],
  },
  {
    section: 'Coach profiles',
    where: 'Homepage, Trainers',
    components: ['card', 'badge', 'button', 'heading'],
  },
  {
    section: 'Member results',
    where: 'Homepage',
    components: ['carousel', 'card', 'badge'],
  },
  {
    section: 'Calories per class',
    where: 'Homepage',
    components: ['bar-chart', 'card'],
  },
  {
    section: 'Weekly goal rings',
    where: 'Homepage',
    components: ['progress-ring', 'avatar', 'card', 'badge'],
  },
  {
    section: 'BMI estimator',
    where: 'Homepage',
    components: ['slider', 'animated-counter', 'badge', 'icon-button', 'card'],
  },
  {
    section: 'Membership plans',
    where: 'Homepage',
    components: ['pricing', 'switch', 'button'],
  },
  {
    section: 'Member quotes',
    where: 'Homepage',
    components: ['testimonials'],
  },
  {
    section: 'Frequently asked questions',
    where: 'Homepage',
    components: ['faq'],
  },
  {
    section: 'Class list and filters',
    where: 'Classes',
    components: ['select', 'card', 'badge', 'empty-state', 'stack'],
  },
  {
    section: 'Three-step sign-up',
    where: 'Join',
    components: ['stepper', 'radio-group', 'field', 'input', 'select', 'alert'],
  },
  {
    section: 'Sign-up confirmation',
    where: 'Join',
    components: ['toast', 'timeline', 'card', 'badge'],
  },
  {
    section: 'This table',
    where: 'Built with',
    components: ['table', 'code', 'copy-button'],
  },
  {
    section: 'Find us and footer',
    where: 'Every page',
    components: ['map-embed', 'footer', 'section', 'heading', 'text'],
  },
]

/** Every distinct component named above, for the honest count in the copy. */
const DISTINCT = Array.from(new Set(USAGE.flatMap((row) => row.components))).sort()

function label(slug: string): string {
  const special: Record<string, string> = {
    faq: 'FAQ',
    cta: 'CTA',
    'bar-chart': 'BarChart',
    'progress-ring': 'ProgressRing',
    'animated-counter': 'AnimatedCounter',
    'copy-button': 'CopyButton',
    'empty-state': 'EmptyState',
    'feature-grid': 'FeatureGrid',
    'icon-button': 'IconButton',
    'map-embed': 'MapEmbed',
    'radio-group': 'RadioGroup',
    'theme-toggle': 'ThemeToggle',
    'theme-provider': 'ThemeProvider',
  }
  if (special[slug]) return special[slug]
  return slug
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('')
}

function ComponentLink({ slug }: { slug: string }) {
  return (
    <a
      href={componentDocs(slug)}
      target="_blank"
      rel="noopener noreferrer"
      className="ip-plain"
    >
      <Code size="sm">{label(slug)}</Code>
    </a>
  )
}

export default function BuiltWithPage() {
  return (
    <>
      <TemplateJsonLd />
      <BreadcrumbJsonLd trail={[{ name: 'Built with VivekUI', path: '/built-with' }]} />

      <Section size="lg" padding="sm">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Built with' }]}
          label="Breadcrumb"
        />
      </Section>

      <Section size="lg" padding="md">
        <Badge variant="soft" tone="primary" pill>
          ⚡ Built with VivekUI
        </Badge>

        <Heading level={1} size="2xl" className="ip-display" style={{ marginBlockStart: 'var(--vk-space-4)' }}>
          Built with VivekUI
        </Heading>

        <Text size="lg" className="ip-lede">
          This entire website is built with VivekUI, a free React component library with
          zero runtime dependencies. Every element on it — the weekly timetable, the three
          charts, the countdown, the pricing table, the sign-up stepper — comes from one
          package, one install and one CSS import. There is no Tailwind here, no shadcn, no
          MUI, and no component copied into the repo to be maintained by hand.
        </Text>

        <Card variant="outline" padding="lg" style={{ marginBlockStart: 'var(--vk-space-6)', maxWidth: '34rem' }}>
          <Card.Body>
            <Text size="sm" tone="muted" style={{ marginBlockEnd: 'var(--vk-space-3)' }}>
              Install it
            </Text>
            <div className="ip-credit__install">
              <Code>{VIVEKUI.install}</Code>
              <CopyButton
                value={VIVEKUI.install}
                variant="solid"
                label="Copy"
                copiedLabel="Copied"
              />
            </div>
            <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-3)' }}>
              Then one import in your root layout:{' '}
              <Code size="sm">{`import '@the_viveksingh/vivek-ui/styles.css'`}</Code>. Charts
              live behind a second, separate import so a site without charts pays nothing
              for them.
            </Text>
          </Card.Body>
        </Card>
      </Section>

      <Section size="lg" padding="lg" aria-labelledby="map-title">
        <Heading level={2} size="lg" className="ip-display" id="map-title">
          Section by section
        </Heading>
        <Text tone="muted" style={{ maxWidth: '58ch', marginBlockEnd: 'var(--vk-space-6)' }}>
          {DISTINCT.length} distinct components across {USAGE.length} sections. Every name
          below links to its own documentation page.
        </Text>

        <Table striped hoverable size="md">
          <Table.Caption visuallyHidden>
            Each section of the IronPulse template and the VivekUI components it is built
            from
          </Table.Caption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell scope="col">Section</Table.HeaderCell>
              <Table.HeaderCell scope="col">Where</Table.HeaderCell>
              <Table.HeaderCell scope="col">Components</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {USAGE.map((row) => (
              <Table.Row key={row.section}>
                <Table.HeaderCell scope="row">{row.section}</Table.HeaderCell>
                <Table.Cell label="Where">
                  <Text as="span" size="sm" tone="muted">
                    {row.where}
                  </Text>
                </Table.Cell>
                <Table.Cell label="Components">
                  <span
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--vk-space-2)',
                    }}
                  >
                    {row.components.map((slug) => (
                      <ComponentLink key={slug} slug={slug} />
                    ))}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <Alert
          tone="info"
          title="One package, not five"
          style={{ marginBlockStart: 'var(--vk-space-8)' }}
        >
          The resource <strong>Scheduler</strong> behind the weekly timetable, all three
          charts — <strong>BarChart</strong>, <strong>ProgressRing</strong> and{' '}
          <strong>Sparkline</strong> — and the <strong>Countdown</strong> in the hero all
          ship in the same install. That combination usually means a calendar library, a
          charting library and a date library, each with its own dependency tree; here it is
          one package with none. shadcn/ui, Mantine and Radix ship no scheduler at all, and
          MUI&apos;s sits behind a paid licence.
        </Alert>
      </Section>

      <Section size="lg" padding="lg" background="muted" aria-labelledby="next-title">
        <Heading level={2} size="lg" className="ip-display" id="next-title">
          Take it from here
        </Heading>
        <Text tone="muted" style={{ maxWidth: '56ch' }}>
          This template is MIT licensed. Clone it, gut the copy, point{' '}
          <Code size="sm">/data</Code> at your own classes and it is your gym site. The
          credit in the footer is removable — a star on the repo is appreciated instead.
        </Text>

        <div
          className="ip-clone__box"
          style={{ marginBlockStart: 'var(--vk-space-6)', maxWidth: '34rem' }}
        >
          <Text size="sm" tone="muted" style={{ margin: 0 }}>
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
        </div>

        <Stack direction="horizontal" gap={3} wrap style={{ marginBlockStart: 'var(--vk-space-6)' }}>
          <Button asChild size="lg">
            <a href={utm(VIVEKUI.docs, 'builtwith')} target="_blank" rel="noopener noreferrer">
              Read the Docs
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={VIVEKUI.github} target="_blank" rel="noopener noreferrer">
              Star VivekUI on GitHub
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={CLONE.useTemplate} target="_blank" rel="noopener noreferrer">
              Use this template
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/">Back to the gym</Link>
          </Button>
        </Stack>

        <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-5)' }}>
          Template repository:{' '}
          <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer" className="ip-plain">
            <Code size="sm">{SITE.repo}</Code>
          </a>{' '}
          · package:{' '}
          <a href={VIVEKUI.npm} target="_blank" rel="noopener noreferrer" className="ip-plain">
            <Code size="sm">{VIVEKUI.pkg}</Code>
          </a>{' '}
          · by{' '}
          <a
            href={utm(VIVEKUI.author, 'builtwith')}
            target="_blank"
            rel="noopener noreferrer"
            className="ip-plain"
          >
            Vivek Kumar Singh
          </a>
        </Text>
      </Section>
    </>
  )
}
