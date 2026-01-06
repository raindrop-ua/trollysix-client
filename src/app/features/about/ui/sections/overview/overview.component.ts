import { Component, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@app/core/content/copy.util';
import { RevealOnScrollDirective } from '@app/shared/directives/reveal-on-scroll.directive';
import { ColorSplashComponent, SvgIconComponent } from '@app/shared/ui';
import { GenericSectionBlockComponent } from '@app/shared/ui/sections';

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
  host: { class: 'block' },
})
export class OverviewComponent {
  readonly copyAbout = copy('about');
}
