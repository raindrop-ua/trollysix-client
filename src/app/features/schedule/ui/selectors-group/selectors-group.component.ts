import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { copy } from '@app/core/content/copy.util';
import { SvgIconComponent } from '@app/shared/ui';
import { HintArrowComponent } from '@features/schedule/ui/hint-arrow/hint-arrow.component';
import { OptionsSelectorComponent } from '@features/schedule/ui/options-selector/options-selector.component';

import { SchedulePageActions } from '../../data-access/store/schedule.actions';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'trollysix-selectors-group',
  imports: [
    OptionsSelectorComponent,
    SvgIconComponent,
    AsyncPipe,
    HintArrowComponent,
    NgClass,
  ],
  templateUrl: './selectors-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SelectorsGroupComponent {
  readonly copySchedule = copy('schedule');

  private store = inject(Store);
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
  vm$ = this.store.select(selectScheduleViewModel);

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
