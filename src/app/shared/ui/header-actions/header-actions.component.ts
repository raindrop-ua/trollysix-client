import { NgTemplateOutlet } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

import { AppRouteEnum } from '@core/enums/app-route.enum';

import { ThemeSwitcherComponent } from '@shared/ui/header-actions/theme-switcher/theme-switcher.component';

import { SettingsButtonComponent } from './settings-button/settings-button.component';

@Component({
  selector: 'trollysix-header-actions',
  imports: [NgTemplateOutlet, ThemeSwitcherComponent, SettingsButtonComponent],
  templateUrl: './header-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class HeaderActionsComponent {
  public readonly showSettingsButton = signal<boolean>(false);
  protected readonly AppRouteEnum = AppRouteEnum;
}
