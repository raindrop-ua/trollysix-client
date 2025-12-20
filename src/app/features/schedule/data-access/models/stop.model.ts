export interface Stop {
  id: string;
  name: string;
  description: string;
  departures: {
    forward?: {
      first: string;
      last: string;
    };
    backward?: {
      first: string;
      last: string;
    };
  };
  style: number;
  availableDirections: string[];
  imageUrl: string;
  sharedRoutes: string[];
  geo?: {
    lat: number;
    lon: number;
  };
  weather?: {
    temperature: number;
    description: string;
    icon: string;
    feelsLike: number;
    pressure: number;
    humidity: number;
  };
}
