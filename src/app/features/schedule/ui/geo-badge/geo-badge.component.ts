import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SvgIconComponent } from '../../../../shared/components';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
  selector: 'app-geo-badge',
  imports: [SvgIconComponent, DecimalPipe, TooltipDirective],
  templateUrl: './geo-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class GeoBadgeComponent {
  geo = input<{ lat: number; lon: number }>();

  readonly mapsUrl = computed(() => {
    const geo = this.geo();
    if (!geo) {
      return null;
    }
    const { lat, lon } = geo;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  });
}
