import {
  Component,
  input,
  computed,
  inject,
  output,
  ChangeDetectionStrategy,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ScheduleService } from '@features/schedule/application/services/schedule.service';
import { Departure } from '@features/schedule/data-access/models/departure.model';
import { TimeUiPipe } from '@shared/pipes/timeui.pipe';

@Component({
  selector: 'trollysix-departure-time-item',
  imports: [TimeUiPipe],
  templateUrl: './departure-time-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureTimeItemComponent {
  private readonly schedule: ScheduleService = inject(ScheduleService);
  public departure = input.required<Departure>();
  public revealIndex = input<number>(0);
  public clickTime = output<string>();

  public readonly showSchedule: Signal<boolean> = toSignal(
    this.schedule.showRunNumbers$,
    {
      initialValue: false,
    },
  );

  public readonly timeClass: Signal<string> = computed(() => {
    const d = this.departure();
    return `ts-time ts-time-${d.status}`;
  });

  public readonly revealDelay: Signal<string> = computed(() => {
    const index = this.revealIndex();
    const normalized = Number.isFinite(index) && index > 0 ? index : 0;
    const delay = normalized * 10;
    return `${delay}ms`;
  });
}
