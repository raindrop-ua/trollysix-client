import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRouteEnum } from '../../../../../core/enums/app-route.enum';
import { BtnDirective } from '../../../../../shared/directives/btn.directive';

@Component({
  selector: 'app-big-claims',
  imports: [RouterLink, BtnDirective],
  templateUrl: './big-claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BigClaimsComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
}
