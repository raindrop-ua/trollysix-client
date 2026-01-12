import { DayTypeName } from '@features/schedule/data-access/models/daytype.model';
import { DirectionName } from '@features/schedule/data-access/models/direction.model';

export interface TimeEntity {
  time: string;
  scheduleNumber: number | null;
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
