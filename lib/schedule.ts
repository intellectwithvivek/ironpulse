/**
 * Projecting a recurring weekly timetable onto the Scheduler.
 *
 * Scheduler's x-axis is absolute time, so a literal Mon–Sun of real dates would
 * stretch the axis across seven days and give one long ribbon instead of a
 * timetable. The trick is to put every session on the SAME anchor day and make
 * the *day* the resource: rows become Monday–Sunday, columns become 06:00–22:00,
 * which is the grid people actually read.
 *
 * Every timestamp is built from `Date.UTC`, and `formatTime` below reads the UTC
 * fields back. That pairing is what keeps the timetable hydration-safe: the
 * server renders in UTC and the visitor's browser is in some other zone, and
 * anything reading local `getHours()` would disagree across that boundary.
 */

import { DAYS, SESSIONS, CLASS_BY_SLUG, type Session } from '@/data/classes'
import { trainerName } from '@/data/trainers'
import type { SchedulerEvent, SchedulerResource } from '@the_viveksingh/vivek-ui'

/** An arbitrary, fixed day. Only the time-of-day offsets from it are ever shown. */
const ANCHOR = Date.UTC(2026, 0, 5)

const MINUTE = 60_000

function at(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return ANCHOR + (hours * 60 + minutes) * MINUTE
}

/** The visible window: an hour before the earliest class, an hour after the latest. */
export const WINDOW = { start: at('06:00'), end: at('21:30') }

export function formatTime(value: Date): string {
  const hours = String(value.getUTCHours()).padStart(2, '0')
  const minutes = String(value.getUTCMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export const DAY_RESOURCES: SchedulerResource[] = DAYS.map((day, index) => ({
  id: String(index),
  label: day.slice(0, 3),
  sublabel: countFor(index),
}))

function countFor(day: number): string {
  const n = SESSIONS.filter((s) => s.day === day).length
  return n === 1 ? '1 class' : `${n} classes`
}

/** What `onEventSelect` gets back, so the click can route without a lookup. */
export interface SlotMeta {
  classSlug: string
  className: string
  trainerLabel: string
  intensity: string
  room: Session['room']
  minutes: number
  time: string
}

const TONE_BY_INTENSITY: Record<string, SchedulerEvent['tone']> = {
  Low: 'success',
  Moderate: 'accent',
  High: 'warning',
  'All out': 'danger',
}

export const WEEK_EVENTS: SchedulerEvent[] = SESSIONS.flatMap((session) => {
  const gymClass = CLASS_BY_SLUG.get(session.classSlug)
  if (!gymClass) return []

  const start = at(session.time)
  const meta: SlotMeta = {
    classSlug: gymClass.slug,
    className: gymClass.name,
    trainerLabel: trainerName(session.trainerId ?? gymClass.trainerId),
    intensity: gymClass.intensity,
    room: session.room,
    minutes: gymClass.minutes,
    time: session.time,
  }

  return [
    {
      id: session.id,
      resourceId: String(session.day),
      title: gymClass.name,
      start,
      end: start + gymClass.minutes * MINUTE,
      tone: TONE_BY_INTENSITY[gymClass.intensity] ?? 'default',
      meta,
    } satisfies SchedulerEvent,
  ]
})

/**
 * The next Summer Challenge intake: the first Monday of next month.
 *
 * Derived rather than hard-coded so the countdown on the homepage never expires
 * into a template that reads "0 days" for whoever clones this next year.
 */
export function nextChallengeStart(from: Date = new Date()): Date {
  const year = from.getUTCFullYear()
  const month = from.getUTCMonth()
  const firstOfNext = new Date(Date.UTC(year, month + 1, 1, 6, 0, 0))
  const shift = (8 - firstOfNext.getUTCDay()) % 7
  firstOfNext.setUTCDate(firstOfNext.getUTCDate() + shift)
  return firstOfNext
}

export function formatChallengeDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  })
}
