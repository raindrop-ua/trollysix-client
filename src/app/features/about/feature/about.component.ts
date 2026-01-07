import { Component, ChangeDetectionStrategy } from '@angular/core';

import {
  HeadComponent,
  OverviewComponent,
  InfrastructureComponent,
  FullListOfStopsComponent,
  RouteOperationComponent,
  EasterEggComponent,
} from '@features/about/ui';
import { Metric, MetricsComponent } from '@shared/ui/sections';

@Component({
  selector: 'trollysix-about',
  imports: [
    HeadComponent,
    OverviewComponent,
    InfrastructureComponent,
    MetricsComponent,
    FullListOfStopsComponent,
    EasterEggComponent,
    RouteOperationComponent,
  ],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AboutComponent {
  public readonly metrics: Metric[] = [
    {
      title: '8 → 4',
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
