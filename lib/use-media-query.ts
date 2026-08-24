'use client'

import { useCallback, useSyncExternalStore } from 'react'

/**
 * `matchMedia` cache, keyed by query.
 *
 * `getSnapshot` runs on every render, and minting a fresh `MediaQueryList` each
 * time would allocate for no reason.
 */
const lists = new Map<string, MediaQueryList>()

function listFor(query: string): MediaQueryList {
  let list = lists.get(query)
  if (!list) {
    list = window.matchMedia(query)
    lists.set(query, list)
  }
  return list
}

/**
 * Tracks a media query from a client component.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: a media query is
 * an external store, and this is the hook built for subscribing to one. It also
 * takes a *server* snapshot, which is what makes it hydration-safe — the server
 * and the first client render both see `false`, and React re-renders with the
 * real value once hydration is done. (The `useEffect` version of this is also a
 * `react-hooks/set-state-in-effect` lint error, for the same underlying reason.)
 *
 * Callers should therefore read `false` as "the wider, safer layout" rather than
 * as a definite negative.
 *
 * Only reach for this when a component genuinely needs a *prop* to change at a
 * breakpoint — an `orientation`, a column count. Anything CSS can express
 * belongs in CSS, which costs no JavaScript and no second render.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = listFor(query)
      list.addEventListener('change', onStoreChange)
      return () => list.removeEventListener('change', onStoreChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => listFor(query).matches, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
