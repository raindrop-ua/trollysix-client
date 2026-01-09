import { Injectable, signal } from '@angular/core';

import { VehicleFeature } from '@features/about/data-access/models/vehicle-feature';

@Injectable({ providedIn: 'root' })
export class VehicleFeaturesService {
  public features = signal<VehicleFeature[]>([
    {
      name: 'Accessibility',
      ariaLabel: 'Accessibility',
      icon: 'accessibility',
    },
    {
      name: 'Onboard Announcement System',
      ariaLabel: 'Onboard Announcement System',
      icon: 'speech',
    },
    {
      name: 'Autonomous Operation',
      ariaLabel: 'Autonomous Operation',
      icon: 'battery-charging',
    },
  ]);
}
