import { createFeature, createReducer, on } from '@ngrx/store';

import { ScheduleApiActions, SchedulePageActions } from './schedule.actions';
import { initialState, stopsAdapter } from './schedule.state';
import {
  pickValidDayTypeName,
  pickValidDirectionName,
  pickValidStopId,
} from './schedule.utils';

export const scheduleFeature = createFeature({
  name: 'schedule',
  reducer: createReducer(
    initialState,

    on(SchedulePageActions.enter, (state) =>
      state.initialDataLoaded
        ? state
        : {
            ...state,
            stopsLoading: true,
            error: null,
          },
    ),

    on(SchedulePageActions.hydrateFromUrl, (state, payload) => ({
      ...state,
      pendingUrlSelection: payload,
    })),

    on(
      ScheduleApiActions.loadInitialDataSuccess,
      (state, { stops, dayTypes, directions, autoSelectedDayTypeName }) => {
        const pending = state.pendingUrlSelection;

        const urlStopId = pickValidStopId(stops, pending?.stopId ?? null);
        const urlDayType = pickValidDayTypeName(
          dayTypes,
          pending?.dayTypeName ?? null,
        );
        const urlDirection = pickValidDirectionName(
          pending?.directionName ?? null,
        );

        const nextSelectedStopId =
          urlStopId ?? state.selectedStopId ?? stops[0]?.id ?? null;

        const nextSelectedDayTypeName =
          urlDayType ??
          state.selectedDayTypeName ??
          autoSelectedDayTypeName ??
          null;

        const nextSelectedDirectionName =
          urlDirection ?? state.selectedDirectionName ?? 'forward';

        return {
          ...state,
          stops: stopsAdapter.setAll(stops, state.stops),
          dayTypes,
          directions,
          stopsLoading: false,
          selectedStopId: nextSelectedStopId,
          selectedDayTypeName: nextSelectedDayTypeName,
          selectedDirectionName: nextSelectedDirectionName,
          error: null,
          initialDataLoaded: true,
          pendingUrlSelection: null,
        };
      },
    ),

    on(ScheduleApiActions.loadInitialDataFailure, (state, { error }) => ({
      ...state,
      stopsLoading: false,
      error,
      initialDataLoaded: false,
    })),

    on(SchedulePageActions.selectStop, (state, { stopId }) =>
      state.selectedStopId === stopId
        ? state
        : {
            ...state,
            selectedStopId: stopId,
          },
    ),
    on(SchedulePageActions.selectDayType, (state, { dayTypeName }) => ({
      ...state,
      selectedDayTypeName: dayTypeName,
    })),
    on(SchedulePageActions.selectDirection, (state, { directionName }) => ({
      ...state,
      selectedDirectionName: directionName,
    })),

    on(SchedulePageActions.setShowRunNumbers, (state, { show }) => ({
      ...state,
      showRunNumbers: show,
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
    })),
  ),
});
