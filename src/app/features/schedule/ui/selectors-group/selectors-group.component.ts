import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  ChangeDetectionStrategy,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { copy } from '@core/content';

import { ScheduleService } from '@features/schedule/application/services/schedule.service';
import { DayType } from '@features/schedule/data-access/models/daytype.model';
import { Departure } from '@features/schedule/data-access/models/departure.model';
import {
  Direction,
  DirectionName,
} from '@features/schedule/data-access/models/direction.model';
import { SchedulePageActions } from '@features/schedule/data-access/store/schedule.actions';
import {
  selectDayTypes,
  selectDirections,
  selectSelectedDayType,
  selectSelectedDirection,
  selectTimetableLoading,
} from '@features/schedule/data-access/store/schedule.selectors';
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
  public readonly copySchedule = copy('schedule');

  private readonly store = inject(Store);
  private readonly schedule: ScheduleService = inject(ScheduleService);
  public readonly departures: Signal<Departure[]> = toSignal(
    this.schedule.departures$,
    {
      initialValue: [],
    },
  );
  public readonly dayTypes: Signal<DayType[]> =
    this.store.selectSignal(selectDayTypes);
  public readonly directions: Signal<Direction[]> =
    this.store.selectSignal(selectDirections);
  public readonly selectedDayTypeName: Signal<string | null> =
    this.store.selectSignal(selectSelectedDayType);
  public readonly selectedDirectionName: Signal<DirectionName | null> =
    this.store.selectSignal(selectSelectedDirection);
  public readonly timetableLoading: Signal<boolean> = this.store.selectSignal(
    selectTimetableLoading,
  );
  public readonly isUnavailable: Signal<boolean> = computed(
    () => this.departures().length === 0 && !this.timetableLoading(),
  );
  public readonly hasDepartures: Signal<boolean> = computed(
    () => this.departures().length > 0,
  );

  public onSelectDayType(dayTypeName: string): void {
    this.store.dispatch(SchedulePageActions.selectDayType({ dayTypeName }));
  }

  public onSelectDirection(directionName: string): void {
    if (directionName !== 'forward' && directionName !== 'backward') {
      return;
    }
    this.store.dispatch(SchedulePageActions.selectDirection({ directionName }));
  }
}
