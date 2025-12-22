import {
  Component,
  inject,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { ClosestStopService } from '../../services/closest-stop.service';
import { ShareScheduleService } from '../../services/share-schedule.service';
import { ClipboardService } from '../../../../core/services/clipboard.service';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { BtnDirective } from '../../../../shared/directives/btn.directive';
import { SvgIconComponent } from '../../../../shared/components';

@Component({
  selector: 'app-stop-toolbar',
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
