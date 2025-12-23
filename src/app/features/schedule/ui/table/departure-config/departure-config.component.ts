import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-departure-config',
  imports: [AsyncPipe],
  templateUrl: './departure-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class DepartureConfigComponent {
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
  readonly showScheduleNumbers$ = this.schedule.showScheduleNumbers$;

  onToggleSchedule(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.schedule.setShowScheduleNumbers(checked);
  }
}
