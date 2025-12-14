import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  HeadComponent,
  OverviewComponent,
  InfrastructureComponent,
  FullListOfStopsComponent,
} from '../ui';
import { Metric, MetricsComponent } from '../../../shared/components/sections';
import { EasterEggComponent } from '../ui/sections/easter-egg/easter-egg.component';

@Component({
  selector: 'app-about',
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
