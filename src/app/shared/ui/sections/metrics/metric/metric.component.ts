import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'trollysix-metric',
  imports: [],
  templateUrl: './metric.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class MetricComponent {
  public title = input.required<string>();
  public description = input.required<string>();
}
