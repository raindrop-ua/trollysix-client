import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Stop } from '../models/stop.model';
import { Direction, DirectionName } from '../models/direction.model';
import { DayType } from '../models/daytype.model';
import { Timetable } from '../models/timetable.model';

export const SchedulePageActions = createActionGroup({
  source: 'Schedule Page',
  events: {
    Enter: emptyProps(),
    'Select Stop': props<{ stopId: string }>(),
    'Select Day Type': props<{ dayTypeName: string }>(),
    'Select Direction': props<{ directionName: DirectionName }>(),
  },
});

export const ScheduleApiActions = createActionGroup({
  source: 'Schedule API',
  events: {
    'Load Initial Data Success': props<{
      stops: Stop[];
      dayTypes: DayType[];
      directions: Direction[];
    }>(),
    'Load Initial Data Failure': props<{ error: string }>(),
    'Load Timetable': emptyProps(),
    'Load Timetable Success': props<{ timetable: Timetable }>(),
    'Load Timetable Failure': props<{ error: string }>(),
  },
});
