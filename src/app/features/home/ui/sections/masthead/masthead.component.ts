import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { AppRouteEnum } from '../../../../../core/enums/app-route.enum';
import { ClockService } from '../../../../../core/services/clock.service';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { BtnDirective } from '../../../../../shared/directives/btn.directive';
import { SvgIconComponent } from '../../../../../shared/components/svg-icon/svg-icon.component';
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
    AsyncPipe,
  ],
  templateUrl: './masthead.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MastheadComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
  private readonly clock = inject(ClockService);

  readonly isWinter$ = this.clock.now$.pipe(
    map((date) => {
      const month = date.getMonth(); // 0 = Jan, 11 = Dec
      return month === 11 || month === 0 || month === 1; // Dec, Jan or Feb
    }),
    distinctUntilChanged(),
  );
}
