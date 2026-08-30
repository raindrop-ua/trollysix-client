import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { firstValueFrom } from 'rxjs';

import { Weather } from '../models/weather.model';

import { WeatherApiService } from './weather-api.service';

describe('WeatherApiService', () => {
  let service: WeatherApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherApiService, provideHttpClientTesting()],
    });

    service = TestBed.inject(WeatherApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    TestBed.resetTestingModule();
  });

  it('requests weather for the selected stop and direction', async () => {
    const request = firstValueFrom(service.getWeather('stop-1', 'forward'));
    const req = http.expectOne(
      (candidate) =>
        candidate.url === 'http://localhost:4450/weather' &&
        candidate.params.get('stopId') === 'stop-1' &&
        candidate.params.get('direction') === 'forward',
    );
    const weather: Weather = {
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

    req.flush({ statusCode: 200, message: 'success', data: weather });

    await expect(request).resolves.toEqual(weather);
  });
});
