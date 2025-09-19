import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectScheduleViewModel } from '../../../data-access/store/schedule.selectors';

@Component({
  selector: 'app-departure-stop-bar',
  imports: [AsyncPipe],
  templateUrl: './departure-stop-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureStopBarComponent {
  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);
}
