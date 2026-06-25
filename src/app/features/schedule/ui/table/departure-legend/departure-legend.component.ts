import {
  Component,
  inject,
  ChangeDetectionStrategy,
  effect,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { copy } from '@core/content';

import { ScheduleService } from '@features/schedule/application/services/schedule.service';
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
  readonly copySchedule = copy('schedule');
  private readonly store = inject(Store);
  private readonly schedule = inject(ScheduleService);
  readonly departures = toSignal(this.schedule.departures$, {
    initialValue: [],
  });
  readonly timetableLoading = this.store.selectSignal(selectTimetableLoading);
  readonly selectedStopId = this.store.selectSignal(selectSelectedStopId);
  readonly revealKey = signal(0);

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
