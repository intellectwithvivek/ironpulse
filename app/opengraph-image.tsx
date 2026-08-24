import { ImageResponse } from 'next/og'
import { SITE } from '@/data/site'

export const alt =
  'IronPulse — a free, open-source gym and fitness website template for Next.js, built with VivekUI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The social card, generated at build time.
 *
 * Drawn rather than photographed on purpose: a link preview is read at thumbnail
 * size, where a gym photo turns to mush and the words stop being legible. Flat
 * colour, one oversized numeral to echo the site's own device, and type large
 * enough to survive being shrunk into a chat window.
 *
 * Two constraints Satori imposes, both learned the hard way:
 *
 * 1. **No `-webkit-text-stroke`.** The outlined numeral the site uses in CSS
 *    renders as nothing here, so the "01" is a solid low-opacity fill instead —
 *    the same fallback `globals.css` declares for engines without text-stroke.
 * 2. **No `next/font`.** `ImageResponse` needs real font binaries; the system
 *    stack keeps the build self-contained, so the look comes from weight and
 *    scale rather than from the condensed display face.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#08080a',
          fontFamily: 'sans-serif',
        }}
      >
        {/* The rose edge. A flat bar reads at any size; a soft gradient does not. */}
        <div style={{ display: 'flex', width: 14, background: '#ff4d6d' }} />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '58px 68px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', fontSize: 34, fontWeight: 800, letterSpacing: 1 }}>
              <span style={{ color: '#ffffff' }}>IRON</span>
              <span style={{ color: '#ff4d6d' }}>PULSE</span>
            </div>
            <div
              style={{
                display: 'flex',
                padding: '9px 20px',
                borderRadius: 999,
                border: '1px solid #ff4d6d66',
                color: '#ffabbb',
                fontSize: 21,
                fontWeight: 600,
              }}
            >
              Free · MIT · open source
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            {/* Solid, not outlined — see the note above. */}
            <div
              style={{
                display: 'flex',
                fontSize: 200,
                fontWeight: 800,
                lineHeight: 0.78,
                color: '#ff4d6d',
                opacity: 0.28,
                letterSpacing: -6,
              }}
            >
              01
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 72,
                  fontWeight: 800,
                  lineHeight: 1.02,
                  color: '#ffffff',
                  letterSpacing: -1.5,
                }}
              >
                Gym website template
              </div>
              {/* Kept to one line at this width — a wrapped second line of small
                  grey text is the first thing to become unreadable in a thumbnail. */}
              <div style={{ display: 'flex', fontSize: 30, color: '#bcbcc6', lineHeight: 1.3 }}>
                Next.js 16 · React 19 · timetable, plans, SVG charts
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #2b2b33',
              paddingTop: 26,
            }}
          >
            <div style={{ display: 'flex', fontSize: 25, color: '#8e8e93' }}>
              {SITE.url.replace('https://', '')}
            </div>
            <div style={{ display: 'flex', fontSize: 25, color: '#ffffff', fontWeight: 600 }}>
              Built with VivekUI
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
