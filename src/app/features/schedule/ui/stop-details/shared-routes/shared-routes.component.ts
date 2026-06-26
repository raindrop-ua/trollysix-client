import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content';

import { Stop } from '@features/schedule/data-access/models/stop.model';

@Component({
  selector: 'trollysix-shared-routes',
  imports: [],
  templateUrl: './shared-routes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
})
export class SharedRoutesComponent {
  public readonly copySchedule = copy('schedule');
  public stop = input.required<Stop>();
}
