import { PLATFORM_ID, Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ConfigService } from './config.service';

interface AppConfig extends Record<string, unknown> {
  theme: 'light' | 'dark';
  fontSize: 'normal' | 'large';
}

describe('ConfigService', () => {
  const storageKey = 'app_config';

  const makeService = (platformId: 'browser' | 'server') => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });

    return TestBed.inject(ConfigService) as ConfigService<AppConfig>;
  };

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('merges stored config with defaults and exposes selected key', () => {
    localStorage.setItem(storageKey, JSON.stringify({ theme: 'dark' }));
    const svc = makeService('browser');

    svc.init({ theme: 'light', fontSize: 'normal' });

    expect(svc.config()).toEqual({ theme: 'dark', fontSize: 'normal' });

    const theme = svc.select('theme') as Signal<AppConfig['theme']>;
    expect(theme()).toBe('dark');
  });

  it('persists updates and reset in browser mode', async () => {
    const svc = makeService('browser');

    svc.init({ theme: 'light', fontSize: 'normal' });
    svc.updateConfig({ theme: 'dark' });

    await vi.waitFor(() => {
      expect(localStorage.getItem(storageKey)).toBe(
        JSON.stringify({ theme: 'dark', fontSize: 'normal' }),
      );
    });

    svc.reset({ theme: 'light', fontSize: 'normal' });
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it('handles invalid JSON from storage gracefully', () => {
    localStorage.setItem(storageKey, '{broken-json');
    const svc = makeService('browser');

    expect(() =>
      svc.init({ theme: 'light', fontSize: 'normal' }),
    ).not.toThrow();
    expect(svc.config()).toEqual({ theme: 'light', fontSize: 'normal' });
  });

  it('does not touch localStorage in server mode', () => {
    const getSpy = vi.spyOn(Storage.prototype, 'getItem');
    const setSpy = vi.spyOn(Storage.prototype, 'setItem');
    const removeSpy = vi.spyOn(Storage.prototype, 'removeItem');
    const svc = makeService('server');

    svc.init({ theme: 'light', fontSize: 'normal' });
    svc.updateConfig({ theme: 'dark' });
    svc.reset({ theme: 'light', fontSize: 'normal' });

    expect(getSpy).not.toHaveBeenCalled();
    expect(setSpy).not.toHaveBeenCalled();
    expect(removeSpy).not.toHaveBeenCalled();
  });
});
