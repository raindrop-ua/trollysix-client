import { Injector } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Event as RouterEvent,
  NavigationEnd,
  Router,
} from '@angular/router';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Observable, Subject, of } from 'rxjs';

import { environment } from '@environments/environment';

import { SeoService } from './seo.service';

describe('SeoService (Injector.create)', () => {
  const defaultOgImage = `${environment.PUBLIC_URL}${environment.SEO_ASSETS}og-vehicle.png`;
  const customOgImage = `${environment.PUBLIC_URL}${environment.SEO_ASSETS}custom-og.png`;

  const makeInjector = () => {
    const routerEvents$ = new Subject<RouterEvent>();
    const routeData$ = new Subject<Record<string, unknown>>();

    const leafRoute = {
      firstChild: null,
      data: routeData$ as Observable<Record<string, unknown>>,
    } as ActivatedRoute;

    const rootRoute = {
      firstChild: leafRoute,
      data: of({}),
    } as ActivatedRoute;

    const routerMock: Pick<Router, 'events'> = {
      events: routerEvents$ as Observable<RouterEvent>,
    };

    const titleMock: Pick<Title, 'setTitle'> = {
      setTitle: vi.fn(),
    };

    const metaMock: Pick<Meta, 'updateTag'> = {
      updateTag: vi.fn(),
    };

    const injector = Injector.create({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: rootRoute },
        { provide: Title, useValue: titleMock },
        { provide: Meta, useValue: metaMock },
        SeoService,
      ],
    });

    return {
      service: injector.get(SeoService),
      routeData$,
      routerEvents$,
      mocks: { titleMock, metaMock },
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('applies SEO from route data on navigation end', () => {
    const { routeData$, routerEvents$, mocks } = makeInjector();

    routerEvents$.next(new NavigationEnd(1, '/schedule', '/schedule'));
    routeData$.next({
      seo: {
        title: 'Schedule | TrollySix',
        description: 'Ultimate schedule',
        keywords: 'trolleybus, schedule',
      },
    });

    expect(mocks.titleMock.setTitle).toHaveBeenCalledWith(
      'Schedule | TrollySix',
    );
    expect(mocks.metaMock.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Ultimate schedule',
    });
    expect(mocks.metaMock.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: defaultOgImage,
    });
  });

  it('does not re-apply identical SEO payload twice', () => {
    const { routeData$, routerEvents$, mocks } = makeInjector();
    const sameSeo = {
      seo: {
        title: 'About | TrollySix',
        description: 'About route',
      },
    };

    routerEvents$.next(new NavigationEnd(1, '/about', '/about'));
    routeData$.next(sameSeo);
    routeData$.next(sameSeo);

    expect(mocks.titleMock.setTitle).toHaveBeenCalledTimes(1);
  });

  it('uses custom og:image when provided', () => {
    const { service, mocks } = makeInjector();

    service.update({
      title: 'Custom',
      ogImage: 'custom-og.png',
    });

    expect(mocks.metaMock.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: customOgImage,
    });
  });
});
