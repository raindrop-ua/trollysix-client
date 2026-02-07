import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { DayType } from '../models/daytype.model';
import { Direction, DirectionName } from '../models/direction.model';
import { Stop } from '../models/stop.model';
import { Timetable } from '../models/timetable.model';

export const stopsAdapter = createEntityAdapter<Stop>();

export interface ScheduleState {
  stops: EntityState<Stop>;
  dayTypes: DayType[];
  directions: Direction[];
  currentTimetable: Timetable | null;
  selectedStopId: string | null;
  selectedDayTypeName: string | null;
  selectedDirectionName: DirectionName | null;
  showRunNumbers: boolean;
  stopsLoading: boolean;
  timetableLoading: boolean;
  error: string | null;
  initialDataLoaded: boolean;
  pendingUrlSelection: {
    stopId: string | null;
    dayTypeName: string | null;
    directionName: DirectionName | null;
  } | null;
}

export const initialState: ScheduleState = {
  stops: stopsAdapter.getInitialState(),
  dayTypes: [],
  directions: [],
  currentTimetable: null,
  selectedStopId: null,
  selectedDayTypeName: null,
  selectedDirectionName: 'forward',
  showRunNumbers: false,
  stopsLoading: false,
  timetableLoading: false,
  error: null,
  initialDataLoaded: false,
  pendingUrlSelection: null,
};
