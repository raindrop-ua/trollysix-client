import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { copy } from '@app/core/content/copy.util';
import { AppRouteEnum } from '@app/core/enums/app-route.enum';
import { BtnDirective } from '@app/shared/directives/btn.directive';

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
