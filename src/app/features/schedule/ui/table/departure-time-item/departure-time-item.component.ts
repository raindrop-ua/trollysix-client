import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Departure } from '../../../data-access/models/departure.model';

@Component({
  selector: 'app-departure-time-item',
  imports: [],
  templateUrl: './departure-time-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureTimeItemComponent {
  departure = input.required<Departure>();
}
