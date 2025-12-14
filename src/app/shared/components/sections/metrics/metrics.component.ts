import {
  Component,
  input,
  ChangeDetectionStrategy,
  InputSignal,
} from '@angular/core';
import { Metric } from './metrics.model';
import { MetricComponent } from './metric/metric.component';

@Component({
  selector: 'app-metrics',
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
