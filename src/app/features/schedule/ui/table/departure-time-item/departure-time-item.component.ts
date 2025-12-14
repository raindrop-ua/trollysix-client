import {
  Component,
  input,
  computed,
  inject,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Departure } from '../../../data-access/models/departure.model';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-departure-time-item',
  imports: [],
  templateUrl: './departure-time-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureTimeItemComponent {
  private readonly schedule = inject(ScheduleService);
  public departure = input.required<Departure>();
  public clickTime = output<string>();

  readonly showSchedule = toSignal(this.schedule.showScheduleNumbers$, {
    initialValue: false,
  });

  readonly timeClass = computed(() => {
    const d = this.departure();
    return `ts-time ts-time-${d.status}`;
  });

  onClick() {
    this.clickTime.emit(this.departure().time);
  }
}
