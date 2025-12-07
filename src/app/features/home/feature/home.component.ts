import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AttentionComponent,
  Metric,
  MetricsComponent,
} from '../../../shared/components/sections';
import {
  BigClaimsComponent,
  MastheadComponent,
  ReadyForRouteSixComponent,
  TestimonialsComponent,
  ThisIsTrollysixComponent,
  ValuePropsComponent,
} from '../ui';
import { BtnDirective } from '../../../shared/directives/btn.directive';
import { MetricsListService } from '../services/metrics-list.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MastheadComponent,
    ValuePropsComponent,
    BigClaimsComponent,
    ThisIsTrollysixComponent,
    TestimonialsComponent,
    ReadyForRouteSixComponent,
    MetricsComponent,
    AttentionComponent,
    TestimonialsComponent,
    BtnDirective,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  private metricsListService = inject(MetricsListService);
  public readonly metrics = signal<Metric[]>([]);

  ngOnInit() {
    this.metricsListService.getMetrics().subscribe((metrics) => {
      this.metrics.set(metrics);
    });
  }
}
