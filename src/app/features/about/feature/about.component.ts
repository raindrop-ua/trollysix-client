import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Metric, MetricsComponent } from '@shared/ui/sections';

import {
  HeadComponent,
  OverviewComponent,
  InfrastructureComponent,
  FullListOfStopsComponent,
} from '../ui';
import { RouteOperationComponent } from '../ui';
import { EasterEggComponent } from '../ui/sections/easter-egg/easter-egg.component';

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
