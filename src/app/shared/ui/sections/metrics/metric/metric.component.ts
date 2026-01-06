import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'trollysix-metric',
  imports: [],
  templateUrl: './metric.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class MetricComponent {
  title = input.required<string>();
  description = input.required<string>();
}
