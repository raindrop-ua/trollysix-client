import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  auditTime,
  combineLatest,
  concat,
  defer,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  timer,
} from 'rxjs';

import { copy } from '@core/content';
import { ClockService } from '@core/services/clock.service';

import { ScheduleService } from '@features/schedule/application/services/schedule.service';
import {
  Departure,
  Status,
} from '@features/schedule/data-access/models/departure.model';
import {
  selectCurrentTimetable,
  selectTimetableLoading,
} from '@features/schedule/data-access/store/schedule.selectors';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

interface DepartureTimeBarContent {
  readonly timeToNextLabel: string | null;
  readonly label: string;
}

interface DepartureTimeBarViewModel extends DepartureTimeBarContent {
  readonly busy: boolean;
  readonly visible: boolean;
}

interface DepartureTimeBarSource extends DepartureTimeBarContent {
  readonly loading: boolean;
  readonly timetableResolved: boolean;
}

@Component({
  selector: 'trollysix-departure-time-bar',
  imports: [AsyncPipe, DatePipe, SvgIconComponent],
  templateUrl: './departure-time-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureTimeBarComponent {
  private static readonly loadingDelayMs = 300;
  private static readonly minimumLoadingMs = 500;

  public readonly copySchedule = copy('schedule');

  public clockService: ClockService = inject(ClockService);
  private readonly schedule: ScheduleService = inject(ScheduleService);
  public readonly departures$: Observable<Departure[]> =
    this.schedule.departures$;
  private readonly store = inject(Store);
  public readonly timetableLoading$: Observable<boolean> = this.store.select(
    selectTimetableLoading,
  );

  public readonly next$: Observable<Departure | null> = this.departures$.pipe(
    map(
      (list) =>
        list.find((d) => d.status === Status.Now) ??
        list.find(
          (d) => d.status !== Status.Past && d.status !== Status.Canceled,
        ) ??
        null,
    ),
  );

  public readonly minutesToNext$: Observable<number | null> = combineLatest([
    this.next$,
    this.clockService.now$,
  ]).pipe(
    map(([next, now]) => {
      if (!next) return null;

      const diff = Math.floor(
        (next.departureAt.getTime() - now.getTime()) / 60000,
      );
      return diff >= 0 ? diff : null;
    }),
  );

  private readonly source$: Observable<DepartureTimeBarSource> = combineLatest([
    this.next$,
    this.departures$,
    this.minutesToNext$,
    this.timetableLoading$,
    this.store.select(selectCurrentTimetable),
  ]).pipe(
    map(([next, departures, minutesToNext, loading, timetable]) => ({
      loading,
      timetableResolved: timetable !== null,
      timeToNextLabel: this.formatMinutesToNext(minutesToNext),
      label: next?.time
        ? next.time
        : departures.length
          ? this.copySchedule.departureTimeBar.tomorrow
          : this.copySchedule.noDepartures,
    })),
    auditTime(0),
    distinctUntilChanged(
      (previous, current) =>
        previous.loading === current.loading &&
        previous.timetableResolved === current.timetableResolved &&
        previous.timeToNextLabel === current.timeToNextLabel &&
        previous.label === current.label,
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public readonly viewModel$: Observable<DepartureTimeBarViewModel> = defer(
    () => {
      let confirmedContent: DepartureTimeBarContent | null = null;
      let requestStarted = false;
      let loadingShownAt: number | null = null;

      return this.source$.pipe(
        switchMap((source) => {
          if (source.loading) {
            requestStarted = true;

            const loadingContent: DepartureTimeBarContent = {
              timeToNextLabel: null,
              label: this.copySchedule.departureTimeBar.loading,
            };
            const pendingContent: DepartureTimeBarViewModel = confirmedContent
              ? { ...confirmedContent, busy: true, visible: true }
              : { ...loadingContent, busy: true, visible: false };

            return concat(
              of(pendingContent),
              timer(DepartureTimeBarComponent.loadingDelayMs).pipe(
                map(() => {
                  loadingShownAt = Date.now();
                  return { ...loadingContent, busy: true, visible: true };
                }),
              ),
            );
          }

          if (
            !source.timetableResolved &&
            !requestStarted &&
            !confirmedContent
          ) {
            return of({
              timeToNextLabel: null,
              label: this.copySchedule.departureTimeBar.loading,
              busy: false,
              visible: false,
            });
          }

          const nextContent: DepartureTimeBarContent = {
            timeToNextLabel: source.timeToNextLabel,
            label: source.label,
          };
          confirmedContent = nextContent;
          requestStarted = false;

          const remainingLoadingMs = loadingShownAt
            ? Math.max(
                0,
                DepartureTimeBarComponent.minimumLoadingMs -
                  (Date.now() - loadingShownAt),
              )
            : 0;
          loadingShownAt = null;

          const viewModel: DepartureTimeBarViewModel = {
            ...nextContent,
            busy: false,
            visible: true,
          };

          return remainingLoadingMs > 0
            ? timer(remainingLoadingMs).pipe(map(() => viewModel))
            : of(viewModel);
        }),
      );
    },
  ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  private formatMinutesToNext(minutes: number | null): string | null {
    if (minutes === null) return null;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const parts: string[] = [];

    if (hours > 0) {
      const hourLabel =
        hours === 1
          ? this.copySchedule.departureTimeBar.hour
          : this.copySchedule.departureTimeBar.hours;

      parts.push(`${hours} ${hourLabel}`);
    }

    if (remainingMinutes > 0 || hours === 0) {
      const minuteLabel =
        remainingMinutes === 1
          ? this.copySchedule.departureTimeBar.minute
          : this.copySchedule.departureTimeBar.minutes;

      parts.push(`${remainingMinutes} ${minuteLabel}`);
    }

    return parts.join(' ');
  }
}
