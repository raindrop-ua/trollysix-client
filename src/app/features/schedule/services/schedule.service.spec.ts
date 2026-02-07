import { Injector } from '@angular/core';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { Store } from '@ngrx/store';
import { firstValueFrom, of, Observable } from 'rxjs';

import { ClockService } from '@core/services/clock.service';

import { Status } from '../data-access/models/departure.model';
import { TimeEntity } from '../data-access/models/timetable.model';
import { SchedulePageActions } from '../data-access/store/schedule.actions';
import { scheduleFeature } from '../data-access/store/schedule.reducer';
import { selectScheduleViewModel } from '../data-access/store/schedule.selectors';

import { ScheduleService } from './schedule.service';

interface ScheduleVM {
  currentTimetable?: { times: TimeEntity[] } | null;
}

interface StoreLike {
  select(selector: unknown): Observable<ScheduleVM>;
  select(selector: unknown): Observable<boolean>;
  dispatch: (action: unknown) => void;
}

describe('ScheduleService (Injector.create)', () => {
  const makeTime = (time: string, runNumber: number): TimeEntity =>
    ({ time, runNumber }) as TimeEntity;

  const makeInjector = (opts: {
    now: Date;
    times: TimeEntity[];
    showNumbers: boolean;
  }) => {
    const clockMock: Pick<ClockService, 'now$'> = {
      now$: of(opts.now),
    };

    const vm$: Observable<ScheduleVM> = of({
      currentTimetable: { times: opts.times },
    });

    const show$: Observable<boolean> = of(opts.showNumbers);

    const dispatch = vi.fn<(action: unknown) => void>();

    function select(selector: unknown): Observable<ScheduleVM>;
    function select(selector: unknown): Observable<boolean>;
    function select(selector: unknown) {
      if (selector === selectScheduleViewModel) return vm$;
      if (selector === scheduleFeature.selectShowScheduleNumbers) return show$;

      return of(undefined);
    }

    const storeMock: StoreLike = { select, dispatch };
    const selectSpy = vi.spyOn(storeMock, 'select');

    const injector = Injector.create({
      providers: [
        { provide: ClockService, useValue: clockMock },
        { provide: Store, useValue: storeMock },
        ScheduleService,
      ],
    });

    return {
      svc: injector.get(ScheduleService),
      mocks: { dispatch, select: selectSpy },
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('departures$ maps statuses correctly', async () => {
    const now = new Date(2026, 0, 11, 10, 0, 0, 0); // 10:00

    const times: TimeEntity[] = [
      makeTime('09:50', 1), // Past
      makeTime('10:00', 2), // Now (0)
      makeTime('10:05', 3), // Now (5)
      makeTime('10:06', 4), // Soon (6)
      makeTime('10:15', 5), // Soon (15)
      makeTime('10:16', 6), // Coming (16)
    ];

    const { svc } = makeInjector({ now, times, showNumbers: false });

    const departures = await firstValueFrom(svc.departures$);

    expect(departures.map((d) => d.status)).toEqual([
      Status.Past,
      Status.Now,
      Status.Now,
      Status.Soon,
      Status.Soon,
      Status.Coming,
    ]);

    expect(departures.map((d) => [d.time, d.runNumber])).toEqual([
      ['09:50', 1],
      ['10:00', 2],
      ['10:05', 3],
      ['10:06', 4],
      ['10:15', 5],
      ['10:16', 6],
    ]);
  });

  it('showScheduleNumbers$ reflects store selector value', async () => {
    const { svc } = makeInjector({
      now: new Date(2026, 0, 11, 10, 0, 0, 0),
      times: [],
      showNumbers: true,
    });

    const value = await firstValueFrom(svc.showScheduleNumbers$);
    expect(value).toBe(true);
  });

  it('setShowScheduleNumbers dispatches action', () => {
    const { svc, mocks } = makeInjector({
      now: new Date(2026, 0, 11, 10, 0, 0, 0),
      times: [],
      showNumbers: false,
    });

    svc.setShowScheduleNumbers(true);

    expect(mocks.dispatch).toHaveBeenCalledWith(
      SchedulePageActions.setShowScheduleNumbers({ show: true }),
    );
  });
});
