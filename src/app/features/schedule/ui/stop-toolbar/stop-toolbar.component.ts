import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { ClosestStopService } from '../../services/closest-stop.service';
import { BtnDirective } from '../../../../shared/directives/btn.directive';

@Component({
  selector: 'app-stop-toolbar',
  imports: [SvgIconComponent, BtnDirective],
  providers: [ClosestStopService],
  templateUrl: './stop-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StopToolbarComponent {
  protected readonly geolocation = inject(GeolocationService);
  private closestStopService = inject(ClosestStopService);

  onFindStop() {
    this.closestStopService.findAndSelectStop();
  }

  onCopy() {
    /* todo */
  }
}
