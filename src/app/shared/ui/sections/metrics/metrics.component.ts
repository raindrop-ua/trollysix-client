import {
  Component,
  input,
  ChangeDetectionStrategy,
  InputSignal,
} from '@angular/core';

import { MetricComponent } from './metric/metric.component';
import { Metric } from './metrics.model';

@Component({
  selector: 'trollysix-metrics',
  imports: [MetricComponent],
  templateUrl: './metrics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class MetricsComponent {
  public readonly mobileFullWidth = input<string>();
  public readonly data: InputSignal<readonly Metric[]> =
    input.required<readonly Metric[]>();
}
