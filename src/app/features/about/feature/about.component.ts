import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EasterEggComponent } from '@features/about/ui/sections/easter-egg/easter-egg.component';
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
    EasterEggComponent,
  ],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AboutComponent {
  public readonly metrics: Metric[] = [
    {
      title: '6 → 4',
      description: 'vehicles: weekdays → weekends',
    },
    {
      title: '2',
      description: 'trolleybus depots',
    },
    {
      title: 'Autonomous',
      description: 'segment without overhead wires',
    },
  ];
}
