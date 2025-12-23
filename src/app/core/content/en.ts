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
      `On September 12, 2020 — City Day — trolleybus route No. 6 “Soborna Square - Pridniprovsk Residential Area” was launched.`,
      `Descending from Dmytro Yavornytskyi Avenue, the trolleybus runs along Naberezhna Peremohy without entering residential neighborhoods, heading toward the Southern Bridge. After crossing the bridge, it continues along Havanska Street, passing the Pridniprovska Thermal Power Plant.
The route then proceeds along Elektrychna St., Kolska St., and 20 Years of Victory St., terminating at the loop near the district administration building.`,
      `With the launch of this trolleybus route, electric public transport finally reached Pridniprovsk, which previously could only be accessed by buses or minibuses.`,
      'The route is operated by AKSM 321D trolleybuses equipped with supercapacitor-based autonomous running capability. A charging substation for battery recharging was built at the Pridniprovsk terminal stop.',
      'On weekdays, 8 vehicles operate on the route, while on weekends, this number is reduced to 4. The route is served by two trolleybus depots, with 4 vehicles from each depot on weekdays and 2 from each depot on weekends.',
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
