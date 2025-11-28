import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-departure-legend',
  imports: [AsyncPipe],
  templateUrl: './departure-legend.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureLegendComponent {
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
}
