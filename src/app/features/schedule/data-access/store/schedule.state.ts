import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Stop } from '../models/stop.model';
import { Direction, DirectionName } from '../models/direction.model';
import { Timetable } from '../models/timetable.model';
import { DayType } from '../models/daytype.model';

export const stopsAdapter = createEntityAdapter<Stop>();

export const timetablesAdapter = createEntityAdapter<Timetable>();

export interface ScheduleState {
  stops: EntityState<Stop>;
  dayTypes: DayType[];
  directions: Direction[];
  currentTimetable: Timetable | null;
  selectedStopId: string | null;
  selectedDayTypeName: string | null;
  selectedDirectionName: DirectionName | null;
  showScheduleNumbers: boolean;
  stopsLoading: boolean;
  timetableLoading: boolean;
  error: string | null;
  initialDataLoaded: boolean;
}

export const initialState: ScheduleState = {
  stops: stopsAdapter.getInitialState(),
  dayTypes: [],
  directions: [],
  currentTimetable: null,
  selectedStopId: null,
  selectedDayTypeName: 'weekday',
  selectedDirectionName: 'forward',
  showScheduleNumbers: false,
  stopsLoading: false,
  timetableLoading: false,
  error: null,
  initialDataLoaded: false,
};
