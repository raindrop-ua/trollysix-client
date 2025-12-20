import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly doc = inject(DOCUMENT);

  @Input('appTooltip') text: string | null | undefined = '';
  @Input() appTooltipPlacement: TooltipPlacement = 'top';
  @Input() appTooltipOffset = 8;
  @Input() appTooltipShowDelay = 150;
  @Input() appTooltipHideDelay = 80;
  @Input() appTooltipDisabled = false;
  @Input() appTooltipMaxWidth = 320;
  @Input() appTooltipInteractive = false;

  private tooltipEl: HTMLDivElement | null = null;

  private showTimer: number | null = null;
  private hideTimer: number | null = null;

  private rafId: number | null = null;

  private removeGlobalListeners: (() => void) | null = null;
  private ro: ResizeObserver | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearTimers();
      this.detachGlobalListeners();
      this.destroyTooltip();
    });
  }

  @HostListener('mouseenter')
  @HostListener('focusin')
  onEnter() {
    if (this.appTooltipDisabled) return;
    if (!this.getText()) return;
    this.scheduleShow();
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  onLeave() {
    this.scheduleHide();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.hideNow();
  }

  private getText(): string {
    return (this.text ?? '').trim();
  }

  private scheduleShow() {
    this.clearHideTimer();
    this.clearShowTimer();

    this.showTimer = window.setTimeout(() => {
      this.showNow();
    }, this.appTooltipShowDelay);
  }

  private scheduleHide() {
    this.clearShowTimer();
    this.clearHideTimer();

    this.hideTimer = window.setTimeout(() => {
      this.hideNow();
    }, this.appTooltipHideDelay);
  }

  private showNow() {
    const text = this.getText();
    if (!text || this.appTooltipDisabled) return;

    if (!this.tooltipEl) {
      this.createTooltip();
      this.attachGlobalListeners();
    }

    this.tooltipEl!.textContent = text;

    this.host.nativeElement.setAttribute('aria-label', text);

    this.tooltipEl!.style.opacity = '1';
    this.tooltipEl!.style.transform =
      'translate3d(var(--tx, 0px), var(--ty, 0px), 0)';

    this.updatePosition();
  }

  private hideNow() {
    this.clearTimers();
    if (!this.tooltipEl) return;

    this.tooltipEl.style.opacity = '0';

    window.setTimeout(() => {
      if (!this.tooltipEl) return;
      if (this.tooltipEl.style.opacity === '0') {
        this.destroyTooltip();
        this.detachGlobalListeners();
      }
    }, 180);
  }

  private createTooltip() {
    const el = this.doc.createElement('div');
    el.setAttribute('role', 'tooltip');

    el.className = [
      'fixed',
      'z-[9999]',
      'pointer-events-none',
      'select-none',
      'rounded-xl',
      'border',
      'border-slate-200/70',
      'bg-white/95',
      'px-3',
      'py-2',
      'text-sm',
      'text-slate-900',
      'shadow-lg',
      'shadow-slate-900/10',
      'backdrop-blur',
      'dark:border-white/10',
      'dark:bg-slate-900/90',
      'dark:text-slate-100',
      'transition-opacity',
      'duration-150',
      'ease-out',
    ].join(' ');

    el.style.maxWidth = `${this.appTooltipMaxWidth}px`;
    el.style.opacity = '0';
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.willChange = 'transform, opacity';

    if (this.appTooltipInteractive) {
      el.classList.remove('pointer-events-none');
      el.classList.add('pointer-events-auto');
      el.addEventListener('mouseenter', () => this.clearHideTimer(), {
        passive: true,
      });
      el.addEventListener('mouseleave', () => this.scheduleHide(), {
        passive: true,
      });
    }

    this.doc.body.appendChild(el);
    this.tooltipEl = el;
  }

  private destroyTooltip() {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.ro?.disconnect();
    this.ro = null;

    if (this.tooltipEl) {
      this.tooltipEl.remove();
      this.tooltipEl = null;
    }
  }

  private attachGlobalListeners() {
    if (this.removeGlobalListeners) return;

    const onScroll = () => this.scheduleRafUpdate();
    const onResize = () => this.scheduleRafUpdate();

    window.addEventListener('scroll', onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener('resize', onResize, { passive: true });

    if ('ResizeObserver' in window) {
      this.ro = new ResizeObserver(() => this.scheduleRafUpdate());
      this.ro.observe(this.host.nativeElement);
    }

    this.removeGlobalListeners = () => {
      window.removeEventListener(
        'scroll',
        onScroll,
        true as unknown as EventListenerOptions,
      );
      window.removeEventListener('resize', onResize);
      this.ro?.disconnect();
      this.ro = null;
    };
  }

  private detachGlobalListeners() {
    this.removeGlobalListeners?.();
    this.removeGlobalListeners = null;
  }

  private scheduleRafUpdate() {
    if (!this.tooltipEl) return;
    if (this.rafId != null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.updatePosition();
    });
  }

  private updatePosition() {
    if (!this.tooltipEl) return;

    const hostRect = this.host.nativeElement.getBoundingClientRect();

    if (hostRect.width === 0 && hostRect.height === 0) {
      this.hideNow();
      return;
    }

    const tipRect = this.tooltipEl.getBoundingClientRect();
    const offset = this.appTooltipOffset;

    let x;
    let y;

    switch (this.appTooltipPlacement) {
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

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const pad = 8;
    x = Math.min(Math.max(x, pad), vw - tipRect.width - pad);
    y = Math.min(Math.max(y, pad), vh - tipRect.height - pad);

    this.tooltipEl.style.setProperty('--tx', `${Math.round(x)}px`);
    this.tooltipEl.style.setProperty('--ty', `${Math.round(y)}px`);
    this.tooltipEl.style.transform =
      'translate3d(var(--tx, 0px), var(--ty, 0px), 0)';
  }

  private clearTimers() {
    this.clearShowTimer();
    this.clearHideTimer();
  }

  private clearShowTimer() {
    if (this.showTimer != null) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
  }

  private clearHideTimer() {
    if (this.hideTimer != null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }
}
