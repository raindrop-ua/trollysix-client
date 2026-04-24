import { createSelector } from '@ngrx/store';

import { scheduleFeature } from './schedule.reducer';
import { stopsAdapter } from './schedule.state';

const {
  selectStops,
  selectSelectedStopId: selectFeatureSelectedStopId,
  selectSelectedDayTypeName: selectFeatureSelectedDayTypeName,
  selectSelectedDirectionName: selectFeatureSelectedDirectionName,
} = scheduleFeature;

const stopsSelectors = stopsAdapter.getSelectors(selectStops);

export const selectAllScheduleStops = stopsSelectors.selectAll;
const selectAllStops = stopsSelectors.selectAll;

export const selectSelectedStop = createSelector(
  selectStops,
  selectFeatureSelectedStopId,
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
export const selectSelectedStopId = selectFeatureSelectedStopId;
export const selectSelectedDayType = selectFeatureSelectedDayTypeName;
export const selectSelectedDirection = selectFeatureSelectedDirectionName;
export const selectSelectedStopName = createSelector(
  selectSelectedStop,
  (selectedStop) => selectedStop?.name ?? null,
);
export const selectCurrentTimetableTimes = createSelector(
  selectCurrentTimetable,
  (timetable) => timetable?.times ?? [],
);
export const selectCurrentTimetableValidFrom = createSelector(
  selectCurrentTimetable,
  (timetable) => timetable?.validFrom ?? null,
);

export const selectIsSelectorsGroupReady = createSelector(
  scheduleFeature.selectInitialDataLoaded,
  selectAllStops,
  selectDayTypes,
  selectDirections,
  selectSelectedStopId,
  selectSelectedDayType,
  selectSelectedDirection,
  (
    initialDataLoaded,
    stops,
    dayTypes,
    directions,
    selectedStopId,
    selectedDayTypeName,
    selectedDirectionName,
  ) =>
    initialDataLoaded &&
    stops.length > 0 &&
    dayTypes.length > 0 &&
    directions.length > 0 &&
    !!selectedStopId &&
    !!selectedDayTypeName &&
    !!selectedDirectionName,
);

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
