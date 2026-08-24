import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

/**
 * The favicon: a rose square with the club's initials.
 *
 * Generated rather than shipped as a binary so the mark stays in step with the
 * accent token — change the rose in one place and the tab icon follows.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ff4d6d',
          color: '#140308',
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -1,
          fontFamily: 'sans-serif',
          borderRadius: 14,
        }}
      >
        IP
      </div>
    ),
    size,
  )
}
