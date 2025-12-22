import {
  Component,
  inject,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { BtnDirective } from '../../../../shared/directives/btn.directive';
import { ClosestStopService } from '../../services/closest-stop.service';
import { SvgIconComponent } from '../../../../shared/components';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { ShareScheduleService } from '../../services/share-schedule.service';

@Component({
  selector: 'app-stop-toolbar',
  imports: [SvgIconComponent, BtnDirective, TooltipDirective],
  providers: [ClosestStopService],
  templateUrl: './stop-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopToolbarComponent {
  protected readonly geolocation = inject(GeolocationService);
  private closestStopService = inject(ClosestStopService);
  private readonly shareScheduleService = inject(ShareScheduleService);
  public showShareButton = input<boolean>(true);

  public onFindStop() {
    this.closestStopService.findAndSelectStop();
  }

  public onCopy() {
    this.shareScheduleService.shareSchedule();
  }
}
