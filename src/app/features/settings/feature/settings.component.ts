import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GenericHeaderComponent } from '../../../shared/components/sections/generic-header/generic-header.component';

@Component({
  selector: 'app-settings',
  imports: [GenericHeaderComponent],
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SettingsComponent {}
