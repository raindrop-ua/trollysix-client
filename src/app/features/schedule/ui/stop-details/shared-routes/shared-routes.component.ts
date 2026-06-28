import { DecimalPipe } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content';

import { Stop } from '@features/schedule/data-access/models/stop.model';
import { RatingStarsComponent } from '@shared/ui/rating-stars/rating-stars.component';

@Component({
  selector: 'trollysix-shared-routes',
  imports: [RatingStarsComponent, DecimalPipe],
  templateUrl: './shared-routes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
})
export class SharedRoutesComponent {
  public readonly copySchedule = copy('schedule');
  public stopData = input.required<Stop>();
}
