import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

import { AppRouteEnum } from '@core/enums/app-route.enum';

import { SettingsButtonComponent } from './settings-button/settings-button.component';
import { TextSizeSwitcherComponent } from './text-size-switcher/text-size-switcher.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

@Component({
  selector: 'trollysix-header-actions',
  imports: [
    ThemeSwitcherComponent,
    SettingsButtonComponent,
    TextSizeSwitcherComponent,
  ],
  templateUrl: './header-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class HeaderActionsComponent {
  public readonly showSettingsButton = signal<boolean>(false);
  public readonly showTextSizeButton = signal<boolean>(true);
  protected readonly AppRouteEnum = AppRouteEnum;
}
