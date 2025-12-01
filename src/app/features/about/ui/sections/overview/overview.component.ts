import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { LazyVideoDirective } from '../../../../../shared/directives/lazy-video.directive';

@Component({
  selector: 'app-overview',
  imports: [RevealOnScrollDirective, LazyVideoDirective],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent {
  public showVideo = signal(false);
}
