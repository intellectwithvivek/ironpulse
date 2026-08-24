import type { ReactNode } from 'react'
import { Heading } from '@the_viveksingh/vivek-ui'

interface RepMarkerProps {
  /** Two digits, e.g. `"04"`. Decorative — hidden from assistive technology. */
  number: string
  /** The section's own heading text. This is what a screen reader reads. */
  label: ReactNode
  note?: ReactNode
  /** Level of the heading this marker introduces. Defaults to `2`. */
  headingLevel?: 2 | 3
  id?: string
}

/**
 * The house section marker: an oversized outlined numeral, then the words.
 *
 * The numbering is the brand here — sets and reps — so it earns real estate
 * rather than sitting in a corner as decoration. It is also `aria-hidden`: the
 * ordinal is a visual device, and "zero four, Programmes" is a worse heading
 * than "Programmes".
 */
export function RepMarker({ number, label, note, headingLevel = 2, id }: RepMarkerProps) {
  return (
    <div className="ip-rep">
      <span className="ip-rep__num" aria-hidden="true">
        {number}
      </span>
      <div className="ip-rep__words">
        <Heading level={headingLevel} className="ip-rep__label" id={id}>
          {label}
        </Heading>
        {note ? <p className="ip-rep__note">{note}</p> : null}
      </div>
    </div>
  )
}
