import { Component, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@app/core/content/copy.util';
import { RevealOnScrollDirective } from '@app/shared/directives/reveal-on-scroll.directive';
import { ColorSplashComponent } from '@shared/ui/color-splash/color-splash.component';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

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
