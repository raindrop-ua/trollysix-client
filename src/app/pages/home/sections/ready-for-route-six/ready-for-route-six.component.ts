import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {AppRouteEnum} from '../../../../core/enums/app-route.enum'

@Component({
  selector: 'app-ready-for-route-six',
  imports: [
    RouterLink
  ],
  templateUrl: './ready-for-route-six.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadyForRouteSixComponent {

  protected readonly AppRouteEnum = AppRouteEnum;
}
