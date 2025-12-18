import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { copy } from '../../../../../core/content/copy.util';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { GenericSectionBlockComponent } from '../../../../../shared/components/sections';
import { ColorSplashComponent } from '../../../../../shared/components';

@Component({
  selector: 'app-overview',
  imports: [
    RevealOnScrollDirective,
    NgClass,
    GenericSectionBlockComponent,
    ColorSplashComponent,
  ],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class OverviewComponent {
  readonly copyAbout = copy('about');
}
