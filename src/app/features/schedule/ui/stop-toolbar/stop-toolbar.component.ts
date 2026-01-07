import {
  Component,
  inject,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ClipboardService } from '@app/core/services/clipboard.service';
import { BtnDirective } from '@app/shared/directives/btn.directive';
import { TooltipDirective } from '@app/shared/directives/tooltip.directive';
import { SvgIconComponent } from '@app/shared/ui';
import { ClosestStopService } from '@features/schedule/services/closest-stop.service';
import { GeolocationService } from '@features/schedule/services/geolocation.service';
import { ShareScheduleService } from '@features/schedule/services/share-schedule.service';

@Component({
  selector: 'trollysix-stop-toolbar',
  imports: [BtnDirective, TooltipDirective, SvgIconComponent],
  providers: [ClosestStopService],
  templateUrl: './stop-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopToolbarComponent {
  public readonly geolocationService = inject(GeolocationService);
  private readonly closestStopService = inject(ClosestStopService);
  private readonly shareScheduleService = inject(ShareScheduleService);
  private readonly clipboardService = inject(ClipboardService);

  readonly canShare = computed(() => this.clipboardService.isSupported());
  readonly canFind = computed(() =>
    this.geolocationService.isGeolocationAvailable(),
  );

  public onFindStop() {
    this.closestStopService.findAndSelectStop();
  }

  public onShare() {
    this.shareScheduleService.shareSchedule();
  }
}
