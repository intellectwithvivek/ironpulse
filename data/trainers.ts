export interface Trainer {
  id: string
  name: string
  role: string
  /** Short specialities, rendered as Badges. */
  specialties: string[]
  bio: string
  /** Years coaching, not years training. */
  since: number
  photo: string
  socials: { instagram?: string; x?: string; email?: string }
}

export const TRAINERS: Trainer[] = [
  {
    id: 'rhea',
    name: 'Rhea Anand',
    role: 'Head of strength',
    specialties: ['Powerlifting', 'Return to lifting', 'Programming'],
    bio: 'Coached the club since it was two racks and a rowing machine. Writes every strength block on the timetable and will happily spend a session on your setup alone.',
    since: 2014,
    photo:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=75',
    socials: { instagram: 'https://instagram.com/', email: 'rhea@ironpulse.example' },
  },
  {
    id: 'darius',
    name: 'Darius Fernandes',
    role: 'Conditioning & boxing',
    specialties: ['HIIT', 'Boxing', 'Engine work'],
    bio: 'Ten years in amateur boxing, now mostly teaching people that footwork is the whole sport. Runs the intervals nobody volunteers for twice.',
    since: 2017,
    photo:
      'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=75',
    socials: { instagram: 'https://instagram.com/', x: 'https://x.com/' },
  },
  {
    id: 'meera',
    name: 'Meera Iyer',
    role: 'Yoga & mobility',
    specialties: ['Yoga', 'Mobility', 'Breathwork'],
    bio: 'Came to yoga through a shoulder that would not cooperate. Teaches the warm, unhurried kind, and is the reason half the lifters here can finally reach overhead.',
    since: 2019,
    photo:
      'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=75',
    socials: { instagram: 'https://instagram.com/', email: 'meera@ironpulse.example' },
  },
  {
    id: 'joel',
    name: 'Joel Mathew',
    role: 'CrossFit lead',
    specialties: ['CrossFit', 'Olympic lifts', 'Scaling'],
    bio: 'Believes a scaled workout is the same workout. Scales every session three ways before class so nobody has to ask for the easier version in front of the room.',
    since: 2016,
    photo:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=75',
    socials: { instagram: 'https://instagram.com/', x: 'https://x.com/' },
  },
]

export const TRAINER_BY_ID = new Map(TRAINERS.map((t) => [t.id, t]))

export function trainerName(id: string): string {
  return TRAINER_BY_ID.get(id)?.name ?? 'Coach'
}
