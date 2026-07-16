import {
  Component,
  inject,
  computed,
  ChangeDetectionStrategy,
  Signal,
} from '@angular/core';

import { copy } from '@core/content';
import { ClipboardService } from '@core/services/clipboard.service';

import { ClosestStopService } from '@features/schedule/application/services/closest-stop.service';
import { GeolocationService } from '@features/schedule/application/services/geolocation.service';
import { ShareScheduleService } from '@features/schedule/application/services/share-schedule.service';
import { BtnDirective } from '@shared/directives/btn.directive';
import { TooltipDirective } from '@shared/directives/tooltip.directive';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-stop-toolbar',
  imports: [BtnDirective, TooltipDirective, SvgIconComponent],
  providers: [ClosestStopService],
  templateUrl: './stop-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopToolbarComponent {
  public readonly copySchedule = copy('schedule');
  public readonly geolocationService: GeolocationService =
    inject(GeolocationService);
  private readonly closestStopService: ClosestStopService =
    inject(ClosestStopService);
  private readonly shareScheduleService: ShareScheduleService =
    inject(ShareScheduleService);
  private readonly clipboardService: ClipboardService =
    inject(ClipboardService);

  public readonly canShare: Signal<boolean> = computed(() =>
    this.clipboardService.isSupported(),
  );
  public readonly canFind: Signal<boolean> = computed(() =>
    this.geolocationService.isGeolocationAvailable(),
  );

  public onFindStop(): void {
    this.closestStopService.findAndSelectStop();
  }

  public onShare(): void {
    this.shareScheduleService.shareSchedule();
  }
}
