import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

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

  public show(message: string, options: ToastOptions = {}): number {
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

  public success(
    message: string,
    options: Omit<ToastOptions, 'type'> = {},
  ): number {
    return this.show(message, { ...options, type: 'success' });
  }

  public error(
    message: string,
    options: Omit<ToastOptions, 'type'> = {},
  ): number {
    return this.show(message, { ...options, type: 'error' });
  }

  public info(
    message: string,
    options: Omit<ToastOptions, 'type'> = {},
  ): number {
    return this.show(message, { ...options, type: 'info' });
  }

  public dismiss(id: number): void {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }

  public clear(): void {
    this._toasts.set([]);
  }
}
