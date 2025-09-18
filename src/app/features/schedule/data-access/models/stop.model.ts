import { Direction } from './direction.model';

export interface Stop {
  id: string;
  name: string;
  description: string;
  firstDeparture: string;
  lastDeparture: string;
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
  };
}
