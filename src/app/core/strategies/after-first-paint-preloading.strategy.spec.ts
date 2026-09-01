import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BehaviorSubject, firstValueFrom, of } from 'rxjs';

import { AfterFirstPaintPreloadingStrategy } from './after-first-paint-preloading.strategy';

describe('AfterFirstPaintPreloadingStrategy', () => {
  const setup = () => {
    const stable$ = new BehaviorSubject(false);
    const appRefMock = {
      isStable: stable$.asObservable(),
    } as Pick<ApplicationRef, 'isStable'>;

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AfterFirstPaintPreloadingStrategy,
        { provide: ApplicationRef, useValue: appRefMock },
      ],
    });

    return {
      strategy: TestBed.inject(AfterFirstPaintPreloadingStrategy),
      stable$,
    };
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns null and does not call load when preload is false', async () => {
    const { strategy } = setup();
    const load = vi.fn(() => of('loaded'));

    const value = await firstValueFrom(
      strategy.preload({ data: { preload: false } }, load),
    );

    expect(value).toBeNull();
    expect(load).not.toHaveBeenCalled();
  });

  it('loads eagerly after app becomes stable', async () => {
    const { strategy, stable$ } = setup();
    const load = vi.fn(() => of('loaded'));

    const promise = firstValueFrom(
      strategy.preload({ data: { preload: 'eager' } } as Route, load),
    );

    stable$.next(true);

    await expect(promise).resolves.toBe('loaded');
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('does not run idle preload work after unsubscribe', async () => {
    const { strategy, stable$ } = setup();
    const load = vi.fn(() => of('loaded'));

    const sub = strategy.preload({} as Route, load).subscribe();

    stable$.next(true);
    sub.unsubscribe();
    await vi.runAllTimersAsync();

    expect(load).not.toHaveBeenCalled();
  });
});
