import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TemperaturePipe } from '../../../../shared/pipes/temperature.pipe';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { StopDetails } from '../../data-access/models/stop-details.model';

@Component({
  selector: 'app-stop-details',
  imports: [TemperaturePipe, DecimalPipe, SvgIconComponent],
  templateUrl: './stop-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopDetailsComponent {
  stopData = input.required<StopDetails>();
}
