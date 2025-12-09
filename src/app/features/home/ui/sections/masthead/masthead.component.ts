import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AppRouteEnum } from '../../../../../core/enums/app-route.enum';
import { SvgIconComponent } from '../../../../../shared/components/svg-icon/svg-icon.component';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { BtnDirective } from '../../../../../shared/directives/btn.directive';
import { SnowComponent } from '../snow/snow.component';

@Component({
  selector: 'app-masthead',
  imports: [
    RouterLink,
    SvgIconComponent,
    NgOptimizedImage,
    RevealOnScrollDirective,
    BtnDirective,
    SnowComponent,
  ],
  templateUrl: './masthead.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MastheadComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
}
