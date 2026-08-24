export interface Plan {
  id: string
  name: string
  monthly: number
  /** Billed once a year. Lower than 12× monthly — the Switch on the homepage shows both. */
  annual: number
  blurb: string
  features: string[]
  highlighted?: boolean
  badge?: string
}

export const CURRENCY = '₹'

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    monthly: 1800,
    annual: 18000,
    blurb: 'The floor, the racks, and a plan to follow.',
    features: [
      'Open gym, all opening hours',
      'Two classes a month',
      'One programming review a quarter',
      'Locker on the day',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 3200,
    annual: 32000,
    blurb: 'Every class on the timetable, no counting.',
    features: [
      'Everything in Basic',
      'Unlimited classes',
      'Monthly programming review',
      'Permanent locker',
      'Bring a guest twice a month',
    ],
    highlighted: true,
    badge: 'Most members',
  },
  {
    id: 'elite',
    name: 'Elite',
    monthly: 5400,
    annual: 54000,
    blurb: 'Coaching that is actually yours.',
    features: [
      'Everything in Pro',
      'Two 1-to-1 sessions a month',
      'Written block, updated fortnightly',
      'Recovery room and sauna',
      'Guest passes, unlimited',
    ],
  },
]

/** Rupees, no decimals — the same formatter for cards, JSON-LD and the join summary. */
export function formatPrice(value: number): string {
  return `${CURRENCY}${value.toLocaleString('en-IN')}`
}

export function annualSavingMonths(plan: Plan): number {
  return Math.round((plan.monthly * 12 - plan.annual) / plan.monthly)
}
