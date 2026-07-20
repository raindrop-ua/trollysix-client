import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { copy } from '@core/content';

import { VehiclesTrackingService } from '@features/schedule/application/services/vehicles-tracking.service';
import { VehiclesTrackingApiService } from '@features/schedule/data-access/services/vehicles-tracking-api.service';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-vehicles-tracking',
  imports: [DatePipe, SvgIconComponent],
  providers: [VehiclesTrackingApiService, VehiclesTrackingService],
  templateUrl: './vehicles-tracking.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class VehiclesTrackingComponent {
  public readonly copySchedule = copy('schedule');
  public readonly tracking = inject(VehiclesTrackingService).state;
  public readonly response = computed(() => {
    const state = this.tracking();

    return state.status === 'ready' ? state.response : null;
  });
}
