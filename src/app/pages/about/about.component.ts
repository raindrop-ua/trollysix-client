import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HeadComponent} from "./sections/head/head.component";
import {OverviewComponent} from "./sections/overview/overview.component";
import {InfrastructureComponent} from "./sections/infrastructure/infrastructure.component";
import {MediaComponent} from "./sections/media/media.component";
import {MetricsComponent} from "../../shared/components/sections/metrics/metrics.component";
import {Metric} from "../../shared/components/sections/metrics/metrics.model";

@Component({
  selector: 'app-about',
  imports: [
    HeadComponent,
    OverviewComponent,
    InfrastructureComponent,
    MediaComponent,
    MetricsComponent,
  ],
  templateUrl: './about.component.html',
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
    }
  ];
}
