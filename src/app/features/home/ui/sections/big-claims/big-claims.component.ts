import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { copy } from '../../../../../core/content/copy.util';
import { AppRouteEnum } from '../../../../../core/enums/app-route.enum';
import { BtnDirective } from '../../../../../shared/directives/btn.directive';
import { ColorSplashComponent } from '../../../../../shared/ui';

@Component({
  selector: 'app-big-claims',
  imports: [RouterLink, BtnDirective, ColorSplashComponent],
  templateUrl: './big-claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class BigClaimsComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
  readonly copyCommon = copy('common');
}
