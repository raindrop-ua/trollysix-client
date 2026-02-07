import {
  Component,
  input,
  computed,
  inject,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Departure } from '@features/schedule/data-access/models/departure.model';
import { ScheduleService } from '@features/schedule/services/schedule.service';

@Component({
  selector: 'trollysix-departure-time-item',
  imports: [],
  templateUrl: './departure-time-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureTimeItemComponent {
  private readonly schedule = inject(ScheduleService);
  public departure = input.required<Departure>();
  public clickTime = output<string>();

  readonly showSchedule = toSignal(this.schedule.showRunNumbers$, {
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
