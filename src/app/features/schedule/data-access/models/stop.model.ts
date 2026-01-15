import { DirectionName } from './direction.model';
import { Weather } from './weather.model';

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
  availableDirections: DirectionName[];
  imageUrl: string;
  sharedRoutes: string[];
  geo?: {
    lat: number;
    lon: number;
  };
  weather?: Weather;
}
