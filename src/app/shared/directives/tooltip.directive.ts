import {
  DestroyRef,
  Directive,
  ElementRef,
  booleanAttribute,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(focusin)': 'onEnter()',
    '(mouseleave)': 'onLeave()',
    '(focusout)': 'onLeave()',
    '(click)': 'hideNow()',
    '(document:keydown.escape)': 'hideNow()',
  },
})
export class TooltipDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  text = input<string | null | undefined>(undefined, { alias: 'appTooltip' });
  placement = input<TooltipPlacement>('top', { alias: 'appTooltipPlacement' });
  offset = input(8, { transform: numberAttribute, alias: 'appTooltipOffset' });
  showDelay = input(150, {
    transform: numberAttribute,
    alias: 'appTooltipShowDelay',
  });
  hideDelay = input(50, {
    transform: numberAttribute,
    alias: 'appTooltipHideDelay',
  });
  disabled = input(false, {
    transform: booleanAttribute,
    alias: 'appTooltipDisabled',
  });
  maxWidth = input(12, {
    transform: numberAttribute,
    alias: 'appTooltipMaxWidth',
  });
  interactive = input(false, {
    transform: booleanAttribute,
    alias: 'appTooltipInteractive',
  });

  private tooltipEl: HTMLDivElement | null = null;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private rafId: number | null = null;
  private ro: ResizeObserver | null = null;

  private readonly isTouchDevice =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window);

  constructor() {
    this.destroyRef.onDestroy(() => this.destroyTooltip());
  }

  onEnter() {
    if (this.isTouchDevice || this.disabled() || !this.getText()) return;
    this.scheduleShow();
  }

  onLeave() {
    this.scheduleHide();
  }

  private getText(): string {
    return (this.text() ?? '').trim();
  }

  private scheduleShow() {
    this.clearTimers();
    this.showTimer = setTimeout(() => this.showNow(), this.showDelay());
  }

  private scheduleHide() {
    this.clearTimers();
    this.hideTimer = setTimeout(() => this.hideNow(), this.hideDelay());
  }

  private showNow() {
    const text = this.getText();
    if (!text) return;

    if (!this.tooltipEl) {
      this.createTooltip();
      this.attachGlobalListeners();
    }

    this.tooltipEl!.textContent = text;
    this.host.nativeElement.setAttribute('aria-label', text);
    this.tooltipEl!.style.opacity = '1';

    this.updatePosition();
  }

  hideNow() {
    this.clearTimers();
    if (!this.tooltipEl) return;

    this.tooltipEl.style.opacity = '0';
    setTimeout(() => {
      if (this.tooltipEl?.style.opacity === '0') {
        this.destroyTooltip();
      }
    }, 150);
  }

  private createTooltip() {
    const el = this.doc.createElement('div');
    el.setAttribute('role', 'tooltip');

    el.className = `hidden md:block fixed z-45 pointer-events-none select-none rounded-xl baseline-borders
                    text-center baseline-surface backdrop-blur px-3 py-2 text-sm text-slate-900
                    dark:text-slate-100 shadow-md transition-opacity duration-150 ease-out`;

    el.style.maxWidth = `${this.maxWidth()}rem`;
    el.style.opacity = '0';
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.willChange = 'transform, opacity';

    if (this.interactive()) {
      el.classList.remove('pointer-events-none');
      el.classList.add('pointer-events-auto');
      el.addEventListener('mouseenter', () => this.clearTimers());
      el.addEventListener('mouseleave', () => this.scheduleHide());
    }

    this.doc.body.appendChild(el);
    this.tooltipEl = el;
  }

  private destroyTooltip() {
    this.clearTimers();
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.ro?.disconnect();
    this.detachGlobalListeners();
    this.tooltipEl?.remove();
    this.tooltipEl = null;
  }

  private attachGlobalListeners() {
    window.addEventListener('scroll', this.onViewportChange, {
      passive: true,
      capture: true,
    });
    window.addEventListener('resize', this.onViewportChange, { passive: true });

    if (typeof ResizeObserver !== 'undefined') {
      this.ro = new ResizeObserver(() => this.onViewportChange());
      this.ro.observe(this.host.nativeElement);
    }
  }

  private detachGlobalListeners() {
    window.removeEventListener('scroll', this.onViewportChange, true);
    window.removeEventListener('resize', this.onViewportChange);
  }

  private onViewportChange = () => {
    if (!this.tooltipEl || this.rafId) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.updatePosition();
    });
  };

  private updatePosition() {
    if (!this.tooltipEl) return;

    const hostRect = this.host.nativeElement.getBoundingClientRect();
    if (hostRect.width === 0 && hostRect.height === 0) {
      this.hideNow();
      return;
    }

    const tipRect = this.tooltipEl.getBoundingClientRect();
    const offset = this.offset();
    let x: number;
    let y: number;

    switch (this.placement()) {
      case 'bottom':
        x = hostRect.left + (hostRect.width - tipRect.width) / 2;
        y = hostRect.bottom + offset;
        break;
      case 'left':
        x = hostRect.left - tipRect.width - offset;
        y = hostRect.top + (hostRect.height - tipRect.height) / 2;
        break;
      case 'right':
        x = hostRect.right + offset;
        y = hostRect.top + (hostRect.height - tipRect.height) / 2;
        break;
      case 'top':
      default:
        x = hostRect.left + (hostRect.width - tipRect.width) / 2;
        y = hostRect.top - tipRect.height - offset;
        break;
    }

    const pad = 8;
    x = Math.min(Math.max(x, pad), window.innerWidth - tipRect.width - pad);
    y = Math.min(Math.max(y, pad), window.innerHeight - tipRect.height - pad);

    this.tooltipEl.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  }

  private clearTimers() {
    if (this.showTimer !== null) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }
}
