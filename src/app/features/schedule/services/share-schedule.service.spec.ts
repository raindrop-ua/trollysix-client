import { Injector } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import {
  ClipboardService,
  ClipboardCopyResult,
} from '@core/services/clipboard.service';
import { ToastService } from '@core/services/toast.service';

import { scheduleFeature } from '../data-access/store/schedule.reducer';

import { ShareScheduleService } from './share-schedule.service';
interface StoreLike {
  select(selector: unknown): Observable<unknown>;
}

describe('ShareScheduleService (Injector.create)', () => {
  const makeInjector = (opts: {
    stopId: string | null;
    dayType: string | null;
    direction: string | null;
    copyOk?: boolean;
  }) => {
    const storeObj: StoreLike = {
      select: (selector: unknown) => {
        if (selector === scheduleFeature.selectSelectedStopId)
          return of(opts.stopId);
        if (selector === scheduleFeature.selectSelectedDayTypeName)
          return of(opts.dayType);
        if (selector === scheduleFeature.selectSelectedDirectionName)
          return of(opts.direction);
        return of(null);
      },
    };

    const storeSelectSpy = vi.spyOn(storeObj, 'select');

    const tree = {} as UrlTree;

    const routerMock: Pick<Router, 'createUrlTree' | 'serializeUrl'> = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      createUrlTree: vi.fn((_commands, _extras) => tree),
      serializeUrl: vi.fn(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_tree) => '/schedule?stopId=xxx&dayType=yyy&direction=zzz',
      ),
    };

    const copy = vi.fn<(text: string) => Promise<ClipboardCopyResult>>(
      async () => {
        return (opts.copyOk ?? true)
          ? { ok: true }
          : { ok: false, reason: 'failed' };
      },
    );

    const clipboardMock: Pick<ClipboardService, 'copy'> = { copy };

    const toastMock: Pick<ToastService, 'success' | 'error'> = {
      success: vi.fn(),
      error: vi.fn(),
    };

    const injector = Injector.create({
      providers: [
        { provide: Store, useValue: storeObj },
        { provide: Router, useValue: routerMock },
        { provide: ClipboardService, useValue: clipboardMock },
        { provide: ToastService, useValue: toastMock },
        ShareScheduleService,
      ],
    });

    return {
      svc: injector.get(ShareScheduleService),
      mocks: {
        storeSelectSpy,
        routerMock,
        clipboardMock,
        toastMock,
        copyMock: copy,
      },
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows "Nothing to share" if stop/day/direction missing', async () => {
    const { svc, mocks } = makeInjector({
      stopId: null,
      dayType: 'weekday',
      direction: 'forward',
    });

    svc.shareSchedule();

    expect(mocks.toastMock.error).toHaveBeenCalledWith(
      'Nothing to share yet (select stop/day/direction)',
    );

    expect(mocks.routerMock.createUrlTree).not.toHaveBeenCalled();
    expect(mocks.clipboardMock.copy).not.toHaveBeenCalled();
  });

  it('copies url and shows success when copy ok', async () => {
    const { svc, mocks } = makeInjector({
      stopId: 'stop-1',
      dayType: 'weekday',
      direction: 'forward',
      copyOk: true,
    });

    mocks.routerMock.serializeUrl = vi.fn(
      () => '/schedule?stopId=stop-1&dayType=weekday&direction=forward',
    );

    svc.shareSchedule();

    await vi.waitFor(() => {
      expect(mocks.clipboardMock.copy).toHaveBeenCalledTimes(1);
    });

    const copied = mocks.copyMock.mock.calls[0][0];

    expect(copied).toContain('/schedule?');
    expect(copied).toContain('stopId=stop-1');
    expect(copied).toContain('dayType=weekday');
    expect(copied).toContain('direction=forward');

    expect(mocks.toastMock.success).toHaveBeenCalledWith(
      'Link copied to clipboard',
    );
  });

  it('shows error when copy failed', async () => {
    const { svc, mocks } = makeInjector({
      stopId: 'stop-1',
      dayType: 'weekday',
      direction: 'forward',
      copyOk: false,
    });

    mocks.routerMock.serializeUrl = vi.fn(
      () => '/schedule?stopId=stop-1&dayType=weekday&direction=forward',
    );

    svc.shareSchedule();

    await vi.waitFor(() => {
      expect(mocks.copyMock).toHaveBeenCalledTimes(1);
    });

    expect(mocks.toastMock.error).toHaveBeenCalledWith(
      'Link could not be copied to clipboard',
    );
  });
});
