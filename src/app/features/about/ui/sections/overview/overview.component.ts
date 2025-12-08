import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { GenericSectionBlockComponent } from '../../../../../shared/components/sections';

@Component({
  selector: 'app-overview',
  imports: [
    RevealOnScrollDirective,
    GenericSectionBlockComponent,
  ],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent { }
