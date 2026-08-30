import { Weather } from './weather.model';

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function parseWeatherResponse(value: unknown): Weather {
  if (
    !isRecord(value) ||
    !isFiniteNumber(value['temperature']) ||
    typeof value['description'] !== 'string' ||
    typeof value['icon'] !== 'string' ||
    !isFiniteNumber(value['feelsLike']) ||
    !isFiniteNumber(value['pressure']) ||
    !isFiniteNumber(value['humidity']) ||
    !isFiniteNumber(value['sunrise']) ||
    !isFiniteNumber(value['sunset']) ||
    !isFiniteNumber(value['windSpeed']) ||
    !isFiniteNumber(value['windDeg']) ||
    !isFiniteNumber(value['windGust'])
  ) {
    throw new Error('Invalid weather API response');
  }

  return {
    temperature: value['temperature'],
    description: value['description'],
    icon: value['icon'],
    feelsLike: value['feelsLike'],
    pressure: value['pressure'],
    humidity: value['humidity'],
    sunrise: value['sunrise'],
    sunset: value['sunset'],
    windSpeed: value['windSpeed'],
    windDeg: value['windDeg'],
    windGust: value['windGust'],
  };
}
