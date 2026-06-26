import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { distinctUntilChanged, map } from 'rxjs';

import { copy } from '@core/content';
import { AppRouteEnum } from '@core/enums/app-route.enum';
import { ClockService } from '@core/services/clock.service';

import { SnowComponent } from '@features/home/ui/sections/masthead/snow/snow.component';
import { BtnDirective } from '@shared/directives/btn.directive';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-masthead',
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
  host: { class: 'block' },
})
export class MastheadComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
  public readonly copyCommon = copy('common');
  public readonly copyHome = copy('home');
  private readonly clock = inject(ClockService);

  public readonly isWinter$ = this.clock.now$.pipe(
    map((date) => {
      const month = date.getMonth(); // 0 = Jan, 11 = Dec
      return month === 11 || month === 0 || month === 1; // Dec, Jan or Feb
    }),
    distinctUntilChanged(),
  );
}
