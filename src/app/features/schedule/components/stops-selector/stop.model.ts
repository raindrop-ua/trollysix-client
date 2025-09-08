type Directions = 'forward' | 'backward';

export interface Stop {
  id: string;
  name: string;
  description: string;
  firstDeparture: string;
  lastDeparture: string;
  style: number;
  availableDirections: Directions[];
}
