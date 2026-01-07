import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppRouteEnum } from '@app/core/enums/app-route.enum';
import { IconButtonDirective } from '@shared/directives/icon-button.directive';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-settings-button',
  imports: [SvgIconComponent, IconButtonDirective, RouterLink],
  templateUrl: './settings-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SettingsButtonComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
}
