import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GenericHeaderComponent } from '../../../../shared/components/sections/generic-header/generic-header.component';

@Component({
  selector: 'app-not-found',
  imports: [GenericHeaderComponent],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class NotFoundComponent {}
