import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ConfigService<T extends Record<string, unknown>> {
  private readonly STORAGE_KEY = 'app_config';
  private readonly _config = signal<T>({} as T);
  readonly config = this._config.asReadonly();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    effect(() => {
      const currentConfig = this._config();
      if (this.isBrowser && Object.keys(currentConfig).length > 0) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentConfig));
      }
    });
  }

  public init(defaultConfig: T): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const initialData = saved
      ? { ...defaultConfig, ...JSON.parse(saved) }
      : defaultConfig;
    this._config.set(initialData);

    if (this.isBrowser) {
      window.addEventListener('storage', (event) => {
        if (event.key === this.STORAGE_KEY && event.newValue) {
          this._config.set(JSON.parse(event.newValue));
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
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
