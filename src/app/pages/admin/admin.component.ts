import { ChangeDetectionStrategy, Component } from '@angular/core';
import {SvgIconComponent} from "../../shared/components/svg-icon/svg-icon.component";
import {ThemeSwitcherComponent} from "../../shared/components/theme-switcher/theme-switcher.component";

@Component({
  selector: 'app-admin',
  imports: [
    SvgIconComponent,
    ThemeSwitcherComponent
  ],
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {

}
