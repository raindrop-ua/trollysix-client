import { AsyncPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { MetricsListService } from '@features/home/services/metrics-list.service';
import { MetricsComponent } from '@shared/ui/sections/metrics/metrics.component';

@Component({
  selector: 'trollysix-metrics-covered',
  imports: [MetricsComponent, AsyncPipe],
  templateUrl: './metrics-covered.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class MetricsCoveredComponent {
  private metricsListService = inject(MetricsListService);
  public metricsList$ = this.metricsListService.getMetrics();
}
