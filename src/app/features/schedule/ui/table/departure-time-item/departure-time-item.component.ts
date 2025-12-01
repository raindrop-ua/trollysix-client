import {
  Component,
  input,
  computed,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Departure } from '../../../data-access/models/departure.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-departure-time-item',
  imports: [],
  templateUrl: './departure-time-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureTimeItemComponent {
  private readonly schedule = inject(ScheduleService);
  public departure = input.required<Departure>();

  readonly showSchedule = toSignal(
    this.schedule.showScheduleNumbers$,
    { initialValue: false },
  );

  readonly timeClass = computed(() => {
    const d = this.departure();
    return `ts-time ts-time-${d.status}`;
  });
}
