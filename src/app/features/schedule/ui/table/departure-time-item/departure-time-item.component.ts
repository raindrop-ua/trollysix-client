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
import { TimeUiPipe } from '@shared/pipes/timeui.pipe';

@Component({
  selector: 'trollysix-departure-time-item',
  imports: [TimeUiPipe],
  templateUrl: './departure-time-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureTimeItemComponent {
  private readonly schedule = inject(ScheduleService);
  public departure = input.required<Departure>();
  public revealIndex = input<number>(0);
  public clickTime = output<string>();

  readonly showSchedule = toSignal(this.schedule.showRunNumbers$, {
    initialValue: false,
  });

  readonly timeClass = computed(() => {
    const d = this.departure();
    return `ts-time ts-time-${d.status}`;
  });

  readonly revealDelay = computed(() => {
    const index = this.revealIndex();
    const normalized = Number.isFinite(index) && index > 0 ? index : 0;
    const delay = Math.min(normalized * 28, 420);
    return `${delay}ms`;
  });
}
