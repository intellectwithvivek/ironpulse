'use client'

import { useRouter } from 'next/navigation'
import { Badge, Scheduler, Text } from '@the_viveksingh/vivek-ui'
import type { SchedulerEvent } from '@the_viveksingh/vivek-ui'
import {
  DAY_RESOURCES,
  WEEK_EVENTS,
  WINDOW,
  formatTime,
  type SlotMeta,
} from '@/lib/schedule'
import { INTENSITY_TONE, type Intensity } from '@/data/classes'

const LEGEND: Intensity[] = ['Low', 'Moderate', 'High', 'All out']

/**
 * The weekly timetable — days down the side, opening hours across the top.
 *
 * Read-only: Scheduler reports a selection and nothing else, so choosing a slot
 * routes to the filtered class list rather than mutating anything here.
 */
export function Timetable() {
  const router = useRouter()

  function handleSelect(event: SchedulerEvent) {
    const meta = event.meta as SlotMeta | undefined
    if (meta) router.push(`/classes?type=${meta.classSlug}`)
  }

  return (
    <div className="ip-timetable">
      <Scheduler
        label="IronPulse weekly class timetable, Monday to Sunday"
        resources={DAY_RESOURCES}
        events={WEEK_EVENTS}
        start={WINDOW.start}
        end={WINDOW.end}
        step={60}
        minTickWidth={150}
        formatTime={formatTime}
        onEventSelect={handleSelect}
        renderEvent={(event) => {
          const meta = event.meta as SlotMeta
          return (
            <span className="ip-slot">
              <span className="ip-slot__name">{meta.className}</span>
              <span className="ip-slot__meta">{meta.trainerLabel}</span>
              <Badge size="sm" variant="soft" tone={INTENSITY_TONE[meta.intensity as Intensity]}>
                {meta.intensity}
              </Badge>
            </span>
          )
        }}
      />

      <ul className="ip-legend" style={{ marginBlockStart: 'var(--vk-space-5)' }}>
        <li>
          <Text as="span" size="sm" tone="muted">
            Intensity
          </Text>
        </li>
        {LEGEND.map((level) => (
          <li key={level}>
            <Badge size="sm" variant="soft" tone={INTENSITY_TONE[level]}>
              {level}
            </Badge>
          </li>
        ))}
        <li>
          <Text as="span" size="sm" tone="muted">
            — pick any slot to see that class. Scroll sideways for the evening.
          </Text>
        </li>
      </ul>
    </div>
  )
}
