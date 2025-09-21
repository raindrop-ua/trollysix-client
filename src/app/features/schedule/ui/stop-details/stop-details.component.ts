import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TemperaturePipe } from '../../../../shared/pipes/temperature.pipe';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { Stop } from '../../data-access/models/stop.model';

@Component({
  selector: 'app-stop-details',
  imports: [TemperaturePipe, DecimalPipe, SvgIconComponent],
  templateUrl: './stop-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StopDetailsComponent {
  stopData = input.required<Stop>();
}
