import { createSelector } from '@ngrx/store';

import { scheduleFeature } from './schedule.reducer';
import { stopsAdapter } from './schedule.state';

const {
  selectStops,
  selectSelectedStopId,
  selectSelectedDayTypeName,
  selectSelectedDirectionName,
} = scheduleFeature;

const stopsSelectors = stopsAdapter.getSelectors(selectStops);

export const selectAllScheduleStops = stopsSelectors.selectAll;
const selectAllStops = stopsSelectors.selectAll;

export const selectSelectedStop = createSelector(
  selectStops,
  selectSelectedStopId,
  (stops, selectedId) => (selectedId ? stops.entities[selectedId] : null),
);

export const selectAvailableDirections = createSelector(
  selectSelectedStop,
  (selectedStop) => selectedStop?.availableDirections ?? [],
);

export const selectTimetableLoading = scheduleFeature.selectTimetableLoading;
export const selectStopsLoading = scheduleFeature.selectStopsLoading;
export const selectDayTypes = scheduleFeature.selectDayTypes;
export const selectDirections = scheduleFeature.selectDirections;
export const selectCurrentTimetable = scheduleFeature.selectCurrentTimetable;
export const selectSelectedDayType = selectSelectedDayTypeName;
export const selectSelectedDirection = selectSelectedDirectionName;

export const selectScheduleViewModel = createSelector(
  selectAllStops,
  selectSelectedStop,
  selectDayTypes,
  selectDirections,
  selectAvailableDirections,
  selectSelectedDayType,
  selectSelectedDirection,
  selectCurrentTimetable,
  selectStopsLoading,
  selectTimetableLoading,
  (
    stops,
    selectedStop,
    dayTypes,
    directions,
    availableDirections,
    selectedDayTypeName,
    selectedDirectionName,
    currentTimetable,
    stopsLoading,
    timetableLoading
  ) => ({
    stops,
    selectedStop,
    dayTypes,
    directions,
    availableDirections,
    selectedDayTypeName,
    selectedDirectionName,
    currentTimetable,
    stopsLoading,
    timetableLoading,
  })
);
