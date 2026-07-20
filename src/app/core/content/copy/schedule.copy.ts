export const scheduleCopy = {
  header: {
    title: 'Schedule',
  },
  selectStop: 'Select a stop',
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
    hour: 'hour',
    hours: 'hours',
    minute: 'minute',
    minutes: 'minutes',
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
  vehiclesTracking: {
    title: 'Vehicles on Route 6 now',
    count: 'vehicles',
    speed: 'km/h',
    updatedAt: 'Updated at',
    loading: 'Loading live vehicles...',
    unavailable: 'Live vehicle data is temporarily unavailable.',
  },
  stopRating: 'Stop rating:',
  sharedRoutes: {
    title: 'Shared routes:',
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
  services: {
    share: {
      nothingToShare: 'Nothing to share yet (select stop/day/direction)',
      linkCopied: 'Link copied to clipboard',
      linkCopyFailed: 'Link could not be copied to clipboard',
    },
    closestStop: {
      noStopsWithCoordinatesFound: 'No stops with coordinates found.',
      noStopsWithLocationDataAvailable:
        'No stops with location data are available. Please try again later.',
      failedToFindClosestStop: 'Failed to find closest stop',
      closestStopPrefix: 'Closest stop:',
      stopSelectedByLocation: 'Stop selected by location',
      failedToGetLocation: 'Failed to get location',
    },
    geolocation: {
      notAvailableOnPlatform: 'Geolocation is not available on this platform.',
      apiNotSupportedByBrowser:
        'Geolocation API is not supported by this browser.',
      permissionDeniedByUser: 'Location permission was denied by the user.',
      positionUnavailable: 'Location information is unavailable.',
      timeout: 'Retrieving location took too long.',
      unknownError: 'An unknown geolocation error occurred.',
      allowLocationAccessInBrowserSettings:
        'Please allow location access in your browser settings.',
      unableToDetermineLocation:
        'Unable to determine your location. Try again in a moment.',
      locationRequestTooLong:
        'Location request took too long. Please try again.',
      browserDoesNotSupportGeolocation:
        'Your browser does not support geolocation.',
      somethingWentWrongGettingLocation:
        'Something went wrong while trying to get your location.',
    },
  },
} as const;
