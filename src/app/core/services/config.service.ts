import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { filter, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService<T extends Record<string, unknown>> {
  private readonly STORAGE_KEY = 'app_config';
  private readonly _config = signal<T>({} as T);
  readonly config = this._config.asReadonly();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);
  private storageListenerAttached = false;

  constructor() {
    effect(() => {
      const currentConfig = this._config();
      if (this.isBrowser && Object.keys(currentConfig).length > 0) {
        this.setStorageItem(JSON.stringify(currentConfig));
      }
    });
  }

  public init(defaultConfig: T): void {
    const saved = this.getStorageItem();
    const savedConfig = saved ? this.parseStoredConfig(saved) : null;
    const initialData = savedConfig
      ? { ...defaultConfig, ...savedConfig }
      : defaultConfig;
    this._config.set(initialData);

    if (this.isBrowser && !this.storageListenerAttached) {
      this.storageListenerAttached = true;
      fromEvent<StorageEvent>(window, 'storage')
        .pipe(
          filter(
            (event) =>
              event.key === this.STORAGE_KEY && event.newValue !== null,
          ),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((event) => {
          const next = this.parseStoredConfig(event.newValue!);
          if (next) {
            this._config.set(next);
          }
        });
    }
  }

  public updateConfig(patch: Partial<T>): void {
    this._config.update((current) => ({ ...current, ...patch }));
  }

  public select<K extends keyof T>(key: K) {
    return computed(() => this._config()[key]);
  }

  public reset(defaultConfig: T): void {
    this._config.set(defaultConfig);
    this.removeStorageItem();
  }

  private getStorageItem(): string | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch {
      return null;
    }
  }

  private setStorageItem(value: string): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, value);
    } catch {
      /* empty */
    }
  }

  private removeStorageItem(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      /* empty */
    }
  }

  private parseStoredConfig(value: string): T | null {
    try {
      const parsed: unknown = JSON.parse(value);
      if (parsed && typeof parsed === 'object') {
        return parsed as T;
      }

      return null;
    } catch {
      return null;
    }
  }
}
