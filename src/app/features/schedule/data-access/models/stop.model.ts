import { DayTypeName } from './daytype.model';
import { DirectionName } from './direction.model';
import { Weather } from './weather.model';

export interface DepartureBound {
  first: string;
  last: string;
}

type DeparturesByDirection = Partial<Record<DirectionName, DepartureBound>>;
type DeparturesByDayType = Partial<Record<DayTypeName, DepartureBound>>;

export interface Geo {
  lat: number;
  lon: number;
}

export interface Stop {
  id: string;
  name: string;
  departures:
    | DeparturesByDirection
    | Partial<Record<DayTypeName, DeparturesByDirection>>
    | Partial<Record<DirectionName, DeparturesByDayType>>;
  style: number;
  availableDirections: DirectionName[];
  sharedRoutes: string[];
  rating: number | null;
  geo?: {
    forward?: Geo | null;
    backward?: Geo | null;
  };
  weather?: Weather | null;
}
