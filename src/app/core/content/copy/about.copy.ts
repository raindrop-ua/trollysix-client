export const aboutCopy = {
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
    rollingStock: 'Vehicle fleet',
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
    vehicleFeatures: [
      {
        name: 'Accessibility',
        ariaLabel: 'Accessibility',
      },
      {
        name: 'Onboard Announcement System',
        ariaLabel: 'Onboard Announcement System',
      },
      {
        name: 'Autonomous Operation',
        ariaLabel: 'Autonomous Operation',
      },
    ],
  },
  metrics: [
    {
      title: '6 → 4',
      description: 'vehicles: weekdays → weekends',
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
} as const;
