'use client'

import { useState } from 'react'
import {
  AnimatedCounter,
  Badge,
  Card,
  Heading,
  IconButton,
  Slider,
  Text,
} from '@the_viveksingh/vivek-ui'
import { ResetIcon } from './icons'

const DEFAULTS = { height: 172, weight: 70 }

/**
 * BMI bands, with copy that describes rather than judges.
 *
 * The line under the number is the whole reason to be careful here: a number
 * attached to someone's body on a gym website is the easiest place in a build
 * like this to be unkind by accident. Each band says what the figure is and
 * what it is not, and none of them prescribe anything.
 */
const BANDS = [
  {
    max: 18.5,
    label: 'Under 18.5',
    tone: 'primary' as const,
    line: 'On the lower side of the range this crude formula describes. Worth a word with a GP or a dietitian if it is new for you.',
  },
  {
    max: 25,
    label: '18.5 – 24.9',
    tone: 'success' as const,
    line: 'Within the range the formula calls typical. It says nothing about how strong you are or how well you sleep.',
  },
  {
    max: 30,
    label: '25 – 29.9',
    tone: 'warning' as const,
    line: 'Above the formula’s typical band. Plenty of people here sit in it, including a few who out-lift everyone else on the floor.',
  },
  {
    max: Number.POSITIVE_INFINITY,
    label: '30 and above',
    tone: 'danger' as const,
    line: 'Above the formula’s typical band. It is a starting point for a conversation with a clinician, not a verdict on your training.',
  },
]

function band(bmi: number) {
  return BANDS.find((b) => bmi < b.max) ?? BANDS[BANDS.length - 1]
}

export function BmiCalculator() {
  const [height, setHeight] = useState(DEFAULTS.height)
  const [weight, setWeight] = useState(DEFAULTS.weight)

  const metres = height / 100
  const bmi = weight / (metres * metres)
  const rounded = Math.round(bmi * 10) / 10
  const current = band(rounded)
  const isDefault = height === DEFAULTS.height && weight === DEFAULTS.weight

  function reset() {
    setHeight(DEFAULTS.height)
    setWeight(DEFAULTS.weight)
  }

  return (
    <Card variant="outline" padding="lg" id="bmi" className="ip-anchor">
      <Card.Header>
        <div
          style={{
            display: 'flex',
            gap: 'var(--vk-space-3)',
            alignItems: 'start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Heading level={3} size="lg" className="ip-display">
              BMI estimator
            </Heading>
            <Text size="sm" tone="muted">
              Two sliders, one very rough number.
            </Text>
          </div>
          <IconButton
            aria-label="Reset height and weight to their starting values"
            variant="ghost"
            size="sm"
            onClick={reset}
            disabled={isDefault}
          >
            <ResetIcon />
          </IconButton>
        </div>
      </Card.Header>

      <Card.Body>
        <div style={{ display: 'grid', gap: 'var(--vk-space-6)' }}>
          <Slider
            size="lg"
            min={130}
            max={215}
            step={1}
            value={height}
            onValueChange={setHeight}
            showValue
            aria-label="Height in centimetres"
            formatValue={(v) => `${v} cm`}
          />
          <Slider
            size="lg"
            min={35}
            max={180}
            step={1}
            value={weight}
            onValueChange={setWeight}
            showValue
            aria-label="Weight in kilograms"
            formatValue={(v) => `${v} kg`}
          />

          <div>
            <div className="ip-bmi__readout">
              {/*
                `duration={0}` because this number tracks a slider: an easing
                animation would lag behind the thumb and read as jank.
                `startOnView` off for the same reason — it is already in view.
              */}
              <span className="ip-bmi__value">
                <AnimatedCounter
                  value={rounded}
                  duration={0}
                  startOnView={false}
                  locale="en-GB"
                  format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                />
              </span>
              <Badge variant="soft" tone={current.tone} pill>
                {current.label}
              </Badge>
            </div>
            <Text tone="muted" style={{ marginBlockStart: 'var(--vk-space-3)' }}>
              {current.line}
            </Text>
          </div>
        </div>
      </Card.Body>

      <Card.Footer>
        <Text size="sm" tone="muted">
          Estimate only — not medical advice. BMI ignores muscle, bone and where
          weight sits, which is most of what matters in a gym.
        </Text>
      </Card.Footer>
    </Card>
  )
}
