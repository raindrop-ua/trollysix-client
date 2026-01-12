import { DirectionName } from '@features/schedule/data-access/models/direction.model';
import { Weather } from '@features/schedule/data-access/models/weather.model';

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
