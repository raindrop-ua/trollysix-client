import { AsyncPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { MetricsComponent } from '@app/shared/ui/sections';

import { MetricsListService } from '../../../services/metrics-list.service';

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
