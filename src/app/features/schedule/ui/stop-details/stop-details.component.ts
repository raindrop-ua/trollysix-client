import { NgOptimizedImage } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@app/core/content/copy.util';
import { GenericSectionBlockComponent } from '@app/shared/ui/sections';
import { GeoBadgeComponent } from '@features/schedule/ui/geo-badge/geo-badge.component';

import { Stop } from '../../data-access/models/stop.model';

import { SharedRoutesComponent } from './shared-routes/shared-routes.component';
import { WeatherBlockComponent } from './weather-block/weather-block.component';

@Component({
  selector: 'trollysix-stop-details',
  imports: [
    NgOptimizedImage,
    GeoBadgeComponent,
    GenericSectionBlockComponent,
    SharedRoutesComponent,
    WeatherBlockComponent,
  ],
  templateUrl: './stop-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopDetailsComponent {
  readonly copySchedule = copy('schedule');

  stopData = input.required<Stop>();
}
