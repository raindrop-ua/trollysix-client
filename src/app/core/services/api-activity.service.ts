import { computed, Service, signal } from '@angular/core';

@Service()
export class ApiActivityService {
  private readonly pendingRequests = signal(0);

  readonly isActive = computed(() => this.pendingRequests() > 0);

  begin(): void {
    this.pendingRequests.update((count) => count + 1);
  }

  end(): void {
    this.pendingRequests.update((count) => Math.max(0, count - 1));
  }
}
