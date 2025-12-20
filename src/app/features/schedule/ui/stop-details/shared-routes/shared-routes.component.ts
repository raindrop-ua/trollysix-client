import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Stop } from '../../../data-access/models/stop.model';

@Component({
  selector: 'app-shared-routes',
  imports: [],
  templateUrl: './shared-routes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block h-full' },
})
export class SharedRoutesComponent {
  stop = input.required<Stop>();
}
