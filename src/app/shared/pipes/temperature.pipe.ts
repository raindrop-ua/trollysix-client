import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';

    if (value === 0) {
      return '0°C';
    }
    return (value > 0 ? '+' : '-') + Math.abs(value) + '°C';
  }
}
