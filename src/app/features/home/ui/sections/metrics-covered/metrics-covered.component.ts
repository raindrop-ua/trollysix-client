import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { MetricsComponent } from '../../../../../shared/ui/sections';
import { MetricsListService } from '../../../services/metrics-list.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-metrics-covered',
  imports: [MetricsComponent, AsyncPipe],
  templateUrl: './metrics-covered.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class MetricsCoveredComponent {
  private metricsListService = inject(MetricsListService);
  public metricsList$ = this.metricsListService.getMetrics();
}
