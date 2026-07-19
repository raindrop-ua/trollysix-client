import { Service, signal, untracked } from '@angular/core';

@Service()
export class BrowserStorageActivityService {
  private readonly minVisibleMs = 1_000;
  private readonly activeOperations = signal(0);
  private readonly visible = signal(false);
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private visibleSince = 0;

  public readonly isActive = this.visible.asReadonly();

  public track<T>(operation: () => T): T {
    untracked(() => this.begin());

    try {
      return operation();
    } finally {
      untracked(() => this.end());
    }
  }

  private begin(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    if (this.activeOperations() === 0) {
      this.visibleSince = Date.now();
      this.visible.set(true);
    }

    this.activeOperations.update((count) => count + 1);
  }

  private end(): void {
    const nextCount = Math.max(0, this.activeOperations() - 1);
    this.activeOperations.set(nextCount);

    if (nextCount > 0) {
      return;
    }

    const elapsedMs = Date.now() - this.visibleSince;
    const remainingMs = Math.max(0, this.minVisibleMs - elapsedMs);

    if (remainingMs === 0) {
      this.visible.set(false);
      return;
    }

    this.hideTimer = setTimeout(() => {
      this.visible.set(false);
      this.hideTimer = null;
    }, remainingMs);
  }
}
