import { NgOptimizedImage } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content/copy.util';

import { Stop } from '@features/schedule/data-access/models/stop.model';
import { GeoBadgeComponent } from '@features/schedule/ui/geo-badge/geo-badge.component';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

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
