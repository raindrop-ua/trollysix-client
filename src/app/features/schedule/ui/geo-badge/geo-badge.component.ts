import { DecimalPipe } from '@angular/common';
import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { TooltipDirective } from '@app/shared/directives/tooltip.directive';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-geo-badge',
  imports: [SvgIconComponent, DecimalPipe, TooltipDirective],
  templateUrl: './geo-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
