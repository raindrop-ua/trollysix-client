import { createFeature, createReducer, on } from '@ngrx/store';
import { ScheduleApiActions, SchedulePageActions } from './schedule.actions';
import { initialState, stopsAdapter } from './schedule.state';

export const scheduleFeature = createFeature({
  name: 'schedule',
  reducer: createReducer(
    initialState,

    on(SchedulePageActions.enter, (state) => ({ ...state, stopsLoading: true, error: null })),

    on(ScheduleApiActions.loadInitialDataSuccess, (state, { stops, dayTypes, directions }) => {
      return {
        ...stopsAdapter.setAll(stops, state),
        dayTypes,
        directions,
        stopsLoading: false,
        selectedStopId: stops[0]?.id ?? null,
      };
    }),

    on(ScheduleApiActions.loadInitialDataFailure, (state, { error }) => ({
      ...state,
      stopsLoading: false,
      error,
    })),

    on(SchedulePageActions.selectStop, (state, { stopId }) => ({
      ...state,
      selectedStopId: stopId,
    })),
    on(SchedulePageActions.selectDayType, (state, { dayTypeName }) => ({
      ...state,
      selectedDayTypeName: dayTypeName,
    })),
    on(SchedulePageActions.selectDirection, (state, { directionName }) => ({
      ...state,
      selectedDirectionName: directionName,
    })),

    on(ScheduleApiActions.loadTimetable, (state) => ({
      ...state,
      timetableLoading: true,
      currentTimetable: null,
      error: null,
    })),
    on(ScheduleApiActions.loadTimetableSuccess, (state, { timetable }) => ({
      ...state,
      timetableLoading: false,
      currentTimetable: timetable,
    })),
    on(ScheduleApiActions.loadTimetableFailure, (state, { error }) => ({
      ...state,
      timetableLoading: false,
      error,
    }))
  ),
});
