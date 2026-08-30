import { describe, expect, it } from 'vitest';

import { parseWeatherResponse } from './weather-api.contract';

describe('weather-api.contract', () => {
  const weather = {
    temperature: 28.61,
    description: 'broken clouds',
    icon: '04d',
    feelsLike: 27.33,
    pressure: 1020,
    humidity: 25,
    sunrise: 1788058430000,
    sunset: 1788107219000,
    windSpeed: 2.98,
    windDeg: 103,
    windGust: 3.4,
  };

  it('parses a valid weather payload', () => {
    expect(parseWeatherResponse(weather)).toEqual(weather);
  });

  it('rejects an invalid weather payload', () => {
    expect(() =>
      parseWeatherResponse({ ...weather, temperature: '28.61' }),
    ).toThrowError('Invalid weather API response');
  });
});
