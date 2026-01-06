import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Stop } from '../../../data-access/models/stop.model';

@Component({
  selector: 'trollysix-shared-routes',
  imports: [],
  templateUrl: './shared-routes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
})
export class SharedRoutesComponent {
  stop = input.required<Stop>();
}
