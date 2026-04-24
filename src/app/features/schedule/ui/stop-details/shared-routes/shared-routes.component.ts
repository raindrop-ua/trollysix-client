import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content/copy.util';

import { Stop } from '@features/schedule/data-access/models/stop.model';

@Component({
  selector: 'trollysix-shared-routes',
  imports: [],
  templateUrl: './shared-routes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
})
export class SharedRoutesComponent {
  readonly copySchedule = copy('schedule');
  stop = input.required<Stop>();
}
