import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { Store } from '@ngrx/store';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { AsyncPipe } from '@angular/common';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';

@Component({
  selector: 'app-stops-select',
  imports: [SvgIconComponent, AsyncPipe],
  templateUrl: './stops-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopsSelectComponent {
  public readonly showDescriptions = input<boolean>(true);

  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);

  onSelectStop(stopId: string): void {
    this.store.dispatch(SchedulePageActions.selectStop({ stopId }));
  }
}
