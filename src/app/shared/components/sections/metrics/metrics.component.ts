import {
  Component,
  input,
  ChangeDetectionStrategy,
  InputSignal,
} from '@angular/core';
import { Metric } from './metrics.model';

@Component({
  selector: 'app-metrics',
  imports: [],
  templateUrl: './metrics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsComponent {
  public readonly mobileFullWidth = input<string>();
  public readonly data: InputSignal<readonly Metric[]> =
    input.required<readonly Metric[]>();
}
