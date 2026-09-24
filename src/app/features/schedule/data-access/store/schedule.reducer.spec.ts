import { describe, expect, it } from 'vitest';

import { Timetable } from '../models/timetable.model';

import { ScheduleApiActions, SchedulePageActions } from './schedule.actions';
import { scheduleFeature } from './schedule.reducer';
import { selectSelectedTime } from './schedule.selectors';
import { initialState, ScheduleState } from './schedule.state';

const reduce = scheduleFeature.reducer;
const selectedTime = (state: ScheduleState) =>
  selectSelectedTime({ schedule: state });
const timetable: Timetable = {
  id: 'tt-a',
  name: '',
  stopId: 'a',
  dayType: 'weekday',
  direction: 'backward',
  validFrom: '2026-01-01',
  times: [
    { time: '08:30', runNumber: 1 },
    { time: '09:00', runNumber: 2 },
  ],
};
const loaded = (state: ScheduleState): ScheduleState =>
  reduce(
    state,
    ScheduleApiActions.loadTimetableSuccess({
      timetable: {
        ...timetable,
        stopId: state.selectedStopId!,
        dayType: state.selectedDayTypeName as Timetable['dayType'],
        direction: state.selectedDirectionName!,
      },
    }),
  );
const ready = () =>
  loaded(
    reduce(
      initialState,
      ScheduleApiActions.loadInitialDataSuccess({
        stops: ['a', 'b'].map((id) => ({
          id,
          name: id,
          departures: {},
          style: 1,
          availableDirections: ['forward', 'backward'],
          sharedRoutes: [],
          rating: null,
        })),
        dayTypes: [
          { id: 'weekday', name: 'weekday', label: 'Weekday' },
          { id: 'weekend', name: 'weekend', label: 'Weekend' },
        ],
        directions: [
          { id: 'forward', name: 'forward', label: 'Forward' },
          { id: 'backward', name: 'backward', label: 'Backward' },
        ],
        autoSelectedDayTypeName: 'weekday',
      }),
    ),
  );
const toggle = (state: ScheduleState, time = '08:30') =>
  reduce(state, SchedulePageActions.toggleTime({ time }));
const url = {
  stopId: 'a',
  dayTypeName: 'weekday',
  directionName: 'backward' as const,
  time: '08:30',
};

describe('Schedule departure selection', () => {
  it('toggles a time and replaces the previous selection without mutating state', () => {
    const original = ready();
    const first = toggle(original);
    expect(selectedTime(original)).toBeNull();
    expect(selectedTime(first)).toBe('08:30');
    const second = toggle(first, '09:00');
    expect(selectedTime(second)).toBe('09:00');
    expect(selectedTime(toggle(second, '09:00'))).toBeNull();
  });

  it('keeps independent selections for stops even with identical departures', () => {
    let state = toggle(ready());
    state = loaded(
      reduce(state, SchedulePageActions.selectStop({ stopId: 'b' })),
    );
    expect(selectedTime(state)).toBeNull();
    state = toggle(state, '09:00');
    state = loaded(
      reduce(state, SchedulePageActions.selectStop({ stopId: 'a' })),
    );
    expect(selectedTime(state)).toBe('08:30');
    state = toggle(state);
    state = loaded(
      reduce(state, SchedulePageActions.selectStop({ stopId: 'b' })),
    );
    expect(selectedTime(state)).toBe('09:00');
    state = loaded(
      reduce(state, SchedulePageActions.selectStop({ stopId: 'a' })),
    );
    expect(selectedTime(state)).toBeNull();
  });

  it('isolates day and direction and restores the original selection', () => {
    let state = toggle(ready());
    state = loaded(
      reduce(
        state,
        SchedulePageActions.selectDayType({ dayTypeName: 'weekend' }),
      ),
    );
    expect(selectedTime(state)).toBeNull();
    state = loaded(
      reduce(
        state,
        SchedulePageActions.selectDayType({ dayTypeName: 'weekday' }),
      ),
    );
    expect(selectedTime(state)).toBe('08:30');
    state = loaded(
      reduce(
        state,
        SchedulePageActions.selectDirection({ directionName: 'forward' }),
      ),
    );
    expect(selectedTime(state)).toBeNull();
    state = loaded(
      reduce(
        state,
        SchedulePageActions.selectDirection({ directionName: 'backward' }),
      ),
    );
    expect(selectedTime(state)).toBe('08:30');
  });

  it('hydrates a cold shared link after initial data loads', () => {
    let state = reduce(initialState, SchedulePageActions.hydrateFromUrl(url));
    expect(selectedTime(state)).toBeNull();
    const data = ready();
    state = reduce(
      state,
      ScheduleApiActions.loadInitialDataSuccess({
        stops: Object.values(data.stops.entities).filter((stop) => !!stop),
        dayTypes: data.dayTypes,
        directions: data.directions,
        autoSelectedDayTypeName: 'weekday',
      }),
    );
    expect(selectedTime(loaded(state))).toBe('08:30');
    expect(state.pendingUrlSelection).toBeNull();
  });

  it('honors a shared link when data is already loaded and preserves memory on plain re-entry', () => {
    let state = reduce(
      ready(),
      SchedulePageActions.hydrateFromUrl({ ...url, stopId: 'b' }),
    );
    expect(state.selectedStopId).toBe('b');
    expect(selectedTime(loaded(state))).toBe('08:30');
    state = reduce(
      state,
      SchedulePageActions.hydrateFromUrl({
        stopId: null,
        dayTypeName: null,
        directionName: null,
        time: null,
      }),
    );
    expect(selectedTime(state)).toBe('08:30');
  });

  it('rejects malformed or unscoped URL times and clears missing departures after loading', () => {
    for (const time of ['24:00', '8:30', '08:60', 'garbage']) {
      expect(
        selectedTime(
          reduce(ready(), SchedulePageActions.hydrateFromUrl({ ...url, time })),
        ),
      ).toBeNull();
    }
    expect(
      selectedTime(
        reduce(
          ready(),
          SchedulePageActions.hydrateFromUrl({ ...url, stopId: 'missing' }),
        ),
      ),
    ).toBeNull();
    const state = reduce(
      ready(),
      SchedulePageActions.hydrateFromUrl({ ...url, time: '12:34' }),
    );
    expect(selectedTime(loaded(state))).toBeNull();
  });

  it('ignores stale, unknown, and loading clicks', () => {
    const state = ready();
    expect(toggle(state, '12:34')).toBe(state);
    const switched = reduce(
      state,
      SchedulePageActions.selectStop({ stopId: 'b' }),
    );
    expect(toggle(switched)).toBe(switched);
    const loading = reduce(state, ScheduleApiActions.loadTimetable());
    expect(toggle(loading)).toBe(loading);
  });
});
