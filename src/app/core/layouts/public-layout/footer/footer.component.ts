import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AppRouteEnum } from '../../../enums/app-route.enum';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
}
