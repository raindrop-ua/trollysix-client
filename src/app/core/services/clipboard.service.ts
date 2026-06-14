import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Service } from '@angular/core';

export type ClipboardCopyResult =
  | { ok: true }
  | { ok: false; reason: 'empty' | 'not_browser' | 'not_supported' | 'failed' };

@Service()
export class ClipboardService {
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  isSupported(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!navigator?.clipboard?.writeText || !!this.doc?.execCommand;
  }

  async copy(text: string): Promise<ClipboardCopyResult> {
    if (!text) return { ok: false, reason: 'empty' };
    if (!isPlatformBrowser(this.platformId))
      return { ok: false, reason: 'not_browser' };

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return { ok: true };
      }
    } catch {
      // continue to fallback
    }

    // fallback
    try {
      const textarea = this.doc.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';
      this.doc.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const ok = this.doc.execCommand?.('copy') ?? false;
      this.doc.body.removeChild(textarea);

      return ok ? { ok: true } : { ok: false, reason: 'failed' };
    } catch {
      return { ok: false, reason: 'failed' };
    }
  }
}
