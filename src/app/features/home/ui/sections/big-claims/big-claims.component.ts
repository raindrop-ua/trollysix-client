import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { copy } from '@core/content/copy.util';
import { AppRouteEnum } from '@core/enums/app-route.enum';

import { BtnDirective } from '@shared/directives/btn.directive';
import { ColorSplashComponent } from '@shared/ui/color-splash/color-splash.component';

@Component({
  selector: 'trollysix-big-claims',
  imports: [RouterLink, BtnDirective, ColorSplashComponent],
  templateUrl: './big-claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class BigClaimsComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
  readonly copyCommon = copy('common');
  readonly copyHome = copy('home');
}
