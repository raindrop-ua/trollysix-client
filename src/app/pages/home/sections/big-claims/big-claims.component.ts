import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRouteEnum } from '../../../../core/enums/app-route.enum';

@Component({
  selector: 'app-big-claims',
  imports: [
    RouterLink
  ],
  templateUrl: './big-claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BigClaimsComponent {

  protected readonly AppRouteEnum = AppRouteEnum;
}
