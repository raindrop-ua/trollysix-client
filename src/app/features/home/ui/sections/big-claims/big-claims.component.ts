import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRouteEnum } from '../../../../../core/enums/app-route.enum';
import { BtnDirective } from '../../../../../shared/directives/btn.directive';
import { copy } from '../../../../../core/content/copy.util';

@Component({
  selector: 'app-big-claims',
  imports: [RouterLink, BtnDirective],
  templateUrl: './big-claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class BigClaimsComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
  readonly copyCommon = copy('common');
}
