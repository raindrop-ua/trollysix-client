import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { GenericSectionBlockComponent } from '../../../../../shared/components/sections';
import { copy } from '../../../../../core/content/copy.util';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [RevealOnScrollDirective, GenericSectionBlockComponent, NgClass],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent {
  readonly copyAbout = copy('about');
}
