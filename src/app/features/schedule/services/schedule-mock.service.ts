import { Injectable, inject } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import {ClockService} from "../../../core/services/clock.service";
import {Departure, Status} from "../components/schedule-controls/departure.model";

@Injectable({ providedIn: 'root' })
export class ScheduleMockService {
  private readonly clock = inject(ClockService);

  private readonly times: string[] = [
    '6:00',
    '6:12',
    '6:24',
    '6:38',
    '6:52',
    '7:06',
    '7:19',
    '7:33',
    '7:47',
    '8:00',
    '8:14',
    '8:28',
    '8:42',
    '8:55',
    '9:11',
    '9:26',
    '9:41',
    '10:16',
    '10:45',
    '11:13',
    '11:41',
    '12:08',
    '12:36',
    '13:03',
    '13:31',
    '14:00',
    '14:28',
    '14:41',
    '14:55',
    '15:09',
    '15:23',
    '15:37',
    '15:50',
    '16:05',
    '16:18',
    '16:31',
    '16:45',
    '16:59',
    '17:13',
    '17:26',
    '17:40',
    '17:54',
    '18:10',
    '18:23',
    '18:36',
    '18:50',
    '19:06',
    '19:35',
    '19:57',
    '20:22',
  ];

  readonly departures$ = this.clock.now$.pipe(
    map((now) => this.times.map<Departure>((t) => ({
      time: t,
      status: statusFor(now, toTodayDate(t, now)),
    }))),
    shareReplay({ bufferSize: 1, refCount: false }),
  );
}

function toTodayDate(hhmm: string, now: Date): Date {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  return d;
}

/** Rules:
 * < 0 min → Past
 * 0..5 min → Now
 * 6..20 min → Soon
 * ≥21 min → Coming
 */
function statusFor(now: Date, dep: Date): Status {
  const diffMinutes = Math.floor((dep.getTime() - now.getTime()) / 60000);
  if (diffMinutes < 0) return Status.Past;
  if (diffMinutes <= 5) return Status.Now;
  if (diffMinutes <= 20) return Status.Soon;
  return Status.Coming;
}
