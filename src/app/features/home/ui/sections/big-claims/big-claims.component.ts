import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { copy } from '@core/content';
import { AppRouteEnum } from '@core/enums/app-route.enum';

import { BtnDirective } from '@shared/directives/btn.directive';

@Component({
  selector: 'trollysix-big-claims',
  imports: [RouterLink, BtnDirective],
  templateUrl: './big-claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class BigClaimsComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
  public readonly copyCommon = copy('common');
  public readonly copyHome = copy('home');
}
