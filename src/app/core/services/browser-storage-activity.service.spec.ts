import { effect, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { describe, expect, it, vi } from 'vitest';

import { BrowserStorageActivityService } from './browser-storage-activity.service';

describe('BrowserStorageActivityService', () => {
  it('tracks an operation and keeps activity visible for a minimum time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);

    const service = new BrowserStorageActivityService();
    const result = service.track(() => 'saved');

    expect(result).toBe('saved');
    expect(service.isActive()).toBe(true);

    vi.advanceTimersByTime(999);
    expect(service.isActive()).toBe(true);

    vi.advanceTimersByTime(1);
    expect(service.isActive()).toBe(false);

    vi.useRealTimers();
  });

  it('ends activity when an operation throws', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);

    const service = new BrowserStorageActivityService();

    expect(() =>
      service.track(() => {
        throw new Error('Storage unavailable');
      }),
    ).toThrow('Storage unavailable');

    vi.advanceTimersByTime(1_000);
    expect(service.isActive()).toBe(false);

    vi.useRealTimers();
  });

  it('restarts the minimum duration for a new operation', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);

    const service = new BrowserStorageActivityService();

    service.track(() => undefined);
    vi.advanceTimersByTime(300);
    service.track(() => undefined);
    vi.advanceTimersByTime(999);

    expect(service.isActive()).toBe(true);

    vi.advanceTimersByTime(1);
    expect(service.isActive()).toBe(false);

    vi.useRealTimers();
  });

  it('does not add its bookkeeping signals as effect dependencies', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    TestBed.resetTestingModule();

    const service = new BrowserStorageActivityService();
    const theme = signal('light');
    let effectRuns = 0;

    TestBed.runInInjectionContext(() => {
      effect(() => {
        theme();
        service.track(() => undefined);
        effectRuns += 1;
      });
    });

    TestBed.flushEffects();
    vi.advanceTimersByTime(1_000);
    TestBed.flushEffects();

    expect(effectRuns).toBe(1);

    theme.set('dark');
    TestBed.flushEffects();

    expect(effectRuns).toBe(2);

    TestBed.resetTestingModule();
    vi.useRealTimers();
  });
});
