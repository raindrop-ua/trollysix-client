import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number | string | undefined | null): string {
    if (value == null || typeof value === 'undefined') return '';

    if (typeof value === 'string') {
      value = Number(value);
    }

    value = Math.round(value);

    if (value === 0) {
      return '0°C';
    }

    return (value > 0 ? '+' : '-') + Math.abs(value) + '°C';
  }
}
