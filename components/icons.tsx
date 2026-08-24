/**
 * Hand-rolled inline SVG. A whole icon package for eleven glyphs would undo the
 * point of a zero-dependency stack, and these are all `aria-hidden` — the
 * accessible name always comes from the control that holds them.
 */

type IconProps = { size?: number }

function Svg({ size = 18, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function XIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 4l7.2 8.6L4.4 20" />
      <path d="M20 4l-7.2 8.6L19.6 20" />
      <path d="M4 4h3.2M16.8 20H20" />
    </Svg>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </Svg>
  )
}

/** The GitHub mark. Filled, so it needs its own svg rather than the stroked Svg above. */
export function GitHubIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-2.92-.88-2.92-2.9 0-.86.31-1.56.82-2.11-.07-.2-.36-1 .08-2.08 0 0 .61-.19 2.01.75a6.9 6.9 0 0 1 1.82-.25c.62 0 1.24.08 1.82.25 1.4-.95 2.01-.75 2.01-.75.44 1.08.15 1.88.08 2.08.51.55.82 1.25.82 2.11 0 2.03-1.15 2.7-2.93 2.9.3.26.56.76.56 1.54 0 1.11-.01 2.01-.01 2.29 0 .21.15.46.55.38A7.99 7.99 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export function TerminalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.75" y="3.75" width="18.5" height="16.5" rx="2.5" />
      <path d="M6.5 9.5l2.5 2.5-2.5 2.5M11.5 15h5" />
    </Svg>
  )
}

export function ResetIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
      <path d="M3 4.5V10h5.5" />
    </Svg>
  )
}

/* --- Programme glyphs. Decorative by FeatureGrid's contract. --- */

export function BarbellIcon(props: IconProps) {
  return (
    <Svg {...props} size={props.size ?? 24}>
      <path d="M8 12h8" />
      <path d="M6.5 8.5v7M17.5 8.5v7" />
      <path d="M4 10v4M20 10v4" />
    </Svg>
  )
}

export function BoltIcon(props: IconProps) {
  return (
    <Svg {...props} size={props.size ?? 24}>
      <path d="M13.5 3L5.5 13.5H11l-1 7.5 8-11H12.5z" />
    </Svg>
  )
}

export function LotusIcon(props: IconProps) {
  return (
    <Svg {...props} size={props.size ?? 24}>
      <path d="M12 20c-4 0-7.5-2.4-8.5-5.5 2 0 3.6.7 4.8 1.8" />
      <path d="M12 20c4 0 7.5-2.4 8.5-5.5-2 0-3.6.7-4.8 1.8" />
      <path d="M12 20c-2.5-2.2-4-5-4-8 0-2.6 1.5-5.2 4-7 2.5 1.8 4 4.4 4 7 0 3-1.5 5.8-4 8z" />
    </Svg>
  )
}

export function RingsIcon(props: IconProps) {
  return (
    <Svg {...props} size={props.size ?? 24}>
      <circle cx="8" cy="15.5" r="4.5" />
      <circle cx="16" cy="15.5" r="4.5" />
      <path d="M8 11V4M16 11V4" />
    </Svg>
  )
}

export function GloveIcon(props: IconProps) {
  return (
    <Svg {...props} size={props.size ?? 24}>
      <path d="M6.5 10.5a5.5 5.5 0 0 1 11 0v3a3.5 3.5 0 0 1-3.5 3.5h-4A3.5 3.5 0 0 1 6.5 13.5z" />
      <path d="M6.5 12H5a1.75 1.75 0 0 1 0-3.5h1.5" />
      <path d="M9 17v2.5h6V17" />
    </Svg>
  )
}

export function StretchIcon(props: IconProps) {
  return (
    <Svg {...props} size={props.size ?? 24}>
      <circle cx="12" cy="5" r="2.25" />
      <path d="M12 7.25v5.5" />
      <path d="M12 12.75L7.5 20M12 12.75L16.5 20" />
      <path d="M5.5 10.5l6.5 1 6.5-1" />
    </Svg>
  )
}
