import { NgClass } from '@angular/common';
import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { copy } from '@core/content/copy.util';

import { SchedulePageActions } from '@features/schedule/data-access/store/schedule.actions';
import {
  selectDayTypes,
  selectDirections,
  selectSelectedDayType,
  selectSelectedDirection,
  selectTimetableLoading,
} from '@features/schedule/data-access/store/schedule.selectors';
import { ScheduleService } from '@features/schedule/services/schedule.service';
import { HintArrowComponent } from '@features/schedule/ui/hint-arrow/hint-arrow.component';
import { OptionsSelectorComponent } from '@features/schedule/ui/options-selector/options-selector.component';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-selectors-group',
  imports: [
    OptionsSelectorComponent,
    SvgIconComponent,
    HintArrowComponent,
    NgClass,
  ],
  templateUrl: './selectors-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SelectorsGroupComponent {
  readonly copySchedule = copy('schedule');

  private readonly store = inject(Store);
  private readonly schedule = inject(ScheduleService);
  readonly departures = toSignal(this.schedule.departures$, { initialValue: [] });
  readonly dayTypes = this.store.selectSignal(selectDayTypes);
  readonly directions = this.store.selectSignal(selectDirections);
  readonly selectedDayTypeName = this.store.selectSignal(selectSelectedDayType);
  readonly selectedDirectionName = this.store.selectSignal(selectSelectedDirection);
  readonly timetableLoading = this.store.selectSignal(selectTimetableLoading);
  readonly isUnavailable = computed(
    () => this.departures().length === 0 && !this.timetableLoading(),
  );
  readonly hasDepartures = computed(() => this.departures().length > 0);

  onSelectDayType(dayTypeName: string): void {
    this.store.dispatch(SchedulePageActions.selectDayType({ dayTypeName }));
  }

  onSelectDirection(directionName: string): void {
    if (directionName !== 'forward' && directionName !== 'backward') {
      return;
    }
    this.store.dispatch(SchedulePageActions.selectDirection({ directionName }));
  }
}
