import {
  Component,
  inject,
  ChangeDetectionStrategy,
  effect,
  signal,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { copy } from '@core/content';

import { ScheduleService } from '@features/schedule/application/services/schedule.service';
import { Departure } from '@features/schedule/data-access/models/departure.model';
import {
  selectSelectedStopId,
  selectTimetableLoading,
} from '@features/schedule/data-access/store/schedule.selectors';
import { TooltipDirective } from '@shared/directives/tooltip.directive';

@Component({
  selector: 'trollysix-departure-legend',
  imports: [TooltipDirective],
  templateUrl: './departure-legend.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureLegendComponent {
  public readonly copySchedule = copy('schedule');
  private readonly store = inject(Store);
  private readonly schedule: ScheduleService = inject(ScheduleService);
  public readonly departures: Signal<Departure[]> = toSignal(
    this.schedule.departures$,
    {
      initialValue: [],
    },
  );
  public readonly timetableLoading: Signal<boolean> = this.store.selectSignal(
    selectTimetableLoading,
  );
  public readonly selectedStopId: Signal<string | null> =
    this.store.selectSignal(selectSelectedStopId);
  public readonly revealKey = signal(0);

  private previousLoading = true;
  private previousStopId: string | null = null;

  constructor() {
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
}
