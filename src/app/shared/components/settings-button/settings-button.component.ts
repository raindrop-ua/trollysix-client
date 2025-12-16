import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-settings-button',
  imports: [SvgIconComponent],
  templateUrl: './settings-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SettingsButtonComponent {}
