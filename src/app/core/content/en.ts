export const COPY = {
  common: {
    viewSchedule: 'View Schedule',
    learnMore: 'Learn More',
    whyDifferent: 'Why it’s different',
    openMainMenu: 'Open main menu',
    mainMenu: 'Main menu',
    settings: 'Settings',
    toggleTheme: 'Toggle theme',
    toggleFontSize: 'Toggle font size',
    useNormalFontSize: 'Use normal font size',
    useLargeFontSize: 'Use large font size',
    brand: {
      first: 'Trolly',
      second: 'Six',
    },
    themeLabelPrefix: 'Theme:',
    themeToggleHint: 'click to toggle',
    navigation: {
      home: 'Home',
      schedule: 'Schedule',
      about: 'About',
    },
  },

  home: {
    title: 'Ultimate Schedule for Trolleybus Route 6',
    subtitle: 'Timetable for trolleybus route in the city of Dnipro.',
    masthead: {
      titleMain: 'Ultimate Schedule',
      titleFor: 'for Trolleybus',
      titleRoute: 'Route 6',
    },
    works: {
      title: 'It just works.',
      description:
        'No instructions. No chaos. Open it and see everything you need. Less touching, more control.',
    },
    precision: {
      title: 'Designed with the precision',
      description:
        'Every departure, every arrival — perfectly organized. Because your time deserves nothing less than perfection.',
    },
    readyForRouteSix: {
      title: 'Route 6 — Ready?',
    },
    bigClaims: {
      title: 'Everything you need to catch Route 6.',
      subtitle: 'And nothing you don’t.',
      description: 'Find, choose, go. It is your pocket dispatcher, always at hand.',
    },
    thisIsTrollySix: {
      titleBeforeBrand: 'This is not just public transport.',
      titleAfterBreak: 'This is Trolly',
      titleBrandSuffix: 'Six',
      description:
        'Experience the future of urban mobility — crafted for the people who demand more.',
      valueProps: [
        {
          title: 'Precision, by default',
          description:
            'Precise time, neat statuses: missed, next, upcoming. Everything to get there on time - no surprises.',
        },
        {
          title: 'Designed to disappear',
          description:
            "An interface that doesn't distract. Focus only on the route - because time is the most precious thing.",
        },
        {
          title: 'Built for today',
          description:
            "Mobile first, lightweight, fast. Works like it's the only thing you need.",
        },
      ],
    },
    testimonials: {
      title: 'Loved by everyday riders',
      subtitle: 'No advertising. No noise. Just what helps you get things done.',
    },
  },

  schedule: {
    header: {
      title: 'Schedule',
    },
    selectStop: 'Select stop',
    scheduleValidFrom: 'Schedule valid from',
    stop: 'Stop',
    stopSelected: 'Selected',
    stopDetails: 'Stop details',
    controlDay: 'Day',
    controlDirection: 'Direction',
    noDepartures: 'No departures',
    noDeparturesFound: 'No departures found.',
    noDeparturesFoundNote:
      'This stop may not have any departures in the selected direction. Please try choosing the opposite direction.',
    departuresCountSuffix: 'departures',
    stopToolbar: {
      findClosestStop: 'Find closest stop',
      findClosestStopTooltip: 'Find closest stop based on your location',
      share: 'Share',
    },
    departureTimeBar: {
      in: 'in',
      min: 'min',
      nextDepartureSr: 'Next departure:',
      loading: 'Loading...',
      tomorrow: 'Tomorrow',
    },
    departureLegend: {
      laterToday: 'Later today',
      soon: 'Soon',
      departing: 'Departing',
      departed: 'Departed',
      canceled: 'Canceled',
      soonTooltip: '≤ 15 min',
      departingTooltip: '≤ 5 min',
    },
    departureConfig: {
      showScheduleNumber: 'Show schedule number',
    },
    sharedRoutes: {
      title: 'Shared routes',
      noSharedRoutes: 'No shared routes',
    },
    weather: {
      title: 'Weather',
      feelsLike: 'Feels like',
      pressure: 'Pressure',
      humidity: 'Humidity',
      wind: 'Wind',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      gust: 'gust',
      mps: 'm/s',
      hpa: 'hPa',
    },
    geoBadge: {
      openInGoogleMaps: 'Open in Google Maps',
    },
  },

  about: {
    header: {
      title: 'About Route 6',
      subtitle:
        'A concise story of a unique trolleybus line — connecting neighborhoods with the city heart.',
    },
    generalDescription: [
      'The route connects the charming residential area of Pridniprovsky, locally referred to simply as Pridniprovsk, with the city center.',
      `On September 12, 2020 — City Day — trolleybus route No. 6 was launched.`,
      `Descending from Dmytro Yavornytskyi Avenue, the trolleybus runs along Naberezhna Peremohy without entering residential neighborhoods, heading toward the Southern Bridge. After crossing the bridge, it continues along Havanska St., passing the Pridniprovska Thermal Power Plant.
The route then proceeds along Elektrychna St., Kolska St., and 20 Years of Victory St., terminating at the loop near the district administration building.`,
      `With the launch of this trolleybus route, electric public transport finally reached Pridniprovsk, which previously could only be accessed by buses or minibuses.`,
      'The route is operated by AKSM 321D trolleybuses equipped with supercapacitor-based autonomous running capability. A charging substation for battery recharging was built at the Pridniprovsk terminal stop.',
      'On weekdays, 6 vehicles operate on the route, while on weekends, this number is reduced to 4. The route is served by two trolleybus depots, with 3 vehicles from each depot on weekdays and 2 from each depot on weekends.',
    ],
    infrastructure: {
      rollingStock: 'Rolling stock',
      vehiclesOnRouteSix: 'Vehicles currently operating on Route 6',
      primaryModel: 'Primary model',
      operation: 'Operation',
      media: 'Media',
      modelName: 'AKSM 321D',
      modelDescription:
        'Capable of extended autonomous operation — suitable for the wire-free segment of the route.',
      weekdays: 'Weekdays:',
      weekends: 'Weekends:',
      servedBy: 'Served by',
      depotsBalancedAllocation: 'depots (balanced allocation)',
      vehicles: 'vehicles',
      stopPhotoAlt: 'Stop photo',
    },
    metrics: [
      {
        title: '6 -> 4',
        description: 'vehicles: weekdays -> weekends',
      },
      {
        title: '2',
        description: 'trolleybus depots',
      },
      {
        title: 'Autonomous',
        description: 'segment without overhead wires',
      },
    ],
    fullListOfStops: {
      title: 'List of stops of the route',
      forwardDirection: 'Forward direction',
      backwardDirection: 'Backward direction',
    },
    stopsListItem: {
      onDemand: 'On demand',
      scheduled: 'Scheduled',
      scheduledIn: 'Scheduled in',
      appName: 'TrollySix',
    },
  },

  routeNote: {
    title:
      'Schedule changes may occur due to unforeseen situations along the route.',
    subtitle: 'Thank you for riding the trolleybus!',
  },

  errors: {
    notFound: {
      title: 'Page not found',
      description: 'The page you are looking for does not exist.',
      action: 'Go to home',
      subtitle: 'The link may be outdated, or the page may have been moved.',
      actionOpenSchedule: 'Open Schedule',
    },
  },

  legal: {
    privacyPolicy: {
      title: 'Privacy Policy',
      effectiveDate: 'Effective date: 25.02.2026',
      sections: {
        introduction: '1. Introduction',
        informationCollected: '2. Information We Collect',
        cookies: '3. Cookies',
        thirdParty: '4. Third-Party Services',
        dataSecurity: '5. Data Security',
        childrenPrivacy: "6. Children's Privacy",
        changes: '7. Changes to This Policy',
        contact: '8. Contact',
      },
      lines: {
        welcome: 'Welcome to TrollySix.',
        intro1:
          'Your privacy is important. This Privacy Policy explains what information is collected (spoiler: almost none), how it is used, and what rights you have when using this website.',
        collect1:
          'TrollySix does not collect, store, process, or share any personal data.',
        specifically: 'Specifically:',
        cookie1:
          'TrollySix uses a single local storage or cookie entry strictly for storing your selected theme preference (e.g., light or dark mode).',
        cookiePreference: 'This preference:',
        cookie2:
          'You may clear this preference at any time by clearing your browser storage.',
        thirdParty1:
          'TrollySix does not integrate with third-party analytics, advertising networks, or tracking services.',
        thirdParty2:
          'If the hosting provider automatically logs technical server data (such as standard access logs), this is outside the control of TrollySix and is handled according to the hosting provider’s policies.',
        dataSecurity1:
          'Since TrollySix does not collect personal data, there is no personal data to store, protect, or share.',
        children1:
          'TrollySix does not target or knowingly collect information from children or any specific age group.',
        changes1:
          'This Privacy Policy may be updated if the functionality of TrollySix changes in the future.',
        changes2:
          'If data collection practices change, this document will be updated accordingly.',
        contact1:
          'If you have any questions regarding this Privacy Policy, you may contact the project owner at:',
      },
      lists: {
        collect: [
          'No user registration',
          'No login system',
          'No analytics tracking',
          'No advertising trackers',
          'No personal data collection',
          'No IP address logging',
          'No behavioral tracking',
          'No third-party analytics tools',
        ],
        cookie: [
          'Is stored locally in your browser',
          'Is not transmitted to any server',
          'Is not used for tracking',
          'Contains no personal data',
        ],
      },
      email: 'contacts@trolly6.com',
    },
    termsOfUse: {
      title: 'Terms of Use',
      effectiveDate: 'Effective date: 25.02.2026',
      sections: {
        acceptance: '1. Acceptance of Terms',
        serviceDescription: '2. Service Description',
        accuracy: '3. No Guarantee of Accuracy',
        noAccounts: '4. No User Accounts',
        intellectualProperty: '5. Intellectual Property',
        liability: '6. Limitation of Liability',
        modifications: '7. Modifications',
        governingLaw: '8. Governing Law',
      },
      lines: {
        acceptance1:
          'By accessing and using TrollySix, you agree to these Terms of Use.',
        acceptance2: 'If you do not agree, please discontinue use of the website.',
        service1:
          'TrollySix is an informational project that provides publicly available trolleybus schedule information.',
        service2: 'The website is provided "as is" for informational purposes only.',
        accuracy1:
          'While efforts are made to keep the information accurate and up to date:',
        accuracy2:
          'TrollySix is not responsible for missed transport, delays, or any consequences resulting from reliance on the information provided.',
        accuracy3: 'Always verify official transport updates when necessary.',
        noAccounts1:
          'TrollySix does not provide user accounts, registration, or user-generated content features.',
        ip1:
          'All content, design, code, and branding of TrollySix are the intellectual property of the project owner unless otherwise stated.',
        youMay: 'You may:',
        youMayNot: 'You may not:',
        liability1: 'TrollySix is provided without warranties of any kind.',
        liability2: 'The project owner shall not be liable for:',
        modifications1:
          'These Terms may be updated at any time. Continued use of the website constitutes acceptance of the updated Terms.',
        governingLaw1:
          'These Terms shall be governed by the applicable laws of the country of residence of the project owner, unless otherwise required by applicable law.',
      },
      lists: {
        accuracy: [
          'Schedule information may change',
          'Delays or operational changes may occur',
          'The website may contain inaccuracies',
        ],
        youMay: ['View the website', 'Share links to it'],
        youMayNot: [
          'Copy or redistribute content for commercial purposes without permission',
        ],
        liability: [
          'Service interruptions',
          'Technical errors',
          'Inaccurate schedule data',
          'Any direct or indirect damages arising from use of the website',
        ],
      },
    },
  },

  footer: {
    rightsReserved: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
  },
} as const;
