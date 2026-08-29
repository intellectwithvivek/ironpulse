import { Avatar, Badge, Card, Heading, Text } from '@the_viveksingh/vivek-ui'
import { BarChart, ProgressRing } from '@the_viveksingh/vivek-ui/charts'
import { CALORIE_DATA, MEMBER_STORY, WEEKLY_GOAL_PERCENT } from '@/data/gym'

/**
 * "Train smarter" — the calories comparison, and the two rings.
 *
 * All three are server-rendered SVG. Horizontal bars because the categories are
 * words, not dates: reading six class names down the left edge beats rotating
 * them under a vertical axis, and `showValues` puts the figure on the bar so the
 * chart is answerable without the axis at all.
 */
export function ChartsBlock() {
  const { workoutsDone, workoutsTarget } = MEMBER_STORY

  return (
    <div className="ip-chartgrid">
      <Card variant="outline" padding="lg">
        <Card.Header>
          <Heading level={3} size="lg" className="ip-display">
            Calories per 45 minutes
          </Heading>
          <Text size="sm" tone="muted">
            Averaged across our members, not measured on you. Useful for choosing
            between two classes; useless as a target.
          </Text>
        </Card.Header>
        <Card.Body>
          <BarChart
            data={CALORIE_DATA}
            horizontal
            showValues
            showAxes
            height={300}
            barRadius={4}
            categoryPadding={0.28}
            title="Average calories burned per 45-minute class"
            description="Six class types compared. HIIT is highest at 520 kcal, Mobility lowest at 150 kcal."
            xLabel="Class"
            yLabel="kcal"
            formatValue={(v) => `${v} kcal`}
          />
        </Card.Body>
      </Card>

      <div style={{ display: 'grid', gap: 'var(--vk-space-6)' }}>
        <Card variant="outline" padding="lg">
          <Card.Body>
            <div className="ip-ringrow">
              <ProgressRing
                value={WEEKLY_GOAL_PERCENT}
                diameter={132}
                thickness={12}
                showValue
                label="Members hitting their weekly goal"
                title="Members hitting their weekly goal"
                description={`${WEEKLY_GOAL_PERCENT} percent of members met the number of sessions they set themselves this week.`}
              />
              <div style={{ minWidth: '11rem', flex: 1 }}>
                <Heading level={3} size="md" className="ip-display">
                  Hitting their goal
                </Heading>
                <Text size="sm" tone="muted">
                  Members who met the session count they set themselves this week.
                  You pick the number when you join, and you can change it whenever.
                </Text>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Member story: the second ring, in the context that gives it meaning. */}
        <Card variant="elevated" padding="lg">
          <Card.Body>
            <div className="ip-ringrow">
              <ProgressRing
                value={workoutsDone}
                max={workoutsTarget}
                diameter={132}
                thickness={12}
                label={`${workoutsDone} of ${workoutsTarget} workouts this week`}
                title={`${workoutsDone} of ${workoutsTarget} workouts this week`}
                description="One session left to hit this week's target."
              >
                <span className="ip-ring-centre">
                  <strong>
                    {workoutsDone}/{workoutsTarget}
                  </strong>
                  <span>this week</span>
                </span>
              </ProgressRing>

              <div style={{ minWidth: '11rem', flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--vk-space-3)',
                    marginBlockEnd: 'var(--vk-space-2)',
                  }}
                >
                  <Avatar src={MEMBER_STORY.avatar} name={MEMBER_STORY.name} size="sm" />
                  <div>
                    <Text size="sm" weight="semibold" style={{ margin: 0 }}>
                      {MEMBER_STORY.name}
                    </Text>
                    <Text size="sm" tone="muted" style={{ margin: 0 }}>
                      Member since {MEMBER_STORY.since}
                    </Text>
                  </div>
                </div>
                <Text size="sm">“{MEMBER_STORY.quote}”</Text>
                <Badge variant="soft" tone="primary" size="sm" pill>
                  One to go
                </Badge>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
