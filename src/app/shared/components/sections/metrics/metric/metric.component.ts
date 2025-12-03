import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';

@Component({
  selector: 'app-metric',
  imports: [],
  templateUrl: './metric.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    style: 'display: flex;',
  },
})
export class MetricComponent {
  title = input.required<string>();
  description = input.required<string>();
}
