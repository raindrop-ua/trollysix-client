import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { SnowService } from '@features/home/data-access/services/snow.service';

@Component({
  selector: 'trollysix-snow',
  imports: [],
  templateUrl: './snow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SnowComponent {
  public snowService: SnowService = inject(SnowService);
}
