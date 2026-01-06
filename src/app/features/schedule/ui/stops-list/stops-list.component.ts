import { AsyncPipe, DatePipe } from '@angular/common';
import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { copy } from '@app/core/content/copy.util';

import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';

import { StopCardComponent } from './stop-card/stop-card.component';

@Component({
  selector: 'trollysix-stops-list',
  imports: [AsyncPipe, DatePipe, StopCardComponent],
  templateUrl: './stops-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopsListComponent {
  readonly copySchedule = copy('schedule');

  private store = inject(Store);

  public readonly showDescriptions = signal<boolean>(false);
  public readonly showBackgroundImage = signal<boolean>(true);

  public vm$ = this.store.select(selectScheduleViewModel);
}
