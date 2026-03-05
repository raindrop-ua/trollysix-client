import { Injectable } from '@angular/core';

import { WebHaptics, defaultPatterns } from 'web-haptics';

@Injectable({
  providedIn: 'root',
})
export class HapticsService {
  private haptics?: WebHaptics;
  private iosSwitch?: HTMLInputElement;

  constructor() {
    if (this.supportsVibration()) {
      this.haptics = new WebHaptics();
    }
  }

  private supportsVibration(): boolean {
    return typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }

  trigger() {
    // Android / поддерживаемые браузеры
    if (this.haptics) {
      this.haptics.trigger();
      return;
    }

    // iOS fallback
    this.iosHapticTap();
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

  private iosHapticTap() {
    if (typeof document === 'undefined') return;

    if (!this.iosSwitch) {
      const el = document.createElement('input');
      el.type = 'checkbox';
      el.setAttribute('switch', '');

      el.style.position = 'fixed';
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
      el.style.left = '-9999px';

      document.body.appendChild(el);
      this.iosSwitch = el;
    }

    this.iosSwitch.checked = !this.iosSwitch.checked;
  }
}
