import { Injector, PLATFORM_ID } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { describe, expect, it } from 'vitest';

import { ClockService } from './clock.service';

describe('ClockService (Injector.create)', () => {
  it('emits Date once', async () => {
    const injector = Injector.create({
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: ClockService, deps: [PLATFORM_ID] },
      ],
    });

    const svc = injector.get(ClockService);

    const value = await firstValueFrom(svc.now$.pipe(take(1)));
    expect(value).toBeInstanceOf(Date);
  });
});
