import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { GenericHeaderComponent } from '../../../shared/ui/sections/generic-header/generic-header.component';

@Component({
  selector: 'app-settings',
  imports: [GenericHeaderComponent],
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class SettingsComponent {}
