/**
 * Everything the charts and the counters on the homepage read, plus the FAQ,
 * the testimonials and the transformation pairs.
 */

import { CLASSES, SESSIONS } from './classes'

/** Headline figures for the AnimatedCounter row. */
export const HEADLINE = {
  members: 1840,
  trainers: 4,
  classesPerWeek: SESSIONS.length,
  squareFeet: 11500,
} as const

/**
 * Today's occupancy, one reading per hour from 05:00 to 22:00 inclusive.
 * Mock data — a real build would poll the door counter.
 */
export const OCCUPANCY_HOURS = [
  '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00',
] as const

export const OCCUPANCY = [
  6, 34, 52, 41, 28, 19, 15, 31, 26, 14, 12, 22, 45, 78, 86, 61, 33, 11,
]

export const OCCUPANCY_CAPACITY = 95

export function occupancyPeak(): { hour: string; value: number } {
  let index = 0
  for (let i = 1; i < OCCUPANCY.length; i += 1) {
    if (OCCUPANCY[i] > OCCUPANCY[index]) index = i
  }
  return { hour: OCCUPANCY_HOURS[index], value: OCCUPANCY[index] }
}

/** "Average calories burned per 45-min class" — the BarChart series. */
export const CALORIE_DATA = CLASSES.map((c) => ({ x: c.name, y: c.calories }))

/** The two ProgressRings. */
export const WEEKLY_GOAL_PERCENT = 82

export const MEMBER_STORY = {
  name: 'Anita Raghavan',
  since: 'March',
  workoutsDone: 4,
  workoutsTarget: 5,
  quote:
    'I booked the mobility class to fill a gap in my week and it turned out to be the one I never skip.',
  avatar: '/images/members/anita.jpg',
}

export interface Transformation {
  id: string
  name: string
  weeks: number
  /** What actually changed, in the member's own framing — not a weight number. */
  headline: string
  detail: string
  before: string
  after: string
}

export const TRANSFORMATIONS: Transformation[] = [
  {
    id: 'kabir',
    name: 'Kabir',
    weeks: 24,
    headline: 'Deadlift 70 kg → 140 kg',
    detail: 'Two strength sessions a week, one conditioning, and a logbook he never once left at home.',
    before: '/images/results/kabir-before.jpg',
    after: '/images/results/kabir-after.jpg',
  },
  {
    id: 'shreya',
    name: 'Shreya',
    weeks: 16,
    headline: 'First unassisted pull-up',
    detail: 'Started on the bands in CrossFit, finished the block doing three in a row unbroken.',
    before: '/images/results/shreya-before.jpg',
    after: '/images/results/shreya-after.jpg',
  },
  {
    id: 'tom',
    name: 'Tom',
    weeks: 32,
    headline: 'Back to lifting after a slipped disc',
    detail: 'Eight months of mobility first, then a rebuilt hinge pattern. Squats pain-free now.',
    before: '/images/results/tom-before.jpg',
    after: '/images/results/tom-after.jpg',
  },
  {
    id: 'nadia',
    name: 'Nadia',
    weeks: 20,
    headline: 'Ran her first 10 km',
    detail: 'Never used the treadmill. HIIT twice a week and the engine came anyway.',
    before: '/images/results/nadia-before.jpg',
    after: '/images/results/nadia-after.jpg',
  },
]

export const TESTIMONIALS = [
  {
    id: 'priya',
    quote:
      'I had a gym membership for three years and used it eleven times. Here the timetable does the deciding for me, and I have been four times a week since March.',
    author: 'Priya Nair',
    role: 'Pro member, 14 months',
    avatar: '/images/members/priya.jpg',
  },
  {
    id: 'sam',
    quote:
      'Walked in having never touched a barbell. Rhea spent my entire first session on the setup and nothing else. That is why I came back.',
    author: 'Sameer Qureshi',
    role: 'Basic member, 5 months',
    avatar: '/images/members/sameer.jpg',
  },
  {
    id: 'lin',
    quote:
      'The scaled CrossFit track is written on the board before class, so I never have to ask for the easier version in front of everyone. Small thing. Huge thing.',
    author: 'Lin Chen',
    role: 'Elite member, 2 years',
    avatar: '/images/members/lin.jpg',
  },
]

/** Mirrored into FAQPage JSON-LD, so the answers stay plain strings. */
export const FAQS = [
  {
    id: 'trial',
    question: 'Is there a free trial?',
    answer:
      'Yes — a full week, every class included, no card details taken. Turn up ten minutes before anything on the timetable and say it is your trial week at the desk. If you would rather book ahead, start the sign-up and pick the free week option at step one.',
  },
  {
    id: 'freeze',
    question: 'Can I freeze my membership?',
    answer:
      'Any plan can be frozen for up to three months a year, in whole weeks, for any reason at all — travel, injury, a busy quarter at work. Email the front desk before your billing date and the freeze starts immediately. Nothing is charged while a membership is frozen and your rate does not change when it restarts.',
  },
  {
    id: 'calories',
    question: 'Which class burns the most calories?',
    answer:
      'HIIT, at roughly 520 kcal for a 45-minute session, followed by CrossFit at about 480 and Boxing at about 430 — the chart in the Train Smarter section above plots all six. Two caveats worth more than the numbers: these are averages across our members rather than a measurement of you, and the class you will still be attending in six months beats the one with the highest figure.',
  },
  {
    id: 'crossfit',
    question: 'Do I need experience for CrossFit?',
    answer:
      'None. Every session is written up three ways before the doors open — as prescribed, scaled, and a beginner track — so you pick a version rather than asking for an easier one. Tell Joel at the door that it is your first class and he will walk you through the scaled option and the two movements it depends on.',
  },
]
