import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRouteEnum } from '../../../../../core/enums/app-route.enum';

@Component({
  selector: 'app-big-claims',
  imports: [RouterLink],
  templateUrl: './big-claims.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BigClaimsComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
}
