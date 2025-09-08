import { Injectable, effect, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<Theme>('light');

  constructor() {
    if (!this.isBrowser) return;

    const saved = this.getSavedTheme();
    const initial: Theme =
      saved ??
      (typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');

    this.theme.set(initial);
    this.apply(initial);
    this.persist(initial);

    effect(() => {
      const t = this.theme();
      this.apply(t);
      this.persist(t);
    });
  }

  toggle(): void {
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
    try {
      localStorage.setItem(this.THEME_KEY, mode);
    } catch {
      /* empty */
    }
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `theme=${mode}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }

  private getSavedTheme(): Theme | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem(this.THEME_KEY);
      return raw === 'light' || raw === 'dark' ? raw : null;
    } catch {
      return null;
    }
  }
}
