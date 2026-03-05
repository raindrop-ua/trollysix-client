import { Injectable } from '@angular/core';

import { WebHaptics, defaultPatterns } from 'web-haptics';

@Injectable({
  providedIn: 'root',
})
export class HapticsService {
  private haptics?: WebHaptics;

  constructor() {
    if (this.isSupported()) {
      this.haptics = new WebHaptics({ debug: true });
    }
  }

  private isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }

  trigger(pattern = defaultPatterns.medium) {
    this.haptics?.trigger(pattern);
  }

  success() {
    this.haptics?.trigger(defaultPatterns.success);
  }

  error() {
    this.haptics?.trigger(defaultPatterns.error);
  }

  warning() {
    this.haptics?.trigger(defaultPatterns.warning);
  }
}
