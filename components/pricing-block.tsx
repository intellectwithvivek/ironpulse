'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Pricing, Switch, Text } from '@the_viveksingh/vivek-ui'
import { PLANS, annualSavingMonths, formatPrice } from '@/data/plans'

/**
 * Membership plans, monthly or annual.
 *
 * Client-side only for the billing Switch. The plan data is static, so flipping
 * the toggle re-derives prices from it rather than fetching anything.
 *
 * The Switch sits *outside* `Pricing` on purpose: passing `children` to Pricing
 * replaces its whole plan grid rather than adding to it.
 */
export function PricingBlock() {
  const [annual, setAnnual] = useState(false)

  return (
    <div id="pricing" className="ip-anchor">
      <div
        style={{
          display: 'flex',
          gap: 'var(--vk-space-5)',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBlockEnd: 'var(--vk-space-8)',
        }}
      >
        <Switch
          checked={annual}
          onChange={(event) => setAnnual(event.currentTarget.checked)}
          label="Pay annually"
          description="Two months free on every plan"
        />
        {annual ? (
          <Text as="span" size="sm" tone="primary" weight="semibold">
            Saving {annualSavingMonths(PLANS[1])} months on Pro
          </Text>
        ) : null}
      </div>

      <Pricing
        padding="none"
        bleed
        columns={{ base: 1, md: 3 }}
        headingLevel={3}
        plans={PLANS.map((plan) => {
          const saved = annualSavingMonths(plan)
          return {
            id: plan.id,
            name: plan.name,
            price: formatPrice(annual ? plan.annual : plan.monthly),
            period: annual ? '/year' : '/month',
            description: annual ? `${plan.blurb} ${saved} months free.` : plan.blurb,
            features: plan.features,
            highlighted: plan.highlighted,
            badge: plan.badge,
            cta: (
              <Button
                asChild
                fullWidth
                size="lg"
                variant={plan.highlighted ? 'solid' : 'outline'}
              >
                <Link href={`/join?plan=${plan.id}`}>
                  {plan.highlighted ? 'Start free week' : `Choose ${plan.name}`}
                </Link>
              </Button>
            ),
          }
        })}
      />
    </div>
  )
}
