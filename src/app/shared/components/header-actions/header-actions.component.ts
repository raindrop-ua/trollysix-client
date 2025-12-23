import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AppRouteEnum } from '../../../core/enums/app-route.enum';
import { SettingsButtonComponent } from './settings-button/settings-button.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-header-actions',
  imports: [NgTemplateOutlet, ThemeSwitcherComponent, SettingsButtonComponent],
  templateUrl: './header-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class HeaderActionsComponent {
  public readonly showSettingsButton = signal<boolean>(false);
  protected readonly AppRouteEnum = AppRouteEnum;
}
