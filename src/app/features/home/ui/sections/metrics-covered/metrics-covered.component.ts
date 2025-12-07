import {
  Component,
  inject,
  signal,
  DestroyRef,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Metric,
  MetricsComponent,
  SpinnerComponent,
} from '../../../../../shared/components/sections';
import { MetricsListService } from '../../../services/metrics-list.service';

@Component({
  selector: 'app-metrics-covered',
  imports: [MetricsComponent, SpinnerComponent],
  templateUrl: './metrics-covered.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MetricsCoveredComponent implements OnInit {
  private metricsListService = inject(MetricsListService);
  private destroyRef = inject(DestroyRef);
  public readonly metrics = signal<Metric[]>([]);
  public readonly isLoading = signal(true);

  ngOnInit() {
    this.metricsListService
      .getMetrics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (metrics) => {
          this.metrics.set(metrics);
          this.isLoading.set(false);
        },
        error: () => {
          this.metrics.set([]);
          this.isLoading.set(false);
        },
      });
  }
}
