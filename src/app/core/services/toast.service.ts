import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  title?: string;
  type: ToastType;
  duration: number;
}

export interface ToastOptions {
  title?: string;
  type?: ToastType;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  private _idSeq = 0;

  readonly toasts = this._toasts.asReadonly();

  show(message: string, options: ToastOptions = {}): number {
    const id = ++this._idSeq;
    const toast: Toast = {
      id,
      message,
      title: options.title,
      type: options.type ?? 'info',
      duration: options.duration ?? 4000,
    };

    this._toasts.update((list) => [...list, toast]);

    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }

    return id;
  }

  success(message: string, options: Omit<ToastOptions, 'type'> = {}): number {
    return this.show(message, { ...options, type: 'success' });
  }

  error(message: string, options: Omit<ToastOptions, 'type'> = {}): number {
    return this.show(message, { ...options, type: 'error' });
  }

  info(message: string, options: Omit<ToastOptions, 'type'> = {}): number {
    return this.show(message, { ...options, type: 'info' });
  }

  dismiss(id: number): void {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }

  clear(): void {
    this._toasts.set([]);
  }
}
