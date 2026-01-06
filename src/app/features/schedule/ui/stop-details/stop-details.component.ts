import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Stop } from '../../data-access/models/stop.model';
import { GeoBadgeComponent } from '../geo-badge/geo-badge.component';
import { GenericSectionBlockComponent } from '../../../../shared/ui/sections';
import { SharedRoutesComponent } from './shared-routes/shared-routes.component';
import { WeatherBlockComponent } from './weather-block/weather-block.component';
import { copy } from '../../../../core/content/copy.util';

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
