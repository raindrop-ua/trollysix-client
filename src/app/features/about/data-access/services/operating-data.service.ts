import { Injectable, signal } from '@angular/core';

import { OperatingDays } from '@features/about/data-access/models/operating-days.model';

@Injectable({ providedIn: 'root' })
export class OperatingDataService {
  public operating = signal<OperatingDays>({
    weekday: {
      title: 'Weekday',
      vehiclesQuantity: 8,
      intervals: ['13 - 14', '27 - 29', '13 - 14', '27 - 29'],
      operationHours: [
        '7:00 - 10:00',
        '10:00 - 15:00',
        '15:00 - 18:00',
        '18:00 onwards',
      ],
    },
    weekend: {
      title: 'Weekend',
      vehiclesQuantity: 4,
      intervals: ['26 - 28', '26 - 28', '26 - 28', '26 - 74'],
      operationHours: [
        '7:00 - 10:00',
        '10:00 - 15:00',
        '15:00 - 18:00',
        '18:00 onwards',
      ],
    },
  });
}
