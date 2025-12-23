import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { GenericHeaderComponent } from '../../../../shared/components/sections/generic-header/generic-header.component';

@Component({
  selector: 'app-not-found',
  imports: [GenericHeaderComponent],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class NotFoundComponent {}
