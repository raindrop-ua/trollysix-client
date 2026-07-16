import { DatePipe } from '@angular/common';
import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Signal,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { copy } from '@core/content';

import { DirectionName } from '@features/schedule/data-access/models/direction.model';
import { Stop } from '@features/schedule/data-access/models/stop.model';
import {
  selectAllScheduleStops,
  selectCurrentTimetableValidFrom,
  selectSelectedDayType,
  selectSelectedDirection,
  selectSelectedStopId,
} from '@features/schedule/data-access/store/schedule.selectors';

import { StopCardComponent } from './stop-card/stop-card.component';

@Component({
  selector: 'trollysix-stops-list',
  imports: [DatePipe, StopCardComponent],
  templateUrl: './stops-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopsListComponent {
  public readonly copySchedule = copy('schedule');
  public readonly stopsTitleId = 'stops-list-title';

  private readonly store = inject(Store);

  public readonly stops: Signal<Stop[]> = this.store.selectSignal(
    selectAllScheduleStops,
  );
  public readonly selectedStopId =
    this.store.selectSignal(selectSelectedStopId);
  public readonly selectedDayTypeName: Signal<string | null> =
    this.store.selectSignal(selectSelectedDayType);
  public readonly selectedDirectionName: Signal<DirectionName | null> =
    this.store.selectSignal(selectSelectedDirection);
  public readonly currentTimetableValidFrom: Signal<string | null> =
    this.store.selectSignal(selectCurrentTimetableValidFrom);
}
