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
})
export class MetricComponent {
  title = input<string>('');
  description = input<string>('');
}
