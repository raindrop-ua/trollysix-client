import { Directive, ElementRef, Input, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input('appRevealOnScroll') delay: number | string | undefined;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private io?: IntersectionObserver;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    if (!this.isBrowser) return;

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.el.classList.add('reveal-preset');

    const delayMs =
      typeof this.delay === 'number'
        ? this.delay
        : this.delay
          ? parseInt(String(this.delay), 10) || 0
          : 0;

    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (delayMs > 0) {
              this.el.style.setProperty('--reveal-delay', `${delayMs}ms`);
            }
            this.el.classList.add('reveal');
            this.el.classList.remove('reveal-preset');
            this.io?.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -5% 0px',
      },
    );

    this.io.observe(this.el);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
