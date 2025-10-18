import {
  Component,
  inject,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';

@Component({
  selector: 'app-stops-list',
  imports: [SvgIconComponent, AsyncPipe, DatePipe],
  templateUrl: './stops-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StopsListComponent {
  public readonly showDescriptions = input<boolean>(true);
  private store = inject(Store);

  vm$ = this.store.select(selectScheduleViewModel);

  onSelectStop(stopId: string): void {
    this.store.dispatch(SchedulePageActions.selectStop({ stopId }));
  }
}
