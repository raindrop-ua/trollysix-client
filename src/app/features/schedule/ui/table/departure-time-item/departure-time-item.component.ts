import {
  Component,
  input,
  computed,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Departure } from '../../../data-access/models/departure.model';

@Component({
  selector: 'app-departure-time-item',
  imports: [],
  templateUrl: './departure-time-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureTimeItemComponent {
  departure = input.required<Departure>();
  showSchedule = signal(false);

  readonly timeClass = computed(() => {
    const d = this.departure();
    return `ts-time ts-time-${d.status}`;
  });
}
