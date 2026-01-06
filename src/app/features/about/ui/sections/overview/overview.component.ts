import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { copy } from '../../../../../core/content/copy.util';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { GenericSectionBlockComponent } from '../../../../../shared/ui/sections';
import {
  ColorSplashComponent,
  SvgIconComponent,
} from '../../../../../shared/ui';

@Component({
  selector: 'trollysix-overview',
  imports: [
    RevealOnScrollDirective,
    GenericSectionBlockComponent,
    ColorSplashComponent,
    SvgIconComponent,
  ],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class OverviewComponent {
  readonly copyAbout = copy('about');
}
