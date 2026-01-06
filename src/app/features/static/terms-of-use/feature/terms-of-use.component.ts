import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { GenericHeaderComponent } from '../../../../shared/ui/sections/generic-header/generic-header.component';

@Component({
  selector: 'trollysix-terms-of-use',
  imports: [GenericHeaderComponent],
  templateUrl: './terms-of-use.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class TermsOfUseComponent {}
