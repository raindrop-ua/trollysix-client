import { Component, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content';

import { FullListOfStopsComponent } from '@features/about/ui/sections/full-list-of-stops/full-list-of-stops.component';
import { HeadComponent } from '@features/about/ui/sections/head/head.component';
import { InfrastructureComponent } from '@features/about/ui/sections/infrastructure/infrastructure.component';
import { OverviewComponent } from '@features/about/ui/sections/overview/overview.component';
import { MetricsComponent } from '@shared/ui/sections/metrics/metrics.component';
import { Metric } from '@shared/ui/sections/metrics/metrics.model';

@Component({
  selector: 'trollysix-about',
  imports: [
    HeadComponent,
    OverviewComponent,
    InfrastructureComponent,
    MetricsComponent,
    FullListOfStopsComponent,
  ],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AboutComponent {
  public readonly copyAbout = copy('about');
  public readonly metrics: Metric[] = [...this.copyAbout.metrics];
}
