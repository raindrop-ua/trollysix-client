import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, DatePipe } from '@angular/common';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { StopCardComponent } from '../stop-card/stop-card.component';

@Component({
  selector: 'app-stops-list',
  imports: [AsyncPipe, DatePipe, StopCardComponent],
  templateUrl: './stops-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopsListComponent {
  private store = inject(Store);

  vm$ = this.store.select(selectScheduleViewModel);
}
