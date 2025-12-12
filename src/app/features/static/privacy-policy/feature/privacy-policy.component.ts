import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { GenericHeaderComponent } from '../../../../shared/components/sections/generic-header/generic-header.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [GenericHeaderComponent],
  templateUrl: './privacy-policy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrivacyPolicyComponent {}
