import { Injectable, signal } from '@angular/core';

import { COPY } from '@core/content/en';
import { VehicleFeature } from '@features/about/data-access/models/vehicle-feature';

@Injectable({
  providedIn: 'root',
})
export class VehicleFeaturesService {
  public features = signal<VehicleFeature[]>([
    {
      name: COPY.about.infrastructure.vehicleFeatures[0].name,
      ariaLabel: COPY.about.infrastructure.vehicleFeatures[0].ariaLabel,
      icon: 'accessibility',
    },
    {
      name: COPY.about.infrastructure.vehicleFeatures[1].name,
      ariaLabel: COPY.about.infrastructure.vehicleFeatures[1].ariaLabel,
      icon: 'speech',
    },
    {
      name: COPY.about.infrastructure.vehicleFeatures[2].name,
      ariaLabel: COPY.about.infrastructure.vehicleFeatures[2].ariaLabel,
      icon: 'battery-charging',
    },
  ]);
}
