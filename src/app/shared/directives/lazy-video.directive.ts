import { Directive, ElementRef, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'video[appLazyVideo]',
  standalone: true,
})
export class LazyVideoDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLVideoElement>>(ElementRef).nativeElement;
  private io?: IntersectionObserver;
  private loaded = false;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);


  ngOnInit(): void {
    if (!this.isBrowser) return;

    if (typeof IntersectionObserver === 'undefined') {
      this.loadAndMaybePlay();
      return;
    }

    this.el.dataset['loaded'] = 'false';

    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.loadAndMaybePlay();
            this.io?.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );

    this.io.observe(this.el);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }

  private loadAndMaybePlay(): void {
    if (this.loaded) return;
    this.loaded = true;

    try {
      this.el.load();
    } catch { /* empty */ }

    this.el.dataset['loaded'] = 'true';

    if (this.el.muted) {
      this.el.play().catch(() => {});
    }
  }
}
