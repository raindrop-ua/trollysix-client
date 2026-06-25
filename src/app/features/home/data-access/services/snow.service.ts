import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  PLATFORM_ID,
  computed,
  inject,
  signal,
  Service,
} from '@angular/core';

export interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

@Service()
export class SnowService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly maxSnowflakes = 100;
  private readonly snowflakes = signal<Snowflake[]>([]);
  readonly getSnowflakes = computed(() => this.snowflakes());

  private rafId: number | null = null;
  private lastTs = 0;

  constructor() {
    this.initializeSnowflakes();

    if (isPlatformBrowser(this.platformId)) {
      this.startSnowfall();

      this.destroyRef.onDestroy(() => {
        if (this.rafId != null) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
      });
    }
  }

  private initializeSnowflakes(): void {
    this.snowflakes.set(
      Array.from({ length: this.maxSnowflakes }, (_, i) =>
        this.createSnowflake(i),
      ),
    );
  }

  private createSnowflake(id: number): Snowflake {
    const sizePx = Math.random() * 3 + 2;
    return {
      id,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: sizePx / 16,
      speed: (Math.random() + 0.5) * (sizePx / 3) * 15,
      opacity: Math.random() * 0.6 + 0.4,
    };
  }

  private startSnowfall(): void {
    const tick = (ts: number) => {
      const dt = this.lastTs
        ? Math.min((ts - this.lastTs) / 1000, 0.05)
        : 1 / 60;
      this.lastTs = ts;

      this.snowflakes.update((flakes) =>
        flakes.map((flake) => {
          const y = flake.y + flake.speed * dt;
          const wind = Math.sin((y + flake.id * 10) / 40) * 0.15;
          const x = flake.x + wind * dt * 30;

          if (y > 100) {
            return { ...flake, y: -5, x: Math.random() * 100 };
          }

          return { ...flake, x, y };
        }),
      );

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }
}
