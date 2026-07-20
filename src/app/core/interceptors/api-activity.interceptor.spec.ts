import { HttpContext, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { describe, expect, it, vi } from 'vitest';

import { EMPTY, throwError } from 'rxjs';

import { ApiActivityService } from '@core/services/api-activity.service';

import { apiActivityInterceptor } from './api-activity.interceptor';
import { SILENT_HTTP_REQUEST } from './silent-http-request.context';

describe('apiActivityInterceptor', () => {
  const runInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    return TestBed.runInInjectionContext(() =>
      apiActivityInterceptor(req, next),
    );
  };

  it('tracks api requests until they complete', () => {
    const activityService: Pick<ApiActivityService, 'begin' | 'end'> = {
      begin: vi.fn(),
      end: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: ApiActivityService, useValue: activityService }],
    });

    const req = new HttpRequest('GET', 'http://localhost:4450/stops');
    const next: HttpHandlerFn = vi.fn(() => EMPTY);

    runInterceptor(req, next).subscribe();

    expect(activityService.begin).toHaveBeenCalledTimes(1);
    expect(activityService.end).toHaveBeenCalledTimes(1);
  });

  it('stops tracking when api requests error', () => {
    const activityService: Pick<ApiActivityService, 'begin' | 'end'> = {
      begin: vi.fn(),
      end: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: ApiActivityService, useValue: activityService }],
    });

    const error = new Error('Request failed');
    const req = new HttpRequest('GET', 'http://localhost:4450/stops');
    const next: HttpHandlerFn = vi.fn(() => throwError(() => error));

    runInterceptor(req, next).subscribe({ error: () => undefined });

    expect(activityService.begin).toHaveBeenCalledTimes(1);
    expect(activityService.end).toHaveBeenCalledTimes(1);
  });

  it('ignores non-api requests', () => {
    const activityService: Pick<ApiActivityService, 'begin' | 'end'> = {
      begin: vi.fn(),
      end: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: ApiActivityService, useValue: activityService }],
    });

    const req = new HttpRequest('GET', '/assets/data.json');
    const next: HttpHandlerFn = vi.fn(() => EMPTY);

    runInterceptor(req, next).subscribe();

    expect(activityService.begin).not.toHaveBeenCalled();
    expect(activityService.end).not.toHaveBeenCalled();
  });

  it('does not track silent background api requests', () => {
    const activityService: Pick<ApiActivityService, 'begin' | 'end'> = {
      begin: vi.fn(),
      end: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: ApiActivityService, useValue: activityService }],
    });

    const req = new HttpRequest('GET', 'http://localhost:4450/vehicles', null, {
      context: new HttpContext().set(SILENT_HTTP_REQUEST, true),
    });
    const next: HttpHandlerFn = vi.fn(() => EMPTY);

    runInterceptor(req, next).subscribe();

    expect(activityService.begin).not.toHaveBeenCalled();
    expect(activityService.end).not.toHaveBeenCalled();
  });
});
