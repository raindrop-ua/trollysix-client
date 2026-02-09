import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeUi',
  standalone: true,
})
export class TimeUiPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    const [hh, mm] = value.split(':');

    if (!hh || !mm) return value;

    const hour = Number(hh);

    if (!Number.isFinite(hour)) return value;

    return `${hour}:${mm}`;
  }
}
