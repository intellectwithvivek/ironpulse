/**
 * The six programmes, the weekly timetable built from them, and the calories
 * figure the BarChart on the homepage reads.
 *
 * The timetable is a *recurring* week, so every session is stored as a day index
 * plus a wall-clock time rather than a real date. `weekEvents()` projects them
 * onto one fixed anchor day — see the comment there for why that matters.
 */

export type Intensity = 'Low' | 'Moderate' | 'High' | 'All out'

export interface GymClass {
  slug: string
  name: string
  /** One line for a card; the long version lives on the class page copy. */
  summary: string
  minutes: number
  intensity: Intensity
  /** Average kcal for a 45-minute session — the BarChart series. */
  calories: number
  trainerId: string
  /** Kit or prerequisites, shown as small print on the card. */
  bring: string
  image: string
}

export const INTENSITY_TONE: Record<Intensity, 'success' | 'primary' | 'warning' | 'danger'> = {
  Low: 'success',
  Moderate: 'primary',
  High: 'warning',
  'All out': 'danger',
}

export const CLASSES: GymClass[] = [
  {
    slug: 'strength',
    name: 'Strength',
    summary:
      'Barbell work on a five-week wave: squat, press, hinge. You keep the same numbers log from your first session to your last.',
    minutes: 60,
    intensity: 'Moderate',
    calories: 340,
    trainerId: 'rhea',
    bring: 'Flat shoes. Belt optional and not encouraged early on.',
    image:
      '/images/classes/strength.avif',
  },
  {
    slug: 'hiit',
    name: 'HIIT',
    summary:
      'Twenty-second efforts against a clock nobody negotiates with. Rowers, bikes, and the occasional sled when the floor is free.',
    minutes: 45,
    intensity: 'All out',
    calories: 520,
    trainerId: 'darius',
    bring: 'A towel and more water than you think you need.',
    image:
      '/images/classes/hiit.avif',
  },
  {
    slug: 'yoga',
    name: 'Yoga',
    summary:
      'Slow, warm, and unhurried. Hips and thoracic spine, mostly, because that is what lifting takes out of you.',
    minutes: 60,
    intensity: 'Low',
    calories: 180,
    trainerId: 'meera',
    bring: 'Nothing. Mats, blocks and straps are on the rack by the door.',
    image:
      '/images/classes/yoga.avif',
  },
  {
    slug: 'crossfit',
    name: 'CrossFit',
    summary:
      'A scored workout every session, scaled three ways so the whiteboard means something whether it is week one or year four.',
    minutes: 60,
    intensity: 'High',
    calories: 480,
    trainerId: 'joel',
    bring: 'No experience needed — say so at the door and you get the scaled track.',
    image:
      '/images/classes/crossfit.avif',
  },
  {
    slug: 'boxing',
    name: 'Boxing',
    summary:
      'Pads, bags, footwork. Technical rounds first, conditioning last, and nobody spars unless they have asked to.',
    minutes: 45,
    intensity: 'High',
    calories: 430,
    trainerId: 'darius',
    bring: 'Wraps. Gloves can be borrowed for your first month.',
    image:
      '/images/classes/boxing.avif',
  },
  {
    slug: 'mobility',
    name: 'Mobility',
    summary:
      'Thirty minutes of end-range work and breathing. The class people book after their first heavy week and then never drop.',
    minutes: 30,
    intensity: 'Low',
    calories: 150,
    trainerId: 'meera',
    bring: 'Long socks if you dislike the foam roller as much as we do.',
    image:
      '/images/classes/mobility.avif',
  },
]

export const CLASS_BY_SLUG = new Map(CLASSES.map((c) => [c.slug, c]))

/** A session in the recurring week. `day` is 0 = Monday … 6 = Sunday. */
export interface Session {
  id: string
  day: number
  /** Wall-clock start, `HH:MM`, in the studio's own time zone. */
  time: string
  classSlug: string
  /** Overrides the class's usual trainer when someone else is covering. */
  trainerId?: string
  room: 'Floor' | 'Studio' | 'Ring'
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const

export const SESSIONS: Session[] = [
  // Monday
  { id: 'mon-1', day: 0, time: '06:30', classSlug: 'strength', room: 'Floor' },
  { id: 'mon-2', day: 0, time: '12:00', classSlug: 'mobility', room: 'Studio' },
  { id: 'mon-3', day: 0, time: '18:00', classSlug: 'hiit', room: 'Floor' },
  { id: 'mon-4', day: 0, time: '19:30', classSlug: 'boxing', room: 'Ring' },
  // Tuesday
  { id: 'tue-1', day: 1, time: '07:00', classSlug: 'crossfit', room: 'Floor' },
  { id: 'tue-2', day: 1, time: '09:30', classSlug: 'yoga', room: 'Studio' },
  { id: 'tue-3', day: 1, time: '18:30', classSlug: 'strength', room: 'Floor' },
  // Wednesday
  { id: 'wed-1', day: 2, time: '06:30', classSlug: 'hiit', room: 'Floor' },
  { id: 'wed-2', day: 2, time: '12:00', classSlug: 'mobility', room: 'Studio' },
  { id: 'wed-3', day: 2, time: '18:00', classSlug: 'boxing', room: 'Ring' },
  { id: 'wed-4', day: 2, time: '19:30', classSlug: 'strength', trainerId: 'joel', room: 'Floor' },
  // Thursday
  { id: 'thu-1', day: 3, time: '07:00', classSlug: 'crossfit', room: 'Floor' },
  { id: 'thu-2', day: 3, time: '18:30', classSlug: 'hiit', room: 'Floor' },
  { id: 'thu-3', day: 3, time: '20:00', classSlug: 'yoga', room: 'Studio' },
  // Friday
  { id: 'fri-1', day: 4, time: '06:30', classSlug: 'strength', room: 'Floor' },
  { id: 'fri-2', day: 4, time: '12:30', classSlug: 'boxing', room: 'Ring' },
  { id: 'fri-3', day: 4, time: '18:00', classSlug: 'crossfit', room: 'Floor' },
  // Saturday
  { id: 'sat-1', day: 5, time: '08:00', classSlug: 'crossfit', room: 'Floor' },
  { id: 'sat-2', day: 5, time: '09:30', classSlug: 'hiit', trainerId: 'rhea', room: 'Floor' },
  { id: 'sat-3', day: 5, time: '11:00', classSlug: 'yoga', room: 'Studio' },
  // Sunday
  { id: 'sun-1', day: 6, time: '09:00', classSlug: 'mobility', room: 'Studio' },
  { id: 'sun-2', day: 6, time: '10:30', classSlug: 'strength', room: 'Floor' },
]

export function classesPerWeek(): number {
  return SESSIONS.length
}
