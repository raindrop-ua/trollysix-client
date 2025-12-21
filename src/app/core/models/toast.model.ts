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
