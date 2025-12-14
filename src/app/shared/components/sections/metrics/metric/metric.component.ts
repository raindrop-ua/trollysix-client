import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-metric',
  imports: [],
  templateUrl: './metric.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class MetricComponent {
  title = input.required<string>();
  description = input.required<string>();
}
