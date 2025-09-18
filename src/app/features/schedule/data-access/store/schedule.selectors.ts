import { scheduleFeature } from './schedule.reducer';
import { stopsAdapter } from './schedule.state';
import { createSelector } from '@ngrx/store';

const {
  selectStops,
  selectSelectedStopId,
  selectSelectedDayTypeName,
  selectSelectedDirectionName,
  selectCurrentTimetable,
} = scheduleFeature;

const { selectAll: selectAllStops } = stopsAdapter.getSelectors(selectStops);

const selectSelectedStop = createSelector(
  selectStops,
  selectSelectedStopId,
  (stops, selectedId) => (selectedId ? stops.entities[selectedId] : null)
);

const selectAvailableDirections = createSelector(
  selectSelectedStop,
  (selectedStop) => selectedStop?.availableDirections ?? []
);

export const selectScheduleViewModel = createSelector(
  selectAllStops,
  selectSelectedStop,
  scheduleFeature.selectDayTypes,
  scheduleFeature.selectDirections,
  selectAvailableDirections,
  selectSelectedDayTypeName,
  selectSelectedDirectionName,
  selectCurrentTimetable,
  scheduleFeature.selectStopsLoading,
  scheduleFeature.selectTimetableLoading,
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
