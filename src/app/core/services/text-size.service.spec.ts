import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from 'vitest';

import { TextSizeService } from './text-size.service';

describe('TextSizeService', () => {
  const setup = (platformId: 'browser' | 'server') => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        TextSizeService,
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });

    return TestBed.inject(TextSizeService);
  };

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('font-large');
  });

  it('initializes from stored mode and applies class', () => {
    localStorage.setItem('font-size-mode', 'large');

    const service = setup('browser');

    expect(service.mode()).toBe('large');
    expect(service.isLarge()).toBe(true);
    expect(document.documentElement.classList.contains('font-large')).toBe(
      true,
    );
  });

  it('toggle persists mode and updates class', () => {
    const service = setup('browser');
    service.toggle();

    expect(service.mode()).toBe('large');
    expect(localStorage.getItem('font-size-mode')).toBe('large');
    expect(document.documentElement.classList.contains('font-large')).toBe(
      true,
    );
  });

  it('does not mutate document in server mode', () => {
    const service = setup('server');
    service.setMode('large');

    expect(service.mode()).toBe('large');
    expect(localStorage.getItem('font-size-mode')).toBeNull();
    expect(document.documentElement.classList.contains('font-large')).toBe(
      false,
    );
  });
});
