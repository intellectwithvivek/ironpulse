import Link from 'next/link'
import { Button, EmptyState, Section, Stack } from '@the_viveksingh/vivek-ui'

export default function NotFound() {
  return (
    <Section size="lg" padding="xl" align="center">
      <span className="ip-rep__num" aria-hidden="true">
        404
      </span>
      <EmptyState
        headingLevel={1}
        size="lg"
        title="No such session"
        description="That page is not on the timetable. The classes, the coaches and the sign-up are all still where you left them."
        actions={
          <Stack direction="horizontal" gap={3} wrap justify="center">
            <Button asChild>
              <Link href="/">Back to the homepage</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/classes">See the classes</Link>
            </Button>
          </Stack>
        }
      />
    </Section>
  )
}
