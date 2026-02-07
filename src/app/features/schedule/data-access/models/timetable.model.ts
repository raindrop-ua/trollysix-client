import { DayTypeName } from './daytype.model';
import { DirectionName } from './direction.model';

export interface TimeEntity {
  time: string;
  runNumber: number | null;
}

export interface Timetable {
  id: string;
  name: string;
  stopId: string;
  validFrom: string;
  dayType: DayTypeName;
  direction: DirectionName;
  times: TimeEntity[];
}
