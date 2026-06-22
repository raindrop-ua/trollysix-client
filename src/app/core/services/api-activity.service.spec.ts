import { describe, expect, it, vi } from 'vitest';

import { ApiActivityService } from './api-activity.service';

describe('ApiActivityService', () => {
  it('keeps activity visible for a minimum time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);

    const service = new ApiActivityService();

    service.begin();
    service.end();

    expect(service.isActive()).toBe(true);

    vi.advanceTimersByTime(699);
    expect(service.isActive()).toBe(true);

    vi.advanceTimersByTime(1);
    expect(service.isActive()).toBe(false);

    vi.useRealTimers();
  });

  it('cancels a scheduled hide when another request starts', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);

    const service = new ApiActivityService();

    service.begin();
    service.end();
    vi.advanceTimersByTime(300);

    service.begin();
    vi.advanceTimersByTime(400);

    expect(service.isActive()).toBe(true);

    service.end();
    vi.advanceTimersByTime(299);
    expect(service.isActive()).toBe(true);

    vi.advanceTimersByTime(1);
    expect(service.isActive()).toBe(false);

    vi.useRealTimers();
  });
});
