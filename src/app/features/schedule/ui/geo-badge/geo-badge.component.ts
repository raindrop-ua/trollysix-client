import { Component, computed, input } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-geo-badge',
  imports: [SvgIconComponent, DecimalPipe],
  templateUrl: './geo-badge.component.html',
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
