'use client'

import { useState } from 'react'
import NextImage, { type ImageProps } from 'next/image'

type PhotoProps = Omit<ImageProps, 'onError' | 'alt'> & {
  /** Required, as on `next/image`. Also becomes the fallback's accessible name. */
  alt: string
  /** Extra classes for the wrapper the fallback replaces. */
  className?: string
}

/**
 * `next/image` that fails gracefully.
 *
 * Every photograph here is hotlinked from Unsplash, Picsum or Pravatar, and
 * `next/image` proxies each one through the optimizer at request time. That is
 * three things that can go wrong outside this codebase: the upstream host can
 * rate-limit, a network or region can block it, and the optimizer's own fetch
 * can time out. `next/image` has no fallback of its own, so any of those
 * produces the browser's broken-image icon with the alt text sprawled across
 * the layout — which is the single worst-looking failure a marketing page has,
 * and it is exactly what a developer cloning this template on a flaky
 * connection will see.
 *
 * So a failure renders a deliberate panel instead: house surface colour, a
 * muted glyph, and the alt text kept in the accessibility tree via
 * `role="img"` + `aria-label`, so nothing is lost for a screen reader. It reads
 * as a design decision rather than a bug.
 *
 * A client component by necessity — knowing an image failed requires a
 * listener, and there is no way around that.
 */
export function Photo({ alt, className, style, fill, ...rest }: PhotoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={['ip-photo-fallback', fill ? 'ip-photo-fallback--fill' : '', className]
          .filter(Boolean)
          .join(' ')}
        style={style}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M8 12h8" />
          <path d="M6.5 8.5v7M17.5 8.5v7" />
          <path d="M4 10v4M20 10v4" />
        </svg>
      </span>
    )
  }

  return (
    <NextImage
      alt={alt}
      className={className}
      style={style}
      fill={fill}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
