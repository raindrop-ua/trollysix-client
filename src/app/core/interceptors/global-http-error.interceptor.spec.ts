import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { defer, firstValueFrom, throwError } from 'rxjs';

import { ToastService } from '@core/services/toast.service';

import { globalHttpErrorInterceptor } from './global-http-error.interceptor';

describe('globalHttpErrorInterceptor', () => {
  const runInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    return TestBed.runInInjectionContext(() =>
      globalHttpErrorInterceptor(req, next),
    );
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  it('does not retry non-idempotent requests', async () => {
    const toastMock: Pick<ToastService, 'error'> = {
      error: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: ToastService, useValue: toastMock }],
    });

    const req = new HttpRequest('POST', '/api/items', {});
    const error = new HttpErrorResponse({
      status: 503,
      statusText: 'Service Unavailable',
      url: '/api/items',
    });

    let attempts = 0;
    const next: HttpHandlerFn = vi.fn(() =>
      defer(() => {
        attempts++;
        return throwError(() => error);
      }),
    );

    const rejected = firstValueFrom(runInterceptor(req, next)).catch((e) => e);
    await vi.runAllTimersAsync();

    expect(await rejected).toBe(error);
    expect(attempts).toBe(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(toastMock.error).toHaveBeenCalledWith('Failed to load data', {
      title: 'Error',
    });
  });

  it('retries transient GET errors up to max attempts', async () => {
    const toastMock: Pick<ToastService, 'error'> = {
      error: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: ToastService, useValue: toastMock }],
    });

    const req = new HttpRequest('GET', '/api/items');
    const error = new HttpErrorResponse({
      status: 503,
      statusText: 'Service Unavailable',
      url: '/api/items',
    });

    let attempts = 0;
    const next: HttpHandlerFn = vi.fn(() =>
      defer(() => {
        attempts++;
        return throwError(() => error);
      }),
    );

    const rejected = firstValueFrom(runInterceptor(req, next)).catch((e) => e);
    await vi.advanceTimersByTimeAsync(500 + 1000 + 2000);

    expect(await rejected).toBe(error);
    expect(attempts).toBe(4);
    expect(next).toHaveBeenCalledTimes(1);
    expect(toastMock.error).toHaveBeenCalledWith('Failed to load data', {
      title: 'Error',
    });
  });

  it('shows network-specific toast for status 0 errors', async () => {
    const toastMock: Pick<ToastService, 'error'> = {
      error: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: ToastService, useValue: toastMock }],
    });

    const req = new HttpRequest('GET', '/api/items');
    const error = new HttpErrorResponse({
      status: 0,
      statusText: 'Unknown Error',
      url: '/api/items',
    });

    const next: HttpHandlerFn = vi.fn(() => throwError(() => error));

    const rejected = firstValueFrom(runInterceptor(req, next)).catch((e) => e);
    await vi.advanceTimersByTimeAsync(500 + 1000 + 2000);

    expect(await rejected).toBe(error);
    expect(toastMock.error).toHaveBeenCalledWith(
      'Network error. Please check your connection.',
      { title: 'Connection issue' },
    );
  });
});
