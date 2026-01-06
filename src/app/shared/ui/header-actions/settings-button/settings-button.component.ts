import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRouteEnum } from '../../../../core/enums/app-route.enum';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { IconButtonDirective } from '../../../directives/icon-button.directive';

@Component({
  selector: 'trollysix-settings-button',
  imports: [SvgIconComponent, IconButtonDirective, RouterLink],
  templateUrl: './settings-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class SettingsButtonComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
}
