import { isPlatformBrowser } from '@angular/common';
import { effect, inject, signal, PLATFORM_ID, Service } from '@angular/core';

import { BrowserStorageActivityService } from '@core/services/browser-storage-activity.service';

export type Theme = 'light' | 'dark';

@Service()
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageActivity = inject(BrowserStorageActivityService);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  public readonly theme = signal<Theme>('light');

  constructor() {
    if (!this.isBrowser) return;

    const saved = this.getSavedTheme();
    const initial: Theme =
      saved ??
      (typeof matchMedia === 'function' &&
      matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');

    this.theme.set(initial);
    this.apply(initial);

    effect(() => {
      const t = this.theme();
      this.apply(t);
      this.persist(t);
    });
  }

  public toggle(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  private apply(mode: Theme): void {
    if (!this.isBrowser) return;
    const html = document.documentElement;
    html.classList.toggle('dark', mode === 'dark');
    html.setAttribute('data-theme', mode);
    html.style.colorScheme = mode;
  }

  private persist(mode: Theme): void {
    if (!this.isBrowser) return;
    this.storageActivity.track(() => {
      try {
        localStorage.setItem(this.THEME_KEY, mode);
      } catch {
        /* empty */
      }
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `theme=${mode}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    });
  }

  private getSavedTheme(): Theme | null {
    if (!this.isBrowser) return null;
    return this.storageActivity.track(() => {
      try {
        const raw = localStorage.getItem(this.THEME_KEY);
        return raw === 'light' || raw === 'dark' ? raw : null;
      } catch {
        return null;
      }
    });
  }
}
