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
import { ClipboardService } from '../../../../core/services/clipboard.service';
import { ToastService } from '../../../../core/services/toast.service';

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
  private readonly toastService = inject(ToastService);
  private readonly clipboard = inject(ClipboardService);
  public showShareButton = input<boolean>(true);

  public onFindStop() {
    this.closestStopService.findAndSelectStop();
  }

  public onCopy() {
    const text = location.href;

    this.clipboard
      .copy(text)
      .then(() => {
        this.toastService.success(`Link successfully copied to clipboard`);
      })
      .catch(() => {
        this.toastService.error(`Link could not be copied to clipboard`);
      });
  }
}
