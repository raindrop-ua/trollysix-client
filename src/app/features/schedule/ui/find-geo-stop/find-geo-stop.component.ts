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
  selector: 'app-find-geo-stop',
  imports: [SvgIconComponent, BtnDirective],
  providers: [ClosestStopService],
  templateUrl: './find-geo-stop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FindGeoStopComponent {
  protected readonly geolocation = inject(GeolocationService);
  private closestStopService = inject(ClosestStopService);

  onClick() {
    this.closestStopService.findAndSelectStop();
  }
}
