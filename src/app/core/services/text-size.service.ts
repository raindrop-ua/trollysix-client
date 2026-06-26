import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, computed, inject, signal, Service } from '@angular/core';

export type FontSizeMode = 'normal' | 'large';

@Service()
export class TextSizeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly storageKey = 'font-size-mode';
  private readonly bodyClass = 'font-large';
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly modeSignal = signal<FontSizeMode>('normal');

  public readonly mode = this.modeSignal.asReadonly();
  public readonly isLarge = computed(() => this.modeSignal() === 'large');

  constructor() {
    this.init();
  }

  public toggle(): void {
    this.setMode(this.isLarge() ? 'normal' : 'large');
  }

  public setMode(mode: FontSizeMode): void {
    this.modeSignal.set(mode);

    if (!this.isBrowser) {
      return;
    }

    this.syncBodyClass(mode);
    this.persist(mode);
  }

  private init(): void {
    if (!this.isBrowser) {
      return;
    }

    const savedMode = this.getSavedMode();
    this.modeSignal.set(savedMode);
    this.syncBodyClass(savedMode);
  }

  private getSavedMode(): FontSizeMode {
    try {
      return localStorage.getItem(this.storageKey) === 'large'
        ? 'large'
        : 'normal';
    } catch {
      return 'normal';
    }
  }

  private persist(mode: FontSizeMode): void {
    try {
      localStorage.setItem(this.storageKey, mode);
    } catch {
      // ignore
    }
  }

  private syncBodyClass(mode: FontSizeMode): void {
    this.document.documentElement.classList.toggle(
      this.bodyClass,
      mode === 'large',
    );
  }
}
