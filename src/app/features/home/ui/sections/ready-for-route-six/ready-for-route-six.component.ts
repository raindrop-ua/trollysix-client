import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRouteEnum } from '../../../../../core/enums/app-route.enum';
import { BtnDirective } from '../../../../../shared/directives/btn.directive';
import { copy } from '../../../../../core/content/copy.util';

@Component({
  selector: 'trollysix-ready-for-route-six',
  imports: [RouterLink, BtnDirective],
  templateUrl: './ready-for-route-six.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ReadyForRouteSixComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
  readonly copyCommon = copy('common');
}
