import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { CheatCodeDirective } from '../../../../../shared/directives/cheat-code.directive';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [RevealOnScrollDirective, CheatCodeDirective, NgOptimizedImage],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent {}
