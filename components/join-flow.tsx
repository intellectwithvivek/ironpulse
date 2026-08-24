'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Alert,
  Badge,
  Button,
  Card,
  Field,
  Heading,
  Input,
  RadioGroup,
  Select,
  Stack,
  Stepper,
  Text,
  Timeline,
  useToast,
} from '@the_viveksingh/vivek-ui'
import { CLASSES } from '@/data/classes'
import { PLANS, formatPrice } from '@/data/plans'
import { TRAINERS } from '@/data/trainers'
import { useMediaQuery } from '@/lib/use-media-query'

const STEPS = [
  { label: 'Pick a plan', description: 'Or start with the free week' },
  { label: 'Your details', description: 'Four fields, no card' },
  { label: 'You are in', description: 'What the first week looks like' },
]

interface Details {
  name: string
  email: string
  phone: string
  start: string
  goal: string
  coach: string
}

const EMPTY: Details = {
  name: '',
  email: '',
  phone: '',
  start: 'this-week',
  goal: 'strength',
  coach: 'any',
}

const START_OPTIONS = [
  { value: 'this-week', label: 'This week' },
  { value: 'next-week', label: 'Next week' },
  { value: 'next-month', label: 'Start of next month' },
]

/** A plausible email, not a compliant one. Full RFC validation belongs on a server. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

export function JoinFlow({ initialPlan = 'pro' }: { initialPlan?: string }) {
  const { toast } = useToast()

  /*
    Three horizontal steps do not fit a 320px screen — the labels clip. Stepper
    takes its orientation as a prop rather than from CSS, so this is one of the
    few places a media query has to be read in JavaScript. It resolves after
    mount, and `false` means the wider layout, so the server renders horizontal
    and narrow screens restack on the first client pass.
  */
  const narrow = useMediaQuery('(width < 40rem)')

  const [step, setStep] = useState(0)
  const [plan, setPlan] = useState(initialPlan)
  const [details, setDetails] = useState<Details>(EMPTY)
  const [touched, setTouched] = useState(false)

  const chosen = PLANS.find((p) => p.id === plan) ?? PLANS[1]
  const nameOk = details.name.trim().length >= 2
  const emailOk = looksLikeEmail(details.email)
  const detailsOk = nameOk && emailOk

  function set<K extends keyof Details>(key: K, value: Details[K]) {
    setDetails((current) => ({ ...current, [key]: value }))
  }

  function submit() {
    setTouched(true)
    if (!detailsOk) return

    setStep(2)
    toast({
      title: 'Free week booked',
      description: `${details.name.split(' ')[0]}, your ${chosen.name} trial is set. Nothing has been charged — bring shoes.`,
      tone: 'success',
      duration: 8000,
    })
  }

  return (
    <div>
      <Stepper
        steps={STEPS}
        activeStep={step}
        clickable
        orientation={narrow ? 'vertical' : 'horizontal'}
        label="Sign-up progress"
        /* Only backwards. Letting someone click to step 3 would skip the form
           that step 3 summarises. */
        onStepChange={(next) => {
          if (next < step) setStep(next)
        }}
        style={{ marginBlockEnd: 'var(--vk-space-10)' }}
      />

      {/* --- Step 1 · plan --- */}
      {step === 0 ? (
        <div>
          <Heading level={2} size="lg" className="ip-display">
            Which membership?
          </Heading>
          <Text tone="muted" style={{ maxWidth: '52ch' }}>
            Every plan starts with the same free week, and nothing is charged until it
            ends. You can change plan or walk away at any point during it.
          </Text>

          <div className="ip-plans" style={{ marginBlockStart: 'var(--vk-space-6)' }}>
            <RadioGroup
              name="plan"
              label="Membership plan"
              value={plan}
              onChange={setPlan}
              options={PLANS.map((option) => ({
                value: option.id,
                label: (
                  <span className="ip-plan-row">
                    <span>
                      {option.name}
                      {option.badge ? (
                        <>
                          {' '}
                          <Badge variant="soft" tone="primary" size="sm" pill>
                            {option.badge}
                          </Badge>
                        </>
                      ) : null}
                    </span>
                    <span className="ip-plan-price">
                      {formatPrice(option.monthly)}
                      <Text as="span" size="sm" tone="muted">
                        /month
                      </Text>
                    </span>
                  </span>
                ),
                description: `${option.blurb} ${option.features.slice(0, 3).join(' · ')}.`,
              }))}
            />
          </div>

          <Stack direction="horizontal" gap={3} wrap style={{ marginBlockStart: 'var(--vk-space-8)' }}>
            <Button size="lg" onClick={() => setStep(1)}>
              Continue with {chosen.name}
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/#pricing">Compare all three</Link>
            </Button>
          </Stack>
        </div>
      ) : null}

      {/* --- Step 2 · details --- */}
      {step === 1 ? (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            submit()
          }}
          noValidate
        >
          <Heading level={2} size="lg" className="ip-display">
            Who are we expecting?
          </Heading>
          <Text tone="muted" style={{ maxWidth: '52ch' }}>
            No card details, and nobody will ring you. We use this to put your name on the
            board for your first class.
          </Text>

          <div className="ip-form-grid" style={{ marginBlockStart: 'var(--vk-space-6)' }}>
            <Field
              label="Full name"
              required
              error={touched && !nameOk ? 'Please give us a name to put on the board.' : undefined}
            >
              <Input
                value={details.name}
                onChange={(event) => set('name', event.currentTarget.value)}
                autoComplete="name"
                placeholder="Anita Raghavan"
              />
            </Field>

            <Field
              label="Email"
              required
              help="Where the confirmation goes."
              error={touched && !emailOk ? 'That does not look like an email address.' : undefined}
            >
              <Input
                type="email"
                value={details.email}
                onChange={(event) => set('email', event.currentTarget.value)}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Phone" help="Optional. Only used if a class is cancelled.">
              <Input
                type="tel"
                value={details.phone}
                onChange={(event) => set('phone', event.currentTarget.value)}
                autoComplete="tel"
                placeholder="+91 98800 00000"
              />
            </Field>

            <Field label="When would you start?">
              <Select
                value={details.start}
                onChange={(event) => set('start', event.currentTarget.value)}
                options={START_OPTIONS}
              />
            </Field>

            <Field label="What are you most interested in?">
              <Select
                value={details.goal}
                onChange={(event) => set('goal', event.currentTarget.value)}
                options={CLASSES.map((c) => ({ value: c.slug, label: c.name }))}
              />
            </Field>

            <Field label="Any coach in particular?">
              <Select
                value={details.coach}
                onChange={(event) => set('coach', event.currentTarget.value)}
                options={[
                  { value: 'any', label: 'Whoever is on' },
                  ...TRAINERS.map((t) => ({ value: t.id, label: `${t.name} — ${t.role}` })),
                ]}
              />
            </Field>
          </div>

          {touched && !detailsOk ? (
            <Alert
              tone="danger"
              title="Two fields still need you"
              style={{ marginBlockStart: 'var(--vk-space-6)' }}
            >
              Fix the highlighted fields above and we will get you booked in.
            </Alert>
          ) : null}

          <Stack direction="horizontal" gap={3} wrap style={{ marginBlockStart: 'var(--vk-space-8)' }}>
            <Button type="submit" size="lg">
              Book my free week
            </Button>
            <Button type="button" size="lg" variant="ghost" onClick={() => setStep(0)}>
              Back to plans
            </Button>
          </Stack>

          <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-4)' }}>
            This is a template — the form is not wired to a backend, so nothing leaves
            your browser.
          </Text>
        </form>
      ) : null}

      {/* --- Step 3 · summary --- */}
      {step === 2 ? (
        <div>
          <Badge variant="soft" tone="success" pill>
            Booked
          </Badge>
          <Heading level={2} size="lg" className="ip-display" style={{ marginBlockStart: 'var(--vk-space-3)' }}>
            See you {details.start === 'this-week' ? 'this week' : 'soon'}, {details.name.split(' ')[0]}
          </Heading>
          <Text tone="muted" style={{ maxWidth: '54ch' }}>
            A confirmation is on its way to {details.email}. Nothing has been charged, and
            nothing will be until the free week is over — if you decide not to stay, you do
            not have to tell anyone.
          </Text>

          <Card variant="outline" padding="lg" style={{ marginBlockStart: 'var(--vk-space-6)' }}>
            <Card.Header>
              <Heading level={3} size="md" className="ip-display">
                Your first week
              </Heading>
              <Text size="sm" tone="muted">
                {chosen.name} plan · {formatPrice(chosen.monthly)}/month after the trial ·
                interested in {CLASSES.find((c) => c.slug === details.goal)?.name}
              </Text>
            </Card.Header>

            <Card.Body>
              <Timeline>
                <Timeline.Item
                  status="complete"
                  title="Induction, 30 minutes"
                  timestamp="Day 1"
                  description="A walk round, a look at how you move, and we pick your first three classes together."
                  headingLevel={4}
                />
                <Timeline.Item
                  status="current"
                  title="First class"
                  timestamp="Day 2"
                  description={`Whatever is next on the timetable — likely ${CLASSES.find((c) => c.slug === details.goal)?.name}. Turn up ten minutes early.`}
                  headingLevel={4}
                />
                <Timeline.Item
                  status="pending"
                  title="Mobility"
                  timestamp="Day 4"
                  description="Thirty minutes, and the class most people are surprised to enjoy. It is also the best thing for whatever aches after day two."
                  headingLevel={4}
                />
                <Timeline.Item
                  status="pending"
                  title="Strength, with numbers written down"
                  timestamp="Day 5"
                  description="Your logbook starts here. Rhea sets the first loads deliberately low."
                  headingLevel={4}
                />
                <Timeline.Item
                  status="pending"
                  title="Fifteen-minute review"
                  timestamp="Day 7"
                  description="What worked, what hurt, and whether the plan you picked is the right one. No pressure to sign anything."
                  headingLevel={4}
                />
              </Timeline>
            </Card.Body>

            <Card.Footer>
              <Stack direction="horizontal" gap={3} wrap>
                <Button asChild>
                  <Link href="/#timetable">Check the timetable</Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStep(0)
                    setDetails(EMPTY)
                    setTouched(false)
                  }}
                >
                  Start over
                </Button>
              </Stack>
            </Card.Footer>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
