import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  HeadComponent,
  OverviewComponent,
  InfrastructureComponent,
} from '../ui';
import {
  MetricsComponent,
  type Metric,
} from '../../../shared/components/sections';

@Component({
  selector: 'app-about',
  imports: [
    HeadComponent,
    OverviewComponent,
    InfrastructureComponent,
    MetricsComponent,
  ],
  templateUrl: './about.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
