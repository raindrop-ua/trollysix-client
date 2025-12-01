import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-departure-config',
  imports: [AsyncPipe],
  templateUrl: './departure-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureConfigComponent {
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
}
