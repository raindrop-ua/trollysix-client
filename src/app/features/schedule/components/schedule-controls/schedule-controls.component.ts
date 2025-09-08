import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { map } from 'rxjs';
import {SvgIconComponent} from "../../../../shared/components/svg-icon/svg-icon.component";
import {ClockService} from "../../../../core/services/clock.service";
import {ScheduleMockService} from "../../services/schedule-mock.service";
import {Status} from "./departure.model";

@Component({
  selector: 'app-schedule-controls',
  imports: [
    SvgIconComponent,
    AsyncPipe,
    DatePipe,
  ],
  templateUrl: './schedule-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent {
  public clockService: ClockService = inject(ClockService);
  private readonly schedule = inject(ScheduleMockService);

  readonly departures$ = this.schedule.departures$;

  readonly next$ = this.departures$.pipe(
    map(list => list.find(d => d.status === Status.Now) ?? list.find(d => d.status !== Status.Past) ?? null)
  );
}
