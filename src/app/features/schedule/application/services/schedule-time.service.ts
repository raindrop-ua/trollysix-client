import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

import { SCHEDULE_TIME_ZONE } from '../../data-access/models/timetable.model';

export interface ScheduleDepartureTime {
  readonly departureAt: Date;
  readonly time: string;
}

export function resolveScheduleDeparture(
  time: string,
  targetTimeZone: string,
  now: Date = new Date(),
): ScheduleDepartureTime {
  const [hours, minutes] = time.split(':').map(Number);
  const scheduleNow = TZDate.tz(SCHEDULE_TIME_ZONE, now);
  const departureAt = new TZDate(
    scheduleNow.getFullYear(),
    scheduleNow.getMonth(),
    scheduleNow.getDate(),
    hours,
    minutes,
    SCHEDULE_TIME_ZONE,
  );

  return {
    departureAt: new Date(departureAt.getTime()),
    time: format(departureAt.withTimeZone(targetTimeZone), 'HH:mm'),
  };
}

@Injectable({ providedIn: 'root' })
export class ScheduleTimeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly targetTimeZone = isPlatformBrowser(this.platformId)
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : SCHEDULE_TIME_ZONE;

  public resolve(time: string, now: Date = new Date()): ScheduleDepartureTime {
    return resolveScheduleDeparture(time, this.targetTimeZone, now);
  }

  public format(time: string, now: Date = new Date()): string {
    return this.resolve(time, now).time;
  }
}
