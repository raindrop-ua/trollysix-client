import {
  Component,
  inject,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { copy } from '@core/content/copy.util';

import {
  selectSelectedStopId,
  selectTimetableLoading,
} from '@features/schedule/data-access/store/schedule.selectors';
import { ScheduleService } from '@features/schedule/services/schedule.service';
import { DepartureTimeItemComponent } from '@features/schedule/ui/table/departure-time-item/departure-time-item.component';
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component';

@Component({
  selector: 'trollysix-departure-table',
  templateUrl: './departure-table.component.html',
  imports: [DepartureTimeItemComponent, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureTableComponent {
  private static readonly minimumLoadingMs = 500;

  readonly copySchedule = copy('schedule');
  private readonly schedule = inject(ScheduleService);
  private readonly store = inject(Store);
  readonly departures = toSignal(this.schedule.departures$, {
    initialValue: [],
  });
  readonly timetableLoading = this.store.selectSignal(selectTimetableLoading);
  readonly selectedStopId = this.store.selectSignal(selectSelectedStopId);
  readonly showLoading = signal(false);
  private selectedTime = signal<string | null>(null);
  readonly revealKey = signal(0);

  private previousLoading = true;
  private previousStopId: string | null = null;
  private loadingStartedAt = 0;

  constructor() {
    effect((onCleanup) => {
      const loading = this.timetableLoading();

      if (loading) {
        this.loadingStartedAt = Date.now();
        this.showLoading.set(true);
        return;
      }

      const loadingElapsed = Date.now() - this.loadingStartedAt;
      const remainingLoadingMs =
        DepartureTableComponent.minimumLoadingMs - loadingElapsed;

      if (this.showLoading() && remainingLoadingMs > 0) {
        const loadingTimeout = setTimeout(() => {
          this.showLoading.set(false);
        }, remainingLoadingMs);

        onCleanup(() => clearTimeout(loadingTimeout));
        return;
      }

      this.showLoading.set(false);
    });

    effect(() => {
      const loading = this.timetableLoading();
      const hasDepartures = this.departures().length > 0;
      const selectedStopId = this.selectedStopId();

      const loadingFinished = this.previousLoading && !loading && hasDepartures;
      const stopChanged =
        selectedStopId !== this.previousStopId && !loading && hasDepartures;

      if (loadingFinished || stopChanged) {
        this.revealKey.update((value) => value + 1);
      }

      this.previousLoading = loading;
      this.previousStopId = selectedStopId;
    });
  }

  onSelectTime(time: string) {
    this.selectedTime.set(time);
  }
}
