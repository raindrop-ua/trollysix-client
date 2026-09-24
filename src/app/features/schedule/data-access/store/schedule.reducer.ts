import { createFeature, createReducer, on } from '@ngrx/store';

import { ScheduleApiActions, SchedulePageActions } from './schedule.actions';
import { initialState, ScheduleState, stopsAdapter } from './schedule.state';
import {
  parseDepartureTime,
  timetableSelectionKey,
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

    on(SchedulePageActions.hydrateFromUrl, (state, payload) =>
      state.initialDataLoaded
        ? applyUrlSelection(state, payload)
        : { ...state, pendingUrlSelection: payload },
    ),

    on(
      ScheduleApiActions.loadInitialDataSuccess,
      (state, { stops, dayTypes, directions, autoSelectedDayTypeName }) =>
        applyUrlSelection(
          {
            ...state,
            stops: stopsAdapter.setAll(stops, state.stops),
            dayTypes,
            directions,
            stopsLoading: false,
            selectedStopId: state.selectedStopId ?? stops[0]?.id ?? null,
            selectedDayTypeName:
              state.selectedDayTypeName ?? autoSelectedDayTypeName,
            error: null,
            initialDataLoaded: true,
          },
          state.pendingUrlSelection,
        ),
    ),

    on(SchedulePageActions.toggleTime, (state, { time }) => {
      const key = timetableSelectionKey(
        state.selectedStopId,
        state.selectedDayTypeName,
        state.selectedDirectionName,
      );
      const timetable = state.currentTimetable;
      if (
        !key ||
        state.timetableLoading ||
        !timetable ||
        timetableSelectionKey(
          timetable.stopId,
          timetable.dayType,
          timetable.direction,
        ) !== key ||
        !timetable.times.some((departure) => departure.time === time)
      ) {
        return state;
      }
      return {
        ...state,
        selectedTimes: {
          ...state.selectedTimes,
          [key]: state.selectedTimes[key] === time ? null : time,
        },
      };
    }),

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
    on(SchedulePageActions.selectDayType, (state, { dayTypeName }) =>
      state.selectedDayTypeName === dayTypeName
        ? state
        : {
            ...state,
            selectedDayTypeName: dayTypeName,
          },
    ),
    on(SchedulePageActions.selectDirection, (state, { directionName }) =>
      state.selectedDirectionName === directionName
        ? state
        : {
            ...state,
            selectedDirectionName: directionName,
          },
    ),

    on(SchedulePageActions.setShowRunNumbers, (state, { show }) =>
      state.showRunNumbers === show
        ? state
        : {
            ...state,
            showRunNumbers: show,
          },
    ),

    on(ScheduleApiActions.loadTimetable, (state) => ({
      ...state,
      timetableLoading: true,
      currentTimetable: null,
      error: null,
    })),
    on(ScheduleApiActions.loadTimetableSuccess, (state, { timetable }) => {
      const key = timetableSelectionKey(
        timetable.stopId,
        timetable.dayType,
        timetable.direction,
      );
      const selectedTime = key ? state.selectedTimes[key] : null;
      return {
        ...state,
        timetableLoading: false,
        currentTimetable: timetable,
        selectedTimes:
          key &&
          selectedTime &&
          !timetable.times.some((departure) => departure.time === selectedTime)
            ? { ...state.selectedTimes, [key]: null }
            : state.selectedTimes,
      };
    }),
    on(ScheduleApiActions.loadTimetableFailure, (state, { error }) => ({
      ...state,
      timetableLoading: false,
      error,
    })),
  ),
});

function applyUrlSelection(
  state: ScheduleState,
  selection: ScheduleState['pendingUrlSelection'],
): ScheduleState {
  const stops = stopsAdapter.getSelectors().selectAll(state.stops);
  const stopId = pickValidStopId(stops, selection?.stopId ?? null);
  const dayType = pickValidDayTypeName(
    state.dayTypes,
    selection?.dayTypeName ?? null,
  );
  const direction = pickValidDirectionName(selection?.directionName ?? null);
  const key = timetableSelectionKey(stopId, dayType, direction);
  const timetable = state.currentTimetable;
  const time = parseDepartureTime(selection?.time ?? null);
  const hasMatchingTimetable =
    timetable &&
    key ===
      timetableSelectionKey(
        timetable.stopId,
        timetable.dayType,
        timetable.direction,
      );
  const selectedTime =
    hasMatchingTimetable &&
    !timetable.times.some((departure) => departure.time === time)
      ? null
      : time;

  return {
    ...state,
    selectedStopId: stopId ?? state.selectedStopId,
    selectedDayTypeName: dayType ?? state.selectedDayTypeName,
    selectedDirectionName: direction ?? state.selectedDirectionName,
    selectedTimes: key
      ? {
          ...state.selectedTimes,
          [key]: selectedTime,
        }
      : state.selectedTimes,
    pendingUrlSelection: null,
  };
}
