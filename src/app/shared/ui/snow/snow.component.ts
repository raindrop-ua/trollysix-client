import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { SnowService } from '../../services/snow.service';

@Component({
  selector: 'trollysix-snow',
  imports: [],
  templateUrl: './snow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class SnowComponent {
  public snowService: SnowService = inject(SnowService);
}
