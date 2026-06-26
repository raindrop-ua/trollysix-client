import { DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { copy } from '@core/content';

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

  public readonly stops = this.store.selectSignal(selectAllScheduleStops);
  public readonly selectedStopId =
    this.store.selectSignal(selectSelectedStopId);
  public readonly selectedDayTypeName = this.store.selectSignal(
    selectSelectedDayType,
  );
  public readonly selectedDirectionName = this.store.selectSignal(
    selectSelectedDirection,
  );
  public readonly currentTimetableValidFrom = this.store.selectSignal(
    selectCurrentTimetableValidFrom,
  );
}
