import { Injectable, DestroyRef, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { SeoData } from '../models/seo-data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  private readonly DEFAULT_OG_IMAGE = `${environment.PUBLIC_URL}${environment.SEO_ASSETS}og-default.png`;

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data),
        map((data) => data['seo'] as SeoData | undefined),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((seo) => this.update(seo ?? {}));
  }

  public update(seo: SeoData): void {
    if (seo.title) this.titleService.setTitle(seo.title);

    if (seo.description) {
      this.metaService.updateTag({
        name: 'description',
        content: seo.description,
      });
    }

    if (seo.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: seo.keywords });
    }

    if (seo.ogTitle ?? seo.title) {
      this.metaService.updateTag({
        property: 'og:title',
        content: seo.ogTitle ?? seo.title!,
      });
    }

    if (seo.ogDescription ?? seo.description) {
      this.metaService.updateTag({
        property: 'og:description',
        content: seo.ogDescription ?? seo.description!,
      });
    }

    this.metaService.updateTag({
      property: 'og:image',
      content: seo.ogImage
        ? `${environment.PUBLIC_URL}${environment.SEO_ASSETS}${seo.ogImage}`
        : this.DEFAULT_OG_IMAGE,
    });
  }
}
