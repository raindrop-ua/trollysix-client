import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GenericHeaderComponent } from '../../../shared/ui/sections/generic-header/generic-header.component';

@Component({
  selector: 'trollysix-settings',
  imports: [GenericHeaderComponent],
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SettingsComponent {}
