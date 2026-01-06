import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { ScheduleService } from '../../services/schedule.service';
import { OptionsSelectorComponent } from '../options-selector/options-selector.component';
import { SvgIconComponent } from '../../../../shared/ui';
import { HintArrowComponent } from '../hint-arrow/hint-arrow.component';
import { copy } from '../../../../core/content/copy.util';

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
  encapsulation: ViewEncapsulation.None,
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
