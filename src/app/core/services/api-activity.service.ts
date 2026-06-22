import { Service, signal } from '@angular/core';

@Service()
export class ApiActivityService {
  private readonly minVisibleMs = 1000;
  private readonly activeRequests = signal(0);
  private readonly visible = signal(false);
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private visibleSince = 0;

  readonly isActive = this.visible.asReadonly();

  begin(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    if (this.activeRequests() === 0) {
      this.visibleSince = Date.now();
      this.visible.set(true);
    }

    this.activeRequests.update((count) => count + 1);
  }

  end(): void {
    const nextCount = Math.max(0, this.activeRequests() - 1);
    this.activeRequests.set(nextCount);

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
