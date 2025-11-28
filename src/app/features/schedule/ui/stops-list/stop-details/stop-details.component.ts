import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { SvgIconComponent } from '../../../../../shared/components/svg-icon/svg-icon.component';
import { TemperaturePipe } from '../../../../../shared/pipes/temperature.pipe';
import { Stop } from '../../../data-access/models/stop.model';

@Component({
  selector: 'app-stop-details',
  imports: [TemperaturePipe, DecimalPipe, TitleCasePipe, SvgIconComponent],
  templateUrl: './stop-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StopDetailsComponent {
  stopData = input.required<Stop>();
}
