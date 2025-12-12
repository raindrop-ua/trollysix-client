export const COPY = {
  common: {
    viewSchedule: 'View Schedule',
    learnMore: 'Learn More',
    whyDifferent: 'Why it’s different',
  },

  home: {
    title: 'Ultimate Schedule for Trolleybus Route 6',
    subtitle: 'Timetable for trolleybus route in the city of Dnipro.',
  },

  about: {
    generalDescription: [
      'The route connects the charming residential area of Pridniprovsky, locally referred to simply as Pridniprovsk, with the city center.',
      'On weekdays, 8 vehicles operate on the route, while on weekends, this number is reduced to 4. The route is served by two trolleybus depots, with 4 vehicles from each depot on weekdays and 2 from each depot on weekends.',
      'Due to the specifics of the route, as a portion of it lacks overhead contact wires, only a limited number of vehicles capable of autonomous operation over long distances can serve this route.',
    ],
  },

  errors: {
    notFound: {
      title: 'Page not found',
      description: 'The page you are looking for does not exist.',
      action: 'Go to home',
    },
  },

  legal: {
    privacyPolicy: {
      title: 'Privacy Policy',
      intro: 'This application does not collect or store personal data.',
    },
  },
} as const;
